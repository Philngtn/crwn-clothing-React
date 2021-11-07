import UserActionTypes from "./user.type";

// SIGN IN
export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

// CHECKING IS USER AUTHED
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

// SIGN OUT
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

//SIGN UP

export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
});

export const signUpSuccess = ({user, addtionalData}) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: {user, addtionalData}
});

export const signUpFailure = (error) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});