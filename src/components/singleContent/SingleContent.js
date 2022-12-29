import React from "react";
import "./SingleContent.css";
import { img_300, unavailable } from "../../config/config";
import Linking from "../../helpers/Linking";
import Badge from "@mui/material/Badge";
import { Skeleton } from "@mui/material";

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  loading,
}) => {
  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <Linking id={id} media_type={media_type}>
      {!loading && (
        <Badge
          className="badge"
          badgeContent={vote_average === "0.0" ? "-.-" : vote_average}
          color={vote_average > 6 ? "primary" : "secondary"}
          style={{ position: "absolute" }}
        />
      )}
      {loading ? (
        <Skeleton
          style={{ borderRadius: 15, marginRight: 20 }}
          variant="rectangular"
          width={200}
          height={280}
        />
      ) : (
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
      )}
      {loading ? (
        <Skeleton
          variant="text"
          style={{
            borderRadius: 2,
            margin: "0px 5px",
          }}
        />
      ) : (
        <b className="title">{truncate(title, 14)}</b>
      )}
      <span className="subTitle">
        {loading ? (
          <Skeleton
            variant="text"
            style={{
              borderRadius: 2,
              margin: "0px 5px",
            }}
            width={40}
          />
        ) : (
          <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
        )}
        {loading ? (
          <Skeleton
            variant="text"
            style={{
              borderRadius: 2,
              margin: "0px 5px",
            }}
            width={60}
          />
        ) : (
          <span className="subTitle">{date}</span>
        )}
      </span>
    </Linking>
  );
};

export default SingleContent;
