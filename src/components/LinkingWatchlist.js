import React from "react";
import { Link } from "react-router-dom";

const LinkingWatchlist = ({ children, media_type, id }) => {
  return (
    <>
      {media_type === "movie" ? (
        <Link to={`/movie/${id}`} className="watchlist_container">
          {children}
        </Link>
      ) : (
        <Link to={`/tv/${id}`} className="watchlist_container">
          {children}
        </Link>
      )}
    </>
  );
};

export default LinkingWatchlist;
