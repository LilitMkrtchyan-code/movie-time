import { useContext } from "react";
import { QuizContext } from "../../context/quiz-context";
import { Preloader } from "../../../../components/ui/preloader/Preloader";
import { Options } from "./options/Options";
import "./Question.css";

export const Question = () => {
  const { questions, index } = useContext(QuizContext);
  const currentQuestion = questions[index];

  return (
    <div>
      <h4 className="question">{currentQuestion.question}</h4>
      <Options question={currentQuestion} />
    </div>
  );
};
