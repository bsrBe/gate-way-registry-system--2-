import React, { useContext } from "react";
import { SideBar, Navbar, VehiclesReregisterCard } from "../components";
import { FaEdit } from "react-icons/fa";
import AppContext from "../context/AppContext";

const VehiclesReregistration = () => {
  const { collapse } = useContext(AppContext);

  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-hidden h-[100svh]  flex-col items-center bg-white  px-1 py-1`}
      >
        <Navbar
          icon={<FaEdit size={22} className="mr-4" />}
          content="Vehicle Reregistration"
          chevronTrue={false}
        />
        <VehiclesReregisterCard />
      </div>
    </div>
  );
};

export default VehiclesReregistration;
