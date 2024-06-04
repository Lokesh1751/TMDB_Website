import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../Cards/MovieCard";
import StarCast from "../Api_Fetch/StarCast";
import Crew from "../Api_Fetch/StarCrew";
import Trailer from "../Api_Fetch/Trailer";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const trailerRef = useRef(null); // Create a ref for the Trailer component
  const [playTrailer, setPlayTrailer] = useState(false); // State to manage trailer playback

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [apiKey, id]);

  const handlePlayTrailer = () => {
    setPlayTrailer(true);
    trailerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {movie && <MovieCard movie={movie} onPlayTrailer={handlePlayTrailer} />}
      <StarCast movieid={id} />
      <Crew movieid={id} />
      <div ref={trailerRef}>
        {" "}
        {/* Attach ref to Trailer component */}
        <Trailer
          movieid={id}
          url={movie && movie.backdrop_path}
          mainurl={movie && movie.poster_path}
          playTrailer={playTrailer}
        />
      </div>
    </div>
  );
}

export default MovieDetails;
