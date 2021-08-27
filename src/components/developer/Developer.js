/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Developer.css";

const Developer = () => {
  return (
    <section className="about-section section">
      <div className="container">
        <div className="row">
          <div className="section-title">
            <h2 data-heading="main info">About Me</h2>
          </div>
        </div>

        <div className="row">
          <div className="about-img">
            <div className="img-box inner-shadow">
              <img
                src="/assets/images/profile-pic.svg"
                className="outer-shadow"
                alt=""
              />
            </div>

            <div className="social-links">
              <a href="#" className="outer-shadow hover-in-shadow">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="outer-shadow hover-in-shadow">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="outer-shadow hover-in-shadow">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="outer-shadow hover-in-shadow">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="outer-shadow hover-in-shadow">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="about-info">
            <p>
              <span>Hi! My name is Abishiek. Iam a Full Stack Developer.</span>{" "}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. nemo
              natus eveniet dolorum, dolor sit amet consectetur adipisicing
              elit. nemo natus eveniet dolorum veritatis placeat sed voluptate
              assumenda ea!
            </p>
            <p>
              {" "}
              Ad modi corporis possimus consequuntur hic eius ducimus, soluta
              ipsam! Laborum perferendis minima beatae debitis, aborum
              perferendis minima beatae debitis, nostrum hic iure ab, modi,
              eveniet porro officiis.
            </p>
            <a href="#" className="btn-1 outer-shadow hover-in-shadow">
              Download CV
            </a>
            <a href="#" className="btn-1 outer-shadow hover-in-shadow">
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developer;
