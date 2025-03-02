import { useContext } from "react";
import { QuizContext } from "../../context/quiz-context";
import "./Progress.css";

export const Progress = () => {
  const { index, questions, points, answer } = useContext(QuizContext);
  const progressValue = index + Number(answer !== null);

  return (
    <div className="quiz-progress">
      <progress value={progressValue} max={questions?.length}></progress>
      <div className="progress-info">
        <div>
          Question <span className="progress-current">{index + 1}</span> /{" "}
          {questions?.length}
        </div>
        <div>
          <span className="progress-current">{points}</span> /{" "}
          {questions?.length * 10}
        </div>
      </div>
    </div>
  );
};
