import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import {
  FaCalendarAlt,
  FaIdCardAlt,
  FaPhoneAlt,
  FaTrashAlt,
  FaUsers
} from "react-icons/fa";
import { FaClock, FaRepeat } from "react-icons/fa6";

const UserManagementTable = () => {
  const { user, fetchUsersData, deleteUser } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    fetchUsersData();
  }, []);

  const filteredData = user.filter(item => {
    const searchMatches =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item._id.includes(searchQuery);

    return searchMatches;
  });

  return (
    <div className="flex flex-col">
      <h1 className="text-xl pl-4 font-bold text-mainThemeColor flex items-center mb-4 text-left">
        <FaUsers size={30} className="mr-4" />
        System Users List
      </h1>
      <div className="flex items-center justify-between mt-2 mb-4 px-2 w-full">
        <form className="px-4 mt-4 mb-6 w-[80%]">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-bold text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className=" shadow-md block w-full p-4 pl-10 text-sm  focus:bg-gray-50 outline-none text-gray-900 border border-gray-100 rounded-lg bg-gray-white"
              placeholder="Search By name And ID"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} // Update search query state
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <button className="flex items-center bg-green-600 rounded-md px-6 py-3 shadow-md mb-1 font-bold text-white">
          <FaRepeat className="mr-4" /> Refresh Data
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 px-3 py-3 w-full place-items-center">
        {filteredData.map(item =>
          <div
            key={item._id}
            className="bg-gray-50 flex flex-col overflow-hidden pb-1 w-[21em] border-l-[6px] shadow-md border-indigo-400 rounded-r-xl"
          >
            <div className="mb-2 bg-indigo-400 text-white flex items-center justify-between px-3 font-bold py-2">
              <p className="flex items-center">
                <span className="w-8 h-8 mr-4 rounded-full bg-white text-indigo-400 p-2 font-bold text-lg flex items-center justify-center">
                  {item.name[0].toUpperCase()}
                </span>
                {item.name.toUpperCase()}
              </p>
              <span className="rounded-full delete p-2 flex items-center justify-center hover:bg-[#ffffff30]">
                <FaTrashAlt
                  size={16}
                  className="text-white  cursor-pointer"
                  onClick={() => deleteUser(item._id)}
                />
              </span>
            </div>
            <div className="flex flex-col px-2 text-mainThemeColor text-sm">
              <p className="mb-2 bg-gray-100 shadow-sm flex items-center justify-between font-bold px-3 py-2 rounded-sm">
                <span className="flex items-center font-bold">
                  <FaIdCardAlt className="mr-2" /> ID Number
                </span>
                {item.idNumber}
              </p>
              <p className="mb-2 bg-gray-100 shadow-sm flex items-center justify-between px-3 py-2 rounded-sm">
                <span className="flex items-center font-bold">
                  <FaPhoneAlt className="mr-2" /> Phone Number
                </span>
                +251 {item.phoneNumber}
              </p>
              <p className="mb-2 bg-gray-100 shadow-sm flex items-center justify-between px-3 py-2 rounded-sm">
                <span className="flex items-center font-bold">
                  <FaCalendarAlt className="mr-2" /> Created At Date
                </span>
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-2 bg-gray-100 shadow-sm flex items-center justify-between px-3 py-2 rounded-sm">
                <span className="flex items-center font-bold">
                  <FaClock className="mr-2" /> Created At Time
                </span>
                {new Date(item.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementTable;
