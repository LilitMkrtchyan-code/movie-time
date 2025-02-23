import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/favorites-context";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/home/Home";
import { Favorites } from "./pages/favorites/Favorites";
import { MovieDetails } from "./pages/movie-details/MovieDetails";
import { NotFound } from "./pages/notFound/NotFound";

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="movie-details" element={<MovieDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
