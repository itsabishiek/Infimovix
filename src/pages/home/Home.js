import React, { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import MediaQuery from "react-responsive";
import { Link, useHistory } from "react-router-dom";
import Banner from "../../components/banner/Banner";
import Footer from "../../components/footer/Footer";
import {
  fetchComedyMovies,
  fetchDocumentaries,
  fetchHorrorMovies,
  fetchMovieByGenre,
  fetchNetflixOriginals,
  fetchRomanceMovies,
  fetchTopratedMovie,
  img_base,
  unavailable,
} from "../../config/config";
import { Skeleton } from "@mui/material";
import "./Home.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  const [netOriginals, setNetOriginals] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      setNetOriginals(await fetchNetflixOriginals());
      setLoading(false);
      setLoading(true);
      setMovieList(await fetchMovieByGenre());
      setLoading(false);
      setLoading(true);
      setTopRated(await fetchTopratedMovie());
      setLoading(false);
      setLoading(true);
      setComedyMovies(await fetchComedyMovies());
      setLoading(false);
      setLoading(true);
      setHorrorMovies(await fetchHorrorMovies());
      setLoading(false);
      setLoading(true);
      setRomanceMovies(await fetchRomanceMovies());
      setLoading(false);
      setLoading(true);
      setDocumentaries(await fetchDocumentaries());
      setLoading(false);
    };

    fetchAPI();
  }, []);

  const netflixOriginals = netOriginals?.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/tv/${item.id}`}>
          {loading ? (
            <Skeleton
              style={{ borderRadius: 15, marginRight: 20 }}
              variant="rectangular"
              width={168}
              height={250}
            />
          ) : (
            <LazyLoadImage
              className="home_poster"
              src={`${img_base}${item.poster}`}
              alt={item.name}
              effect="blur"
            />
          )}
        </Link>
      </div>
    );
  });

  const movies = movieList?.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          {loading ? (
            <Skeleton
              style={{ borderRadius: 15, marginRight: 20 }}
              variant="rectangular"
              width={168}
              height={250}
            />
          ) : (
            <LazyLoadImage
              className="home_poster"
              src={item.poster ? item.poster : unavailable}
              alt={item.title}
              effect="blur"
            />
          )}
        </Link>
      </div>
    );
  });

  const topMovies = topRated?.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          {loading ? (
            <Skeleton
              style={{ borderRadius: 15, marginRight: 20 }}
              variant="rectangular"
              width={168}
              height={250}
            />
          ) : (
            <LazyLoadImage
              className="home_poster"
              src={item.poster ? item.poster : unavailable}
              alt={item.title}
              effect="blur"
            />
          )}
        </Link>
      </div>
    );
  });

  const movieComedy = comedyMovies?.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          {loading ? (
            <Skeleton
              style={{ borderRadius: 15, marginRight: 20 }}
              variant="rectangular"
              width={168}
              height={250}
            />
          ) : (
            <LazyLoadImage
              className="home_poster"
              src={item.poster ? item.poster : unavailable}
              alt={item.title}
              effect="blur"
            />
          )}
        </Link>
      </div>
    );
  });

  const movieHorror = horrorMovies?.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          {loading ? (
            <Skeleton
              style={{ borderRadius: 15, marginRight: 20 }}
              variant="rectangular"
              width={168}
              height={250}
            />
          ) : (
            <LazyLoadImage
              className="home_poster"
              src={item.poster ? item.poster : unavailable}
              alt={item.title}
              effect="blur"
            />
          )}
        </Link>
      </div>
    );
  });

  const movieRomance = romanceMovies?.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          {loading ? (
            <Skeleton
              style={{ borderRadius: 15, marginRight: 20 }}
              variant="rectangular"
              width={168}
              height={250}
            />
          ) : (
            <LazyLoadImage
              className="home_poster"
              src={item.poster ? item.poster : unavailable}
              alt={item.title}
              effect="blur"
            />
          )}
        </Link>
      </div>
    );
  });

  const movieDocumentaries = documentaries?.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          {loading ? (
            <Skeleton
              style={{ borderRadius: 15, marginRight: 20 }}
              variant="rectangular"
              width={168}
              height={250}
            />
          ) : (
            <LazyLoadImage
              className="home_poster"
              src={item.poster ? item.poster : unavailable}
              alt={item.title}
              effect="blur"
            />
          )}
        </Link>
      </div>
    );
  });

  return (
    <>
      <div>
        <div className="site-title">
          <div className="site-background">
            <h3>Movies & TV Shows</h3>
            <h1>InfiMovix - The Entertainment Hub</h1>
            <button onClick={() => history.push("/trending")} className="btn">
              Explore
            </button>
          </div>
        </div>

        <div className="viewer_container">
          <div className="viewer_wrap">
            <img src="/assets/images/viewers-disney.png" alt="" />
            <video autoPlay={true} muted loop={true} playsInline={true}>
              <source
                src="/assets/videos/1564674844-disney.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="viewer_wrap">
            <img src="/assets/images/viewers-pixar.png" alt="" />
            <video autoPlay={true} muted loop={true} playsInline={true}>
              <source
                src="/assets/videos/1564676714-pixar.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="viewer_wrap">
            <img src="/assets/images/viewers-marvel.png" alt="" />
            <video autoPlay={true} muted loop={true} playsInline={true}>
              <source
                src="/assets/videos/1564676115-marvel.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="viewer_wrap">
            <img src="/assets/images/viewers-starwars.png" alt="" />
            <video autoPlay={true} muted loop={true} playsInline={true}>
              <source
                src="/assets/videos/1608229455-star-wars.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          <div className="viewer_wrap">
            <img src="/assets/images/viewers-national.png" alt="" />
            <video autoPlay={true} muted loop={true} playsInline={true}>
              <source
                src="/assets/videos/1564676296-national-geographic.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <h3 className="home_title">NETFLIX ORIGINALS</h3>
        <div className="home_posters">{netflixOriginals}</div>

        <h3 className="home_title">NOW STREAMING</h3>
        <div className="home_posters">{movies}</div>

        <h3 className="home_title">TOP RATED</h3>
        <div className="home_posters">{topMovies}</div>

        <h3 className="home_title">COMEDY MOVIES</h3>
        <div className="home_posters">{movieComedy}</div>

        <h3 className="home_title">HORROR MOVIES</h3>
        <div className="home_posters">{movieHorror}</div>

        <MediaQuery minWidth={768}>
          <Banner />
        </MediaQuery>

        <h3 className="home_title">ROMANCE MOVIES</h3>
        <div className="home_posters">{movieRomance}</div>

        <h3 className="home_title">DOCUMENTARIES</h3>
        <div className="home_posters">{movieDocumentaries}</div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
