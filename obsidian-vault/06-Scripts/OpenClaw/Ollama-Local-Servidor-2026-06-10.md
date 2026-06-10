---
tags: [openclaw, ollama, modelo-local, infraestrutura]
status: validado-com-restricoes
data: 2026-06-10
---

# Ollama Local no Servidor — 2026-06-10

## Objetivo

Instalar e testar o Ollama diretamente no servidor para avaliar uso com OpenClaw/n8n.

---

## Configuração validada

- API local: `http://127.0.0.1:11434`
- Instalação em modo usuário.
- Modelos baixados:
  - `llama3.2:1b`
  - `llama3.2:3b`

Parâmetros usados para reduzir consumo:

- `OLLAMA_NUM_PARALLEL=1`
- `OLLAMA_CONTEXT_LENGTH=4096`
- `num_thread=2`
- `use_mmap=true`

---

## Resultado

### Funcionou

- Ollama instalado no servidor.
- API local respondeu corretamente.
- `llama3.2:1b` respondeu em teste direto.
- OpenClaw listou:
  - `ollama/llama3.2:1b`
  - `ollama/llama3.2:3b`

### Limitações encontradas

- Execução apenas em CPU.
- Container com limite real de memória próximo de 4 GB.
- `llama3.2:3b` ficou pesado/lento para uso prático.
- `llama3.2:1b` funciona, mas é fraco para operação comercial completa.
- Testes via subagent/OpenClaw encontraram overflow de contexto.

---

## Decisão operacional

Manter **OpenAI como modelo principal** do OpenBotXD/OpenClaw.

Usar Ollama apenas para:

- testes simples;
- classificações curtas;
- experimentos locais;
- automações n8n muito controladas.

Não usar Ollama como cérebro principal da operação comercial.

---

## Ajuste de custo

Como `openai/gpt-5.5` estava caro para uso diário, a sessão foi alterada para:

- `openai/gpt-4.1`

Recomendação:\n\n- `gpt-4.1`: uso diário operacional.
- `gpt-5.5`: tarefas estratégicas/pesadas, debug complexo e arquitetura avançada.
- Ollama: testes locais leves.
