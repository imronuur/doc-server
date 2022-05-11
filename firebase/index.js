const admin = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = JSON.parse(atob(process.env.FIREBASE_ADMIN_CONFIG));

const app = initializeApp({
  credential: cert(serviceAccount),
});

exports.defaultAuth = getAuth(app);
