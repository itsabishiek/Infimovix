import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { unavailable } from "../../config/config";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./People.css";

const People = () => {
  const [persons, setPersons] = useState([]);

  const fetchPersons = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}`
      );

      // console.log(data);

      setPersons(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPersons();
    // eslint-disable-next-line
  }, []);

  const trendingPersons = persons.map((p, i) => {
    return (
      <div key={i} className="persons_container">
        <Link to={`/person/${p.id}`}>
          <LazyLoadImage
            className="persons_img"
            src={
              p.profile_path
                ? `https://image.tmdb.org/t/p/w200${p.profile_path}`
                : unavailable
            }
            alt={p.name}
            effect="blur"
          />
          <p
            style={{
              color: "rgb(63, 81, 181)",
              textAlign: "center",
              marginBottom: 0,
            }}
          >
            {p.name}
          </p>
          <p style={{ color: "#5a606b", textAlign: "center", marginTop: 5 }}>
            {p.known_for_department}
          </p>
        </Link>
      </div>
    );
  });

  // console.log(persons);

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          color: "var(--primary-color)",
          margin: "25px 0",
        }}
      >
        TRENDING PERSONS ON THIS WEEK
      </h2>

      <div className="trending_persons">{trendingPersons}</div>
    </div>
  );
};

export default People;
