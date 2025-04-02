import { useEffect, useMemo, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFavorites } from "../../contexts/favorites-context";
import { omdbApi } from "../../api/api-movie";
import { MovieDetailsList } from "./movieDetails-list/MovieDetailsList";
import { MovieActions } from "./movie-actions/MovieActions";
import { Preloader } from "../../components/ui/preloader/Preloader";
import { Rating } from "../../components/ui/rating/Rating";
import { defaultPoster } from "../../utils/constants";
import "./MovieDetails.css";

export const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { favoriteMovies, addFavorite, removeFavorite } = useFavorites();

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("movieId");

  const isFavorite = useMemo(
    () => favoriteMovies.some((favorite) => favorite.imdbID === id),
    [favoriteMovies, id]
  );

  const handleToggleFavorite = useCallback(() => {
    isFavorite ? removeFavorite(id) : addFavorite(movie);
  }, [isFavorite, movie, id, addFavorite, removeFavorite]);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await omdbApi.fetchByID(id);
        if (response.success) {
          setMovie(response.data);
        } else {
          throw new Error(response.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <Preloader size="small" />;
  }

  const { Title, Year, imdbRating, Poster } = movie;

  return (
    <section className="about-movie">
      <div className="about-movie__header">
        <h3 className="about-movie__title">
          {Title} ({Year})
        </h3>
        <Rating rating={imdbRating} label="IMDb RATING" />
      </div>
      <div className="about-movie__content">
        <div className="about-movie__poster">
          <img
            src={Poster === "N/A" ? defaultPoster : Poster}
            alt={Title}
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
