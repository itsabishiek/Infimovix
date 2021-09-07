import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import FavouriteCard from "../../components/favouriteCard/FavouriteCard";
import { useHistory } from "react-router";

const Liked = () => {
  const { liked } = useContext(GlobalContext);

  const history = useHistory();

  return (
    <div>
      <span className="pageTitle">My Favourite Movies</span>

      {liked.length > 0 ? (
        <div className="watchlist_wrapper">
          {liked.map((movie) => (
            <FavouriteCard
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name}
              poster={movie.poster_path}
              media_type={movie.media_type}
            />
          ))}
        </div>
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
