import React, { useState, useEffect } from "react";
import KnownCard from "./KnownCard";
import { Link } from "react-router-dom";

function PersonCard({ id }) {
  const [details, setDetails] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        let url = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&append_to_response=movie_credits`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch person details");
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    fetchPersonDetails();
  }, [apiKey, id]);

  if (!details) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const { name, biography, profile_path, known_for_department, movie_credits } =
    details;
  const knownForMovies = movie_credits.cast;
  document.title = name;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row bg-white  rounded-lg p-6">
        <div className="flex flex-col items-center md:w-1/3 mb-6 md:mb-0">
          <img
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt={name}
            className="rounded-lg w-full md:w-2/3"
          />
          <div className="mt-6 w-full text-center md:text-center">
            <h2 className="text-xl font-semibold">Personal Info</h2>
            <p className="mt-2">
              <strong>Known For:</strong> {known_for_department}
            </p>
            <p className="mt-2">
              <strong>Known Credits:</strong> {movie_credits.cast.length}
            </p>
          </div>
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-3xl font-bold mb-4">{name}</h1>
          {biography && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Biography</h2>
              <p>{biography}</p>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Known For</h2>
            <div className="overflow-x-auto">
              <div className="flex space-x-4">
                {knownForMovies.map((movie) => (
                  <Link to={`/details/${movie.id}`}>
                    <KnownCard
                      name={movie.original_title}
                      url={movie.poster_path}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonCard;
