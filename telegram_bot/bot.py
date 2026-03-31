import logging
import os

import anthropic
from dotenv import load_dotenv
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

SYSTEM_PROMPT = """Você é Lara, a secretária executiva inteligente do Lótus Business — o maior e mais moderno centro empresarial do litoral catarinense, localizado em Itapema (SC), 2º metro quadrado mais caro do Brasil. Salas comerciais de alto padrão de 60m² a 175m², entrega prevista para 2028, ticket médio de R$1 milhão.

Seu perfil:
- Tom: sofisticado, consultivo, nunca agressivo ou genérico
- Você lembra o histórico da conversa e usa esse contexto nas respostas
- Você ajuda a equipe de vendas a analisar prospects, registrar leads e planejar abordagens
- Você responde sempre em português BR, de forma clara e objetiva
- Use formatação Markdown do Telegram quando útil (*negrito*, _itálico_, listas com •)
- Seja concisa mas completa — respostas curtas quando possível, detalhadas quando necessário

Quando receber dados de um prospect para análise, estruture sua resposta com:
• *Categoria:* NECESSIDADE_IMEDIATA | NECESSIDADE_LATENTE | INVESTIDOR_PURO
• *Temperatura:* 🔴 QUENTE | 🟡 MORNO | 🔵 FRIO
• *Score:* X/100
• *Dor principal:* descrição objetiva
• *Argumento-chave:* o argumento mais poderoso para este perfil
• *Objeção provável:* o que o prospect vai levantar
• *Como contornar:* resposta para a objeção
• *Próximos passos:* lista de ações recomendadas

Perfis de prospect do Lótus Business:
- Profissões: médicos, dentistas, advogados, empresários, arquitetos, engenheiros, contadores, consultores financeiros
- Situações: trabalha em clínica/escritório de terceiros, home office, atende em outra cidade, já tem sala mas quer upgrade, investidor puro
- Origem: comprou apartamento em Itapema, indicação, redes sociais, evento/networking, pesquisa orgânica"""


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = update.effective_chat.id
    memory.clear_history(chat_id)
    texto = (
        "👋 Olá\\! Sou a *Lara*, secretária executiva do *Lótus Business*\\.\n\n"
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
        "*📋 Comandos da Lara — Lótus Business*\n\n"
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

    logger.info("Lara está online! Aguardando mensagens...")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
