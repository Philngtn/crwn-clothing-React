import ShopActionTypes from "./shop.type";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/filebase.utils";

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

// Redux thunk is a function return a function,
// Redux thunk only interest in function not object such as fetchCollectionsSuccess
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        // Get ref from collection
        const collectionRef = firestore.collection('collections');
        // Get snapshot from the collection and pass to the function to decompose to customized object 
        // that contain necessary information for front end

        dispatch(fetchCollectionsStart());

        // Using promise pattern, onSnapshot() => get().then()
        collectionRef.get().then(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        })
        .catch(error => dispatch(fetchCollectionsFailure(error.message)));
    };
};