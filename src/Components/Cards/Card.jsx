import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Card({ name, date, imageUrl, vote }) {
  const getPathColor = (vote) => {
    if (vote < 4.5) return "red";
    if (vote < 7) return "#CFD331";
    return "green";
  };

  return (
    <div className="w-[130px] xl:w-[200px]">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500/${imageUrl}`}
          alt={name}
          className="rounded-lg w-full"
        />
        <div className="absolute bottom-[-10px] right-[-5px] w-8 xl:w-12">
          <CircularProgressbar
            value={Math.round(vote * 10)}
            text={`${Math.round(vote * 10)}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: getPathColor(vote),
              trailColor: "grey",
              textSize: "24px",
              backgroundColor: "#022540",
              backgroundPadding: 4,
            })}
            background
            className="transition-transform cursor-pointer hover:scale-110"
          />
        </div>
      </div>
      <h1 className="font-bold text-lg text-center xl:text-2xl mt-2">{name}</h1>
      <p className="text-center">{date}</p>
    </div>
  );
}

export default Card;
