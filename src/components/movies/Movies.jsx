import { Fragment } from "react";
import { CardMovie } from "./cardMovie/CardMovie";
import "./Movies.css";

export const Movies = ({ movies, error }) => {
  return (
    <Fragment>
      <div className="movies">
        {!error &&
          movies.length > 0 &&
          movies.map((movie) => <CardMovie key={movie.imdbID} movie={movie} />)}
      </div>
      {error && <h3 className="movies__notfound">Nothing found!</h3>}
    </Fragment>
  );
};
