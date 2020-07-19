import React from "react";
const MoviesFrom = ({ match, history }) => {
  return (
    <div>
      <h1>Movies from {match.params.id}</h1>
      <button
        onClick={() => history.push("/movies")}
        className="btn btn-primary"
      >
        Save
      </button>
    </div>
  );
};

export default MoviesFrom;
