import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Screens/HomePage";
import MovieDetails from "./Components/Screens/MovieDetails";
import PersonDetails from "./Components/Screens/PersonDetails";
import Favourite from "./Components/Others/Favourites";
import Watchlist from "./Components/Others/Watchlist";
import Login from "./Components/Others/Login";
import { UserProvider } from "./context/UserContext";
import Navbar from "./Components/Others/Navbar";
import Footer from "./Components/Others/Footer";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:id" element={<MovieDetails />} />
            <Route path="/biography/:id" element={<PersonDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
