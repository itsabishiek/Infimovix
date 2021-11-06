import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signup = ({ handleClose, alert, setAlert }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: "Passwords do not match!",
        type: "error",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log(result);

      setAlert({
        open: true,
        message: `Sign Up Successfully. Welcome ${
          result.user.displayName || result.user.email
        }`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box p={3} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <TextField
        variant="outlined"
        fullWidth
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        variant="outlined"
        fullWidth
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextField
        variant="outlined"
        fullWidth
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Sign Up
      </Button>
    </Box>
  );
};

export default Signup;
