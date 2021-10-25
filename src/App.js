import React from "react";
import { Switch, Route , Redirect} from "react-router-dom";
import "./App.css";
import { createStructuredSelector } from "reselect";
// Pages
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./components/signin-and-signout/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";

// Redux
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.action'


class App extends React.Component {
  

  // Declare whether a user has been logged 
  unsubcribeFromAuth = null;

  componentDidMount(){
    const {checkUserSession} = this.props;
    checkUserSession();
  }

  componentWillUnmount(){
    // set the null
    this.unsubcribeFromAuth();
  }

  render() {
    return (
      <div>
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
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage/>)
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});


// null because the App does not need the props from Reducer, the second arg is used to let "user state" to use inside the App component
export default connect(mapStateToProps, mapDispatchToProps)(App);
