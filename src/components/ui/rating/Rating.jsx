import "./Rating.css";

export const Rating = ({ rating }) => {
  return (
    <div className="rating">
      <div className="rating-content__label">IMDB Rating</div>
      <div className="rating-content">
        <div className="rating-content__wrapper">
          <div className="rating-content__value">{rating === "N/A" ? 5 : rating}</div>
        </div>
      </div>
    </div>
  );
};
