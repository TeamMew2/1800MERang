import * as firebase from 'firebase';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBSCIolsa3JrFZolRVhCBiHugyd4XsF8gc',
  authDomain: 'expo-firebase-phone-auth-XXXXXXX.firebaseapp.com',
  databaseURL: 'https://expo-firebase-phone-auth-XXXXXXX.firebaseio.com',
  projectId: 'expo-firebase-phone-auth-merang-9053b',
  storageBucket: 'expo-firebase-phone-auth-XXXXXXX.appspot.com',
  messagingSenderId: 'XXXXXX',
  appId: '1:XXXXXXX:web:a1XXXXXXX',
  measurementId: 'G-XXXXXXX',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
