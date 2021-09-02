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
import { Container } from "@material-ui/core";
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

function App() {
  const errorHandler = (error, errorInfo) => {
    console.log("Logging", error, errorInfo);
  };

  return (
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

            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/developer">
              <Developer />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>

            <Container>
              <Route exact path="/trending">
                <Trending />
              </Route>
              <Route exact path="/movies">
                <Movies />
              </Route>
              <Route exact path="/series">
                <Series />
              </Route>
              <Route exact path="/search">
                <Search />
              </Route>
              <Route exact path="/people">
                <People />
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
  );
}

export default App;
