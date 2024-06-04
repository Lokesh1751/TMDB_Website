import React, { useState, useEffect } from "react";
import "../App.css";
import TrendingData from "../Others/TrendingData";

function PopularSection() {
  const [option, setOption] = useState("popular");
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${option}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trending movies");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, [apiKey, option]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[90%]  xl:pl-0 ">
        <div className="w-full  flex flex-col p-2 gap-2 xl:gap-6 xl:p-7 xl:w-[90%] xl:flex-row">
          <h1 className="text-2xl text-center xl:text-4xl">What's Popular</h1>
          <button className="border-none border-[2px] rounded-[20px] pb-3 mr-3">
            <span
              className={option === "popular" ? "custom-style" : "simple"}
              onClick={() => setOption("popular")}
            >
              Popular
            </span>
            <span
              className={option === "top_rated" ? "custom-style" : "simple"}
              onClick={() => setOption("top_rated")}
            >
              Top
            </span>
            <span
              className={option === "upcoming" ? "custom-style" : "simple"}
              onClick={() => setOption("upcoming")}
            >
              Upcoming
            </span>
            <span
              className={option === "now_playing" ? "custom-style" : "simple"}
              onClick={() => setOption("now_playing")}
            >
              Playing
            </span>
          </button>
        </div>
        <TrendingData movies={movies} />
      </div>
    </div>
  );
}

export default PopularSection;
