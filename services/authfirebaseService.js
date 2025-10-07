const admin = require("firebase-admin");
const fetch = require("node-fetch");

// se você já inicializa o admin em outro arquivo, remova este bloco
// const serviceAccount = require("../cinesync-firebase.json");
// if (!admin.apps.length) {
//   admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
// }

const WEB_API_KEY = process.env.FIREBASE_WEB_API_KEY;

// SIGNUP (admin SDK)
async function signup(email, password) {
  const user = await admin.auth().createUser({ email, password });
  return { uid: user.uid, email: user.email };
}

// FORGOT (link de redefinição)
async function forgot(email) {
  const link = await admin.auth().generatePasswordResetLink(email);
  return { resetLink: link };
}

// VERIFY (ID token -> UID)
async function verify(idToken) {
  const decoded = await admin.auth().verifyIdToken(idToken);
  return { uid: decoded.uid, email: decoded.email || null };
}

// LOGIN (REST API do Firebase Auth)
async function login(email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });

  const data = await res.json();
  if (!res.ok) {
    // mapeia mensagens mais amigáveis
    const code = data?.error?.message || "LOGIN_FAILED";
    let msg = "Usuário e/ou senha incorretos.";
    if (code.includes("EMAIL_NOT_FOUND")) msg = "E-mail não encontrado.";
    if (code.includes("INVALID_PASSWORD")) msg = "Senha inválida.";
    if (code.includes("USER_DISABLED")) msg = "Usuário desativado.";
    const err = new Error(msg);
    err.status = 401;
    throw err;
  }

  // opcional: validar idToken com admin e extrair UID
  const decoded = await admin.auth().verifyIdToken(data.idToken);

  return {
    uid: decoded.uid,
    idToken: data.idToken,
    refreshToken: data.refreshToken,
    expiresIn: Number(data.expiresIn), // segundos
    email: decoded.email || null,
  };
}

module.exports = { signup, forgot, verify, login };
