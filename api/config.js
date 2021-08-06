const Firebase = require('firebase');

Firebase.initializeApp({
  apiKey: 'AIzaSyBSCIolsa3JrFZolRVhCBiHugyd4XsF8gc',
  authDomain: 'merang-9053b.firebaseapp.com',
  projectId: 'merang-9053b',
  storageBucket: 'merang-9053b.appspot.com',
});

const db = Firebase.firestore()

module.exports = {db, Firebase}
