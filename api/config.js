const Firebase = require('firebase');

Firebase.initializeApp({
  apiKey: process.env.GCP_KEY,
  authDomain: 'merang-9053b.firebaseapp.com',
  projectId: 'merang-9053b',
  storageBucket: 'merang-9053b.appspot.com',
});

const db = Firebase.firestore()

module.exports = {db}