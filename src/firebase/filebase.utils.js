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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    
    if(!userAuth) { return; }

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error){
            console.log('Error creating user', error.message)
        }
    }

    return userRef;
}

export const addCollectionAndDocuments = (collectionKey, objectToAdd) => {
    const collectionRef = firebase.collection(collectionKey);
}



firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({propmt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;

