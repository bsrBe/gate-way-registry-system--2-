import React, { useContext, useEffect, useState } from "react";
import Logo from "../assets/image/logo.png";
import axios from "axios";
import { Button } from "../components";
import { Outlet, Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className=" bg-mainThemeColor w-full bg-blend-normal bg-repeat bg-center bg-contain h-[100svh]">
      <div className="flex items-center h-full w-full bg-[#00000090] justify-center">
        <div className="flex items-center w-[50em] shadow-xl bg-[#0c2a5c] p-3 rounded-lg  text-accentColor">
          <div className="flex flex-col w-full items-center justify-center">
            <img
              loading="lazy"
              src={Logo}
              className="h-[18em] w-[18em] object-cover mr-4"
              alt=""
            />
            <h1 className="text-2xl font-bold text-accentColor text-center my-4">
              Ethiopian Federal Police <br />
              የኢትዮጵያ ፌደራል ፖሊስ
            </h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
