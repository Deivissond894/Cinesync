// services/firebaseService.js
const admin = require("firebase-admin");

if (!admin.apps.length) {
  // Usar variáveis de ambiente com os nomes EXATOS do Render
  const serviceAccount = {
    type: process.env.type,
    project_id: process.env.project_id, // Corrigido: era PROJECT_ID, agora é project_id
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key?.replace(/\\n/g, '\n'), // Corrige quebras de linha
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();

module.exports = firestore;