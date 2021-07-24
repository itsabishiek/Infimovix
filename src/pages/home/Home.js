import React, { useEffect, useState } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import {
  fetchComedyMovies,
  fetchDocumentaries,
  fetchHorrorMovies,
  fetchMovieByGenre,
  fetchNetflixOriginals,
  fetchRomanceMovies,
  fetchTopratedMovie,
  unavailable,
} from "../../config/config";
import "./Home.css";

const Home = () => {
  const [movieList, setMovieList] = useState([]);
  // const [netOriginals, setNetOriginals] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchAPI = async () => {
      // setNetOriginals(await fetchNetflixOriginals());
      setMovieList(await fetchMovieByGenre());
      setTopRated(await fetchTopratedMovie());
      setComedyMovies(await fetchComedyMovies());
      setHorrorMovies(await fetchHorrorMovies());
      setRomanceMovies(await fetchRomanceMovies());
      setDocumentaries(await fetchDocumentaries());
    };

    fetchAPI();
  }, []);

  // const netflixOriginals = netOriginals.map((item, index) => {
  //   return (
  //     <div key={index}>
  //       <Link to={`/movie/${item.id}`}>
  //         <img
  //           className="home_poster"
  //           src={item.poster ? item.poster : unavailable}
  //           alt={item.name}
  //         />
  //       </Link>
  //     </div>
  //   );
  // });

  const movies = movieList.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          <img
            className="home_poster"
            src={item.poster ? item.poster : unavailable}
            alt={item.title}
          />
        </Link>
      </div>
    );
  });

  const topMovies = topRated.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          <img
            className="home_poster"
            src={item.poster ? item.poster : unavailable}
            alt={item.title}
          />
        </Link>
      </div>
    );
  });

  const movieComedy = comedyMovies.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          <img
            className="home_poster"
            src={item.poster ? item.poster : unavailable}
            alt={item.title}
          />
        </Link>
      </div>
    );
  });

  const movieHorror = horrorMovies.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          <img
            className="home_poster"
            src={item.poster ? item.poster : unavailable}
            alt={item.title}
          />
        </Link>
      </div>
    );
  });

  const movieRomance = romanceMovies.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          <img
            className="home_poster"
            src={item.poster ? item.poster : unavailable}
            alt={item.title}
          />
        </Link>
      </div>
    );
  });

  const movieDocumentaries = documentaries.map((item, index) => {
    return (
      <div key={index}>
        <Link to={`/movie/${item.id}`}>
          <img
            className="home_poster"
            src={item.poster ? item.poster : unavailable}
            alt={item.title}
          />
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
            <button onClick={() => history.push("/trending")} class="btn">
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

        {/* <h3 className="home_title">NETFLIX ORIGINALS</h3>
        <div className="home_posters">{netflixOriginals}</div> */}

        <h3 className="home_title">NOW STREAMING</h3>
        <div className="home_posters">{movies}</div>

        <h3 className="home_title">TOP RATED</h3>
        <div className="home_posters">{topMovies}</div>

        <h3 className="home_title">COMEDY MOVIES</h3>
        <div className="home_posters">{movieComedy}</div>

        <h3 className="home_title">HORROR MOVIES</h3>
        <div className="home_posters">{movieHorror}</div>

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
