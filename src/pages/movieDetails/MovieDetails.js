import React, { useContext, useEffect, useState } from "react";
import {
  fetchCasts,
  fetchMovieDetail,
  fetchMovieImages,
  fetchMoviePoster,
  fetchMovieVideos,
  fetchSimilarMovie,
  img_1280,
  img_500,
  img_base,
  unavailable,
} from "../../config/config";
import styled from "styled-components";
import "./MovieDetails.css";
import { calcTime, convertMoney } from "../../helpers/Helpers";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import {
  AddToQueue,
  FavoriteBorderOutlined,
  PlayCircleFilledRounded,
} from "@material-ui/icons";
import MediaQuery from "react-responsive";
import { GlobalContext } from "../../context/GlobalState";
import { toast } from "react-toastify";

const MovieDetails = ({ match }) => {
  const { addMovieToWatchlist, watchlist, addMovieToFavourite } =
    useContext(GlobalContext);

  let params = match.params;
  let genres = [];
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [poster, setPoster] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  let storedMovie = watchlist.find((o) => o.id === detail.id);

  const watchlistDisabled = storedMovie ? true : false;

  const notifyWatchlist = () => {
    toast.dark("Movie added to your watchlist.", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const notifyFavourite = () => {
    toast.dark("Movie added to your favourites.", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setImages(await fetchMovieImages(params.id));
      setPoster(await fetchMoviePoster(params.id));
      setCasts(await fetchCasts(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
      window.scroll(0, 0);
    };

    fetchAPI();
  }, [params.id]);

  console.log(detail);

  genres = detail?.genres;

  const MoviePlayerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ outline: "none" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video?.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li key={i} className="genre_list">
          <button type="button" className="genre_btn">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const movieImages = images.map((img, index) => {
    return (
      <div key={index} className="img_posters">
        <img
          src={img.file_path && `${img_base}${img.file_path}`}
          alt=""
          className="img_poster"
        />
      </div>
    );
  });

  const moviePoster = poster.map((poster, index) => {
    return (
      <div key={index}>
        <img
          src={poster.file_path && `${img_base}${poster.file_path}`}
          alt=""
          style={{
            height: "260px",
            objectFit: "contain",
            marginRight: "15px",
            borderRadius: "10px",
          }}
        />
      </div>
    );
  });

  const castList = casts.map((cast, index) => {
    return (
      <div key={index} className="cast_posters">
        <img
          className="cast_poster"
          style={{
            height: "260px",
            objectFit: "contain",
          }}
          src={cast.img ? `${img_500}${cast.img}` : unavailable}
          alt={cast.name}
        />
        <p style={{ color: "#dde0fd" }}>{cast.name}</p>
        <p style={{ color: "rgb(63, 81, 181)" }}>{cast.character}</p>
      </div>
    );
  });

  const similarMovieList = similarMovie.map((item, index) => {
    return (
      <div key={index}>
        <div className="cast_posters">
          <Link to={`/movie/${item.id}`}>
            <img
              className="cast_poster"
              src={item.poster}
              style={{
                height: "260px",
                objectFit: "contain",
              }}
              alt={item.title || item.name}
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
      <MoviePlayerModal
        show={isOpen}
        onHide={() => {
          setIsOpen(false);
        }}
      ></MoviePlayerModal>
      <Wrapper backdrop={detail?.backdrop_path}>
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
                <div className="score">{detail.vote_average}</div>
              </div>

              <div className="director">
                <h3 style={{ color: "rgb(63, 81, 181)" }}>DIRECTOR(S)</h3>
                {detail.created_by &&
                  detail.created_by.map((director) => (
                    <p key={director.credit_id}>{director.name}</p>
                  ))}
              </div>
            </div>

            <div className="list-container">
              <div className="watchlist">
                <h3 style={{ color: "rgb(63, 81, 181)" }}>WATCHLIST</h3>
                <AddToQueue
                  className="watchlist-btn"
                  disabled={watchlistDisabled}
                  onClick={() => {
                    addMovieToWatchlist(detail);
                    notifyWatchlist();
                  }}
                />
              </div>

              <div className="like">
                <h3 style={{ color: "rgb(63, 81, 181)" }}>FAVOURITE</h3>
                <FavoriteBorderOutlined
                  className="like-btn"
                  onClick={() => {
                    addMovieToFavourite(detail);
                    notifyFavourite();
                  }}
                />
              </div>
            </div>

            <div className="trailer">
              <h3 style={{ color: "rgb(63, 81, 181)" }}>WATCH TRAILER</h3>
              <PlayCircleFilledRounded
                className="play-btn"
                onClick={() => setIsOpen(true)}
              />
            </div>
          </Text>
        </Content>
      </Wrapper>

      <WrapperBar>
        <ContentBar>
          <div className="column">
            <p>Running time: {calcTime(detail.runtime)}</p>
          </div>
          <div className="column">
            <p>
              Budget:{" "}
              {detail.budget === 0
                ? "Unavailable"
                : convertMoney(detail.budget)}
            </p>
          </div>
          <div className="column">
            <p>
              Revenue:{" "}
              {detail.revenue === 0
                ? "Unavailable"
                : convertMoney(detail.revenue)}
            </p>
          </div>
        </ContentBar>
      </WrapperBar>
      <MediaQuery minWidth={768}>
        <WrapperBar>
          <ContentBar>
            <div className="column">
              <p>Release Date: {detail.release_date}</p>
            </div>
            <div className="column">
              <a href={detail.homepage} style={{ color: "#fff" }}>
                {detail.homepage === ""
                  ? "Unavailable"
                  : truncate(detail.homepage, 40)}
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

      {/* <h2 className="home_title">PRODUCTION COMPANIES</h2>
      <div className="production_companies">
        {detail.production_companies &&
          detail.production_companies.map((pc) => <p key={pc.id}>{pc.name}</p>)}
      </div>

      <h2 className="home_title">PRODUCTION COUNTRIES</h2>
      <div className="production_countries">
        {detail.production_countries &&
          detail.production_countries.map((country) => (
            <p key={country.iso_3166_1}>{country.name}</p>
          ))}
      </div> */}

      <h2 className="home_title">BACKDROPS</h2>
      <div className="img_container">{movieImages}</div>

      <h2 className="home_title">POSTERS</h2>
      <div className="img_container">{moviePoster}</div>

      <h2 className="home_title">CASTS</h2>
      <div className="cast_container">{castList}</div>

      <h2 className="home_title">SIMILAR MOVIES</h2>
      <div className="cast_container">{similarMovieList}</div>
    </>
  );
};

export default MovieDetails;

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
      margin: 0;
    }
  }

  h1 {
    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
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
