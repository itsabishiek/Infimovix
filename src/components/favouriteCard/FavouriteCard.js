import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { img_300 } from "../../config/config";

const WatchlistCard = ({ id, poster, media_type, title }) => {
  const { removeMovieFromFavourite } = useContext(GlobalContext);

  return (
    <div className="watchlist_container">
      <img className="watchlist_img" src={`${img_300}${poster}`} alt={title} />

      <button className="ctrl-btn" onClick={() => removeMovieFromFavourite(id)}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default WatchlistCard;
