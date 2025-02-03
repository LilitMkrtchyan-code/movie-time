import "./Header.css";

export const Header = () => {
  return (
    <header className="header-section">
      <div className="header-section__content">
        <div className="header-section__logo">
          <a
            href="https://lilitmkrtchyan-code.github.io/Ice-Cream-Menu/"
            className="logo-link"
          >
            Movie <span className="highlight">Time</span>
          </a>
        </div>
        {/* <div className="header-section__nav">nav</div> */}
      </div>
    </header>
  );
};
