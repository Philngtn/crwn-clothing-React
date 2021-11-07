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

export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return batch.commit();

};

export const convertCollectionsSnapshotToMap = (collections) => {
    // We will retrieve the collections on Firestore and loop to get the data of each
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();
        // return the object the contain valueable info
        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
        // begining with empty hashmap, then accumulate the name + collection then return
     },{});

};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({propmt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase;

