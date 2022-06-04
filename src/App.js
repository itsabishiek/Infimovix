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
import { auth } from "./firebase";
import PersonDetails from "./pages/personDetails/PersonDetails";

const App = () => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const errorHandler = (error, errorInfo) => {
    console.log("Logging", error, errorInfo);
  };

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
                  <MovieDetails user={user} />
                </Route>

                <Route path="/tv/:id">
                  <TvSeriesDetails user={user} />
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
                    <Watchlist />
                  </Route>
                  <Route path="/liked">
                    <Liked />
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
