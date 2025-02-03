import { CardMovie } from "./cardMovie/CardMovie";
import "./Movies.css";

export const Movies = (props) => {
  const { movies} = props;
  
  return (
    <div className="movies">
      {movies && movies.length > 0 ? (
        movies.map((movie) => <CardMovie key={movie.imdbID} {...movie} />)
      ) : (
        <h3 className="movies__notfound">Nothing found!</h3>
      )}
    </div>
  );
};
