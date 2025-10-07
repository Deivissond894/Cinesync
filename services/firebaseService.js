// services/firebaseService.js
const admin = require("firebase-admin");
const serviceAccount = require("../cinesync-firebase.json"); // seu arquivo baixado do Firebase

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();

module.exports = firestore;
