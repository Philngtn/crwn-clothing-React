import {takeLatest , call, put, all} from 'redux-saga/effects'; 

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/filebase.utils";

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.action';

import ShopActionTypes from './shop.type';

export function* fetchCollectionsAsync(){
    yield console.log('I am fired');

        try{
            // Get ref from collection
            const collectionRef = firestore.collection('collections');
            // Get snapshot from the collection and pass to the function to decompose to customized object 
            // that contain necessary information for front end

            const snapshot = yield collectionRef.get();
            const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
            yield put(fetchCollectionsSuccess(collectionsMap));

        } catch (error) {
            yield put(fetchCollectionsFailure(error.message));
        }
        
}


// takeEvery will take all the action fired even the previous actions 
// have yet terminated 
export function* fetchCollectionsStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas(){
    yield all([call(fetchCollectionsStart)]);
}