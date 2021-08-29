import { UserActionTypes } from "./user.type";


const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE, action) =>  {
    switch (action.type){
        case UserActionTypes.SET_CURRENT_USER:
            return {
                // All props + new value of currentUser
                ...state,
                // payload will be user attribute receiving from the firebase
                currentUser : action.payload
            };
        default:
            return state;
    }
}

export default userReducer