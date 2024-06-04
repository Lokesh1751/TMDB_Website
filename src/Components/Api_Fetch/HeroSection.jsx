import React, { useState, useEffect } from "react";

function HeroSection() {
  const [movies, setMovies] = useState([]);
  const [randomMovieIndex, setRandomMovieIndex] = useState(null);
  const apiKey = "5e5f8751bb26571c68636e877ecc857f";

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
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
  }, [apiKey]);

  useEffect(() => {
    if (movies.length > 0) {
      const randomNumber = Math.floor(Math.random() * movies.length);
      setRandomMovieIndex(randomNumber);
    }
  }, [movies]);

  return (
    <div className="flex justify-center items-center xl:p-0">
      <div
        className="w-full h-[350px]  bg-opacity-50 bg-cover bg-center flex justify-center p-7 flex-col xl:w-[90%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${movies[randomMovieIndex]?.poster_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-white text-3xl sm:text-4xl xl:text-5xl font-bold">
          Welcome.
        </h1>
        <p className="text-white text-lg sm:text-xl xl:text-3xl font-bold mt-4 xl:mt-2">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4  mt-6 sm:mt-10">
          <input
            type="text"
            placeholder="Search for a movie, tv show, person......"
            className="p-3 rounded-full w-full sm:w-[75%] xl:w-[80%] outline-none mb-4 sm:mb-0"
          />
          <button className="bg-gradient-to-r from-[rgba(1,180,228,1)] to-[rgba(30,213,169,1)] rounded-full w-full sm:w-[20%] xl:w-[15%] h-[50px] text-white">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
