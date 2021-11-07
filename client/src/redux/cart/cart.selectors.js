import { createSelector } from "reselect";

// cart is a part of state
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart], // the collection taking from the rootReducer, in here is the cart object in rootReducer which has cart, user, ...
    (cart) => cart.cartItems  // return value
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems], // the collection of cartItems taking form selectCartItems
    cartItems => cartItems.reduce(
        (accumalatedQuantity, cartItem) => 
        accumalatedQuantity + cartItem.quantity, 
        0)
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumalatedQuantity, cartItem) => 
        accumalatedQuantity + cartItem.quantity * cartItem.price, 
        0)
)