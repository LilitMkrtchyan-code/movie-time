import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiQuiz } from "../../../../api/api-quiz";
import { QuizContext } from "../../context/quiz-context";
import { Preloader } from "../../../../components/ui/preloader/Preloader";
import { QuizTitle } from "../../components/quiz-title/QuizTitle";
import { Button } from "../../../../components/ui/button/Button";
import "./QuizStart.css";

export const QuizStart = () => {
  const { questions, dispatch, status } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const result = await apiQuiz.getQuestions();
        if (result.success) {
          dispatch({ type: "DATA_RECEIVED", payload: result.data });
        } else {
          dispatch({ type: "DATA_FAILED", payload: result.error });
        }
      } catch (error) {
        dispatch({ type: "DATA_FAILED", payload: error.message });
      }
    };
    fetchQuestions();
  }, [dispatch]);

  useEffect(() => {
    document.title = "Start Movie Quiz";
  }, []);

  const handleStartQuiz = () => {
    dispatch({ type: "START" });
    navigate("questions");
  };

  return (
    <div className="quiz-start">
      {status === "loading" ? (
        <Preloader />
      ) : (
        <>
          <QuizTitle title="Welcome to Movie Quiz!" />
          <h3 className="quiz-start__subtitle">
            {questions?.length} questions to test your knowledge of movies
          </h3>
          <Button className="quiz-start__btn" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </>
      )}
    </div>
  );
};
