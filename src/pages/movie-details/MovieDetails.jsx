import { useEffect, useState } from "react";
import { useFavorites } from "../../contexts/favorites-context";
import { MovieDetailsList } from "./movieDetails-list/MovieDetailsList";
import { MovieActions } from "./movie-actions/MovieActions";
import { omdbApi } from "../../api/api-movie";
import { useLocation } from "react-router-dom";
import { Rating } from "../../components/ui/rating/Rating";
import { defaultPoster } from "../../utils/constants";
import "./MovieDetails.css";

export const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const { favoriteMovies, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(null);

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("movieId");

  useEffect(() => {
    if (!id) return;
    const fetchMovieDetails = async () => {
      try {
        const response = await omdbApi.fetchByID(id);
        if (response.success) {
          setMovie(response.data);
        } else {
          throw new Error(response.error);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    setIsFavorite(favoriteMovies.some((movie) => movie.imdbID === id));
  }, [favoriteMovies, id]);

  const handleToggleFavorite = () => {
    console.log("Before toggle:", isFavorite);
    if (isFavorite) {
      removeFavorite(movie.imdbID);
      setIsFavorite(false);
    } else {
      addFavorite(movie);
      setIsFavorite(true);
    }
    console.log("After toggle:", isFavorite);
  };

  return (
    <section className="about-movie">
      <div className="about-movie__header">
        <h3 className="about-movie__title">
          {movie.Title} ({movie.Year})
        </h3>
        <Rating rating={movie.imdbRating} label="IMDb RATING" />
      </div>
      <div className="about-movie__content">
        <div className="about-movie__poster">
          <img
            src={movie.Poster === "N/A" ? defaultPoster : movie.Poster}
            alt={movie.Title}
            className="about-movie__poster-img"
          />
        </div>
        <div className="about-movie__details">
          <MovieDetailsList movie={movie} />
          <MovieActions
            movie={movie}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </div>
    </section>
  );
};
