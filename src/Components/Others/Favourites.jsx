import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ListCard from "../Cards/ListCard";

function Favourites() {
  const { watchlist } = useContext(UserContext);
  document.title = "Favourites";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[rgb(2,37,64)] text-center ">
        Favourites
      </h1>
      {watchlist.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((item) => (
            <ListCard key={item.id} item={item} type={"watchlist"} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6598/6598519.png"
            className=""
            alt=""
          />
          <p className="text-black text-center text-4xl mt-8 font-bold">
            Your Favourites list is empty.
          </p>
        </div>
      )}
    </div>
  );
}

export default Favourites;
