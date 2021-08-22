import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./components/signin-and-signout/sign-in-and-sign-up.component";
import {auth , createUserProfileDocument} from './firebase/filebase.utils';


class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    };

  }

  // Declare whether a loged in user
  unsubcribeFromAuth = null;

  componentDidMount(){

    // Using onAuthStateChange to check current logged in user
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // If there is a logged in user perform the snapshot or wait to check whter the logged in user
      // is in the database or not (if not create database, else return recorded user)
      if (userAuth){

        const userRef = await createUserProfileDocument(userAuth);
        
        // Taking snapshot and set the currentUser state
        // If we want to see the log, add to the 2nd arg of the setState command to see the latest updated of state
        userRef.onSnapshot(snapShot => {
          this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            });

            console.log(this.state);
        });
      }else{
        // else return null;
        this.setState({currentUser:userAuth});
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          {/* Exact is used when the user type only ab.com/(nothing here), otherwise Switch will render all the route in it */}
          {/* Switch only render the first match url in the list of route, if abc.com/sadds -> only render abc.com/ (exact if off)*/}
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
