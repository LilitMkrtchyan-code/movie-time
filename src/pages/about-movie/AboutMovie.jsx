import { useEffect, useState } from "react";
import { useFavorites } from "../../contexts/favorites-context";
import { omdbApi } from "../../api/api-movie";
import { Link, useLocation } from "react-router-dom";
import { Rating } from "../../components/ui/rating/Rating";
import { Button } from "../../components/ui/button/Button";
import { Icon } from "../../components/ui/icon/Icon";
import { defaultPoster } from "../../utils/constants";
import "./AboutMovie.css";

export const AboutMovie = () => {
  const [movie, setMovie] = useState({});
  const { favoriteMovies, addFavorite, removeFavorite } = useFavorites();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const id = urlParams.get("movieId");

  useEffect(() => {
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

  const isMovieFavorite = favoriteMovies.some((movie) => movie.imdbID === id);

  const handleToggleFavorite = () => {
    if (isMovieFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <section className="about-movie">
      <div className="about-movie__header">
        <div>
          <h3 className="about-movie__title">{movie.Title}</h3>
        </div>
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
          <ul className="about-movie__details-list">
            <li className="about-movie__detail-item">
              <span>Year </span>
              {movie.Year}
            </li>
            <li className="about-movie__detail-item">
              <span>Country </span>
              {movie.Country}
            </li>
            <li className="about-movie__detail-item">
              <span>Runtime </span>
              {movie.Runtime}
            </li>
            <li className="about-movie__detail-item">
              <span>Genre </span>
              {movie.Genre}
            </li>
            <li className="about-movie__detail-item">
              <span>Released </span>
              {movie.Released}
            </li>
            <li className="about-movie__detail-item">
              <span>Director </span>
              {movie.Director}
            </li>
            <li className="about-movie__detail-item">
              <span>Writer </span>
              {movie.Writer}
            </li>
            <li className="about-movie__detail-item">
              <span>Actors </span>
              {movie.Actors}
            </li>
            <li className="about-movie__detail-item">
              <span>Imdb Votes</span>
              {movie.imdbVotes}
            </li>
            <li className="about-movie__detail-item">{movie.Plot}</li>
          </ul>
          <div className="about-movie__action-buttons">
            <Button type="button" className="action-button trailer">
              <Link
                to={`https://www.imdb.com/title/${movie.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="fas fa-play" size="17" color="#fff">
                  <span className="action-button__text">Watch on IMDb</span>
                </Icon>
              </Link>
            </Button>
            <Button
              type="button"
              className="action-button bookmark"
              onClick={handleToggleFavorite}
            >
              <Icon
                className={
                  isMovieFavorite
                    ? "fas fa-bookmark favorite"
                    : "far fa-bookmark favorite"
                }
                size="17"
                color="#fff"
              />
            </Button>
            <Button type="button" className="action-button share">
              <Icon className="fas fa-share" size="17" color="#fff" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
