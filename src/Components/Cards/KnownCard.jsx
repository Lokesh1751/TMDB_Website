import React from "react";

function KnownCard({ url, name }) {
  return (
    <div className="w-48 flex-shrink-0">
      <img
        src={`https://image.tmdb.org/t/p/w200${url}`}
        alt={name}
        className="rounded-lg  h-[250px]"
      />
      <p className="text-center mt-2 ">{name}</p>
    </div>
  );
}

export default KnownCard;
