import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import PieChart from "./PieChart";

const RecentRegUsers = ({ users, data, fetch }) => {
  const usersList = users.slice(0, 4);
  const [chart, setChart] = useState(data);

  useEffect(() => {
    fetch();
  }, []);
  const chartData = {
    labels: chart.map(item => {
      return item.content;
    }),
    datasets: [
      {
        label: "total  Comparsion",
        data: chart.map(item => {
          return item.data;
        }),
        backgroundColor: chart.map(item => {
          return item.color;
        })
      }
    ]
  };

  return (
    <div className="my-6 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="flex h-[20em] flex-col p-2 shadow-md rounded-lg border border-gray-100">
        <h1 className="mb-4 px-3 text-mainThemeColor text-lg font-bold flex items-center justify-between">
          Recently Registered Users
          <FaUserAlt />
        </h1>
        {usersList.map(item => {
          return (
            <Link key={item._id} to="/usermange">
              <div className="flex items-center justify-between mb-2 shadow-sm bg-[#6495ed40] px-2 py-1 rounded-md">
                <div className="flex item-center">
                  <div className="flex bg-mainThemeColor text-white items-center justify-center rounded-full w-8 h-8 p-2 mr-3">
                    {item.name[0].toUpperCase()}
                  </div>
                  {item.name}
                </div>
                <p className="text-sm flex flex-col">
                  <span className="font-bold">Created At</span>
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </Link>
          );
        })}
        <p className="text-right w-fit rounded-md px-2 py-1 self-end bg-gray-200 font-bold">1-4</p>    
      </div>
      <div className="flex items-center justify-center h-[20em] shadow-md p-2 rounded-lg">
        <PieChart chartData={chartData} />
        <p className="absolute translate-y-6 font-bold text-center text-lg">
          Total Data <br />Comparsion <br />
        </p>
      </div>
    </div>
  );
};

export default RecentRegUsers;
