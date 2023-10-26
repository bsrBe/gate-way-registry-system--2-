import React, { useState, useEffect } from "react";
import Barchart from "./Barchart";
import LineChart from "./LineChart";
import { FaFilter, FaChartBar, FaChartColumn, FaChartPie } from "react-icons/fa6";


const ArmSection = ({ data }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [weaponType, setWeaponType] = useState([]);
  const [weaponId, setWeaponId] = useState([]);

  const handleStartDateChange = e => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = e => {
    setEndDate(e.target.value);
  };

  const filterData = () => {
    const filtered = data.filter(item => {
      const date = new Date(item.date);
      return (
        (!startDate || date >= new Date(startDate)) &&
        (!endDate || date <= new Date(endDate))
      );
    });
    setFilteredData(filtered);
    weaponsFetch();
    weaponIdFetch()
  };

  useEffect(() => {
    weaponsFetch();
    weaponIdFetch()
  }, []);

  const weaponsFetch = () => {
    // Create an object to store the city counts
    const weaponsCounts = {};

    // Count the occurrences of each city
    filteredData.forEach(item => {
      const weapon = item.weaponsType.toLowerCase();
      if (weaponsCounts[weapon]) {
        weaponsCounts[weapon] += 1;
      } else {
        weaponsCounts[weapon] = 1;
      }
    });

    // Extract city names and counts for the Chart.js weapontypeet
    const weapons = Object.keys(weaponsCounts);
    const weaponsCountsArray = Object.values(weaponsCounts);

    // Set the extracted data to the state
    setWeaponType({ weapons, weaponsCountsArray });
  };

  const weaponIdFetch = () => {
    // Create an object to store the city counts
    const idCounts = {};

    // Count the occurrences of each city
    filteredData.forEach(item => {
      const id = item.weaponId.toLowerCase();
      if (idCounts[id]) {
       idCounts[id] += 1;
      } else {
        idCounts[id] = 1;
      }
    });

    // Extract city names and counts for the Chart.js weapontypeet
    const weaponsId = Object.keys(idCounts);
    const weaponIdCountsArray = Object.values(idCounts);

    // Set the extracted data to the state
    setWeaponId({ weaponsId, weaponIdCountsArray });
  };

  // Create the Chart.js data object
  const chartData = {
    labels: weaponType.weapons,
    datasets: [
      {
        label: "Weapons Count",
        data: weaponType.weaponsCountsArray,
        backgroundColor: ["#0c2a4c", "#dcc380", "#939393"]
      }
    ]
  };

  const chartIdData = {
    labels: weaponId.weaponsId,
    datasets: [
      {
        label: "Weapon Id Count",
        data: weaponId.weaponIdCountsArray,
        backgroundColor: ["#0c2a4c", "#dcc380", "#939393"]
      }
    ]
  };

  return (
    <div className="my-6 font-bold flex flex-col">
      <h1 className="text-mainThemeColor text-xl">Arms Data</h1>
      <div className="flex items-center w-full justify-between ">
        <div className="flex items-center">
          <div className="flex w-fit my-3 text-sm mr-4 font-bold items-center rounded-full px-4 py-2 bg-gray-300">
            <FaFilter className="mr-4" />Data Visualized By
          </div>
          <p className={`flex items-center cursor-pointer mr-4 text-sm`}>
            <FaChartBar className="mr-2" />
            Graph Bar
          </p>
          <p className={`flex items-center cursor-pointer text-sm`}>
            <FaChartPie className="mr-2" />
            Pie Chart
          </p>
        </div>
        <div className="flex my-6 items-center">
          <div className="flex flex-col text-xs">
            <label htmlFor="startDate">Report Start Date:</label>
            <input
              type="date"
              id="startDate"
              className="px-2 mt-2 py-1 border-2 outline-none mr-4 border-[#6495ed] rounded-md"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="flex flex-col text-xs">
            <label htmlFor="endDate">Report End Date:</label>
            <input
              type="date"
              id="endDate"
              className="px-2 mt-2 py-1 border-2 outline-none mr-4 border-[#6495ed] rounded-md"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </div>
          <button
            className="px-6 py-1 flex items-center self-end rounded-md bg-indigo-700 text-white"
            onClick={filterData}
          >
            <FaFilter size={15} className="mr-4"/>
            Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col p-1 shadow-md bg-[#ffffff90] h-[22em] items-center justify-center border border-gray-100 rounded-lg">
            <Barchart chartData={chartData} />
            <p>Weapons Data by Weapons Types</p>
          </div>
          <div className="flex flex-col p-1 shadow-md bg-[#ffffff90] h-[22em] items-center justify-center border border-gray-100 rounded-lg">
            <LineChart chartData={chartIdData} />
            <p>Weapons Data by Weapons ID</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmSection;
