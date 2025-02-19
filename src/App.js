import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/favorites-context";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { AboutMovie } from "./pages/about-movie/AboutMovie";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="/about-movie" element={<AboutMovie />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
