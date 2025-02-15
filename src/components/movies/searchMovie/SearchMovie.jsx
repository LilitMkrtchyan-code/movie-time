import { useState, useRef, useEffect } from "react";
import "./SearchMovie.css";

export const SearchMovie = ({ searchQuery, searchMovies }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  function handleKey(event) {
    if (event.key === "Enter") {
      searchMovies(search, type);
    }
  }

  function handleFilter(event) {
    const newType = event.target.dataset.type;
    setType(newType);
    if (search === "") {
      searchMovies(searchQuery, newType);
    } else {
      searchMovies(search, newType);
    }
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  function handleSearchSubmit() {
    searchMovies(search, type);
  }

  return (
    <div className="row search-movie">
      <div className="col s12">
        <div className="input-field">
          <input
            ref={searchInputRef}
            className="validate"
            value={search}
            type="search"
            placeholder="Search..."
            onChange={handleSearchChange}
            onKeyDown={handleKey}
          />
          <button className="btn search-btn" onClick={handleSearchSubmit}>
            Search
          </button>
        </div>
        <div>
          <label className="search-movie__label">
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="all"
              onChange={handleFilter}
              checked={type === "all"}
            />
            <span>All</span>
          </label>
          <label className="search-movie__label">
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="movie"
              onChange={handleFilter}
              checked={type === "movie"}
            />
            <span>Movies</span>
          </label>
          <label className="search-movie__label">
            <input
              className="with-gap"
              name="type"
              type="radio"
              data-type="series"
              onChange={handleFilter}
              checked={type === "series"}
            />
            <span>Series</span>
          </label>
        </div>
      </div>
    </div>
  );
};
