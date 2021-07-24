import React from "react";
import "./SingleContent.css";
import { img_300, unavailable } from "../../config/config";
import { Badge } from "@material-ui/core";
import ContentModal from "../contentModal/ContentModal";

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
    <ContentModal media_type={media_type} id={id}>
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
    </ContentModal>
  );
};

export default SingleContent;
