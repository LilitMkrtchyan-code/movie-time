import { CardMovie } from "./cardMovie/CardMovie";
import "./Movies.css";

export const Movies = ({ movies, error }) => {

  return (
    <div className="movies">
      {!error && movies.length > 0 ? (
        movies.map((movie) => <CardMovie key={movie.imdbID} movie={movie} />)
      ) : (
        <h3 className="movies__notfound">Nothing found!</h3>
      )}
    </div>
  );
};
