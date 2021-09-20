import { createSelector } from "reselect";

// state here is rootReduer => take the user object therefore, state.user
const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
    //(user) is the the user in the object of rootReducer 
);

