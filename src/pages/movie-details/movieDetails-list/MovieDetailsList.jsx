import { Flag } from "../../../components/ui/flag/Flag";
import "./MovieDetailsList.css";

export const MovieDetailsList = ({ movie }) => {
  return (
    <ul className="about-movie__details-list">
      <li className="about-movie__detail-item">
        <span>Year</span>
        {movie.Year}
      </li>
      <li className="about-movie__detail-item">
        <span>Country</span>
        {(movie?.Country || "").split(", ").map((country) => (
          <Flag key={country} country={country} />
        ))}
      </li>
      <li className="about-movie__detail-item">
        <span>Genre</span>
        {movie.Genre}
      </li>
      <li className="about-movie__detail-item">
        <span>Runtime</span>
        {movie.Runtime}
      </li>
      <li className="about-movie__detail-item">
        <span>Released</span>
        {movie.Released}
      </li>
      <li className="about-movie__detail-item">
        <span>Director</span>
        {movie.Director}
      </li>
      <li className="about-movie__detail-item">
        <span>Writer</span>
        {movie.Writer}
      </li>
      <li className="about-movie__detail-item">
        <span>Actors</span>
        {movie.Actors}
      </li>
      <li className="about-movie__detail-item">
        <span>Imdb Votes</span>
        {movie.imdbVotes}
      </li>
      <li className="about-movie__detail-item">
        <span>BoxOffice</span>
        {movie.BoxOffice}
      </li>
      <li className="about-movie__detail-item">
        <span>Awards</span>
        {movie.Awards}
      </li>
      <li className="about-movie__detail-item">{movie.Plot}</li>
    </ul>
  );
};
