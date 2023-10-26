import React, { useContext, useState } from "react";
import { Button } from "../components";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa6";
import AppContext from "../context/AppContext";

const ArmSearchCard = () => {
  const { visitorsData, collapse, handleSidebarCollapse } = useContext(
    AppContext
  );

  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const filteredData = visitorsData.filter(item => {
    const searchMatches =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item._id.includes(searchQuery);

    return searchMatches;
  });

  return (
    <div className="table w-[100%] mx-auto rounded-lg">
      <div className="w-full">
        <div className="border-b w-full border-gray-200 shadow">
          <form className="px-4 mt-4">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
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

          <table border="1" className="divide-y w-full divide-gray-300 mt-8">
            {/* Table header */}
            <thead className="bg-[#272727] sticky top-[11em]">
              <tr>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  ID
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Visitor Name
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  ID Number
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  City/Zone
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Sub-City
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  District
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Phone Number
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Office
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Officer On Duty
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Date
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Edit
                </th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="bg-white divide-y divide-gray-300">
              {filteredData.map(item => {
                const Id = item._id;
                const IdShort = Id.substring(21);

                return (
                  <tr key={item._id} className="whitespace-nowrap">
                    <td
                      onClick={
                        collapse == false ? handleSidebarCollapse : undefined
                      }
                      className="px-1  py-2 text-sm text-gray-500"
                    >
                      {collapse ? undefined : "..."}
                      {collapse ? Id : IdShort}
                    </td>
                    <td className="px-1 py-2">
                      <div className="text-sm text-gray-900">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.idNumber}
                    </td>
                    <td className="px-1 py-2">
                      <div className="text-sm text-gray-500">
                        {item.city}
                      </div>
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.subCity}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.district}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      +251 {item.phoneNumber}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.destinationOffice}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.officerOnDuty}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {new Date(item.date).toLocaleString()}
                    </td>
                    <td className="px-1 flex items-center border-gray-200 py-2">
                      {/* <Link to={`/editvisitors/${item._id}`}>
                        <FaPen
                          size={24}
                          className="px-1 py-1 text-sm hover:bg-gray-300 rounded-md text-indigo-600 cursor-pointer mr-2"
                        />
                      </Link> */}

                      <Link to={`/visitorsreregister/${item._id}`}>
                        <Button
                          buttonContent="Reregister"
                          sm="12px"
                          px=".5em"
                          py=".25em"
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArmSearchCard;
