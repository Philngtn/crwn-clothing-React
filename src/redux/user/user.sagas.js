import {takeLatest, all, call, put} from 'redux-saga/effects';

import UserActionTypes from './user.type';

import {auth, 
        googleProvider, 
        createUserProfileDocument,
        getCurrentUser
} from '../../firebase/filebase.utils';

import { signInSuccess, 
         signInFailure,
         signOutSuccess,
         signOutFailure,
         signUpSuccess,
         signUpFailure
} from './user.action';


export function* getSnapshotFromUserAuth(userAuth, addtionalData){
    try{
        const userRef = yield call(createUserProfileDocument, userAuth, addtionalData);
        const userSnapShot = yield userRef.get();
        // put means dispatching new actions
        yield put(
            signInSuccess({id:userSnapShot.id, ...userSnapShot.data()})
        );
    }catch(error){
        yield put(signInFailure(error));
    }
}

export function* signInWithGoole(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({payload:{email, password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure(error))
    } 
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* signOut(){
    try{
        yield auth.signOut();
        yield (put(signOutSuccess()));
    }catch(error){
        yield put(signOutFailure(error));
    }
}

export function* signUp({payload:{email, password, displayName}}){
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(
            signUpSuccess({user, addtionalData:{displayName}})
        );
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({payload:{user, addtionalData}}){
    yield getSnapshotFromUserAuth(user, addtionalData);
}

// ON FUNCTION

export function* onGoolgeSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoole)
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail )
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

// Remember put all call() functions in the []
export function* userSagas(){
    yield all([call(onGoolgeSignInStart), 
               call(onEmailSignInStart), 
               call(isUserAuthenticated),
               call(onSignOutStart),
               call(onSignUpStart),
               call(onSignUpSuccess),
               
            ]);
}

