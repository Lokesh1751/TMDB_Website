import React, { useState, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import InputTag from "./InputTag";
import { FaTimes, FaHeart, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isClicked, setClicked] = useState(false);
  const { isLoggedIn, deleteUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicked(!isClicked);
  };

  const handleLogout = () => {
    logout();
    deleteUser();
    navigate("/");
  };

  return (
    <div className="bg-[#022540] flex items-center justify-between flex-wrap gap-4 xl:h-14">
      <div className="flex gap-6 flex-wrap items-center p-4 xl:ml-[200px]">
        <Link to="/">
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="The Movie Database (TMDB)"
            className="w-[140px] h-[20px]"
          />
        </Link>
        <p className="text-white cursor-pointer">
          {isLoggedIn ? (
            <Link to="/watchlist">
              <FaBookmark size={22} />
            </Link>
          ) : (
            <FaBookmark size={22} onClick={() => navigate("/login")} />
          )}
        </p>
        <p className="text-white cursor-pointer">
          {isLoggedIn ? (
            <Link to="/favourite">
              <FaHeart size={22} />
            </Link>
          ) : (
            <FaHeart size={22} onClick={() => navigate("/login")} />
          )}
        </p>
      </div>
      <div className="flex gap-4 flex-wrap items-center xl:mr-[200px]">
        {isLoggedIn ? (
          <p
            className="text-white cursor-pointer sm:block"
            onClick={handleLogout}
          >
            Logout
          </p>
        ) : (
          <p className="text-white cursor-pointer sm:block">
            <Link to="/login">Login</Link>
          </p>
        )}
        {isClicked ? (
          <FaTimes
            className="text-[#00B5E5] w-6 h-6 mr-3 font-extrabold cursor-pointer"
            onClick={handleClick}
          />
        ) : (
          <AiOutlineSearch
            className="text-[#00B5E5] w-6 h-6 mr-3 font-extrabold cursor-pointer"
            onClick={handleClick}
          />
        )}
      </div>
      <InputTag check={isClicked} setVisibility={setClicked} />
    </div>
  );
}

export default Navbar;
