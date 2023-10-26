import React, { useContext } from "react";
import { ArmsTable, SideBar, Navbar } from "../components";
import { FaGun } from "react-icons/fa6";
import AppContext from "../context/AppContext";

const RegisteredArmsList = () => {
  const { collapse } = useContext(AppContext);
  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-scroll h-[100svh]  flex-col bg-white  pl-2 py-1`}
      >
        <Navbar
          content="Recently Registered Weapon's Owner's"
          icon={<FaGun size={30} className="mr-4" />}
          chevronTrue={true}
        />
        <ArmsTable />
      </div>
    </div>
  );
};

export default RegisteredArmsList;
