import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { Button } from "../../components/ui/button/Button";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    document.title = "Movie Time";
  }, []);

  const handleLogoClick = () => {
    document.title = "Movie Time";
  };

  const handleProtect = (event, path) => {
    if (!isAuthenticated) {
      event.preventDefault();
      navigate("/login", { state: { from: path } });
    }
  };

  const handleLogOutClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
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
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/favorites"
                onClick={(event) => handleProtect(event, "/favorites")}
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
                onClick={(event) => handleProtect(event, "/quiz")}
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
            onClick={
              isAuthenticated ? handleLogOutClick : () => navigate("login")
            }
          >
            <i
              className={`fa ${
                isAuthenticated ? "fa-sign-out-alt" : "fa-user"
              }`}
            ></i>
            <span className="login-text">
              {isAuthenticated ? "Log out" : "Log In"}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};
