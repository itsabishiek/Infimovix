import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  watchlist: localStorage.getItem("watchlist")
    ? JSON.parse(localStorage.getItem("watchlist"))
    : [],
  liked: localStorage.getItem("liked")
    ? JSON.parse(localStorage.getItem("liked"))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("liked", JSON.stringify(state.liked));
  }, [state]);

  // actions
  const addMovieToWatchlist = (detail) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: detail });
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const addMovieToFavourite = (detail) => {
    dispatch({ type: "ADD_MOVIE_TO_FAVOURITE", payload: detail });
  };

  const removeMovieFromFavourite = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_FAVOURITE", payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        liked: state.liked,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToFavourite,
        removeMovieFromFavourite,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
