import React, { useContext } from "react";
import { VistorsTable, SideBar, Navbar } from "../components";
import AppContext from "../context/AppContext";
import { FaUserGroup } from "react-icons/fa6";

const Home = () => {
  const { collapse } = useContext(AppContext);
  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-scroll table-holder h-[100svh]  flex-col bg-white  px-1 py-1`}
      >
        <Navbar icon={<FaUserGroup size={30} className="mr-4" />} content="Registerd Visitors List" chevronTrue={true}/>
        <VistorsTable />
      </div>
    </div>
  );
};

export default Home;
