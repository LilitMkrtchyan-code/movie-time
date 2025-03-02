import { useContext } from "react";
import { QuizContext } from "../../context/quiz-context";
import { Error } from "../../components/error/Error";
import { Progress } from "../../components/progress/Progress";
import { Question } from "../../components/question/Question";
import { QuizTitle } from "../../components/quiz-title/QuizTitle";
import { QuizFooter } from "../../components/quiz-footer/QuizFooter";
import "./QuizQuestions.css";

export const QuizQuestions = () => {
  const { status } = useContext(QuizContext);

  return (
    <div className="quiz-questions">
      <QuizTitle title="Quiz Questions" className="quiz-questions__title" />
      {status === "error" && <Error />}
      {status === "active" && (
        <>
          <Progress />
          <Question />
          <QuizFooter />
        </>
      )}
    </div>
  );
};
