import errorIcon from "../../../assets/images/error-icon.png";
import "./Error.css";

export const Error = (errMessage) => {
  return (
    <div className="error-container">
      <img src={errorIcon} alt="error icon" className="error-icon" />
      <span className="error-message">
        {errMessage}
      </span>
    </div>
  );
};
