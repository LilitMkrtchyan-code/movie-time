import { Link } from "react-router-dom";
import IMDbImg from "../../../assets/images/imdb.png";
import { Icon } from "../../../components/ui/icon/Icon";
import { Button } from "../../../components/ui/button/Button";
import "./MovieActions.css";

export const MovieActions = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <div className="about-movie__actions">
      <Link
        to={`https://www.imdb.com/title/${movie.imdbID}`}
        target="_blank"
        className="watch"
        rel="noopener noreferrer"
      >
        <Icon className="fas fa-play" size="17" color="#fff">
          <span className="action-link__text">Watch on </span>
        </Icon>
        <img className="IMDb-img" src={IMDbImg} alt="IMDb" />
      </Link>
      <Button
        type="button"
        className={`action-button bookmark ${isFavorite ? "favorite" : ""}`}
        onClick={onToggleFavorite}
      >
        <Icon
          className={isFavorite ? "fas fa-bookmark" : "far fa-bookmark"}
          size="17"
          color="#fff"
        />
      </Button>
      <Button type="button" className="action-button share">
        <Icon className="fas fa-share" size="17" color="#fff" />
      </Button>
    </div>
  );
};
