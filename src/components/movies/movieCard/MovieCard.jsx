import { useState, useEffect } from "react";
import { useFavorites } from "../../../contexts/favorites-context";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../ui/icon/Icon";
import { defaultPoster } from "../../../utils/constants";
import "./MovieCard.css";

export const MovieCard = ({ movie = {}, inFavoritesPage = false }) => {
  const {
    Title: title,
    Year: year,
    imdbID: id,
    Type: type,
    Poster: poster,
  } = movie;

  const { favoriteMovies, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favoriteMovies.some((favorite) => favorite.imdbID === id));
  }, [favoriteMovies, id]);

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(movie);
    }
  };

  const handleCardClick = (event) => {
    event.stopPropagation();
    document.title = `Movie ${title} (${year}) watch online free in good HD`;
    navigate(
      `/movie-details?movieId=${id}&title=${encodeURIComponent(
        title
      )}&year=${year}`
    );
  };

  return (
    <div id={id} className="card-movie" onClick={handleCardClick}>
      <div>
        <div className="card-image waves-effect waves-block waves-light">
          <img
            className="activator"
            src={poster === "N/A" ? defaultPoster : poster}
            alt={title}
          />
        </div>
        <div className="card-content">
          <div className="card-content__year-type">
            {year} <span>{type}</span>
          </div>
          <span className="card-title activator grey-text text-darken-4">
            {title}
          </span>
        </div>
      </div>
      <div className="card-hover">
        <div className="card-hover__content" style={{ paddingRight: "3px" }}>
          {inFavoritesPage ? (
            <Icon
              className="fas fa-trash"
              onClick={handleFavoriteClick}
              size={22}
              color="#fff"
            />
          ) : (
            <Icon
              className={!isFavorite ? "far fa-bookmark" : "fas fa-bookmark"}
              onClick={handleFavoriteClick}
              size={25}
              color="#fff"
            />
          )}
        </div>
        <div className="card-hover__content">
          <Icon className="fas fa-share" size={25} />
        </div>
      </div>
    </div>
  );
};
