import React, { useState, useEffect } from "react";
import "../App.css";
import TrendingData from "../Others/TrendingData";

function TrendingSection() {
  const [option, setOption] = useState("day");
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/${option}?api_key=${apiKey}`
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
        <div className="w-full  flex flex-col text-center p-2 gap-2 xl:gap-6 xl:p-7 xl:w-[90%] xl:flex-row">
          <h1 className="text-2xl xl:text-4xl">Trending</h1>
          <button className="border-none border-[2px]  rounded-[20px] pb-3">
            <span
              className={option === "day" ? "custom-style" : "simple"}
              onClick={() => {
                setOption("day");
              }}
            >
              Today
            </span>
            <span
              className={option === "week" ? "custom-style" : "simple"}
              onClick={() => {
                setOption("week");
              }}
            >
              This Week
            </span>
          </button>
        </div>
        <TrendingData movies={movies} />
      </div>
    </div>
  );
}

export default TrendingSection;
