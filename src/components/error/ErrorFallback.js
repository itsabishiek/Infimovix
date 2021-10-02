import React from "react";
import { Link, useHistory } from "react-router-dom";
import Fallback from "../../assets/server_error.svg";
import "./ErrorFallback.css";

const ErrorFallback = () => {
  const history = useHistory();

  const refreshPage = () => {
    history.push("/");
    window.location.reload(false);
  };

  return (
    <div className="fallback">
      <div>
        <img className="fallback-img" src={Fallback} alt="" />
      </div>

      <p className="fallback-text">
        Opps! Something went wrong. Sorry for that, click below to back to home.
      </p>

      <Link to="/">
        <button className="fallback-btn" onClick={refreshPage}>
          Back to home
        </button>
      </Link>
    </div>
  );
};

export default ErrorFallback;
