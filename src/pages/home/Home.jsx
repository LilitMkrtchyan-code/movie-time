import { Fragment, useEffect, useState } from "react";
import { omdbApi } from "../../api/api-movie";
import { Preloader } from "../../components/ui/preloader/Preloader";
import { SearchMovie } from "../../components/movies/searchMovie/SearchMovie";
import { MovieList } from "../../components/movies/movieList/MovieList";
import { Pagination } from "../../components/ui/pagination/Pagination";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("secret");
  const [typeMovie, setTypeMovie] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (query, page = 1, type = "all") => {
    setLoading(true);
    setError("");
    try {
      const response = await omdbApi.fetchMoviesBySearch(query, page, type);

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

  useEffect(() => {
    fetchMovies(searchQuery, currentPage, typeMovie);
  }, [currentPage, searchQuery, typeMovie]);

  const searchMovies = (query, type = "all") => {
    setSearchQuery(query);
    setTypeMovie(type);
    setCurrentPage(1);
  };

  return (
    <Fragment>
      <SearchMovie searchQuery={searchQuery} searchMovies={searchMovies} />
      {loading ? (
        <Preloader size="medium" text="loading..." />
      ) : (
        <MovieList movies={movies} error={error} />
      )}
      {movies.length > 0 && !error && !loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </Fragment>
  );
};
