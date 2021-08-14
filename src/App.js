import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

function App() {
  return (
    <div>
      <Switch>
        {/* Exact is used when the user type only ab.com/(nothing here), otherwise Switch will render all the route in it */}
        {/* Switch only render the first match url in the list of route, if abc.com/sadds -> only render abc.com/ (exact if off)*/}
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
