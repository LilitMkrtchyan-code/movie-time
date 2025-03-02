import { useContext, useEffect } from "react";
import { QuizContext } from "./context/quiz-context";
import { Outlet } from "react-router-dom";
import { apiQuiz } from "../../api/api-quiz";
import "./Quiz.css";

export const Quiz = () => {
  const { dispatch } = useContext(QuizContext);

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

  return (
    <div className="quiz">
      <Outlet />
    </div>
  );
};
