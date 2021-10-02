import React from "react";
import "./Contact.css";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Contact = () => {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_vqepqkr",
        e.target,
        "user_jRe6fILb0EB9JIKGcB3dv"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
    notify();
  }

  const notify = () => {
    toast.dark("Message Sent Successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  return (
    <section className="contact-section section">
      <div className="container">
        <div className="row">
          <div className="section-title">
            <h2 data-heading="Contact">Get In Touch</h2>
          </div>
        </div>

        <div className="row">
          <div className="contact-item">
            <div className="contact-item-inner outer-shadow">
              <i className="fas fa-phone"></i>
              <span>Phone</span>
              <p>+91 8903051386</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-item-inner outer-shadow">
              <i className="fas fa-envelope"></i>
              <span>Email</span>
              <p>s.abishiek007@gmail.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-item-inner outer-shadow">
              <i className="fas fa-map-marker-alt"></i>
              <span>Address</span>
              <p>
                29 A/1, West Chinthamani, Kosa Mettu Street, Trichy - 620002
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="contact-form">
            <form onSubmit={sendEmail}>
              <div className="row">
                <div className="w-50">
                  <div className="input-group outer-shadow hover-in-shadow">
                    <input
                      type="text"
                      placeholder="Name"
                      className="input-control"
                      name="name"
                    />
                  </div>
                  <div className="input-group outer-shadow hover-in-shadow">
                    <input
                      type="email"
                      placeholder="Email"
                      className="input-control"
                      name="email"
                    />
                  </div>
                  <div className="input-group outer-shadow hover-in-shadow">
                    <input
                      type="text"
                      placeholder="Subject"
                      className="input-control"
                      name="subject"
                    />
                  </div>
                </div>

                <div className="w-50">
                  <div className="input-group outer-shadow hover-in-shadow">
                    <textarea
                      placeholder="Your Message"
                      className="input-control"
                      name="message"
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="submit-btn">
                  <button
                    type="submit"
                    className="btn-1 outer-shadow hover-in-shadow"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
