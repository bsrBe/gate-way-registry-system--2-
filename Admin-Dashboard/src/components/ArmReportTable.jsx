import React, { useContext, useState } from "react";
import { downloadExcel } from "react-export-table-to-excel";
import AppContext from "../context/AppContext";
import { FaFileExcel, FaFilter } from "react-icons/fa6";

const ArmReportTable = () => {
  const { weaponsData, collapse, handleSidebarCollapse } = useContext(
    AppContext
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(weaponsData);

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setEndDate(e.target.value);
  };

  const filterData = () => {
    const filtered = weaponsData.filter(item => {
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
    "Rank",
    "Date",
    "Coupon-Number",
    "Weapons-Type",
    "Weapons-ID",
    "officer-On-Duty"
  ];

  // Map the data from visitorsData to match the structure of body2
  const body2 = filteredData.map(item => ({
    _id: item._id,
    name: item.name,
    rank: item.rank,
    date: item.date,
    couponNumber: item.couponNumber,
    weaponsType: item.weaponsType,
    weaponId: item.weaponId,
    officerOnDuty: item.officerOnDuty
  }));

  function handleDownloadExcel() {
    downloadExcel({
      fileName: `WeaponsData-Report from ${startDate} to ${endDate}.xlsx`,
      sheet: "WeaponsData",
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
          <FaFileExcel className="mr-4" /> Download Excel
        </button>
      </div>

      <div className="table w-[100%] mx-auto">
        <div className="w-full">
          <div className="border-b w-full border-gray-200 shadow">
            <table className="divide-y w-full divide-gray-300 ">
              <thead className="bg-[#272727] sticky top-[10.5em]">
                <tr>
                  <th className="px-1 text-start py-2 text-xs text-white">
                    ID
                  </th>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {body2.map(item => {
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
                      {/* <td className="px-1 flex justify-center border items-center border-gray-200 py-2">
                      <Link to={`/editarms/${item._id}`}>
                        <FaPen
                          size={22}
                          className="px-1 py-1 text-sm hover:bg-gray-300 rounded-md text-indigo-600 cursor-pointer mr-2"
                        />
                      </Link>

                      <FaTrashCan
                        size={22}
                        onClick={() => deleteWeaponsData(Id)}
                        className="px-1 py-2 text-sm hover:bg-gray-300 text-red-600 rounded-md cursor-pointer"
                      />
                    </td> */}
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

export default ArmReportTable;
