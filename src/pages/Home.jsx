import { Fragment, useEffect, useState } from "react";
import { omdbApi } from "../api/api-movie";
import { Preloader } from "../components/ui/preloader/Preloader";
import { SearchMovie } from "../components/movies/searchMovie/SearchMovie";
import { Movies } from "../components/movies/Movies";
import { Pagination } from "../components/ui/pagination/Pagination";

// const API_KEY = process.env.REACT_APP_API_KEY;
// const URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await omdbApi.fetchMoviesBySearch(
          "avatar",
          currentPage
        );

        if (response.success) {
          setMovies(response.data.Search || []);
          setTotalPages(Math.ceil(response.data.totalResults / 10));
        } else {
          throw new Error(response.error);
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [currentPage]);

  const searchMovies = async (query, type = "all") => {
    setLoading(true);
    setError("");
    try {
      const response = await omdbApi.fetchMoviesBySearch(query, 1, type);

      if (response.success) {
        setMovies(response.data.Search || []);
        setTotalPages(Math.ceil(response.data.totalResults / 10));
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <SearchMovie searchMovies={searchMovies} />
      {loading ? (
        <Preloader />
      ) : (
        <Fragment>
          <Movies movies={movies} error={error} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Fragment>
      )}
    </Fragment>
  );
};
