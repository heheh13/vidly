import React, { Component } from "react";

import { getMovies } from "../services/fakeMovieService.js";

import Pagination from "../common/pagination";
import Paginate from "../utils/paginate";
import ListGroup from "../common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    activeGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "nothing" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (id) => {
    const movies = this.state.movies.filter((m) => m._id != id);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ activeGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: allmovies,
      activeGenre,
      sortColumn,
    } = this.state;
    const filterdMovies =
      activeGenre === "All Genres"
        ? allmovies
        : allmovies.filter((g) => g.genre.name == activeGenre);

    const sortedMovies = _.orderBy(
      filterdMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = Paginate(sortedMovies, pageSize, currentPage);
    return { totalCount: filterdMovies.length, data: movies };
  };

  render() {
    const { currentPage, pageSize, movies: allmovies } = this.state;
    const { length: numberofmoive } = this.state.movies;

    if (numberofmoive == 0) return <h1>Nothing in the database</h1>;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            activeItem={this.state.activeGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col-8">
          <Link to="/movies/new">
            <button className="btn btn-primary">NewMovie</button>
          </Link>
          <h4>number of movies = {totalCount}</h4>
          <MoviesTable
            movies={movies}
            sortColumn={this.state.sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPagechange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
