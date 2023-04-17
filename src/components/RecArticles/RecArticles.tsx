import { Button, Divider, List, ListItem, Typography } from "@mui/material";
import { doc, deleteDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../helpers/firebaseConfig";

interface RecListing {
  company: string;
  id: string;
  link: string;
  location: string;
  salary: string;
  snippet: string;
  source: string;
  title: string;
  type: string;
}

interface RecProps {
  rec: RecListing;
  key: number;
}

export const RecArticles = ({ rec }: RecProps) => {
  const deleteData = () => {
    deleteDoc(doc(db, "jobs", rec.id));
    // window.location.reload(); //Reload the page so that the user can see the change. 	  }
    console.log("Deleted");
  };
  return (
    <>
      <Typography
        variant="h2"
        align="center"
        sx={{ fontFamily: "monospace", fontSize: "2rem", mt: ".8rem" }}
      >
        Recent History
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          justifyContent: "center",
          fontFamily: "monospace",
        }}
      >
        <a
          key={rec.id}
          href={rec.link}
          target="_blank"
          style={{
            textAlign: "center",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            margin: "10px 25px 5px 25px",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "15px",
              color: "#1976d2",
            }}
          >
            {rec.company}
          </span>
          <span
            style={{ fontWeight: "bold", fontSize: "17px", color: "black" }}
          >
            {rec.title}
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#1976d2",
            }}
          >
            {rec.location}
          </span>
          <span
            style={{
              fontSize: "10px",
              color: "grey",
              fontStyle: "italic",
            }}
          >
            {rec.source}
          </span>
        </a>
        <Button onClick={deleteData}>delete</Button>
        <Divider
          style={{
            backgroundColor: "#1976d2",
            width: "100%",
            opacity: "25%",
          }}
        />
      </div>
    </>
  );
};

export default RecArticles;
