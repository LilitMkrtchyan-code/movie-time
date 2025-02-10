import { Fragment, useEffect } from "react";
import { CardMovie } from "../components/movies/cardMovie/CardMovie";
import { Storage } from "../utils/storage";

export const Favorites = () => {
  useEffect(() => {
    document.title = "Favorite Movies";
  }, []);

  const favoriteMovies = Storage.getItem("favoriteMovies") || [];

  return (
    <Fragment>
      <div className="movies">
        {favoriteMovies.map((movie) => (
          <CardMovie key={movie.imdbID} movie={movie} />
        ))}
      </div>
      {favoriteMovies.length === 0 && (
        <div className="movies__notfound">No favorite movies found.</div>
      )}
    </Fragment>
  );
};
