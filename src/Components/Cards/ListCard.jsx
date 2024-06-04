import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
function ListCard({ item, type }) {
  const { removeFromWatchlist, removeFromBookmarks } = useContext(UserContext);

  const handleRemove = () => {
    if (type === "watchlist") {
      removeFromWatchlist(item);
    } else {
      removeFromBookmarks(item);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-[#022540] h-full rounded-lg overflow-hidden shadow-md">
        {item.poster_path && (
          <Link to={`/details/${item.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt={item.title}
              className="w-full h-64 object-cover"
            />
          </Link>
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white">{item.title}</h2>
          <p className="text-gray-400 mt-2">{item.tagline}</p>
          <p className="text-gray-300 mt-4">{item.overview}</p>
          <button
            onClick={handleRemove}
            className="mt-4 flex items-center text-white "
          >
            <FaTrash className="mr-2 ml-1  hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListCard;
