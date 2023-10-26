import React, { useContext, useEffect } from "react";
import { FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

const ArmsTable = () => {
  const {
    collapse,
    weaponsData,
    fetchWeaponsData,
    handleSidebarCollapse
  } = useContext(AppContext);

  useEffect(() => {
    fetchWeaponsData();
  }, []);

  const slicedWeapons = weaponsData.slice(0, 30);

  return (
    <div className="table w-[100%] mx-auto">
      <div className="w-full">
        <div className="border-b w-full border-gray-200 shadow">
          <table className="divide-y w-full divide-gray-300 ">
            <thead className="bg-[#272727] sticky top-[10.75em]">
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
              {slicedWeapons.map(item => {
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
                    <td className="px-1 flex justify-center items-center py-2">
                      <Link to={`/editarms/${item._id}`}>
                        <FaPen
                          size={22}
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

export default ArmsTable;
