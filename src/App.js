import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store";

import FormPage from './components/end-user/form'
import AdminLogin from './components/admin/login'
import AdminPage from './components/admin/AdminPage';
import PrivateRoute from "./components/privateRoute";

import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser, setAuthToken } from "./actions/AuthAction";

//create axios global config
axios.defaults.baseURL = "http://localhost:8000/"
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./admin-login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={FormPage}></Route>
            <Route path="/admin-login" component={AdminLogin}></Route>
            <PrivateRoute path="/admin" component={AdminPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
