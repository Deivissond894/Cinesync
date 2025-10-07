// services/firebaseService.js
const admin = require("firebase-admin");

// DEBUG: Vamos ver quais variáveis estão sendo lidas
console.log("=== DEBUG FIREBASE VARIABLES ===");
console.log("PROJECT_ID:", process.env.PROJECT_ID);
console.log("PRIVATE_KEY_ID:", process.env.PRIVATE_KEY_ID);
console.log("client_email:", process.env.client_email);
console.log("type:", process.env.type);
console.log("================================");

if (!admin.apps.length) {
  const serviceAccount = {
    type: process.env.type || "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri || "https://accounts.google.com/o/oauth2/auth",
    token_uri: process.env.token_uri || "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url || "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain || "googleapis.com"
  };

  // DEBUG: Vamos ver o serviceAccount final
  console.log("=== SERVICE ACCOUNT OBJECT ===");
  console.log(JSON.stringify(serviceAccount, null, 2));
  console.log("==============================");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();

module.exports = firestore;