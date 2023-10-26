import React, { useContext, useState, useEffect } from "react";
import {
  ArmSection,
  DashboardCard,
  Navbar,
  InfoCard,
  SideBar,
  RecentRegUsers,
  VisitorSection,
  VehicleSection
} from "../components";
import {
  FaCar,
  FaChartSimple,
  FaGun,
  FaUserGroup,
  FaPeopleGroup,
  FaSection
} from "react-icons/fa6";
import AppContext from "../context/AppContext";
import { useSelector } from "react-redux";
import { Chart as Chartjs } from "chart.js/auto";

const Dashboard = () => {
  const {
    collapse,
    fetchUsersData,
    fetchVisitorsData,
    fetchWeaponsData,
    fetchVehiclesData,
    visitorsData,
    user,
    weaponsData,
    vehicleData
  } = useContext(AppContext);
  const { adminInfo } = useSelector(state => state.auth);

  useEffect(()=>{
   fetchVisitorsData(),
   fetchVehiclesData(),
   fetchWeaponsData()
  },[])

  let sysStat;

  if (
    (visitorsData == null || !visitorsData) &&
    (user == null || !user) &&
    (weaponsData == null || !weaponsData) &&
    (vehicleData == null || !vehicleData)
  ) {
    sysStat = false;
  } else {
    sysStat = true;
  }

  const cardData = [
    {
      icon: <FaUserGroup size={25} />,
      content: "Users",
      data: user.length,
      color: "#0c2a4c",
      id: 1,
      border: "4px solid #0c2a4c"
    },
    {
      icon: <FaPeopleGroup size={25} />,
      content: "Visitors",
      data: visitorsData.length,
      color: "#6495ed",
      id: 2,
      border: "4px solid #6495ed"
    },
    {
      icon: <FaGun size={25} />,
      content: "Weapons",
      data: weaponsData.length,
      color: "#e00e67",
      id: 3,
      border: "4px solid #e00e67"
    },
    {
      icon: <FaCar size={25} />,
      content: "Vehicles",
      data: vehicleData.length,
      color: "#22c55e",
      id: 4,
      border: "4px solid #22c55e"
    }
  ];

  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-hidden h-[100svh] flex-col bg-white  px-1`}
      >
        <Navbar
          icon={<FaChartSimple className="mr-2" />}
          content="Dashboard"
          chevronTrue={false}
          darkMode={true}
          profile={true}
          name={adminInfo.name}
        />
        <div className="flex flex-col w-full p-3">
          {/* greetings */}
          <DashboardCard name={adminInfo.name} />

          {/* infocards */}
          <p className="mt-4 mb-8 text-mainThemeColor text-sm font-extrabold pl-4 flex items-center">
            <FaSection className="mr-2" />
            System Status:
            {sysStat
              ? <span className="text-green-600 text-sm ml-2">All Good</span>
              : <span className="text-red-600 text-sm ml-2">
                  Something went Wrong
                </span>}
          </p>
          <div className="grid w-full place-items-center px-2 grid-col-1 sm:grid-cols-4 gap-2">
            {cardData.map(item => {
              return (
                <InfoCard
                  key={item.id}
                  icon={item.icon}
                  content={item.content}
                  stats={item.data}
                  color={item.color}
                  bgColor="transparent"
                  border={item.border}
                />
              );
            })}
          </div>
          {/* infocards */}

          {/* users management */}
          <RecentRegUsers
            users={user}
            weapons={weaponsData}
            visitors={visitorsData}
            vehicles={vehicleData}
            data={cardData}
            fetch={fetchUsersData}
          />
          {/* users management */}

          {/* data */}
          <VisitorSection data={visitorsData} />
          <ArmSection data={weaponsData} />
          <VehicleSection data={vehicleData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
