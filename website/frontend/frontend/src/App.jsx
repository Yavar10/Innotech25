import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import Scheme from "./pages/Scheme/Scheme";
import History from "./pages/History/History";
import Profile from "./pages/Profile/Profile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/history" element={<History/>} />
      <Route path="/Ld" element={<LandingPage/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/scheme" element={<Scheme/>} />
    </Routes>
  );
};

export default App;
