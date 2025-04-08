import { useContext, useEffect } from "react";
import { QuizContext } from "../../../../contexts/quiz-context";
import { Error } from "../../../../components/ui/error/Error";
import { Progress } from "../../components/progress/Progress";
import { Question } from "../../components/question/Question";
import { PageTitle } from "../../../../components/ui/page-title/PageTitle";
import { QuizFooter } from "../../components/quiz-footer/QuizFooter";
import "./QuizQuestions.css";

export const QuizQuestions = () => {
  const { status } = useContext(QuizContext);

  useEffect(() => {
    document.title = "Quiz Questions";
  }, []);

  return (
    <div className="quiz-questions">
      <PageTitle
        text="Quiz Questions"
        className="quiz-title quiz-questions__title"
      />
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
