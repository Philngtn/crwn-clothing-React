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
// Firebase
import {auth , createUserProfileDocument} from './firebase/filebase.utils';

// Redux
import { setCurrentUser } from './redux/user/user.action'
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors'

class App extends React.Component {
  

  // Declare whether a user has been logged 
  unsubcribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;

    // Using onAuthStateChange to check current logged in user
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // If there is a logged in user perform the snapshot or wait to check whter the logged in user
      // is in the database or not (if not -> create one in database then return that newly registered user, else return recorded user)
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        
        // Taking snapshot and set the currentUser state
        // If we want to see the log, add to the 2nd arg of the setState command to see the latest updated of state (old)
        // Using REDUX instead
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }else{
        // else return null;
        setCurrentUser(userAuth);
      }

    });
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
  currentUser : selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

// null because the App does not need the props from Reducer, the second arg is used to let "user state" to use inside the App component
export default connect(mapStateToProps, mapDispatchToProps)(App);
