import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { GlobalStyle } from "./global.styles";

import { createStructuredSelector } from "reselect";
// Pages
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signout/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

// Redux
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.action";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        {/* Exact is used when the user type only ab.com/(nothing here), otherwise Switch will render all the route in it */}
        {/* Switch only render the first match url in the list of route, if abc.com/sadds -> only render abc.com/ (exact if off)
        , otherwise it will render all the matching page both abc.com/sadds and abc.com/ */}
        {/* Route will render the component passing in the component={COMPONENT} with 3 props history, match, location  */}
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact path="/checkout" component={CheckoutPage} />

        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

// null because the App does not need the props from Reducer, the second arg is used to let "user state" to use inside the App component
export default connect(mapStateToProps, mapDispatchToProps)(App);
