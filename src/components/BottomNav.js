import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Movie, Search, Tv, Whatshot } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#000522d0",
    zIndex: 999,
  },
  style: {
    color: "#c5cbff",
    whiteSpace: "nowrap",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) {
      history.push("/");
    } else if (value === 1) {
      history.push("/trending");
    } else if (value === 2) {
      history.push("/movies");
    } else if (value === 3) {
      history.push("/series");
    } else if (value === 4) {
      history.push("/search");
    }
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        className={classes.style}
        label="Home"
        icon={<Home />}
      />
      <BottomNavigationAction
        className={classes.style}
        label="Trending"
        icon={<Whatshot />}
      />
      <BottomNavigationAction
        className={classes.style}
        label="Movies"
        icon={<Movie />}
      />
      <BottomNavigationAction
        className={classes.style}
        label="TV Series"
        icon={<Tv />}
      />
      <BottomNavigationAction
        className={classes.style}
        label="Search"
        icon={<Search />}
      />
    </BottomNavigation>
  );
}
