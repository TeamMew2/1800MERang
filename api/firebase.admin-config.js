var admin = require("firebase-admin");

var serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dggdb-56b82-default-rtdb.firebaseio.com'
});

module.exports = admin