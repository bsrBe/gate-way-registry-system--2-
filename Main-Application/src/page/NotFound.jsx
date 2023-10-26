import React from "react";
import logo from "/logo.png";

const NotFound = () => {
  return (
    <div className="w-full text-white bg-mainThemeColor flex flex-col items-center justify-center h-[100svh]">
      <img src={logo} className="h-[18em] w-[18em]" alt="" />
      <h1 className="text-4xl font-bold mt-4 flex items-center">
        404 
      </h1>
      <h1 className="font-bold text-xl mt-2">Page NotFound!!!</h1>
    </div>
  );
};

export default NotFound;
