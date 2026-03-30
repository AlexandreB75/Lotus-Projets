import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.use(cors());
app.use(express.json());

// ── Proxy para a API Anthropic ──────────────────────────────────────────────
app.post("/api/analyze", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Campo 'prompt' obrigatório." });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY não configurada no servidor." });
  }

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content.map((b) => b.text || "").join("");
    res.json({ text });
  } catch (err) {
    console.error("Erro Anthropic API:", err.message);
    res.status(500).json({ error: "Falha ao processar análise via Claude API." });
  }
});

// ── Servir o frontend em produção ───────────────────────────────────────────
const distPath = join(__dirname, "frontend", "dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => {
  res.sendFile(join(distPath, "index.html"));
});

// ── Iniciar servidor ────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🌸  Lótus Prospecting rodando em http://localhost:${PORT}\n`);
});
