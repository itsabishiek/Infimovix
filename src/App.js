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

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Switch>
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
          </Container>
        </Switch>
      </div>
      <MediaQuery maxWidth={768}>
        <SimpleBottomNavigation />
      </MediaQuery>
    </Router>
  );
}

export default App;
