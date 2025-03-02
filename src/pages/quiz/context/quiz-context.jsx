import { createContext, useReducer } from "react";

const QuizContext = createContext();

const initialStateQuiz = {
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  questions: [],
  maxPossiblePoints: 0,
  secondsRemaining: null,
};

const reducerQuiz = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30,
      };
    case "DATA_RECEIVED":
      return {
        ...state,
        status: "ready",
        questions: action.payload,
        maxPossiblePoints: action.payload.reduce(
          (prev, cur) => prev + cur.points,
          0
        ),
      };
    case "DATA_FAILED":
      return {
        ...state,
        status: "error",
      };
    case "NEW_ANSWER":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "TICK":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "FINISH":
      return {
        ...state,
        status: "finished",
      };
    case "RESTART":
      return {
        ...initialStateQuiz,
      };
    default:
      return state;
  }
};

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerQuiz, initialStateQuiz);
  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
