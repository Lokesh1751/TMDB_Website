import React from "react";
import HeroSection from "../Api_Fetch/HeroSection";
import Oscars from "../Others/Oscars";
import TrendingSection from "../Api_Fetch/TrendingSection";
import PopularSection from "../Api_Fetch/PopularSection";

function HomePage() {
  document.title = "The Movie Database (TMDB)";
  return (
    <div>
      <HeroSection />
      <Oscars />
      <TrendingSection />
      <PopularSection />
    </div>
  );
}

export default HomePage;
