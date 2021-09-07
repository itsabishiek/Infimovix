export default (state, action) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };

    case "REMOVE_MOVIE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (detail) => detail.id !== action.payload
        ),
      };

    case "ADD_MOVIE_TO_FAVOURITE":
      return {
        ...state,
        liked: [action.payload, ...state.liked],
      };

    case "REMOVE_MOVIE_FROM_FAVOURITE":
      return {
        ...state,
        liked: state.liked.filter((detail) => detail.id !== action.payload),
      };

    default:
      return state;
  }
};
