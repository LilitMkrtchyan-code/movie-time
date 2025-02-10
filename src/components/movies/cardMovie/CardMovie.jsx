import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "../../../utils/storage";
import { Icon } from "../../ui/icon/Icon";
import "./CardMovie.css";

export const CardMovie = ({ movie = {} }) => {
  const {
    Title: title,
    Year: year,
    imdbID: id,
    Type: type,
    Poster: poster,
  } = movie;

  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (event) => {
    event.stopPropagation();
    document.title = `Movie ${title} (${year}) watch online free in good HD`;
    navigate(
      `/about-movie?movieId=${id}&title=${encodeURIComponent(title)}&year=${year}`
    );
  };

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    const favorites = Storage.getItem("favoriteMovies") || [];
    const isAlreadyFavorite = favorites.some(
      (favorite) => favorite.imdbID === id
    );

    if (isAlreadyFavorite) {
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.imdbID !== id
      );
      Storage.setItem("favoriteMovies", updatedFavorites);
      console.log("The movie has been removed from favorites.");
      setIsFavorite(false);
    } else {
      favorites.push(movie);
      Storage.setItem("favoriteMovies", favorites);
      console.log("The film has been added to favorites");
      setIsFavorite(true);
    }
  };

  const cardIcons = [
    {
      id: "1",
      className: "fas fa-bookmark",
      onClick: handleFavoriteClick,
      size: 20,
      color: isFavorite ? "#2bbbad" : "#fff",
    },
    {
      id: "2",
      className: "fas fa-share favorite",
      size: 20,
      color: "#fff",
    },
    { id: "3", className: "far fa-star favorite", size: 20, color: "#fff" },
  ];

  const defaultPoster = `https://st2.depositphotos.com/1105977/9877/i/450/depositphotos_98775856-stock-photo-retro-film-production-accessories-still.jpg`;

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
        {cardIcons.map((carIcon) => (
          <div className="card-hover__content" key={carIcon.id}>
            <Icon
              className={carIcon.className}
              onClick={carIcon.onClick}
              size={carIcon.size}
              color={carIcon.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
