import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDebounce } from "../Debounce/debounce";

function SearchData({ searchQuery, setVisibility }) {
  const [movies, setMovies] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const debouncesearch = useDebounce(searchQuery);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=movie`;
        if (searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
            debouncesearch
          )}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [apiKey, debouncesearch]);

  return (
    <div className="flex flex-wrap">
      {movies.length === 0 ? (
        <div className="text-2xl text-center w-full">No results found 😞 </div>
      ) : (
        movies.map((item, index) => (
          <div key={index} className="bg-white w-full rounded-md m-[5px]">
            <Link
              to={`/details/${item.id}`}
              onClick={() => {
                setVisibility(false);
              }}
            >
              <h3 className="ml-0 xl:ml-28 flex flex-row gap-2">
                <FaSearch /> {item.title}
              </h3>
            </Link>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default SearchData;
