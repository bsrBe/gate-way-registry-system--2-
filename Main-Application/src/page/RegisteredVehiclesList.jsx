import React, { useContext } from "react";
import { FaCar } from "react-icons/fa6";
import { Navbar, SideBar,VehiclesTable } from "../components";
import AppContext from "../context/AppContext";

const RegisteredVehiclesList = () => {

  const { collapse } = useContext(AppContext);

  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-hidden h-[100svh]  flex-col items-center bg-white  pl-2 py-1`}
      >
        <Navbar
          icon={<FaCar size={22} className="mr-4" />}
          content="Registered Vehicles List"
          chevronTrue={true}
        />
        <VehiclesTable/>
      </div>
    </div>
  );
};

export default RegisteredVehiclesList;
