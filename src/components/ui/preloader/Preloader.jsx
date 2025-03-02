import { BlinkBlur } from "react-loading-indicators";
import "./Preloader.css";

function Preloader({
  size = "small",
  text = "loading",
  textColor = "#d9d7e0",
  color = "#26a69a",
}) {
  return (
    <div className="preloader">
      <BlinkBlur color={color} size={size} text={text} textColor={textColor} />
    </div>
  );
}
export { Preloader };
