// controllers/movieController.js
const { obterFilmeDaIA } = require("../services/aiService");
const { buscarPosterOficial, buscarSinopse } = require("../services/googleService");
const firestore = require("../services/firebaseService");

exports.recomendarFilme = async (req, res) => {
  try {
    const { humor, energia, observacao, userId = "Eu" } = req.body;

    const filmesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("Recomendados")
      .doc("Filmes")
      .collection("Lista");

    let filme, titulo, ano, existe;

    // Loop até achar um filme inédito
    while (true) {
      filme = await obterFilmeDaIA(humor, energia, observacao);
      [titulo, ano] = filme.split(",").map(s => s.trim());

      existe = await filmesRef.where("titulo", "==", titulo).get();
      if (existe.empty) break; // sai quando for inédito
    }

    // Buscar poster e sinopse
    const poster = await buscarPosterOficial(titulo, ano);
    const sinopse = await buscarSinopse(titulo, ano);

    // Salvar no Firestore
    await filmesRef.add({
      titulo,
      ano,
      poster,
      sinopse,
      criadoEm: new Date(),
    });

    return res.json({
      Filme: `${titulo}, ${ano}`,
      Url_da_foto: poster,
      Sinopse: sinopse,
    });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao recomendar filme" });
  }
};
