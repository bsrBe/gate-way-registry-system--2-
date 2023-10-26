import React, { useContext } from "react";
import { SideBar, Navbar, ArmReportTable } from "../components";
import AppContext from "../context/AppContext";
import { FaBarsProgress } from "react-icons/fa6";

const ArmsReport = () => {
  const { collapse } = useContext(AppContext);
  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-hidden h-[100svh]  flex-col bg-white  px-2 py-1`}
      >
        <Navbar icon={<FaBarsProgress className="mr-4"/>} content="Arms Data Report" chevronTrue={false} />
        <ArmReportTable />
      </div>
    </div>
  );
};

export default ArmsReport;
