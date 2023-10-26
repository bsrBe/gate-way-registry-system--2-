import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa6";
import AppContext from "../context/AppContext";

const VistorsTable = () => {
  const {
    collapse,
    visitorsData,
    fetchVisitorsData,
    handleSidebarCollapse
  } = useContext(AppContext);

  useEffect(()=>{
    fetchVisitorsData()
  },[])

  const slicedVisitorsData=visitorsData.slice(0,30)
  
  return (
    <div className="table w-[100%] mx-auto rounded-lg">
      <div className="w-full">
        <div className="border-b w-full border-gray-200 shadow">
          <table border="1" className="divide-y w-full divide-gray-300">
            <thead className="bg-[#272727] sticky top-[10.75em]">
              <tr>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  ID
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Vistor-Name
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  ID-Number
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
                  Phone-Number
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Office
                </th>
                <th className="px-1 text-start py-2 text-sm font-bold text-white">
                  Officer-On-Duty
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
              {slicedVisitorsData.map(item => {
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
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-1 py-2 text-sm text-gray-500">
                      {new Date(item.date).toLocaleTimeString()}
                    </td>
                    <td className="px-1 flex items-center border-gray-200 py-2">

                      <Link to={`/editvisitors/${item._id}`}>
                        <FaPen
                          size={24}
                          className="px-1 py-1 text-sm hover:bg-gray-300 rounded-md text-indigo-600 cursor-pointer mr-2"
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

export default VistorsTable;
