const admin = require("firebase-admin");

// download serviceAccountKey.json file from firebase

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.BACKEND_ADMIN_ACCESS,
});

module.exports = admin;
