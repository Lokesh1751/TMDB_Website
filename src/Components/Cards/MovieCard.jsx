import React, { useState, useEffect, useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaHeart, FaBookmark, FaBars } from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";

import { UserContext } from "../../context/UserContext";

function MovieCard({ movie, onPlayTrailer }) {
  const [providers, setProviders] = useState(null);
  const {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    bookmarks,
    addToBookmarks,
    removeFromBookmarks,
    isLoggedIn,
  } = useContext(UserContext);

  const isInWatchlist = watchlist.some((item) => item.id === movie.id);
  const isInBookmarks = bookmarks.some((item) => item.id === movie.id);

  const handleWatchlistToggle = () => {
    if (isLoggedIn) {
      if (isInWatchlist) {
        removeFromWatchlist(movie);
      } else {
        addToWatchlist(movie);
      }
    }
  };

  useEffect(() => {
    const isWatchlisted = watchlist.some((item) => item.id === movie.id);
    console.log(isWatchlisted, "check");
  }, [watchlist, movie.id]);

  const handleBookmarkToggle = () => {
    if (isLoggedIn) {
      if (isInBookmarks) {
        removeFromBookmarks(movie);
      } else {
        addToBookmarks(movie);
      }
    } else {
      history.push("/login");
    }
  };

  const apiKey = "5e5f8751bb26571c68636e877ecc857f";
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to Fetch");
        }
        const data = await response.json();
        setProviders(data.results.US.buy[0]);
      } catch (error) {
        console.log("Error Message : ", error);
      }
    };
    fetchMovies();
  }, [movie.id, apiKey]);

  const convertRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    if (minutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${minutes}m`;
  };
  document.title = movie.original_title;
  return (
    <div
      className="w-full p-4 md:p-8 gap-4 flex flex-col bg-gray-400 background-bottom-right xl:flex-row"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      {/* Poster image */}
      <div className="flex flex-col justify-center items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie title"
          className="rounded-lg w-[300px] max-w-[300px] h-[450px] overflow-hidden"
        />
        {providers && (
          <div className="flex flex-row rounded-lg gap-2 justify-center items-center p-2 bg-[#022540] w-[300px] max-w-[300px] overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${providers.logo_path}`}
              alt=""
              className="w-[50px] h-[50px] p-1"
            />
            <div className="flex flex-col p-1">
              <p className="text-[#9CA9B2] text-[14px]">
                Available to Rent or Buy
              </p>
              <p className="text-[#FFF] text-[16px]">Watch Now</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col pl-4 w-full xl:w-auto">
        {/* Movie details */}
        <div className="flex flex-row text-center gap-2 pt-2 md:pt-6 text-xl md:text-3xl">
          <h1 className="text-white text-md xl:text-md xl:font-bold">
            {movie.original_title}
          </h1>
          <h1 className="text-gray-300 text-md xl:text-md">
            ({movie.release_date.slice(0, 4)})
          </h1>
        </div>
        <div className="flex flex-col gap-2 xl:flex-row">
          <p className="text-gray-300 text-md">
            {movie.release_date} (
            {(movie.production_companies &&
              movie.production_companies[0] &&
              movie.production_companies[0].origin_country) ||
              "IN"}
            )
          </p>
          <p className="text-white text-sm md:text-md">
            . {movie.genres[0].name} . {convertRuntime(movie.runtime)}
          </p>
        </div>
        {/* User Score */}
        <div className="flex items-center mb-5 mt-5 md:mb-4 gap-6 md:mt-4">
          <div className="w-16">
            <CircularProgressbar
              value={Math.round(movie.vote_average * 10, 1)}
              text={`${Math.round(movie.vote_average * 10, 1)}%`}
              styles={buildStyles({
                textColor: "white",
                pathColor:
                  Math.round(movie.vote_average * 10, 1) < 70
                    ? "#CFD331"
                    : "green",
                trailColor: "grey",
                textSize: "24px",
                backgroundColor: "#022540",
                backgroundPadding: 6,
              })}
              background
              className="transition-transform cursor-pointer hover:scale-110"
            />
          </div>
          <p className="text-white text-[20px] md:text-[15px]">User Score</p>
          <button className="bg-[#022540] text-white text-lg md:text-md p-1 md:p-2 ml-2 md:ml-4 rounded-2xl transition-transform hover:scale-110">
            What's your <span className="border-b-2 border-blue-500">Vibe</span>
            ?
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-row flex-wrap gap-8 items-center">
          {isLoggedIn ? (
            <>
              <span
                className={`p-3 md:p-2 xl:p-4 rounded-full transition-transform hover:scale-110 ${
                  isInWatchlist ? "bg-green-800" : "bg-[#022540]"
                }`}
                onClick={handleWatchlistToggle}
              >
                <FaHeart className="text-white text-xs md:text-sm" />
              </span>
              <span
                className={`p-3 md:p-2 xl:p-4 rounded-full transition-transform hover:scale-110 ${
                  isInBookmarks ? "bg-green-800" : "bg-[#022540]"
                }`}
                onClick={handleBookmarkToggle}
              >
                <FaBookmark className="text-white text-xs md:text-sm" />
              </span>
            </>
          ) : (
            <>
              <span className={`p-3 md:p-2 xl:p-4 rounded-full cursor-pointer`}>
                <FaHeart className="text-white text-xs md:text-sm" />
              </span>
              <span className={`p-3 md:p-2 xl:p-4 rounded-full cursor-pointer`}>
                <FaBookmark className="text-white text-xs md:text-sm" />
              </span>
            </>
          )}
          <span className="bg-[#022540] p-3 md:p-2 xl:p-4 rounded-full">
            <FaBars className="text-white text-xs md:text-sm" />
          </span>
          <button
            onClick={onPlayTrailer}
            className="flex flex-row gap-1 md:gap-2 text-white text-xs md:text-sm transition-transform hover:scale-110"
          >
            <BsPlayFill className="text-lg md:text-2xl" /> Play Trailer
          </button>
        </div>
        <div className="mt-8">
          <p className="text-gray-300">{movie.tagline}</p>
          <h1 className="text-xl text-white">Overview</h1>
          <p className="text-white xl:w-[50%]">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
