import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { img_300 } from "../../config/config";
import { db } from "../../firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";

const WatchlistMovieCard = ({
  id,
  poster,
  media_type,
  title,
  user,
  watchlist,
  setAlert,
}) => {
  const removeMovieFromWatchlist = async () => {
    const userRef = doc(db, "watchlist", user?.uid);

    try {
      await setDoc(
        userRef,
        {
          multimedia: watchlist?.filter((item) => item?.id !== id),
        },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${title} removed from the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      {!media_type && (
        <div className="watchlist_container">
          <Link to={`/movie/${id}`}>
            <LazyLoadImage
              className="watchlist_img"
              src={`${img_300}${poster}`}
              alt={title}
              effect="blur"
            />
          </Link>

          <button className="ctrl-btn" onClick={removeMovieFromWatchlist}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default WatchlistMovieCard;
