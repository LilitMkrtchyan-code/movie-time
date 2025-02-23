import { useEffect } from "react";
import { useFavorites } from "../../contexts/favorites-context";
import { MovieCard } from "../../components/movies/movieCard/MovieCard";
import "./Favorites.css";

export const Favorites = () => {
  const { favoriteMovies } = useFavorites();

  useEffect(() => {
    document.title = "Favorite Movies";
  }, []);

  return (
    <div className="favorite-movies">
      {favoriteMovies.length > 0 && (
        <h1 className="favorite-movies__title">Your favorite movies</h1>
      )}
      <div className="movies">
        {favoriteMovies.length > 0 &&
          favoriteMovies.map((favoriteMovie) => (
            <MovieCard
              key={favoriteMovie.imdbID}
              movie={favoriteMovie}
              inFavoritesPage={true}
            />
          ))}
      </div>
      {favoriteMovies.length === 0 && (
        <div className="movies__notfound">No favorite movies found.</div>
      )}
    </div>
  );
};
