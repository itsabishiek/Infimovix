import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomPagination from "../../components/customPagination/CustomPagination";
import { unavailable } from "../../config/config";
import "./People.css";

const People = () => {
  const [persons, setPersons] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchPersons = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/person/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );

      // console.log(data);

      setPersons(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchPersons();
    // eslint-disable-next-line
  }, [page]);

  const trendingPersons = persons.map((p, i) => {
    return (
      <div key={i} className="persons_container">
        <Link to={`/person/${p.id}`}>
          <img
            className="persons_img"
            src={
              p.profile_path
                ? `https://image.tmdb.org/t/p/w200${p.profile_path}`
                : unavailable
            }
            alt={p.name}
          />
          <p style={{ color: "rgb(63, 81, 181)", textAlign: "center" }}>
            {p.name}
          </p>
          <p style={{ color: "#5a606b", textAlign: "center" }}>
            {p.known_for_department}
          </p>
        </Link>
      </div>
    );
  });

  // console.log(persons);

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#dde0fd", marginTop: 25 }}>
        TRENDING PERSONS ON THIS WEEK
      </h2>

      <div className="people-search">
        <input
          className="people-search-input"
          type="text"
          placeholder="Search peoples here..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="trending_persons">{trendingPersons}</div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default People;
