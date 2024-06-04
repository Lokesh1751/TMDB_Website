import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";

function Trailer({ movieid, url, mainurl, playTrailer }) {
  const [trailer, setTrailer] = useState(null);
  const playerRef = useRef(null); // Ref for the YouTube player

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let url = `https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        const data = await response.json();
        const filteredTrailer = data.results.find(
          (item) => item.site === "YouTube" && item.type === "Trailer"
        );
        setTrailer(filteredTrailer);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [apiKey, movieid]);

  useEffect(() => {
    if (playTrailer && playerRef.current) {
      playerRef.current.internalPlayer.playVideo(); // Autoplay the video when playTrailer is true
    }
  }, [playTrailer]);

  if (!trailer) return null;

  const videoOptions = {
    height: "400",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  const videoId = trailer.key;

  return (
    <div>
      <h1 className="p-4 text-2xl">Trailer</h1>
      <div className="flex w-full p-4 rounded-lg overflow-x-auto">
        <YouTube videoId={videoId} opts={videoOptions} ref={playerRef} />
        <img
          src={`https://image.tmdb.org/t/p/w500/${url}`}
          alt="movie title"
          className="h-[400px] w-[640px]"
        />
        <img
          src={`https://image.tmdb.org/t/p/w500/${mainurl}`}
          alt="movie title"
          className="h-[400px] w-[640px]"
        />
      </div>
    </div>
  );
}

export default Trailer;
