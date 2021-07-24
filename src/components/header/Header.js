import { Menu, Movie, People, Search, Tv, Whatshot } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideDrawer from "../drawer/Drawer";
import "./Header.css";

const Header = () => {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);

    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`header ${show && "header_show"}`}>
      <div className="header_items">
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/logo.png" alt="" />
          <span>InfiMovix</span>
        </Link>
        <div className="nav_items">
          <ul>
            <li>
              <Link to="/trending" style={{ display: "flex" }}>
                <a href="#" style={{ display: "flex" }}>
                  <Whatshot
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "7px",
                    }}
                  />
                  Trending
                </a>
              </Link>
            </li>

            <li>
              <Link to="/movies" style={{ display: "flex" }}>
                <a href="#" style={{ display: "flex" }}>
                  <Movie
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "7px",
                    }}
                  />
                  Movies
                </a>
              </Link>
            </li>

            <li>
              <Link to="/series" style={{ display: "flex" }}>
                <a href="#" style={{ display: "flex" }}>
                  <Tv
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "7px",
                    }}
                  />
                  TV Shows
                </a>
              </Link>
            </li>

            <li>
              <Link to="/people" style={{ display: "flex" }}>
                <a href="#" style={{ display: "flex" }}>
                  <People
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "7px",
                    }}
                  />
                  People
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="join_container">
          <ul>
            {/* <li className="login">
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/register" className="join_btn">
                Join
              </a>
            </li> */}
            <li>
              <Link to="/search">
                <Search
                  color="primary"
                  fontSize="medium"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
              </Link>
            </li>
            <SideDrawer
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <li>
                <Menu
                  fontSize="medium"
                  color="primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                />
              </li>
            </SideDrawer>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
