import React, { Component } from "react";
import Heart from "../common/heart";

import Table from "../common/table";
import { Link } from "react-router-dom";
import auth from "../services/authServices";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Heart
          onClick={() => this.props.onLike(movie)}
          liked={movie.liked}
        ></Heart>
      ),
    },
  ];
  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger btn-sm m-2"
      >
        Delete
      </button>
    ),
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          data={movies}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </div>
    );
  }
}

export default MoviesTable;
