import React, { Component } from "react";

import { getMovies, deleteMovie } from "../services/movieService.js";

import Pagination from "../common/pagination";
import Paginate from "../utils/paginate";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox.jsx";

import { getGenres } from "../services/genreServies.js";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    activeGenre: "All Genres",
    sortColumn: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: "All Genres", _id: "nothing" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  handleDelete = async (id) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast("movie not found");
      }
      this.setState({ movies: originalMovies });
    }
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
  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1, activeGenre: null });
  };

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      movies: allmovies,
      activeGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let filterdMovies = undefined;
    if (searchQuery) {
      filterdMovies = allmovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filterdMovies =
        activeGenre === "All Genres"
          ? allmovies
          : allmovies.filter((g) => g.genre.name === activeGenre);
    }

    const sortedMovies = _.orderBy(
      filterdMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = Paginate(sortedMovies, pageSize, currentPage);
    return { totalCount: filterdMovies.length, data: movies };
  };

  render() {
    const { currentPage, pageSize, searchQuery } = this.state;
    const { length: numberofmoive } = this.state.movies;

    const { totalCount, data: movies } = this.getPageData();
    const { user } = this.props;
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
          {user && (
            <Link to="/movies/new">
              <button className="btn btn-primary">NewMovie</button>
            </Link>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
