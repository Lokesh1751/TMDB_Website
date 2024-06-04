import React from "react";

function Card({ name, date, imageUrl }) {
  return (
    <div className="w-[130px] xl:w-[200px]">
      <img
        src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
        alt="movie title"
        className="rounded-lg"
      />
      <h1 className="font-bold text-lg text-center xl:text-2xl">{name}</h1>
      <p className="text-center">{date}</p>
    </div>
  );
}

export default Card;
