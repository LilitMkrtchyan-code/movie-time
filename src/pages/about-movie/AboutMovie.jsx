import { useEffect, useState } from "react";
import { omdbApi } from "../../api/api-movie";
import { useLocation } from "react-router-dom";
import { Rating } from "../../components/ui/rating/Rating";
import "./AboutMovie.css";

export const AboutMovie = () => {
  const [movie, setMovie] = useState({});
  const location = useLocation();
  // {pathname: '/movie-details', search: '?movieId=tt9018736&title=Avatar%3A%20The%20Last%20Airbender&year=2024%E2%80%93', hash: '', state: null, key: '328qk3ha'}

  const urlParams = new URLSearchParams(location.search);

  const title = urlParams.get("title");
  const year = urlParams.get("year");
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

  return (
    <section className="about-movie">
      <div className="about-movie__header">
        <div>
          <h3 className="about-movie__title">{movie.Title}</h3>
        </div>
        <Rating rating={movie.imdbRating} />
      </div>
      <div className="about-movie__content">
        <div className="about-movie__poster">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="about-movie__poster-img"
          />
        </div>
        <div className="about-movie__details">
          <ul>
            <li>
              <span></span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
// https://www.omdbapi.com/?i=tt10872600&apikey=ea4822c1
