import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { img_300 } from "../../config/config";
import { Link } from "react-router-dom";

const FavouriteMovieCard = ({ id, poster, title, media_type }) => {
  const { removeMovieFromFavourite } = useContext(GlobalContext);

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
            onClick={() => removeMovieFromFavourite(id)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default FavouriteMovieCard;
