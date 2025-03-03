import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./header/Header";
import { PageTitle } from "../components/ui/page-title/PageTitle";
import { Footer } from "./footer/Footer";
import "./Layout.css";

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout-container">
      <Header />
      <main className="main">
        {location.pathname === "/" && (
          <PageTitle
            text="Welcome to Movie Time - your guide to the world of movies!"
            className="main-heading"
          />
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
