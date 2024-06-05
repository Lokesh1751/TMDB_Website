import React from "react";
import Card from "../Cards/Card";
import { Link } from "react-router-dom";

function TrendingData({ movies }) {
  return (
    <div className="flex w-full overflow-x-auto gap-2 cursor-pointer bg-gradient-to-r from-white ">
      {movies.map((item, index) => {
        return (
          <div>
            {" "}
            <Link to={`/details/${item.id}`}>
              <Card
                key={index}
                name={item.title}
                date={item.release_date}
                imageUrl={item.poster_path}
                vote={item.vote_average}
                
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default TrendingData;
