/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, Movie, People, Search, Tv, Whatshot } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
          className="brand_container"
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
              <NavLink
                to="/trending"
                activeClassName="navbar__link--active"
                style={{ display: "flex" }}
              >
                <Whatshot
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "7px",
                  }}
                />
                Trending
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/movies"
                activeClassName="navbar__link--active"
                style={{ display: "flex" }}
              >
                <Movie
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "7px",
                  }}
                />
                Movies
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/series"
                activeClassName="navbar__link--active"
                style={{ display: "flex" }}
              >
                <Tv
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "7px",
                  }}
                />
                TV Shows
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/people"
                activeClassName="navbar__link--active"
                style={{ display: "flex" }}
              >
                <People
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "7px",
                  }}
                />
                People
              </NavLink>
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
