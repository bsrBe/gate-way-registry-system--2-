import React, { useContext, useState } from "react";
import { SideBar, Navbar } from "../components";
import { FaSearch } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import AppContext from "../context/AppContext";

const Search = () => {
  const { collapse } = useContext(AppContext);

  const [underline, setUnderline] = useState({
    visitors: true,
    weapons: false,
    vehicles: false
  });

  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-hidden h-[100svh]  flex-col bg-white  pl-4 py-1`}
      >
        <Navbar
          icon={<FaSearch size={22} className="mr-4" />}
          content="Search"
          chevronTrue={false}
        />
        <div className="flex items-center px-2 pt-4 border-[2px] border-transparent bg-gray-50 border-b-gray-400 text-mainThemeColor font-bold">
          <Link
            to="/search"
            onClick={e =>
              setUnderline(prev => ({
                ...prev,
                visitors: true,
                weapons: false,
                vehicles: false
              }))}
          >
            <p
              className={`mr-6 border-[2.75px] border-transparent ${underline.visitors
                ? "border-b-mainThemeColor"
                : undefined}`}
            >
              Search Weapons Owner
            </p>
          </Link>

          <Link
            to="/search/visitors"
            onClick={e =>
              setUnderline(prev => ({
                ...prev,
                visitors: false,
                weapons: true,
                vehicles: false
              }))}
          >
            <p
              className={`mr-6 border-[2.75px] border-transparent ${underline.weapons
                ? "border-b-mainThemeColor"
                : undefined}`}
            >
              Search Vistors
            </p>
          </Link>

          <Link
            to="/search/vehicles"
            onClick={e =>
              setUnderline(prev => ({
                ...prev,
                visitors: false,
                weapons: false,
                vehicles: true
              }))}
          >
            <p
              className={`mr-6 border-[2.75px] border-transparent ${underline.vehicles
                ? "border-b-mainThemeColor"
                : undefined}`}
            >
              Search Vehicles
            </p>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
