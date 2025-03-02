import { useContext } from "react";
import { QuizContext } from "../../../context/quiz-context";
import { Button } from "../../../../../components/ui/button/Button";
import "./Options.css";

export const Options = ({ question }) => {
  const { dispatch, answer } = useContext(QuizContext);
  const hasAnswered = answer !== null;

  const handleSelectOption = (index) => {
    dispatch({ type: "NEW_ANSWER", payload: index });
  };

  return (
    <div className="options">
      {question.options.map((option, index) => {
        const isCorrect = index === question.correctOption;
        const isSelected = index === answer;

        let className = "option-btn";
        if (hasAnswered) {
          if (isCorrect) {
            className += " correct";
          } else if (isSelected) {
            className += " wrong";
          } else {
            className += " disabled";
          }
        }

        return (
          <Button
            key={option}
            className={className}
            onClick={() => handleSelectOption(index)}
            disabled={hasAnswered}
          >
            {option}
          </Button>
        );
      })}
    </div>
  );
};
