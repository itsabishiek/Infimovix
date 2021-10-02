import React from "react";
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
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import TvSeriesDetails from "./pages/tvSeriesDetails/TvSeriesDetails";
import Developer from "./components/developer/Developer";
import PageNotFound from "./components/pageNotFound/PageNotFound";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/error/ErrorFallback";
import { GlobalProvider } from "./context/GlobalState";
import Watchlist from "./pages/watchlist/Watchlist";
import Liked from "./pages/liked/Liked";

function App() {
  const errorHandler = (error, errorInfo) => {
    console.log("Logging", error, errorInfo);
  };

  return (
    <GlobalProvider>
      <Router>
        <Header />
        <div className="app">
          <Switch>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onError={errorHandler}
            >
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/movie/:id" component={MovieDetails} />

              <Route path="/tv/:id" component={TvSeriesDetails} />

              <Route path="/about">
                <About />
              </Route>
              <Route path="/developer">
                <Developer />
              </Route>
              <Route path="/contact">
                <Contact />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
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

        <MediaQuery maxWidth={768}>
          <SimpleBottomNavigation />
        </MediaQuery>
      </Router>
    </GlobalProvider>
  );
}

export default App;
