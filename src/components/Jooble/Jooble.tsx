import React, { useState } from "react";
import { JOOBLE_API, JOOBLE_API_US } from "../../helpers/joobleApi";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = "https://pl.jooble.org/api/";
    const key = process.env.REACT_APP_JOOBLE_API;
    let params = { keywords, location, page: 1, limit: 10 };

    axios
      .post(url + key, params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const myRes = response.data;
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
        setCurrentPage(1);
      });
  };

  const totalPages = Math.ceil(jobListings.length / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleJobs = jobListings.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
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
          width="150"
          style={{ marginBottom: 10, display: "inline" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
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

        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>

      <div>
        {jobListings
          .slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((el, i) => {
            return <JobArticles job={el} key={i} />;
          })}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Button
          style={{ marginBottom: 100, marginLeft: 10, marginRight: 10 }}
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((page) => page - 1)}
        >
          Prev
        </Button>
        <div style={{ marginBottom: 100, marginLeft: 10, marginRight: 10 }}>
          {currentPage}
        </div>
        <Button
          style={{ marginBottom: 100, marginLeft: 10, marginRight: 10 }}
          variant="outlined"
          disabled={jobListings.length <= currentPage * perPage}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default Jooble;
