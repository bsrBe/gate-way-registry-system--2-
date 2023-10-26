import React, { useState, useEffect } from "react";
import Barchart from "./Barchart";
import LineChart from "./LineChart";
import { FaFilter, FaChartBar, FaChartColumn } from "react-icons/fa6";

const VehicleSection = ({ data }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [datas, setDatas] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [offices, setOffices] = useState([]);

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
    idFetch();
    officeFetch();
    regionFetch();
  };

  useEffect(() => {
    idFetch();
    officeFetch();
    regionFetch();
  }, []);

  const idFetch = () => {
    // Create an object to store the city counts
    const idCounts = {};

    // Count the occurrences of each city
    filteredData.forEach(item => {
      const id = item.idnumber.toLowerCase();
      if (idCounts[id]) {
        idCounts[id] += 1;
      } else {
        idCounts[id] = 1;
      }
    });

    // Extract city names and counts for the Chart.js dataset
    const ids = Object.keys(idCounts);
    const idCountsArray = Object.values(idCounts);

    // Set the extracted data to the state
    setDatas({ ids, idCountsArray });
  };

  const officeFetch = () => {
    // Create an object to store the city counts
    const officeCounts = {};

    // Count the occurrences of each city
    filteredData.forEach(item => {
      const office = item.destinationOffice.toLowerCase();
      if (officeCounts[office]) {
        officeCounts[office] += 1;
      } else {
        officeCounts[office] = 1;
      }
    });

    // Extract city names and counts for the Chart.js dataset
    const officedes = Object.keys(officeCounts);
    const officeCountsArray = Object.values(officeCounts);

    // Set the extracted data to the state
    setOffices({ officedes, officeCountsArray });
  };

  const regionFetch = () => {
    // Create an object to store the city counts
    const regionCounts = {};

    // Count the occurrences of each city
    filteredData.forEach(item => {
      const region = item.RegionalCode;
      if (regionCounts[region]) {
        regionCounts[region] += 1;
      } else {
        regionCounts[region] = 1;
      }
    });

    // Extract city names and counts for the Chart.js dataset
    const regions = Object.keys(regionCounts);
    const regionsCountsArray = Object.values(regionCounts);

    // Set the extracted data to the state
    setRegionData({ regions, regionsCountsArray });
  };

  // Create the Chart.js data object
  const chartData = {
    labels: datas.ids,
    datasets: [
      {
        label: "Id  Count",
        data: datas.idCountsArray,
        backgroundColor: ["#0c2a4c", "#dcc380", "#939393"]
      }
    ]
  };

  const chartRegionData = {
    labels: regionData.regions,
    datasets: [
      {
        label: "Regions Code Count",
        data: regionData.regionsCountsArray,
        backgroundColor: ["#0c2a4c", "#dcc380", "#939393"]
      }
    ]
  };

  const chartOfficesData = {
    labels: offices.officedes,
    datasets: [
      {
        label: "Office Count",
        data: offices.officeCountsArray,
        backgroundColor: ["#0c2a4c", "#dcc380", "#939393"]
      }
    ]
  };

  return (
    <div className="my-6 font-bold flex flex-col">
      <h1 className="text-mainThemeColor text-xl">Vehicles Data</h1>
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
            <FaChartColumn className="mr-2" />
            Line Chart
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
            <FaFilter size={15} className="mr-4" />
            Filter
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col p-1 shadow-md bg-[#ffffff90] h-[22em] items-center justify-center border border-gray-100 rounded-lg">
            <Barchart chartData={chartData} />
            <p>Vehicles by IDNumber</p>
          </div>
          <div className="flex flex-col p-1 shadow-md bg-[#ffffff90] h-[22em] items-center justify-center border border-gray-100 rounded-lg">
            <Barchart chartData={chartRegionData} />
            <p>Vehicles by License Region Codes</p>
          </div>
          <div className="flex flex-col p-1 shadow-md bg-[#ffffff90] h-[24em] col-span-2 items-center justify-center border border-gray-100 rounded-lg">
            <p className="absolute translate-x-full -translate-y-[11em]">Vehicles Data by Destinatinon Office</p>
            <LineChart chartData={chartOfficesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSection;
