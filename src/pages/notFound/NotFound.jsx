import notFound from "../../assets/images/not-found.png";
import "./NotFound.css";

export const NotFound = () => {
  return (
    <div className="not-found-page">
      <img
        src={notFound}
        alt="Page not found"
        className="not-found-page__image"
      />
      <div className="not-found-page__content">
        <h1 className="not-found-page__title">404 - Page Not Found</h1>
        <p className="not-found-page__description">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
};
