import { useState } from "react";
import "./SearchMovie.css";

export const SearchMovie = ({ searchMovies }) => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  function handleKey(event) {
    if (event.key === "Enter") {
      searchMovies(search, type);
    }
  }

  function handleFilter(event) {
    setType(event.target.dataset.type);
    searchMovies(search, event.target.dataset.type);
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
          <label>
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
          <label>
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
          <label>
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
