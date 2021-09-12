import React from "react";
import { Link } from "react-router-dom";

const Linking = ({ children, media_type, id }) => {
  return (
    <>
      {media_type === "tv" ? (
        <Link to={`/tv/${id}`} className="media">
          {children}
        </Link>
      ) : (
        <Link to={`/movie/${id}`} className="media">
          {children}
        </Link>
      )}
    </>
  );
};

export default Linking;
