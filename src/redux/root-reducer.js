import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

// Root reducer is an object that has user pointing to userReducer

export default combineReducers({
    user: userReducer,
    cart: cartReducer
})