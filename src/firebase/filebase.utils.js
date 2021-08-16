import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyDwmX92GhptTY_UOTYa0RmznFDMjQ8CYkM",
    authDomain: "crwn-db-85ea7.firebaseapp.com",
    projectId: "crwn-db-85ea7",
    storageBucket: "crwn-db-85ea7.appspot.com",
    messagingSenderId: "836430678874",
    appId: "1:836430678874:web:2c9846048bb02cf5480163",
    measurementId: "G-144Y0SJ5F1"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({propmt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;

