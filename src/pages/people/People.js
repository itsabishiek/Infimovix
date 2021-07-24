import axios from "axios";
import React, { useEffect, useState } from "react";
import { unavailable } from "../../config/config";
import "./People.css";

const People = () => {
  const [persons, setPersons] = useState([]);

  const fetchPersons = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}`
      );

      const modifiedData = data["results"].map((p) => ({
        id: p["id"],
        popularity: p["popularity"],
        name: p["name"],
        profileImg: "https://image.tmdb.org/t/p/w200" + p["profile_path"],
        known: p["known_for_department"],
      }));

      return modifiedData;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setPersons(await fetchPersons());
    };

    fetchAPI();
  }, []);

  const trendingPersons = persons.map((p, i) => {
    return (
      <div key={i} className="persons_container">
        <img
          className="persons_img"
          src={p.profileImg ? p.profileImg : unavailable}
          alt={p.name}
        />
        <p style={{ color: "rgb(63, 81, 181)", textAlign: "center" }}>
          {p.name}
        </p>
        <p style={{ color: "#5a606b", textAlign: "center" }}>{p.known}</p>
      </div>
    );
  });

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#dde0fd", marginTop: 25 }}>
        TRENDING PERSONS ON THIS WEEK
      </h2>
      <div className="trending_persons">{trendingPersons}</div>
    </div>
  );
};

export default People;
