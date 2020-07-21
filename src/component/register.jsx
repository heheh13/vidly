import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
class Register extends Form {
  state = {
    data: {
      userName: "",
      password: "",
      name: "",
    },
    errors: {},
  };
  schema = {
    userName: Joi.string().email().required().label("UserName"),
    password: Joi.string().min(5).max(15).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = () => {
    console.log("submitted form register");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userName", "UserName", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
