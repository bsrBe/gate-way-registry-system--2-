import React, { useContext } from "react";
import { SideBar, Navbar, VisitorsReportTable } from "../components";
import AppContext from "../context/AppContext";
import { FaBarsProgress } from "react-icons/fa6";

const VistorsReport = () => {
  const { collapse } = useContext(AppContext);
  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-hidden h-[100svh]  flex-col bg-white  px-1 py-1`}
      >
        <Navbar
          icon={<FaBarsProgress className="mr-4"/>}
          content="Visitors Data Report"
          chevronTrue={false}
        />
        <VisitorsReportTable />
      </div>
    </div>
  );
};

export default VistorsReport;
