import React, { useState } from "react";
import fire from "../../firebase";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  return (
    <div className="loginScreen">
      <div className="login__background">
        <div className="loginScreen__gradient"></div>
      </div>

      <div className="loginScreen__body">
        <form>
          <h1>Register Now</h1>
          <input type="text" placeholder="Name" autoFocus />
          <input
            type="email"
            placeholder="Email address"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="errorMsg">{emailError}</p>
          <input
            type="password"
            placeholder="Password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="errorMsg">{passwordError}</p>
          <button type="submit" onClick={handleSignup}>
            Register
          </button>
          <h4>
            <span>Already a user? </span>
            <a href="/login">Sign In</a>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Register;
