import React, { useContext, useState } from "react";
import { downloadExcel } from "react-export-table-to-excel";
import AppContext from "../context/AppContext";
import { FaFileExcel, FaFilter } from "react-icons/fa6";

const VehiclesReportTable = () => {
  const { vehicleData, collapse, handleSidebarCollapse } = useContext(
    AppContext
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(vehicleData);

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setEndDate(e.target.value);
  };

  const filterData = () => {
    const filtered = vehicleData.filter(item => {
      const date = new Date(item.date);
      return (
        (!startDate || date >= new Date(startDate)) &&
        (!endDate || date <= new Date(endDate))
      );
    });
    setFilteredData(filtered);
  };

  // Assuming visitorsData is an array of objects with the following structure:
  // { firstname: string, lastname: string, age: number }

  const header = [
    "ID",
    "Full-Name",
    "ID-Number",
    "Vehicle-Type",
    "Destination-Office",
    "Date",
    "License-Plate-Number",
    "officer-On-Duty"
  ];

  // Map the data from visitorsData to match the structure of body2
  const body2 = filteredData.map(item => ({
    _id: item._id,
    vehicleOwner: item.vehicleOwner,
    idnumber: item.idnumber,
    vehicleType: item.vehicleType,
    destinationOffice: item.destinationOffice,
    date: item.date,
    licensePlateNumber: item.licensePlateNumber,
    RegionalCode:item.RegionalCode,
    officerOnDuty: item.officerOnDuty
  }));

  function handleDownloadExcel() {
    downloadExcel({
      fileName: `VehicleData-Report from ${startDate} to ${endDate}.xlsx`, // Set your desired file name here
      sheet: "VehicleData",
      tablePayload: {
        header,
        body: body2
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 px-4">
        <div className="flex my-6 items-center">
          <div className="flex flex-col text-xs">
            <label htmlFor="startDate">Report Start Date:</label>
            <input
              type="date"
              id="startDate"
              className="px-6 mt-2 py-2 border-2 outline-none mr-4 border-[#6495ed] rounded-md"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="endDate">Report End Date:</label>
            <input
              type="date"
              id="endDate"
              className="px-6 mt-2 py-2 border-2 outline-none mr-4 border-[#6495ed] rounded-md"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button
            className="px-6 py-2 flex items-center self-end rounded-md bg-indigo-700 text-white"
            onClick={filterData}
          >
            <FaFilter size={15} className="mr-4" />
            Filter
          </button>
        </div>
        <button
          onClick={handleDownloadExcel}
          className="p-2 bg-green-500 font-bold flex rounded-md mb-6 self-end text-white items-center"
        >
          <FaFileExcel className="mr-4" /> Download As Excel
        </button>
      </div>
      <div className="table w-[100%] mx-auto rounded-lg">
        <div className="w-full">
          <div className="border-b w-full border-gray-200 shadow ">
            <table border="1" className="divide-y w-full divide-gray-300 ">
              <thead className="bg-[#272727] sticky top-[8.8em]">
                <tr>
                  <th className="px-1 text-start  py-2 text-sm font-bold text-white">
                    ID
                  </th>
                  <th className="px-1 text-start  py-2 text-sm font-bold text-white">
                    Vehicle-Owner
                  </th>
                  <th className="px-1 text-start   py-2 text-sm font-bold text-white">
                    ID-Number
                  </th>
                  <th className="px-1 text-start  py-2 text-sm font-bold text-white">
                    Vehicle-Type
                  </th>
                  <th className="px-1 text-start  py-2 text-sm font-bold text-white">
                    Office
                  </th>
                  <th className="px-1 text-start  py-2 text-sm font-bold text-white">
                    Officer-OnDuty
                  </th>
                  <th className="px-1 text-start  py-2 text-sm font-bold text-white">
                    License-Plate-No
                  </th>
                  <th className="px-1 text-start  py-2 text-sm font-bold text-white">
                    Date
                  </th>
                  <th className="px-1 text-start  py-2 text-sm font-bold text-white">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {body2.map(item => {
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesReportTable;
