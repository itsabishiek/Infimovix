import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { img_300 } from "../../config/config";
import { Link } from "react-router-dom";

const WatchlistMovieCard = ({ id, poster, media_type, title }) => {
  const { removeMovieFromWatchlist } = useContext(GlobalContext);

  return (
    <>
      {!media_type && (
        <div className="watchlist_container">
          <Link to={`/movie/${id}`}>
            <img
              className="watchlist_img"
              src={`${img_300}${poster}`}
              alt={title}
            />
          </Link>

          <button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchlist(id)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default WatchlistMovieCard;
