import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  fetchCombinedCredits,
  fetchPersonDetails,
  fetchPersonMovieCredits,
  fetchPersonTVCredits,
  img_200,
  img_500,
  unavailable,
} from "../../config/config";
import { AppBar, Tab, Tabs } from "@mui/material";

import "./PersonDetails.css";
import ControlledAccordions from "../../components/accordion/ControlledAccordions";

const PersonDetails = () => {
  const history = useHistory();
  const personId = history.location.pathname.slice(8);
  const [personDetails, setPersonDetails] = useState([]);
  const [personMovieCredits, setPersonMovieCredits] = useState([]);
  const [personTVCredits, setPersonTVCredits] = useState([]);
  const [personCombinedCredits, setPersonCombinedCredits] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      window.scroll(0, 0);
      setPersonDetails(await fetchPersonDetails(personId));
      setPersonMovieCredits(await fetchPersonMovieCredits(personId));
      setPersonTVCredits(await fetchPersonTVCredits(personId));
      setPersonCombinedCredits(await fetchCombinedCredits(personId));
    };

    fetchAPI();
  }, [personId]);

  // console.log(personDetails);
  // console.log(personMovieCredits);
  // console.log(personTVCredits);
  console.log(personCombinedCredits);

  return (
    <div className="person-details-container">
      <div className="person-details-sidebar">
        <img
          className="person-details-img"
          src={`${img_500}${personDetails.profile_path}`}
          alt=""
        />

        <div className="personal-info">
          <h2>Personal Info</h2>
          <div className="person-details-known-for">
            <h3>Known for</h3>
            <h5>{personDetails.known_for_department}</h5>
          </div>

          <div className="person-details-known-for">
            <h3>Popularity</h3>
            <h5>{personDetails.popularity}</h5>
          </div>

          <div className="person-details-known-for">
            <h3>Gender</h3>
            <h5>
              {personDetails.gender === 2
                ? "Male"
                : personDetails.gender === 1
                ? "Women"
                : "Other"}
            </h5>
          </div>

          <div className="person-details-known-for">
            <h3>Birthday</h3>
            <h5>{personDetails.birthday}</h5>
          </div>

          <div className="person-details-known-for">
            <h3>Place of Birth</h3>
            <h5>{personDetails.place_of_birth}</h5>
          </div>

          <div className="person-details-known">
            <h3>Also known as</h3>
            {personDetails?.also_known_as?.map((item, index) => (
              <h5 key={index}>{item && item}</h5>
            ))}
            {/* <h5 style={{ display: "inline-block" }}>
              {personDetails.also_known_as}
            </h5> */}
          </div>
        </div>
      </div>

      <div className="person-details-info">
        <h1>{personDetails.name}</h1>
        <h2>Biography</h2>
        <p>{personDetails.biography}</p>

        <AppBar
          position="static"
          style={{
            borderRadius: 10,
            backgroundColor: "#000522d0",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Tabs variant="fullWidth" value={value} onChange={handleChange}>
            <Tab label="Movies" />
            <Tab label="TV Series" />
            <Tab label="Department" />
          </Tabs>
        </AppBar>

        {value === 0 && (
          <div>
            {personMovieCredits?.cast?.map((item) => (
              <ControlledAccordions
                key={item.id}
                title={item?.title}
                release_date={item.release_date ? item?.release_date : "----"}
                poster={
                  item.poster_path
                    ? `${img_200}${item?.poster_path}`
                    : unavailable
                }
                overview={item?.overview}
                link={`/movie/${item.id}`}
              />
            ))}
          </div>
        )}

        {value === 1 && (
          <div>
            {personTVCredits?.cast?.map((item) => (
              <ControlledAccordions
                key={item.id}
                title={item?.name}
                release_date={
                  item.first_air_date ? item?.first_air_date : "----"
                }
                poster={
                  item.poster_path
                    ? `${img_200}${item?.poster_path}`
                    : unavailable
                }
                overview={item?.overview}
                link={`/movie/${item.id}`}
              />
            ))}
          </div>
        )}

        {value === 2 && (
          <div>
            <h2 style={{ marginBottom: 20, marginLeft: 5 }}>Movies</h2>
            <div>
              {personMovieCredits?.crew?.map((item) => (
                <ControlledAccordions
                  key={item.id}
                  title={item?.title}
                  release_date={item.release_date ? item?.release_date : "----"}
                  poster={
                    item.poster_path
                      ? `${img_200}${item?.poster_path}`
                      : unavailable
                  }
                  job={item?.job}
                  overview={item?.overview}
                  link={`/movie/${item.id}`}
                />
              ))}
            </div>

            <h2 style={{ marginBottom: 20, marginLeft: 5 }}>Tv Series</h2>

            <div>
              {personTVCredits?.crew?.map((item) => (
                <ControlledAccordions
                  key={item.id}
                  title={item?.name}
                  release_date={
                    item.first_air_date ? item?.first_air_date : "----"
                  }
                  poster={
                    item.poster_path
                      ? `${img_200}${item?.poster_path}`
                      : unavailable
                  }
                  job={item?.job}
                  overview={item?.overview}
                  link={`/movie/${item.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetails;
