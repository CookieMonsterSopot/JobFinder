import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./helpers/firebaseConfig";
import { authContext } from "./helpers/authContext";
import UserPage from "./components/UserPage/UserPage";
import ProfilePhotoForm from "./components/ProfilePhotoForm/ProfilePhotoForm";
import Jooble from "./components/Jooble/Jooble";
import Recent from "./components/Recent/Recent";
import Weather from "./components/Weather/Weather";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
      // console.log("zalogowano");
    } else {
      setLoggedIn(false);
      // console.log("wylogowano");
    }
  });

  return (
    <div className="App">
      <BrowserRouter>
        <authContext.Provider value={loggedIn}>
          {/* STATIC */}
          <Navbar />

          <Routes>
            {/* DYNAMIC */}
            <Route path="/" element={<HomePage />} />
            <Route path="/job" element={<Jooble />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterForm />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/photo" element={<ProfilePhotoForm />} />
          </Routes>
          <Weather />
          {/* STATIC */}
        </authContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
