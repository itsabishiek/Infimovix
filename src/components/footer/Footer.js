/* eslint-disable jsx-a11y/anchor-is-valid */
import { Copyright } from "@material-ui/icons";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="about-us">
          <h2>About Me</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            sit maxime, consectetur rerum modi repudiandae cupiditate non
            voluptatum sed nemo nisi omnis debitis, eum eligendi. Ad commodi
            totam beatae rem. <a href="/about">More about me...</a>
          </p>
        </div>

        <div className="newsletter">
          <h2>Newsletter</h2>
          <p>Stay Update our Latest</p>
          <div className="form-elements">
            <input type="text" placeholder="Email" />
            <span>
              <a href="/contact" style={{ color: "rgb(63, 81, 181)" }}>
                <i className="fas fa-chevron-right"></i>
              </a>
            </span>
          </div>
        </div>

        <div className="instagram">
          <h2>Instagram</h2>
          <div className="flex-row">
            <img src="/assets/images/footer/thumb-card3.png" alt="" />
            <img src="/assets/images/footer/thumb-card4.png" alt="" />
            <img src="/assets/images/footer/thumb-card5.png" alt="" />
          </div>
          <div className="flex-row">
            <img src="/assets/images/footer/thumb-card6.png" alt="" />
            <img src="/assets/images/footer/thumb-card7.png" alt="" />
            <img src="/assets/images/footer/thumb-card8.png" alt="" />
          </div>
        </div>

        <div className="follow">
          <h2>Follow Me</h2>
          <p>Let us be Social</p>
          <div>
            <a href="">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="rights flex-row">
        <h4 className="text-grey">
          Copyright <Copyright style={{ fontSize: 15 }} /> 2021 | All rights
          reserved | Made by Infinity <a href="">Founder - Abishiek</a>
        </h4>
      </div>
      <div onClick={() => window.scroll(0, 0)} className="move-up">
        <span>
          <i className="fa fa-arrow-circle-up fa-2x"></i>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
