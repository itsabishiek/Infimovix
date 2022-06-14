import React, { useEffect, useState } from "react";
import "./App.css";
import SimpleBottomNavigation from "./components/BottomNav";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import MovieDetails from "./pages/movieDetails/MovieDetails";
import Trending from "./pages/trending/Trending";
import Movies from "./pages/movies/Movies";
import Series from "./pages/series/Series";
import Search from "./pages/search/Search";
import People from "./pages/people/People";
import Container from "@mui/material/Container";
import MediaQuery from "react-responsive";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import TvSeriesDetails from "./pages/tvSeriesDetails/TvSeriesDetails";
import Developer from "./components/developer/Developer";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import { ThemeProvider } from "@mui/material";
import darkTheme from "./components/MuiTheme";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/error/ErrorFallback";
import { GlobalProvider } from "./context/GlobalState";
import Watchlist from "./pages/watchlist/Watchlist";
import Liked from "./pages/liked/Liked";
import AlertBar from "./components/AlertBar";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./firebase";
import PersonDetails from "./pages/personDetails/PersonDetails";
import { doc, onSnapshot } from "firebase/firestore";

const App = () => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const errorHandler = (error, errorInfo) => {
    console.log("Logging", error, errorInfo);
  };

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "watchlist", user?.uid);

      var unsubscribe = onSnapshot(userRef, (movie) => {
        if (movie.exists()) {
          // console.log(movie.data().movies);
          setWatchlist(movie.data().multimedia);
        } else {
          console.log("No Items in the watchlist!");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const userRef = doc(db, "favourites", user?.uid);

      var unsubscribe = onSnapshot(userRef, (movie) => {
        if (movie.exists()) {
          // console.log(movie.data().movies);
          setFavourites(movie.data().multimedia);
        } else {
          console.log("No Items in the watchlist!");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  // console.log(movieDetails);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  // console.log(user);
  // 3PlTfaa7Z5b6evbfanPlnWPqdsI3

  return (
    <GlobalProvider>
      <Router>
        <ThemeProvider theme={darkTheme}>
          <Header alert={alert} setAlert={setAlert} user={user} />
          <div className="app">
            <Switch>
              <ErrorBoundary
                FallbackComponent={ErrorFallback}
                onError={errorHandler}
              >
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/movie/:id">
                  <MovieDetails
                    user={user}
                    watchlist={watchlist}
                    setAlert={setAlert}
                    favourites={favourites}
                  />
                </Route>

                <Route path="/tv/:id">
                  <TvSeriesDetails
                    user={user}
                    watchlist={watchlist}
                    setAlert={setAlert}
                    favourites={favourites}
                  />
                </Route>

                <Route path="/about">
                  <About />
                </Route>
                <Route path="/developer">
                  <Developer />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>

                <Route path="/person/:id">
                  <PersonDetails />
                </Route>

                <Container>
                  <Route path="/trending">
                    <Trending />
                  </Route>
                  <Route path="/movies">
                    <Movies />
                  </Route>
                  <Route path="/series">
                    <Series />
                  </Route>
                  <Route path="/search">
                    <Search />
                  </Route>
                  <Route path="/people">
                    <People />
                  </Route>
                  <Route path="/watchlist">
                    <Watchlist watchlist={watchlist} />
                  </Route>
                  <Route path="/liked">
                    <Liked favourites={favourites} />
                  </Route>
                </Container>
              </ErrorBoundary>

              <Route component={PageNotFound} />
            </Switch>
          </div>

          <AlertBar alert={alert} setAlert={setAlert} />

          <MediaQuery maxWidth={768}>
            <SimpleBottomNavigation />
          </MediaQuery>
        </ThemeProvider>
      </Router>
    </GlobalProvider>
  );
};

export default App;
