import "./CardMovie.css";

export const CardMovie = (props) => {
  const {
    Title: title,
    Year: year,
    imdbID: id,
    Type: type,
    Poster: poster,
  } = props;

  return (
    <div id={id} className="card-movie">
      <div className="card-image waves-effect waves-block waves-light">
        {poster === "N/A" ? (
          <img
            className="activator"
            src={`https://st2.depositphotos.com/1105977/9877/i/450/depositphotos_98775856-stock-photo-retro-film-production-accessories-still.jpg`}
          />
        ) : (
          <img className="activator" src={poster} />
        )}
      </div>
      <div className="card-content">
        <div>
          {year} <span>{type}</span>
        </div>
        <span className="card-title activator grey-text text-darken-4">
          {title}
        </span>
        <div>{/* <a href="#">This is a link</a> */}</div>
      </div>
    </div>
  );
};
