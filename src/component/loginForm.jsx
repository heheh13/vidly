import React, { Component } from "react";

import Joi from "joi-browser";
import Form from "../common/form";
import auth from "../services/authServices";

class LoginForm extends Form {
  state = {
    data: {
      userName: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    userName: Joi.string().required().label("UserName"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.userName = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userName", "UserName")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
