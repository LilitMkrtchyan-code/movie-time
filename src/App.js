import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/favorites-context";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/home/Home";
import { Favorites } from "./pages/favorites/Favorites";
import { Quiz } from "./pages/quiz/Quiz";
import { QuizProvider } from "./pages/quiz/context/quiz-context";
import { QuizStart } from "./pages/quiz/quiz-pages/quiz-start/QuizStart";
import { QuizQuestions } from "./pages/quiz/quiz-pages/quiz-questions/QuizQuestions";
import { QuizResults } from "./pages/quiz/quiz-pages/quiz-results/QuizResults";
import { MovieDetails } from "./pages/movie-details/MovieDetails";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { NotFound } from "./pages/notFound/NotFound";

function App() {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
          <Route
            path="quiz"
            element={
              <QuizProvider>
                <Quiz />
              </QuizProvider>
            }
          >
            <Route index element={<QuizStart />} />
            <Route path="questions" element={<QuizQuestions />} />
            <Route path="results" element={<QuizResults />} />
          </Route>
          <Route path="movie-details" element={<MovieDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
}

export default App;
