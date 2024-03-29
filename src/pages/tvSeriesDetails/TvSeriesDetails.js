import {
  AddToQueue,
  FavoriteBorderOutlined,
  PlayArrow,
} from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import AppModal from "../../components/modal/AppModal";
import ShareMenu from "../../components/ShareMenu";
import {
  fetchSeriesCasts,
  fetchSeriesDetail,
  fetchSeriesImages,
  fetchSeriesPoster,
  fetchSeriesVideos,
  fetchSimilarSeries,
  img_1280,
  img_500,
  img_base,
  unavailable,
} from "../../config/config";
import { db } from "../../firebase";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./TvSeriesDetails.css";

const TvSeriesDetails = ({ user, watchlist, setAlert, favourites }) => {
  const params = useParams();

  let genres = [];
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [images, setImages] = useState([]);
  const [poster, setPoster] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);
  const [loadingFavourites, setLoadingFavourites] = useState(false);

  const notifyWatchlist = (msg) => {
    toast.dark(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const notifyFavourite = (msg) => {
    toast.dark(msg, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      setDetail(await fetchSeriesDetail(params.id));
      setVideo(await fetchSeriesVideos(params.id));
      setImages(await fetchSeriesImages(params.id));
      setPoster(await fetchSeriesPoster(params.id));
      setCasts(await fetchSeriesCasts(params.id));
      setSimilarSeries(await fetchSimilarSeries(params.id));
      setLoading(false);
      window.scroll(0, 0);
    };

    fetchAPI();
  }, [params.id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "70vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const addSeriesToWatchlist = async () => {
    const userRef = doc(db, "watchlist", user?.uid);

    try {
      setLoadingWatchlist(true);
      await setDoc(userRef, {
        multimedia: watchlist ? [...watchlist, detail] : [detail],
      });

      setLoadingWatchlist(false);

      setAlert({
        open: true,
        message: `${detail?.title || detail?.name} added to the Watchlist!`,
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

  const addMovieToFavourites = async () => {
    const userRef = doc(db, "favourites", user?.uid);

    try {
      setLoadingFavourites(true);
      await setDoc(userRef, {
        multimedia: favourites ? [...favourites, detail] : [detail],
      });

      setLoadingFavourites(false);

      setAlert({
        open: true,
        message: `${detail?.title || detail?.name} added to the Favourites!`,
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

  genres = detail?.genres;

  let genresList;
  if (genres) {
    genresList = genres?.map((g, i) => {
      return (
        <li key={i} className="genre_list">
          <button type="button" className="genre_btn">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const seriesImages = images?.map((img, index) => {
    return (
      <div key={index} className="img_posters">
        <LazyLoadImage
          src={img.file_path && `${img_base}${img.file_path}`}
          alt=""
          className="img_poster"
          effect="blur"
        />
      </div>
    );
  });

  const seriesPoster = poster?.map((poster, index) => {
    return (
      <div key={index}>
        <LazyLoadImage
          src={poster.file_path && `${img_base}${poster.file_path}`}
          alt=""
          style={{
            height: "260px",
            objectFit: "contain",
            marginRight: "15px",
            borderRadius: "10px",
          }}
          effect="blur"
        />
      </div>
    );
  });

  const castList = casts?.map((cast, index) => {
    return (
      <div key={index} className="cast_posters">
        <Link to={`/person/${cast.id}`}>
          <LazyLoadImage
            className="cast_poster"
            style={{
              height: "260px",
              objectFit: "contain",
            }}
            src={
              cast.profile_path ? `${img_500}${cast.profile_path}` : unavailable
            }
            alt={cast.name}
            effect="blur"
          />
        </Link>

        <p style={{ color: "#dde0fd" }}>{cast.name}</p>
        <p style={{ color: "rgb(63, 81, 181)" }}>{cast.character}</p>
      </div>
    );
  });

  const similarSeriesList = similarSeries?.map((item, index) => {
    return (
      <div key={index}>
        <div className="cast_posters">
          <Link to={`/tv/${item.id}`}>
            <LazyLoadImage
              className="cast_poster"
              src={item.poster}
              style={{
                height: "260px",
                objectFit: "contain",
              }}
              alt={item.title || item.name}
              effect="blur"
            />
            <p style={{ color: "rgb(63, 81, 181)", textAlign: "center" }}>
              {item.title}
            </p>
          </Link>
        </div>
      </div>
    );
  });

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <>
      <Wrapper backdrop={detail.backdrop_path && detail.backdrop_path}>
        <Content>
          <Image
            src={
              detail.poster_path
                ? `${img_500}${detail.poster_path}`
                : unavailable
            }
            alt={detail.title || detail.name}
          />
          <Text>
            <h1 style={{ margin: 0, color: "rgb(63, 81, 181)" }}>
              {detail.title || detail.name}
            </h1>
            <h3 style={{ marginBottom: 15, fontSize: 18, fontStyle: "italic" }}>
              {detail.tagline}
            </h3>
            <h3 style={{ color: "rgb(63, 81, 181)" }}>PLOT</h3>
            <p>{detail.overview}</p>

            <div className="rating-directors">
              <div>
                <h3 style={{ color: "rgb(63, 81, 181)" }}>RATING</h3>
                <div className="score">
                  {parseFloat(detail.vote_average).toFixed(1)}
                </div>
              </div>

              <div className="director">
                <h3 style={{ color: "rgb(63, 81, 181)" }}>DIRECTOR(S)</h3>
                {detail.created_by &&
                  detail.created_by.map((director) => (
                    <p key={director.credit_id} style={{ fontWeight: "bold" }}>
                      {director.name}
                    </p>
                  ))}
              </div>
            </div>

            <div className="list-container">
              <div className="watchlist">
                <h3 style={{ color: "rgb(63, 81, 181)" }}>WATCHLIST</h3>
                {user ? (
                  <IconButton
                    style={{
                      backgroundColor: "var(--primary-color)",
                      margin: "10px 5px",
                    }}
                  >
                    {!loadingWatchlist ? (
                      <AddToQueue onClick={addSeriesToWatchlist} />
                    ) : (
                      <CircularProgress size={20} color="inherit" />
                    )}
                  </IconButton>
                ) : (
                  <IconButton
                    style={{
                      backgroundColor: "var(--primary-color)",
                      margin: "10px 5px",
                    }}
                  >
                    <AddToQueue
                      onClick={() => {
                        notifyWatchlist(
                          "You need to logged in to add to watchlist."
                        );
                      }}
                    />
                  </IconButton>
                )}
              </div>

              <div className="like">
                <h3 style={{ color: "rgb(63, 81, 181)" }}>FAVOURITE</h3>
                {user ? (
                  <IconButton
                    style={{
                      backgroundColor: "var(--primary-color)",
                      margin: "10px 5px",
                    }}
                  >
                    {!loadingFavourites ? (
                      <FavoriteBorderOutlined onClick={addMovieToFavourites} />
                    ) : (
                      <CircularProgress size={20} color="inherit" />
                    )}
                  </IconButton>
                ) : (
                  <IconButton
                    style={{
                      backgroundColor: "var(--primary-color)",
                      margin: "10px 5px",
                    }}
                  >
                    <FavoriteBorderOutlined
                      onClick={() => {
                        notifyFavourite(
                          "You need to logged in to add to favorites."
                        );
                      }}
                    />
                  </IconButton>
                )}
              </div>
            </div>

            <div className="list-container">
              <div className="trailer">
                <h3 style={{ color: "rgb(63, 81, 181)" }}>WATCH TRAILER</h3>
                <AppModal video={video}>
                  <IconButton
                    style={{
                      backgroundColor: "var(--primary-color)",
                      margin: "10px 5px",
                    }}
                  >
                    <PlayArrow />
                  </IconButton>
                </AppModal>
              </div>

              <div className="share">
                <h3 style={{ color: "rgb(63, 81, 181)" }}>SHARE</h3>
                <ShareMenu />
              </div>
            </div>
          </Text>
        </Content>
      </Wrapper>

      <WrapperBar>
        <ContentBar>
          <div className="column">
            <p>
              Total Seasons:{" "}
              {detail.number_of_seasons === 0
                ? "Unavailable"
                : detail.number_of_seasons}
            </p>
          </div>
          <div className="column">
            <p>
              Total Episodes:{" "}
              {detail.number_of_episodes === 0
                ? "Unavailable"
                : detail.number_of_episodes}
            </p>
          </div>
          <div className="column">
            <p>Status: {detail.status}</p>
          </div>
        </ContentBar>
      </WrapperBar>

      <MediaQuery minWidth={768}>
        <WrapperBar>
          <ContentBar>
            <div className="column">
              <p>Release Date: {detail.first_air_date}</p>
            </div>
            <div className="column">
              <a href={detail.homepage} style={{ color: "#fff" }}>
                {detail.homepage === "" ? "..." : truncate(detail.homepage, 40)}
              </a>
            </div>
            <div className="column">
              <p>Popularity: {detail.popularity}</p>
            </div>
          </ContentBar>
        </WrapperBar>
      </MediaQuery>

      <h2 className="home_title">GENRES</h2>
      <div>
        <ul className="genres_container">{genresList}</ul>
      </div>

      <h2 className="home_title">BACKDROPS</h2>
      <div className="img_container">{seriesImages}</div>

      <h2 className="home_title">POSTERS</h2>
      <div className="img_container">{seriesPoster}</div>

      <h2 className="home_title">CASTS</h2>
      <div className="cast_container">{castList}</div>

      <h2 className="home_title">SIMILAR TV SERIES</h2>
      <div className="cast_container">{similarSeriesList}</div>
    </>
  );
};

export default TvSeriesDetails;

const Wrapper = styled.div`
  background: ${({ backdrop }) =>
    backdrop ? `url(${img_1280}${backdrop})` : "#040714"};
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  margin-top: 10px;
  animation: animateMovieDetails 1s;

  @keyframes animateMovieDetails {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;

  @media screen and (max-width: 768px) {
    display: block;
    max-height: none;
  }
`;

const Image = styled.img`
  width: 720px;
  max-width: 720px;
  transition: all 0.3s;
  object-fit: cover;
  border-radius: 20px;
  animation: animateThumb 0.5s;

  :hover {
    opacity: 0.8;
  }

  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Text = styled.div`
  width: 100%;
  padding: 20px 40px;
  color: #dde0fd;
  overflow: hidden;

  .rating-directors {
    display: flex;
    justify-content: flex-start;
  }

  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background: #000522d0;
    color: rgb(63, 81, 181);
    font-weight: 600;
    border-radius: 50%;
    margin: 0;
    margin-left: 10px;
    margin-top: 10px;
  }

  .director {
    margin: 0 0 0 40px;

    p {
      margin-left: 10px;
      margin-top: 10px;
      margin-bottom: 0;
    }
  }

  h1 {
    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .list-container {
    display: flex;
    justify-content: flex-start;

    .watchlist {
      margin-top: 20px;

      .watchlist-btn {
        margin-top: 10px;
        margin-left: 10px;
        width: 38px;
        height: 38px;
        padding: 8px;
        border-radius: 50%;
        background-color: rgb(63, 81, 181);
        cursor: pointer;
      }
    }

    .like {
      margin-top: 20px;
      margin-left: 30px;

      .like-btn {
        margin-top: 10px;
        margin-left: 10px;
        width: 35px;
        height: 35px;
        padding: 8px;
        border-radius: 50%;
        background-color: rgb(63, 81, 181);
        cursor: pointer;
      }
    }

    .trailer {
      margin-top: 20px;

      .play-btn {
        margin-top: 10px;
        margin-left: 10px;
        font-size: 40px;
        cursor: pointer;
        color: #dde0fd;
      }
    }

    .share {
      margin-top: 20px;
      margin-left: 10px;

      .share-btn {
        margin-top: 10px;
        margin-left: 10px;
        width: 35px;
        height: 35px;
        padding: 8px;
        border-radius: 50%;
        background-color: rgb(63, 81, 181);
        cursor: pointer;
      }
    }
  }
`;

const WrapperBar = styled.div`
  display: flex;
  align-items: center;
  min-height: 100px;
  background: #000522d0;
  padding: 0 20px;
`;

const ContentBar = styled.div`
  display: flex;
  max-width: 1280px;
  width: 100%;
  cursor: pointer;
  margin: 0 auto;

  .column {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(63, 81, 181);
    border-radius: 20px;
    margin: 0 20px;
    flex: 1;

    :first-child {
      margin-left: 0;
    }

    :last-child {
      margin-right: 0;
    }

    :hover {
      opacity: 0.9;
    }
  }

  @media screen and (max-width: 768px) {
    display: block;

    .column {
      margin: 20px 0;
    }
  }
`;
