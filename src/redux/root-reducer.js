import { combineReducers } from "redux";

// For cache saving on machine
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
// Root reducer is an object that has user pointing to userReducer

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'] //the only reducer we want to save (we can add more)
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer
});

export default persistReducer(persistConfig, rootReducer);