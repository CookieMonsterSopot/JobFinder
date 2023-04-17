import React from "react";

import { Divider } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../helpers/firebaseConfig";

interface JobListing {
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

interface JobProps {
  job: JobListing;
  key: number;
}

const JobArticles = ({ job }: JobProps) => {
  return (
    <div style={{ fontFamily: "monospace" }}>
      <a
        key={job.id}
        onClick={() => {
          const dbRef = collection(db, "/jobs");
          const data = {
            company: job.company,
            id: job.id,
            link: job.link,
            location: job.location,
            salary: job.salary,
            snippet: job.snippet,
            source: job.source,
            title: job.title,
            type: job.type,
          };
          addDoc(dbRef, data)
            .then((dbRef) => {})
            .catch((error) => {
              console.log(error);
            });
        }}
        href={job.link}
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
          {job.company}
        </span>
        <span style={{ fontWeight: "bold", fontSize: "17px", color: "black" }}>
          {job.title}
        </span>
        <span
          style={{
            fontSize: "12px",
            color: "#1976d2",
          }}
        >
          {job.location}
        </span>
        <span
          style={{
            fontSize: "10px",
            color: "grey",
            fontStyle: "italic",
            marginBottom: "10px",
          }}
        >
          {job.source}
        </span>
        <Divider
          style={{
            backgroundColor: "#1976d2",
            width: "100%",
            opacity: "25%",
          }}
        />
      </a>
    </div>
  );
};

export default JobArticles;
