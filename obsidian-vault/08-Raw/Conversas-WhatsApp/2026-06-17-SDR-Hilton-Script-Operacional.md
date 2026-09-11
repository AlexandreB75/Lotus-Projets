---
tags: [raw, scripts, sdr, whatsapp, hilton, operacional, outbound]
data: 2026-06-17
agente: SDR-Hilton
fonte: Alexandre Borges — revisão final para n8n outbound
---

# SDR-HILTON — Script Operacional (versão definitiva)

## 1. PITCH DO PRODUTO

### O que é

O Hilton Garden Inn Itapema é um empreendimento multiuso internacional localizado na Meia Praia, em Itapema/SC.

O projeto reúne em um único endereço:
- Hotel Hilton Garden Inn
- Residenciais
- Centro Médico
- Mall de lojas
- Rooftop panorâmico 360°

É um modelo que atende tanto investidores quanto usuários finais que buscam renda, patrimônio e serviços integrados.

### Números principais

**Hotel:**
- 162 suítes
- Operação profissional da Rede Atlântica sob bandeira Hilton

**Residencial:**
- 240 unidades
- Apartamentos de 40 m² a 80 m² (incluindo duplex)

**Centro Médico:**
- Aproximadamente 2.600 m²
- Elevador exclusivo para pacientes
- Acesso independente

### Diferenciais

- Marca Hilton
- Gestão profissional da operação
- Localização em Meia Praia
- Centro médico integrado
- Mall de serviços
- Rooftop gastronômico
- Piscinas e lazer
- Potencial de renda através do pool residencial

### Pool de Locação Residencial

O proprietário pode:
- Utilizar o apartamento
- Fazer locação anual
- Participar do pool de locação

No pool, a operação é administrada pela Rede Atlântica.

Para participar:
- Unidade deve seguir padrão Hilton
- Mobília e enxoval precisam ser homologados
- Não é permitida locação por Airbnb ou aplicativos similares

### Prazo

- Hotel, mall e centro médico: entrega prevista para 2026
- Residencial: entrega contratual em 2027

---

## 2. SEGMENTOS-ALVO

### SAÚDE (Prioridade Alta)
Objetivo: Centro Médico Hilton

- Médicos
- Clínicas médicas
- Centros de imagem
- Laboratórios
- Odontologia / Dermatologia / Oftalmologia / Ortopedia / Cardiologia
- Investidores da área médica

### INVESTIDOR IMOBILIÁRIO (Prioridade Alta)
Objetivo: Pool residencial

- Empresários
- Investidores de imóveis
- Profissionais liberais
- Proprietários de imóveis para renda

### USUÁRIO FINAL (Prioridade Média)
Objetivo: Residencial para uso próprio

- Famílias / Executivos / Aposentados / Segunda moradia

### HOTELARIA E TURISMO (Prioridade Média)
Objetivo: Modelo de renda hoteleira e intercâmbio

- Investidores de hotel / Proprietários de flats / Operadores turísticos

---

## 3. ABERTURA DE WHATSAPP — LEAD FRIO

```
Olá, [Nome].

Meu nome é Alexandre Borges, CRECI-SC 45148.

Estou entrando em contato porque identifiquei que você atua 
no segmento [SEGMENTO] e acredito que possa fazer sentido 
conhecer um projeto que está sendo desenvolvido em Itapema.

O Hilton Garden Inn Itapema reúne hotel internacional, centro 
médico, residencial e mall comercial em um único empreendimento.

Antes de te enviar qualquer material, me diga uma coisa:

Você busca mais uma oportunidade para investimento, expansão 
do seu negócio ou uso próprio?
```

### Ramificações após resposta

**Se INVESTIMENTO:**
```
Perfeito.

Hoje muitos investidores estão analisando o Hilton principalmente 
pelo modelo de pool residencial administrado pela operação hoteleira.

Posso te enviar uma apresentação rápida de 2 minutos?
```

**Se SAÚDE / EXPANSÃO DE NEGÓCIO:**
```
Perfeito.

O projeto possui um centro médico integrado dentro do complexo 
Hilton, pensado para clínicas e profissionais da área da saúde.

Posso te mostrar as plantas e a configuração do andar médico?
```

**Se USO PRÓPRIO:**
```
Perfeito.

Os residenciais Hilton oferecem a experiência de um apartamento 
com serviços integrados de hotelaria.

Posso te enviar as plantas disponíveis?
```

---

## 4. ROTEAMENTO n8n (definitivo)

| Perfil do lead         | Produto alvo             |
|------------------------|--------------------------|
| Médico / Clínica       | Centro Médico Hilton     |
| Investidor renda       | Hilton Residencial Pool  |
| Segunda moradia        | Hilton Residencial       |
| Advogado               | Lótus Business           |
| Contabilidade          | Lótus Business           |
| Marketing              | Lótus Business           |
| Imobiliária            | Lótus Business           |
| Empresário (sede)      | Lótus Business           |
| Investidor corporativo | Lótus Business           |

> Roteamento por perfil, não por setor genérico. Aumenta assertividade do GPT-4o mini.

---

## Regras SDR-Hilton (mantidas)

- NUNCA revelar preço ou tabela por mensagem
- NUNCA confirmar rooftop como amenidade confirmada ⚠️ (verificar status com Alexandre)
- NUNCA prometer prazo de entrega como garantido
- NUNCA prometer valorização ou retorno
- SEMPRE validar objeção antes de responder
- SEMPRE buscar microcompromisso leve (material, ligação, visita)
- SEMPRE escalar para Alexandre quando: capital confirmado + prazo ≤ 6 meses

→ Atualiza: [[../../09-Wiki-Compilado/Argumentos-Validados/Frases-e-Narrativa-Hilton]]
→ Atualiza: [[../../03-Squads/Agentes-Operacionais/agents/SDR-Hilton]]
