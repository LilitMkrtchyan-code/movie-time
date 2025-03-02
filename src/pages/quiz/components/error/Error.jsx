import errorIcon from "../../../../assets/images/error-icon.png";
import "./Error.css";

export const Error = () => {
  return (
    <div className="error-container">
      <img src={errorIcon} alt="error icon" className="error-icon" />
      <span className="error-message">
        There was an error loading questions.
      </span>
    </div>
  );
};
