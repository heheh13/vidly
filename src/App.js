import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";

import Movies from "./component/movies";
import NavBar from "./component/navBar";
import Customer from "./component/customer";
import Rental from "./component/rentals";
import NotFound from "./component/notFound";
import LoginForm from "./component/loginForm";
import Register from "./component/register";
import MovieForm from "./component/movieForm";
import auth from "./services/authServices";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Logout from "./component/logout";
import ProtectedRoute from "./common/protectedRoute";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;

    return (
      <main className="container">
        <ToastContainer />
        <NavBar user={user} />
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user}></Movies>}
          />
          <Route path="/customer" component={Customer} />
          <Route path="/rental" component={Rental} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
