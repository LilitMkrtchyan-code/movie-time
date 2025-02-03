import { useEffect, useState } from "react";
import { Preloader } from "../ui/preloader/Preloader";
import { SearchMovie } from "../movies/searchMovie/SearchMovie";
import { Movies } from "../movies/Movies";
import "./Main.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

export const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(`${URL}avatar`);
        const data = await response.json();

        if (response.status !== 200) {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  const searchMovies = async (str, type = "all") => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
          type !== "all" ? `&type=${type}` : ""
        }`
      );
      const data = await response.json();

      if (response.status !== 200) {
        throw new Error(data.Error);
      }
      setMovies(data.Search);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main">
      <SearchMovie searchMovies={searchMovies} />
      {loading ? <Preloader /> : <Movies movies={movies} />}
    </main>
  );
};
