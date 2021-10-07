import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(63, 81, 181)",
    },
    secondary: {
      main: "rgb(206, 41, 41)",
    },
  },
});

export default darkTheme;
