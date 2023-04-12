import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Typography
        variant="h2"
        align="center"
        sx={{ fontFamily: "monospace", fontSize: "2rem", mt: ".8rem" }}
      >
        Home
      </Typography>

      <Button
        variant="contained"
        sx={{
          display: "block",
          color: "white",
          mx: "auto",
          my: "1rem",
        }}
      >
        <Link to="/job" style={{ textDecoration: "none", color: "white" }}>
          Search Job
        </Link>
      </Button>

      <Button
        variant="contained"
        sx={{
          display: "block",
          color: "white",
          mx: "auto",
          my: "1rem",
        }}
      >
        <Link to="/recent" style={{ textDecoration: "none", color: "white" }}>
          Recent History
        </Link>
      </Button>
    </>
  );
};

export default HomePage;
