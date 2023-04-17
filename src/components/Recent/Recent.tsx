import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../helpers/firebaseConfig";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import RecArticles from "../RecArticles/RecArticles";

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

const Recent: React.FC = () => {
  const [recListing, setRecListing] = useState<RecListing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const jobsRef = collection(db, "jobs");

    getDocs(jobsRef).then((querySnapshot) => {
      const jobsData: RecListing[] = [];
      querySnapshot.forEach((doc) => {
        jobsData.push({
          company: doc.data().company,
          id: doc.id,
          link: doc.data().link,
          location: doc.data().location,
          salary: doc.data().salary,
          snippet: doc.data().snippet,
          source: doc.data().source,
          title: doc.data().title,
          type: doc.data().type,
        });
      });
      setRecListing(jobsData);
      setCurrentPage(1);
    });
  }, []);

  const totalPages = Math.ceil(recListing.length / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const visibleJobs = recListing.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <Typography
        variant="h2"
        align="center"
        sx={{ fontFamily: "monospace", fontSize: "2rem", mt: ".8rem" }}
      >
        Recent History
      </Typography>
      <div>
        {recListing.map((el, i) => {
          return <RecArticles rec={el} key={i} />;
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
          disabled={recListing.length <= currentPage * perPage}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Recent;
