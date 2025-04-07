import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button/Button";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();

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
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Favorites
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/quiz"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Quiz
              </NavLink>
            </li>
          </ul>
          <Button
            className="header-section__login"
            onClick={() => navigate("login")}
          >
            <i className="far fa-user"></i>
            <span className="login-text"> Log In</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
