import React, { useState } from "react";
import fire from "../../firebase";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
          // do nothing
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
          <h1>Sign In</h1>
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
          <button type="submit" onClick={handleLogin}>
            Sign In
          </button>
          <h4>
            <span>New to InfiMovix? {"  "}</span>{" "}
            <a href="/register">Sign Up Now</a>
          </h4>
        </form>
      </div>
    </div>
  );
};

export default Login;
