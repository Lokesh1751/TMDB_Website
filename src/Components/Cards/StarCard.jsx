import React from "react";

function Card({ name, character, imageUrl }) {
  return (
    <div
      className="w-[130px] ;
       p-3  h-[280px] xl:w-[170px] xl:h-[330px] overflow-y-auto
"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
        alt="movie title"
        className="rounded-lg"
      />
      <h1 className="font-bold text-lg text-center xl:text-xl">{name}</h1>
      <p className="text-center text-md">{character}</p>
    </div>
  );
}

export default Card;
