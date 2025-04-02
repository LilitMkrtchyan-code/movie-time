import { Commet } from "react-loading-indicators";
import "./Preloader.css";

function Preloader({
  color = "#26a69a",
  size = "small",
  text = "",
  textColor = "",
}) {
  return (
    <div className="preloader">
      <Commet color={color} size={size} text={text} textColor={textColor} />
    </div>
  );
}
export { Preloader };
