import React, { useContext, useState } from "react";
import { FaPen, FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

const VehiclesTable = () => {
  const {
    collapse,
    handleSidebarCollapse,
    deleteVehicleData,
    vehicleData
  } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the current page's data
  const currentVehicles = vehicleData.slice(startIndex, endIndex);

  // Function to handle pagination button click
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  return (
    <div className="table w-[100%] mx-auto rounded-lg">
      <div className="w-full">
        <div className="border-b w-full border-gray-200 shadow ">
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
              disabled={endIndex >= vehicleData.length}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md"
            >
              Next
            </button>
          </div>

          <table border="1" className="divide-y w-full divide-gray-300 ">
            <thead className="bg-[#272727] sticky top-[10.8em]">
              <tr>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  ID
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Vehicle-Owner
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  ID-Number
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Vehicle-Type
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Office
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Officer-OnDuty
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  License-Plate-No
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Date
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Time
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {currentVehicles.map(item => {
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
                        {item.vehicleOwner}
                      </div>
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.idnumber}
                    </td>
                    <td className="px-1 py-2">
                      <div className="text-sm text-gray-500">
                        {item.vehicleType}
                      </div>
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.destinationOffice}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {item.officerOnDuty}
                    </td>
                    <td className="px-1 flex items-center py-2 text-sm text-gray-500">
                      <p className="mr-2">{item.RegionalCode}</p>
                      {item.licensePlateNumber}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {new Date(item.date).toLocaleTimeString()}
                    </td>
                    <td className="px-1 flex items-center border-gray-200 py-2">
                      <Link to={`/editvehicles/${item._id}`}>
                        <FaPen
                          size={24}
                          className="px-1 py-1 text-sm hover:bg-gray-300 rounded-md text-indigo-600 cursor-pointer mr-2"
                        />
                      </Link>
                      <FaTrashCan
                        size={24}
                        onClick={() => deleteVehicleData(Id)}
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

export default VehiclesTable;
