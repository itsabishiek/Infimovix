import { createTheme, ThemeProvider } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

export default function CustomPagination({ setPage, numOfPages = 30 }) {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 40,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          color="primary"
          variant="outlined"
          onChange={(e) => handlePageChange(e.target.textContent)}
        />
      </ThemeProvider>
    </div>
  );
}
