import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/quiz-context";
import { QuizTitle } from "../../components/quiz-title/QuizTitle";
import { Button } from "../../../../components/ui/button/Button";
import "./QuizResults.css";

export const QuizResults = () => {
  const { points, maxPossiblePoints, dispatch, status } =
    useContext(QuizContext);
  const navigate = useNavigate();
  const percentage = Math.round((points / maxPossiblePoints) * 100);

  let congrats;
  if (percentage === 100) congrats = "Perfect!";
  if (percentage >= 80 && percentage < 100) congrats = "Excellent!";
  if (percentage >= 50 && percentage < 80) congrats = "Good!";
  if (percentage >= 0 && percentage < 50) congrats = "Bad luck!";

  const handleResetClick = () => {
    dispatch({ type: "RESTART" });
    navigate("/quiz");
  };

  return (
    <div className="quiz-results">
      <QuizTitle title="Quiz Results" className="quiz-results__title" />
      <div className="quiz-results__text">
        {congrats} You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({percentage}%)
      </div>
      <Button className="quiz-button" onClick={handleResetClick}>
        Reset
      </Button>
    </div>
  );
};
