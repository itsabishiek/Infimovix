import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./Watchlist.css";
import WatchlistCard from "../../components/watchlistCard/WatchlistCard";
import { useHistory } from "react-router";

const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);

  const history = useHistory();

  return (
    <div>
      <span className="pageTitle">My Watchlist</span>

      {watchlist.length > 0 ? (
        <div className="watchlist_wrapper">
          {watchlist.map((movie) => (
            <WatchlistCard
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name}
              poster={movie.poster_path}
              media_type={movie.media_typ}
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

export default Watchlist;
