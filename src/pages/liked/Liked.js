import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import FavouriteMovieCard from "../../components/favouriteCard/FavouriteMovieCard";
import { AppBar, Tab, Tabs } from "@mui/material";
import { useHistory } from "react-router";
import FavouriteTvCard from "../../components/favouriteCard/FavouriteTvCard";

const Liked = () => {
  const { liked } = useContext(GlobalContext);
  const [value, setValue] = React.useState(0);

  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <span className="pageTitle">My Favourite Movies</span>

      <AppBar
        position="static"
        style={{ borderRadius: 10, backgroundColor: "#000522d0" }}
      >
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <Tab label="Movies" />
          <Tab label="TV Series" />
        </Tabs>
      </AppBar>

      {liked.length > 0 ? (
        <>
          {value === 0 && (
            <div className="watchlist_wrapper">
              {liked.map((movie) => (
                <FavouriteMovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title || movie.name}
                  poster={movie.poster_path}
                  media_type={movie.seasons}
                />
              ))}
            </div>
          )}

          {value === 1 && (
            <div className="watchlist_wrapper">
              {liked.map((movie) => (
                <FavouriteTvCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title || movie.name}
                  poster={movie.poster_path}
                  media_type={movie.seasons}
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
