import React, { useState } from "react";

function Oscars() {
  return (
    <div className="flex justify-center items-center  xl:p-0">
      <div className="w-full h-[180px] gap-4 bg-gradient-to-r from-[#4859AB] to-[#80B1CD] flex justify-center p-7 flex-col xl:w-[90%]">
        <img
          src="https://www.themoviedb.org/assets/2/awards-preview/oscars-2024-title-f69161f90ed90871e9fe79439ea7e9280e03f3cb896b8d35d5d37b6711d00913.svg"
          alt=""
          className="w-[200px]  xl:w-[300px]"
        />
        <button className="rounded-full border-[3px] text-[12px] p-2 w-[55%] border-white xl:w-[210px] h-[50px]   text-white  font-bold hover:bg-white hover:text-[#4859AB] transition duration-300 xl:text-xl">
          View the Winners →
        </button>
      </div>
    </div>
  );
}

export default Oscars;
