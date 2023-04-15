import React, { useState } from "react";
// import { JOOBLE_API, JOOBLE_API_US } from "../../helpers/joobleApi";
import { Form } from "react-router-dom";
import JobArticles from "../JobArticles/JobArticles";
import { Button, Divider, TextField } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../helpers/firebaseConfig";
import joobleLogo from "../../images/jooble_2.png";
import axios from "axios";

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

const Jooble: React.FC = () => {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [keywords, setKeywords] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = "https://pl.jooble.org/api/";
    const key = process.env.REACT_APP_JOOBLE_API;
    const params = { keywords, location };

    axios
      .post(url + key, params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const myRes = response.data;
        // do something with myRes

        // .catch((error) => {
        //   // handle error
        // });

        setJobListings(
          myRes.jobs.map((job: any) => ({
            company: job.company,
            id: job.id,
            link: job.link,
            location: job.location,
            salary: job.salary,
            snippet: job.snippet,
            source: job.source,
            title: job.title,
            type: job.type,
          }))
        );
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        fontFamily: "monospace",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          textAlign: "center",
          marginTop: 20,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={joobleLogo}
          alt="jooble logo"
          width="200"
          style={{ marginBottom: 10, display: "inline" }}
        />
        <div>
          <label>
            <TextField
              id="outlined-basic"
              label="Job"
              variant="outlined"
              style={{ margin: "0px 10px 10px 5px", width: 150 }}
              type="text"
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
            />
          </label>
          <label>
            <TextField
              id="outlined-basic"
              label="City"
              variant="outlined"
              style={{ margin: "0px 10px 10px 5px", width: 150 }}
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </label>
        </div>

        <Button
          variant="contained"
          type="submit"
          style={{
            marginBottom: 10,
            fontFamily: "monospace",

            width: 150,
            textAlign: "center",
          }}
        >
          Search
        </Button>
      </form>
      {jobListings.map((el, i) => {
        return <JobArticles job={el} key={i} />;
      })}
      ;
    </div>
  );
};
export default Jooble;
