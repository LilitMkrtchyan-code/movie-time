import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button/Button";
import "./Header.css";
import { useEffect } from "react";

export const Header = () => {
  useEffect(() => {
    document.title = "Movie Time";
  }, []);

  const handleLogoClick = () => {
    document.title = "Movie Time";
  };

  return (
    <header className="header-section">
      <div className="header-section__content">
        <div className="header-section__logo">
          <Link to="/" className="logo-link" onClick={handleLogoClick}>
            Movie <span className="highlight">Time</span>
          </Link>
        </div>
        <div className="header-section__nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/favorites" className="nav-link">
                Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/quiz" className="nav-link">
                Quiz
              </Link>
            </li>
          </ul>
          {/* <Button className="header-section__login">
            <i className="far fa-user"></i>
            <span className="login-text"> Log In</span>
          </Button> */}
        </div>
      </div>
    </header>
  );
};
