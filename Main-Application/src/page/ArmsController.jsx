import React, { useContext } from "react";
import { FaBookmark, FaDesktop } from "react-icons/fa6";
import { ArmsControllerTable, SideBar, Navbar } from "../components";
import AppContext from "../context/AppContext";

const ArmsController = () => {
  const { collapse } = useContext(AppContext);

  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-hidden h-[100svh]  flex-col items-center bg-white  pl-4 py-1`}
      >
        <Navbar
          icon={<FaBookmark size={22} className="mr-4" />}
          content="Arms Controller"
          chevronTrue={false}
        />
        <ArmsControllerTable />
      </div>
    </div>
  );
};

export default ArmsController;
