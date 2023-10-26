import React, { useState, useEffect } from "react";
import Barchart from "./Barchart";
import LineChart from "./LineChart";
import { FaFilter, FaChartBar, FaChartColumn } from "react-icons/fa6";

const VisitorSection = ({ data }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [datas, setDatas] = useState([]);
  const [subData, setSubData] = useState([]);
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
    cityFetch();
    officeFetch();
    subCityFetch();
  };

  useEffect(() => {
    cityFetch();
    officeFetch();
    subCityFetch();
  }, []);

  const cityFetch = () => {
    // Create an object to store the city counts
    const cityCounts = {};

    // Count the occurrences of each city
    filteredData.forEach(item => {
      const city = item.city.toLowerCase();
      if (cityCounts[city]) {
        cityCounts[city] += 1;
      } else {
        cityCounts[city] = 1;
      }
    });

    // Extract city names and counts for the Chart.js dataset
    const cities = Object.keys(cityCounts);
    const cityCountsArray = Object.values(cityCounts);

    // Set the extracted data to the state
    setDatas({ cities, cityCountsArray });
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

  const subCityFetch = () => {
    // Create an object to store the city counts
    const subCityCounts = {};

    // Count the occurrences of each city
    filteredData.forEach(item => {
      const subCity = item.subCity.toLowerCase();
      if (subCityCounts[subCity]) {
        subCityCounts[subCity] += 1;
      } else {
        subCityCounts[subCity] = 1;
      }
    });

    // Extract city names and counts for the Chart.js dataset
    const subCities = Object.keys(subCityCounts);
    const subCityCountsArray = Object.values(subCityCounts);

    // Set the extracted data to the state
    setSubData({ subCities, subCityCountsArray });
  };

  // Create the Chart.js data object
  const chartData = {
    labels: datas.cities,
    datasets: [
      {
        label: "City/Zones Count",
        data: datas.cityCountsArray,
        backgroundColor: ["#0c2a4c", "#dcc380", "#939393"]
      }
    ]
  };

  const chartSubData = {
    labels: subData.subCities,
    datasets: [
      {
        label: "SubCity Count",
        data: subData.subCityCountsArray,
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
      <h1 className="text-mainThemeColor text-xl">Vistors Data</h1>
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
          <div className="flex flex-col p-1 shadow-md bg-[#ffffff90] h-[22em] items-center justify-center border border-gray-100 rounded-lg overflow-hidden">
            <Barchart chartData={chartData} />
            <p>visitors by Cities/Zones</p>
          </div>
          <div className="flex flex-col p-1 shadow-md bg-[#ffffff90] h-[22em] items-center justify-center border border-gray-100 rounded-lg overflow-hidden">
            <Barchart chartData={chartSubData} />
            <p>visitors by Sub-Cities</p>
          </div>
          <div className="flex flex-col p-1 shadow-md bg-[#ffffff90] h-[24em] items-center col-span-2 justify-center border border-gray-100 overflow-hidden rounded-lg">
            <p className="absolute translate-x-full -translate-y-[11em]">
              Visitors Data by Destination Office
            </p>
            <LineChart chartData={chartOfficesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorSection;
