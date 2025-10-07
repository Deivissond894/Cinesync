require("dotenv").config();
const axios = require("axios");

async function testSearch() {
  const query = "Poster oficial Matrix, 1999";
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}`;

  try {
    const { data } = await axios.get(url);
    console.log("✅ Funcionou!");
    console.log("Primeiro resultado:", data.items[0].link);
  } catch (error) {
    console.error("❌ Erro:", error.response ? error.response.data : error.message);
  }
}

testSearch();
