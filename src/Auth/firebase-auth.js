  
import firebase from 'firebase/app'
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBSCIolsa3JrFZolRVhCBiHugyd4XsF8gc",
    authDomain: "merang-9053b.firebaseapp.com'",
    projectId: "merang-9053b",
    storageBucket: "dmerang-9053b.appspot.com",
}

firebase.initializeApp(config)

export const auth = firebase.auth

export default firebase;