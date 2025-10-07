// controllers/authController.js
const { signup, login, forgotPassword } = require("../services/authfirebaseService");

/**
 * Cadastro (Signup)
 */
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  const result = await signup(email, password);

  if (result.success) {
    res.status(201).json({ message: "Usuário criado com sucesso!", user: result.user });
  } else {
    res.status(400).json({ error: result.error });
  }
};

/**
 * Login
 */
exports.login = async (req, res) => {
  const { uid } = req.body; // o uid vem do usuário já criado no Firebase
  const result = await login(uid);

  if (result.success) {
    res.json({ token: result.token });
  } else {
    res.status(400).json({ error: result.error });
  }
};

/**
 * Resetar senha
 */
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const result = await forgotPassword(email);

  if (result.success) {
    res.json({ message: "Link de reset enviado", link: result.link });
  } else {
    res.status(400).json({ error: result.error });
  }
};
