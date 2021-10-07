import { Pagination } from "@mui/material";
import React from "react";

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
      <Pagination
        count={numOfPages}
        color="primary"
        variant="outlined"
        onChange={(e) => handlePageChange(e.target.textContent)}
      />
    </div>
  );
}
