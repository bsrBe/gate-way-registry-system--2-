import React, { useContext, useEffect, useState } from "react";
import { FaPen, FaTrashCan } from "react-icons/fa6";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";

const ArmsTable = () => {
  const {
    collapse,
    deleteWeaponsData,
    weaponsData,
    fetchWeaponsData,
    handleSidebarCollapse
  } = useContext(AppContext);

  useEffect(() => {
    fetchWeaponsData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's data
  const currentWeapons = weaponsData.slice(startIndex, endIndex);

  // Function to handle pagination button click
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <div className="table w-[100%] mx-auto">
      <div className="w-full">
        <div className="border-b w-full border-gray-200 shadow">
          <div className="mb-4 mr-2 flex justify-end">
            {/* Previous Page Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mr-2 bg-gray-300 text-gray-600 rounded-md"
            >
              Previous
            </button>
            {/* Next Page Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= weaponsData.length}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md"
            >
              Next
            </button>
          </div>
          <table className="divide-y w-full divide-gray-300 ">
            <thead className="bg-[#272727] sticky top-[10.5em]">
              <tr>
                <th className="px-1 text-start py-2 text-xs text-white">ID</th>
                <th className="px-1 text-start py-2 text-xs text-white">
                  Full-Name
                </th>
                <th className="px-1 text-start py-2 text-xs text-white">
                  Rank
                </th>
                <th className="px-1 text-start py-2 text-xs text-white">
                  Date
                </th>
                <th className="px-1 text-start py-2 text-xs text-white">
                  Time
                </th>
                <th className="px-1 text-start py-2 text-xs text-white">
                  Coupon-Number
                </th>
                <th className="px-1 text-start py-2 text-xs text-white">
                  Weapon's-Type
                </th>
                <th className="px-1 text-start py-2 text-xs text-white">
                  Weapon's-ID
                </th>
                <th className="px-1 text-start py-2 text-xs text-white">
                  Oficer-On-Duty
                </th>
                <th className="px-1 text-start py-2 text-xs text-white">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {currentWeapons.map(item => {
                const Id = item._id;
                return (
                  <tr key={item._id} className="whitespace-nowrap">
                    <td
                      className="px-1 py-2 text-sm text-gray-500"
                      onClick={
                        collapse == false ? handleSidebarCollapse : undefined
                      }
                    >
                      {collapse ? undefined : "..."}
                      {collapse ? Id : Id.substring(21)}
                    </td>

                    <td className="px-1 py-2 border border-gray-300">
                      <div className="text-sm text-gray-900">
                        {item.name}
                      </div>
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.rank}
                    </td>
                    <td className="px-1 py-2">
                      <div className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-1 py-2">
                      <div className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.couponNumber}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.weaponsType}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.weaponId}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.officerOnDuty}
                    </td>
                    <td className="px-1 flex justify-center border items-center border-gray-200 py-2">
                      <Link to={`/editarms/${item._id}`}>
                        <FaPen
                          size={22}
                          className="px-1 py-1 text-sm hover:bg-gray-300 rounded-md text-indigo-600 cursor-pointer mr-2"
                        />
                      </Link>

                      <FaTrashCan
                        size={22}
                        onClick={() => deleteWeaponsData(Id)}
                        className="px-1 py-1 text-sm hover:bg-gray-300 text-red-600 rounded-md cursor-pointer"
                      />
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

export default ArmsTable;
