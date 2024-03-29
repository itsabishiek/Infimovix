import { AppBar, Tab, Tabs } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import FavouriteMovieCard from "../../components/favouriteCard/FavouriteMovieCard";
import FavouriteTvCard from "../../components/favouriteCard/FavouriteTvCard";

const Liked = ({ favourites, user, setAlert }) => {
  const [value, setValue] = React.useState(0);

  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <span className="pageTitle" style={{ marginBottom: 18 }}>
        My Favourite Movies
      </span>

      <AppBar
        position="static"
        style={{
          borderRadius: 10,
          backgroundColor: "#000522d0",
          marginBottom: 40,
        }}
      >
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="Movies" />
          <Tab label="TV Series" />
        </Tabs>
      </AppBar>

      {favourites.length > 0 ? (
        <>
          {value === 0 && (
            <div className="watchlist_wrapper">
              {favourites.map((movie) => (
                <FavouriteMovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title || movie.name}
                  poster={movie.poster_path}
                  media_type={movie.seasons}
                  user={user}
                  favourites={favourites}
                  setAlert={setAlert}
                />
              ))}
            </div>
          )}

          {value === 1 && (
            <div className="watchlist_wrapper">
              {favourites.map((movie) => (
                <FavouriteTvCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title || movie.name}
                  poster={movie.poster_path}
                  media_type={movie.seasons}
                  user={user}
                  favourites={favourites}
                  setAlert={setAlert}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            height: "60vh",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#dde0fd",
            }}
          >
            No movies/tv-series in your list, add some!
          </h2>

          <button className="btn" onClick={() => history.push("/trending")}>
            Add some!
          </button>
        </div>
      )}
    </div>
  );
};

export default Liked;
