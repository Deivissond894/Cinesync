// services/googleService.js
require("dotenv").config();

const API_KEY = process.env.GOOGLE_API_KEY;
const CX = process.env.GOOGLE_CX;

// Buscar poster oficial
async function buscarPosterOficial(titulo, ano) {
  const query = `poster oficial ${titulo}, ${ano}`;
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&key=${API_KEY}&cx=${CX}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.items && data.items.length > 0) {
    const imagemValida = data.items.find(img =>
      img.link.match(/\.(jpg|jpeg|png)$/i)
    );
    return imagemValida ? imagemValida.link : data.items[0].link;
  }

  return null;
}

// Buscar sinopse
async function buscarSinopse(titulo, ano) {
  const query = `${titulo} ${ano} site:adorocinema.com OR site:netflix.com OR site:filmow.com`;
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${CX}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.items && data.items.length > 0) {
    // Junta todos os snippets encontrados para uma sinopse mais completa
    const sinopseCompleta = data.items.map(item => item.snippet).join(' ');
    return sinopseCompleta;
  }

  return "Sinopse não encontrada.";
}

module.exports = { buscarPosterOficial, buscarSinopse };
