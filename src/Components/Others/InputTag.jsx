import React, { useState, useEffect } from "react";
import SearchData from "../Api_Fetch/SearchData";
import { FaTimes } from "react-icons/fa";

function InputTag({ check, setVisibility }) {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!check) {
      setSearchQuery("");
    }
  }, [check]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div
      className={
        check
          ? "bg-white absolute top-12 z-20 w-full rounded-md p-1 xl:top-14"
          : "hidden"
      }
    >
      <div className="relative">
        <input
          type="text"
          placeholder="&#128269; Search for a movie, tv show, person......"
          className="outline-none ml-0 bg-white w-full xl:ml-28 p-2"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {searchQuery && (
          <FaTimes
            className="absolute right-4 top-3 text-gray-500 cursor-pointer"
            onClick={handleClear}
          />
        )}
      </div>
      <hr />
      <SearchData searchQuery={searchQuery} setVisibility={setVisibility} />
    </div>
  );
}

export default InputTag;
