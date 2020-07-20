import React, { Component } from "react";

import Joi from "joi-browser";
import Form from "../common/form";

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

  doSubmit = () => {
    console.log("submited");
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
