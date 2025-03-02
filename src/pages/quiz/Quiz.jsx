import { Outlet } from "react-router-dom";
import "./Quiz.css";

export const Quiz = () => {
  return (
    <div className="quiz">
      <Outlet />
    </div>
  );
};
