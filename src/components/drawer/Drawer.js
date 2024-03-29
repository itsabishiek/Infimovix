import React from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import {
  AddToQueue,
  Code,
  ContactSupport,
  FavoriteOutlined,
  Home,
  Logout,
  Movie,
  People,
  Person,
  Search,
  Tv,
  Whatshot,
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";

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
  text: {
    color: "#dde0fd",
  },
  icon: {
    color: "rgb(63, 81, 181)",
  },
  paper: {
    background: "#000522d0",
  },
});

export default function SideDrawer({ children, user, setAlert }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const history = useHistory();

  const logout = () => {
    signOut(auth);

    setAlert({
      open: true,
      message: "Logout Successfully!",
      type: "success",
    });

    toggleDrawer();
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
      text: "Developer",
      icon: <Code />,
      onClick: () => history.push("/developer"),
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
              {icon && (
                <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
              )}
              <ListItemText primary={text} className={classes.text} />
            </ListItem>
          );
        })}

        {user && (
          <>
            <ListItem button onClick={() => history.push("/watchlist")}>
              <ListItemIcon className={classes.icon}>
                <AddToQueue />
              </ListItemIcon>
              <ListItemText primary={"My Watchlist"} className={classes.text} />
            </ListItem>

            <ListItem button onClick={() => history.push("/liked")}>
              <ListItemIcon className={classes.icon}>
                <FavoriteOutlined />
              </ListItemIcon>
              <ListItemText
                primary={"My Favourites"}
                className={classes.text}
              />
            </ListItem>
          </>
        )}
      </List>

      <Divider />
      <List>
        {policyList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={index} onClick={onClick}>
              {icon && (
                <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
              )}
              <ListItemText primary={text} className={classes.text} />
            </ListItem>
          );
        })}
        {user && (
          <ListItem button onClick={logout}>
            <ListItemIcon className={classes.icon}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Logout"} className={classes.text} />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <div onClick={toggleDrawer("right", true)}>{children}</div>
        <Drawer
          classes={{ paper: classes.paper }}
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
