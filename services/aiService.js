// services/aiService.js
require("dotenv").config();
const fetch = require("node-fetch");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function obterFilmeDaIA(humor, energia, observacao) {
  const prompt = `
  Você é um motor de recomendação de filmes.
  O usuário está com humor: ${humor}, energia: ${energia}, e observação: ${observacao}.
  Escolha **um filme real** que combine com esse contexto.
  Responda apenas no formato:
  Nome do Filme, Ano.
  Não invente ano. Não invente filme inexistente.
  `;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // você pode trocar para outro modelo disponível no OpenRouter
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await res.json();
    return data.choices[0]?.message?.content?.trim();
  } catch (err) {
    throw new Error("Falha ao obter filme da IA");
  }
}

module.exports = { obterFilmeDaIA };
