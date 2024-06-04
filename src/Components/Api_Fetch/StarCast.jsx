import React, { useState, useEffect } from "react";
import StarCard from "../Cards/StarCard";
import { Link } from "react-router-dom";

function StarCast({ movieid }) {
  const [starcast, setstarcast] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        let url = `https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movie");
        }
        const data = await response.json();
        // Filter out cast members without a profile path
        const filteredStarcast = data.cast.filter(
          (item) => item.profile_path !== null && item.character !== null
        );
        setstarcast(filteredStarcast);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [apiKey, movieid]);

  return (
    <div className="w-full">
      <h1 className="p-4 text-2xl">Top Billed Cast</h1>
      <div className="flex  p-4   overflow-x-auto gap-2 cursor-pointer">
        {starcast &&
          starcast.map((item, index) => (
            <div key={index} className="shadow-lg rounded-lg">
              <Link to={`/biography/${item.id}`}>
                <StarCard
                  name={item.original_name}
                  character={item.character}
                  imageUrl={item.profile_path}
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default StarCast;
