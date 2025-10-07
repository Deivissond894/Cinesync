const express = require("express");
const router = express.Router();
const auth = require("../services/authfirebaseService");

// signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "email e password são obrigatórios." });
    const out = await auth.signup(email, password);
    res.json(out);
  } catch (e) {
    res.status(400).json({ error: e.message || "Falha no signup." });
  }
});

// login (NOVO)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: "email e password são obrigatórios." });
    const out = await auth.login(email, password);
    res.json(out);
  } catch (e) {
    res.status(e.status || 401).json({ error: e.message || "Usuário e/ou senha incorretos." });
  }
});

// forgot
router.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ error: "email é obrigatório." });
    const out = await auth.forgot(email);
    res.json(out);
  } catch (e) {
    res.status(400).json({ error: e.message || "Falha ao gerar link de reset." });
  }
});

// verify
router.post("/verify", async (req, res) => {
  try {
    const { token } = req.body || {};
    if (!token) return res.status(400).json({ error: "token é obrigatório." });
    const out = await auth.verify(token);
    res.json(out);
  } catch (e) {
    res.status(401).json({ error: e.message || "Token inválido." });
  }
});

module.exports = router;
