import React, { useContext } from "react";
import { ArmsForm, SideBar ,Navbar} from "../components";
import AppContext from "../context/AppContext";
import { FaBomb } from "react-icons/fa6";

const ArmsRegistrationForm = () => {
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
        <Navbar icon={<FaBomb className="mr-4" size={28}/>} content="Weapons Registration Form" chevronTrue={false}/>
        <ArmsForm/>
      </div>
    </div>
  );
};

export default ArmsRegistrationForm;
