import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/quiz-context";
import { Button } from "../../../../components/ui/button/Button";
import "./QuizFooter.css";

const getCorrectFormat = (sec) => {
  const mins = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${String(mins).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

export const QuizFooter = () => {
  const { dispatch, answer, index, secondsRemaining, questions } =
    useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (secondsRemaining > 0) {
      const id = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [dispatch, secondsRemaining]);

  const timer = getCorrectFormat(secondsRemaining);

  const handleFinishQuiz = () => {
    dispatch({ type: "FINISH" });
    navigate("/quiz/results");
  };

  const showFinishButton =
    secondsRemaining === 0 ||
    (answer !== null && index === questions.length - 1);

  return (
    <footer className="quiz-footer">
      <span className="quiz-footer__timer">{timer}</span>
      {answer !== null &&
        index < questions.length - 1 &&
        secondsRemaining > 0 && (
          <Button
            className="quiz-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next
          </Button>
        )}
      {showFinishButton && (
        <Button className="quiz-button" onClick={handleFinishQuiz}>
          Finish
        </Button>
      )}
    </footer>
  );
};
