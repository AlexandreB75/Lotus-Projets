import logging
import os

import anthropic
from dotenv import load_dotenv

# Carrega credenciais: primeiro tenta secrets/, depois .env local
_secrets_dir = os.path.join(os.path.dirname(__file__), "..", "secrets")
load_dotenv(os.path.join(_secrets_dir, "telegram.env"))
load_dotenv(os.path.join(_secrets_dir, "anthropic.env"))
# Fallback: .env local na pasta telegram_bot/
load_dotenv()
from telegram import Update
from telegram.constants import ParseMode
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)

import memory

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
ANTHROPIC_KEY = os.getenv("ANTHROPIC_KEY")

if not TELEGRAM_TOKEN:
    raise ValueError("TELEGRAM_TOKEN não encontrado. Configure o arquivo .env")
if not ANTHROPIC_KEY:
    raise ValueError("ANTHROPIC_KEY não encontrado. Configure o arquivo .env")

claude = anthropic.Anthropic(api_key=ANTHROPIC_KEY)

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """Você é o assistente inteligente do Lótus Business — empreendimento 100% comercial, o maior e mais moderno centro empresarial do litoral catarinense.

━━━━━━━━━━━━━━━━━━━━━━━━
EMPREENDIMENTO
━━━━━━━━━━━━━━━━━━━━━━━━
• Localização: Entrada de Itapema e Porto Belo, ao lado do Angeloni, acesso direto à BR-101 — 2º m² mais caro do Brasil
• Salas comerciais: aprox. 61m² a 172m²
• Lajes corporativas: aprox. 904m² (para grandes operações)
• Pavimentos: 31 no total — 5 pavimentos de estacionamento rotativo + 8 salas por andar (8º ao 20º)
• Rooftop: restaurante corporativo, ideal para eventos e conveniência
• Entrega prevista: dezembro de 2028
• Responsável Comercial: Alexandre Borges — CRECI-SC 45148

Diferenciais:
✔ Torre corporativa exclusiva (100% comercial, sem mix residencial)
✔ Estacionamento rotativo próprio — 5 pavimentos
✔ Localização estratégica: acesso regional BR-101, Angeloni ao lado
✔ Rooftop corporativo com restaurante
✔ Lajes corporativas para grandes operações (904m²)
✔ Escassez real: produto raro no litoral catarinense

━━━━━━━━━━━━━━━━━━━━━━━━
PÚBLICO-ALVO
━━━━━━━━━━━━━━━━━━━━━━━━
Médicos, dentistas, advogados, contadores, empresários, empresas de tecnologia, agências de marketing e investidores.

Situações comuns:
- Trabalha em clínica/escritório de terceiros e quer independência
- Home office e precisa de endereço profissional
- Atende em outra cidade, quer presença em Itapema
- Já tem sala mas quer upgrade ou segunda unidade
- Investidor puro buscando valorização no litoral SC

━━━━━━━━━━━━━━━━━━━━━━━━
OBJEÇÕES COMUNS E COMO CONTORNAR
━━━━━━━━━━━━━━━━━━━━━━━━
• "Prazo de entrega é longo (2028)"
  → Quem compra agora trava o preço de lançamento. A valorização acontece durante a obra — quem esperar vai pagar mais caro ou não vai encontrar.

• "O valor por m² é alto"
  → Itapema é o 2º m² mais caro do Brasil — isso é o que protege o investimento. Produto comercial exclusivo nessa localização não existe em outro lugar do litoral.

• "Receio de investir / mercado incerto"
  → O litoral catarinense tem crescimento constante. Empreendimento 100% comercial com estacionamento rotativo e rooftop atende uma demanda real que não existe na região.

━━━━━━━━━━━━━━━━━━━━━━━━
CHECKLIST DE QUALIFICAÇÃO
━━━━━━━━━━━━━━━━━━━━━━━━
Para médicos/dentistas:
- Onde atende hoje? (clínica própria, terceiros, hospital?)
- Quantos dias por semana em Itapema/região?
- Tem ou já teve consultório próprio?
- Está buscando sala para uso próprio, aluguel ou investimento?
- Tem sócio? Pensaria em 2 unidades?

Perguntas gerais para todos os perfis:
- Qual a principal motivação de interesse?
- Já conhece Itapema? Tem ligação com a região?
- Perfil financeiro: parcelamento ou à vista?
- Prazo: urgência imediata ou médio prazo?
- Quem mais participa da decisão?

Sinais de compra (🔴 QUENTE):
- Pergunta sobre documentação e processo de compra
- Quer visitar o stand ou ver planta detalhada
- Menciona sócio ou cônjuge na conversa
- Já pesquisou outros produtos e voltou

Sinais de risco (prospect frio):
- Só quer "dar uma olhada"
- Não tem ligação com a região
- Orçamento muito aquém do ticket
- Evasivo sobre prazo e decisão

━━━━━━━━━━━━━━━━━━━━━━━━
SEU PERFIL E FORMA DE RESPONDER
━━━━━━━━━━━━━━━━━━━━━━━━
- Tom: sofisticado, consultivo — nunca agressivo ou genérico
- Você lembra o histórico da conversa e usa esse contexto nas respostas
- Você ajuda a equipe de vendas do Alexandre a analisar prospects, registrar leads e planejar abordagens
- Responda sempre em português BR, claro e objetivo
- Use formatação Markdown do Telegram quando útil (*negrito*, _itálico_, listas com •)
- Seja concisa mas completa — respostas curtas quando possível, detalhadas quando necessário

Quando receber dados de um prospect para análise, estruture assim:
• *Categoria:* NECESSIDADE_IMEDIATA | NECESSIDADE_LATENTE | INVESTIDOR_PURO
• *Temperatura:* 🔴 QUENTE | 🟡 MORNO | 🔵 FRIO
• *Score:* X/100
• *Dor principal:* descrição objetiva
• *Argumento-chave:* o mais poderoso para este perfil
• *Objeção provável:* o que o prospect vai levantar
• *Como contornar:* resposta para a objeção
• *Próximos passos:* lista de ações recomendadas"""


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = update.effective_chat.id
    memory.clear_history(chat_id)
    texto = (
        "👋 Olá\\! Sou o assistente inteligente do *Lótus Business*\\.\n\n"
        "Estou aqui para ajudar a equipe de vendas com inteligência comercial, "
        "análise de prospects e estratégias de abordagem\\.\n\n"
        "*Comandos disponíveis:*\n"
        "• /analisar — Analisar um novo prospect\n"
        "• /ajuda — Ver todos os comandos\n"
        "• /limpar — Apagar o histórico desta conversa\n\n"
        "Ou simplesmente me escreva\\. Estou aqui\\! 😊"
    )
    await update.message.reply_text(texto, parse_mode=ParseMode.MARKDOWN_V2)


async def ajuda(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    texto = (
        "*📋 Comandos — Lótus Business Bot*\n\n"
        "• /start — Reiniciar conversa\n"
        "• /analisar — Iniciar análise de prospect\n"
        "• /ajuda — Exibir esta mensagem\n"
        "• /limpar — Apagar histórico da conversa\n\n"
        "*💡 Dicas:*\n"
        "Você também pode me enviar mensagens livres\\! Por exemplo:\n"
        "— _\"Tenho um lead, médico, home office em Itapema\\.\"_\n"
        "— _\"Qual o melhor argumento para um investidor?\"_\n"
        "— _\"Me ajuda a montar uma abordagem para dentista\\.\"_"
    )
    await update.message.reply_text(texto, parse_mode=ParseMode.MARKDOWN_V2)


async def analisar(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    texto = (
        "📊 *Análise de Prospect*\n\n"
        "Me envie as informações do prospect em texto livre\\. Quanto mais detalhes, "
        "melhor a análise\\. Exemplo:\n\n"
        "_\"Prospect: Dr\\. Carlos, cirurgião plástico, 45 anos\\. Atualmente trabalha "
        "em clínica de terceiros em Balneário Camboriú\\. Comprou apartamento em "
        "Itapema recentemente\\. Mostrou interesse nas salas\\. Orçamento flexível\\.\"_\n\n"
        "Pode enviar agora\\! 👇"
    )
    await update.message.reply_text(texto, parse_mode=ParseMode.MARKDOWN_V2)


async def limpar(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = update.effective_chat.id
    memory.clear_history(chat_id)
    await update.message.reply_text(
        "🗑️ Histórico apagado\\. Começando do zero\\!",
        parse_mode=ParseMode.MARKDOWN_V2,
    )


async def responder(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = update.effective_chat.id
    mensagem_usuario = update.message.text

    await context.bot.send_chat_action(chat_id=chat_id, action="typing")

    memory.add_message(chat_id, "user", mensagem_usuario)
    historico = memory.get_history(chat_id)

    try:
        resposta = claude.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system=SYSTEM_PROMPT,
            messages=historico,
        )
        texto_resposta = resposta.content[0].text
    except anthropic.APIStatusError as e:
        logger.error("Erro na API Anthropic: %s", e)
        texto_resposta = "⚠️ Erro ao conectar com a IA. Tente novamente em alguns segundos."
    except Exception as e:
        logger.error("Erro inesperado: %s", e)
        texto_resposta = "⚠️ Ocorreu um erro inesperado. Tente novamente."

    memory.add_message(chat_id, "assistant", texto_resposta)

    # Telegram tem limite de 4096 caracteres por mensagem
    if len(texto_resposta) > 4096:
        for i in range(0, len(texto_resposta), 4096):
            await update.message.reply_text(texto_resposta[i:i + 4096])
    else:
        await update.message.reply_text(texto_resposta)


def main() -> None:
    app = Application.builder().token(TELEGRAM_TOKEN).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("ajuda", ajuda))
    app.add_handler(CommandHandler("analisar", analisar))
    app.add_handler(CommandHandler("limpar", limpar))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, responder))

    logger.info("Lótus Business Bot está online! Aguardando mensagens...")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
