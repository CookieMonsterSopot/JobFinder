import React, { useState } from "react";
import axios from "axios";
import { publisher_id } from "../../helpers/indeedApi";

interface Job {
  title: string;
  company: string;
  location: string;
  url: string;
}

const Indeed = () => {
  // const [method, setMethod] = useState("");
  // const [headers, setHeaders] = useState("");
  // const [body, setBody] = useState("");
  // const [redirect, setRedirect] = useState("");

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `https://api.indeed.com/ads/apisearch?publisher=${publisher_id}&format=json&q=${title}&l=${location}&v=2`;
    const response = await axios.get(url);

    console.log(response);
  };

  // const myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  // const urlencoded = new URLSearchParams();
  // urlencoded.append("grant_type", "client_credentials");
  // urlencoded.append(
  //   "client_id",
  //   "241d57303309bf7cf6495883cebb63a01aacbd60bc62bd4c15c775d13930eec8"
  // );
  // urlencoded.append(
  //   "client_secret",
  //   "DKe7cJAa2jq7wTpveQbzGQgyM5s2QEWC4MEcyc8AkB0GeTLY6he54gAYJurG7UPn"
  // );

  // const method: any = "POST";
  // const headers: any = myHeaders;
  // const body: any = urlencoded;
  // const redirect: any = "follow";

  // const requestOptions = { method, headers, body, redirect };
  // console.log(requestOptions);

  // fetch("https://apis.indeed.com/oauth/v2/tokens?", requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));

  // setJobs(result.data.results);
  // console.log(response.data.results);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
        />
        <button type="submit">Search</button>
      </form>
      {jobs.length > 0 && (
        <ul>
          {jobs.map((job) => (
            <li key={job.url}>
              <a href={job.url}>{job.title}</a> - {job.company} - {job.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Indeed;
