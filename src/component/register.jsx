import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import * as userService from "../services/userServices";
import auth from "../services/authServices";
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
  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // toast("User already registerd");
        const errors = { ...this.state.errors };
        errors.userName = ex.response.data;
        this.setState({ errors });
      }
    }
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
