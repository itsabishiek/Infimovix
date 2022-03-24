import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { requests } from "../../config/config";
import "./Banner.css";

const Banner = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchBanner);
      setBanner(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    };
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  // console.log(banner);

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${banner?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_img">
        <Link to={`/${banner?.media_type}/${banner?.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${banner?.poster_path}`}
            alt={banner?.title}
          />
        </Link>
      </div>

      <div className="banner_contents">
        <div>
          <h1 className="banner_title">
            {banner?.title || banner?.name || banner?.original_name}
          </h1>

          <h1 className="banner_description">
            {truncate(banner?.overview, 250)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
