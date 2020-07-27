import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
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

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <main className="container">
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
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
