import { useState, createContext, useContext, useEffect } from "react";
import { Storage } from "../utils/storage";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const storedFavorites = Storage.getItem("favoriteMovies") || [];
    setFavoriteMovies(storedFavorites);
  }, []);
 
  const addFavorite = (movie) => {
    const updatedFavorites = [...favoriteMovies, movie];
    Storage.setItem("favoriteMovies", updatedFavorites);
    setFavoriteMovies(updatedFavorites);
  };

  const removeFavorite = (movieId) => {
    const updatedFavorites = favoriteMovies.filter(
      (movie) => movie.imdbID !== movieId
    );
    Storage.setItem("favoriteMovies", updatedFavorites);
    setFavoriteMovies(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteMovies, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoritesContext);
};
