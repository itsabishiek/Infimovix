import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { AppBar, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import { Google } from "@mui/icons-material";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth } from "../firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  borderRadius: 3,
  backgroundColor: "#000522d0",
};

const AuthModal = ({ alert, setAlert }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successfully. Welcome ${
            res.user.displayName || res.user.email
          }`,
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar
              position="static"
              style={{ borderRadius: 10, backgroundColor: "#000522d0" }}
            >
              <Tabs variant="fullWidth" value={value} onChange={handleChange}>
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </AppBar>

            {value === 0 && (
              <Login
                handleClose={handleClose}
                alert={alert}
                setAlert={setAlert}
              />
            )}
            {value === 1 && (
              <Signup
                handleClose={handleClose}
                alert={alert}
                setAlert={setAlert}
              />
            )}

            <Box
              p={3}
              style={{
                paddingTop: 0,
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                gap: 20,
              }}
            >
              <span
                style={{ color: "var(--primary-color)", fontWeight: "bold" }}
              >
                (OR)
              </span>

              <Button
                startIcon={<Google />}
                variant="contained"
                style={{ width: "100%", outline: "none" }}
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
