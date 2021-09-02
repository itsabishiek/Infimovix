import React from "react";
import { Link } from "react-router-dom";
import PageNotFoundImg from "../../assets/404.svg";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div>
        <img className="page-not-found-img" src={PageNotFoundImg} alt="" />
      </div>

      <p className="page-not-found-text">
        Opps! This page is'nt available or might have been removed. Sorry about
        that! Try searching for something else.
      </p>

      <Link to="/">
        <button class="page-not-found-btn">Back to home</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
