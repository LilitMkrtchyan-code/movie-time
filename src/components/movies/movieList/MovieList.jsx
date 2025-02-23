import { Fragment } from "react";
import { MovieCard } from "../movieCard/MovieCard";
import "./MovieList.css";

export const MovieList = ({ movies, error }) => {
  return (
    <Fragment>
      <div className="movies">
        {!error &&
          movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>
      {error && <h3 className="movies__notfound">Nothing found!</h3>}
    </Fragment>
  );
};
