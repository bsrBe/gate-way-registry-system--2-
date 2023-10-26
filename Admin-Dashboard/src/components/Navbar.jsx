import React from "react";
import logoHeader from "/header-img.png";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMoon,
  FaSun,
  FaDesktop
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = ({ content, chevronTrue, icon, profile, name }) => {
  return (
    <header className="w-full sticky top-0 z-50 p-1 bg-white">
      <h1 className="text-mainThemeColor border-[.25px] border-gray-200 sticky top-0 bg-white flex flex-col items-center rounded-lg p-1 shadow-sm mb-4 text-lg font-bold">
        <img
          src={logoHeader}
          alt="Logo of Ethiopian federal Police"
          loading="lazy"
          className="w-full h-[5.8em] object-cover"
        />
        <div className="flex items-center w-full justify-between p-1">
          <div className="flex items-center">
            {icon}
            {content}
          </div>
          {chevronTrue &&
            <p className="text-sm mx-4 font-bold">(25) hits per page</p>}
          {profile &&
            <div className="flex ">
              
                <Link to="/profile" className="px-2 py-[0.25em] bg-gray-100 shadow-sm rounded-full flex items-center">
                  <div className="h-8 mr-3 profile w-8 bg-mainThemeColor rounded-full text-xl flex items-center justify-center text-white">
                    {name[0].toUpperCase()}
                  </div>
                  <p className="text-sm">{ name}</p>
                 
                </Link>
            </div>}
        </div>
      </h1>
    </header>
  );
};

export default Navbar;
