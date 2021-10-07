import React from "react";
import "./SingleContent.css";
import { img_300, unavailable } from "../../config/config";
import Linking from "../../helpers/Linking";
import Badge from "@mui/material/Badge";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <Linking id={id} media_type={media_type}>
      <Badge
        className="badge"
        badgeContent={vote_average}
        color={vote_average > 6 ? "primary" : "secondary"}
        style={{ position: "absolute" }}
      />

      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{truncate(title, 14)}</b>
      <span className="subTitle">
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{date}</span>
      </span>
    </Linking>
  );
};

export default SingleContent;
