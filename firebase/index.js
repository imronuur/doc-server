const admin = require("firebase-admin");

const serviceAccount = JSON.parse(atob(process.env.FIREBASE_ADMIN_CONFIG));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.defaultAuth = admin.auth();
