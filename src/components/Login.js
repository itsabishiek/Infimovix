import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = ({ handleClose, setAlert }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the fields!",
        type: "warning",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Login Successfully. Welcome Back ${
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

      <Button variant="contained" onClick={handleSubmit}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
