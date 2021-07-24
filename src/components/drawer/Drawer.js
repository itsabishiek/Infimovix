import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  ContactSupport,
  ExitToApp,
  Home,
  Movie,
  People,
  Person,
  Search,
  Tv,
  Whatshot,
} from "@material-ui/icons";
import fire from "../../firebase";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  button: {
    width: 30,
    height: 30,
  },
});

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

export default function SideDrawer({ children }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const history = useHistory();

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const itemsList = [
    {
      text: "Home",
      icon: <Home />,
      onClick: () => history.push("/"),
    },
    {
      text: "Trending",
      icon: <Whatshot />,
      onClick: () => history.push("/trending"),
    },
    {
      text: "Movies",
      icon: <Movie />,
      onClick: () => history.push("/movies"),
    },
    {
      text: "TV Series",
      icon: <Tv />,
      onClick: () => history.push("/series"),
    },
    {
      text: "Search",
      icon: <Search />,
      onClick: () => history.push("/search"),
    },
    {
      text: "People",
      icon: <People />,
      onClick: () => history.push("/people"),
    },
  ];

  const policyList = [
    {
      text: "About",
      icon: <Person />,
      onClick: () => history.push("/about"),
    },
    {
      text: "Contact",
      icon: <ContactSupport />,
      onClick: () => history.push("/contact"),
    },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={index} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>

      <Divider />
      <List>
        {policyList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={index} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <React.Fragment key={"right"}>
          <div onClick={toggleDrawer("right", true)}>{children}</div>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </ThemeProvider>
  );
}
