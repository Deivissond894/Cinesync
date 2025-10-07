require("dotenv").config();
const axios = require("axios");

async function testAI() {
  const prompt = `
  Escolha apenas UM filme adequado.
  Responda SOMENTE no formato:
  Nome do Filme, Ano
  Exemplo: Matrix, 1999
  `;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Funcionou!");
    console.log("Resposta da IA:", response.data.choices[0].message.content.trim());

  } catch (err) {
    console.error("❌ Erro:", err.response?.data || err.message);
  }
}

testAI();
