import React from "react";
import logoHeader from "/header-img.png";

const Navbar = ({ content, chevronTrue, icon }) => {
  return (
    <header className="w-full sticky top-0 z-50 p-1 bg-white">
      <h1 className="text-mainThemeColor border-[.25px] border-gray-200 sticky top-0 bg-white flex flex-col items-center rounded-lg p-1 shadow-sm mb-4 text-lg font-bold">
        <img
          src={logoHeader}
          alt="Logo of Ethiopian federal Police"
          className="w-full h-[5.8em] object-cover"
        />
        <div className="flex items-center w-full justify-between p-1">
          <div className="flex items-center">
            {icon}
            {content}
          </div>
          {chevronTrue &&
            <p className="text-sm mx-4 font-bold">
              <span className="font-bold text-[16px]">Recent</span> ( 1-30)
            </p>}
        </div>
      </h1>
    </header>
  );
};

export default Navbar;
