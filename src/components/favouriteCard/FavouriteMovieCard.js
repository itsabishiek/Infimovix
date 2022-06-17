import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { img_300 } from "../../config/config";
import { db } from "../../firebase";

const FavouriteMovieCard = ({
  id,
  poster,
  title,
  media_type,
  user,
  favourites,
  setAlert,
}) => {
  const removeMovieFromFavourites = async () => {
    const userRef = doc(db, "favourites", user?.uid);

    try {
      await setDoc(
        userRef,
        {
          multimedia: favourites?.filter((item) => item?.id !== id),
        },
        {
          merge: true,
        }
      );

      setAlert({
        open: true,
        message: `${title} removed from the Favourites!`,
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
            <img
              className="watchlist_img"
              src={`${img_300}${poster}`}
              alt={title}
            />
          </Link>

          <button className="ctrl-btn" onClick={removeMovieFromFavourites}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default FavouriteMovieCard;
