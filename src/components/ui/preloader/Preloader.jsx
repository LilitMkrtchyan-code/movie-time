import { BlinkBlur } from "react-loading-indicators";
import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <BlinkBlur
        color="#26a69a"
        size="medium"
        text="loading..."
        textColor="#d9d7e0"
      />
    </div>
  );
}
export { Preloader };

