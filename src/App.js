import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Movies from "./component/movies";

import NavBar from "./component/navBar";
import { Route, Redirect, Switch } from "react-router-dom";
import Customer from "./component/customer";
import Rental from "./component/rentals";
import NotFound from "./component/notFound";
import MoviesFrom from "./component/moviesFrom";
import LoginForm from "./component/loginForm";
import Register from "./component/register";

class App extends Component {
  render() {
    return (
      <main className="container">
        <NavBar></NavBar>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MoviesFrom} />
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
