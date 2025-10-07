const express = require("express");
const router = express.Router();
const { recomendarFilme } = require("../controllers/movieController");

// Rota para recomendação de filmes
router.post("/recommend", recomendarFilme);

module.exports = router;
