import React, { Component } from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
class NewMovie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      rate: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    rate: Joi.number().required().min(0).max(10).label("Daily Rental Rate"),
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });
  }
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "NumberInStock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovie;
