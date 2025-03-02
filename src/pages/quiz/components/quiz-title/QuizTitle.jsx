import "./QuizTitle.css";

export const QuizTitle = ({ title, className = "" }) => {
  return <h2 className={`quiz-title ${className}`}>{title}</h2>;
};
