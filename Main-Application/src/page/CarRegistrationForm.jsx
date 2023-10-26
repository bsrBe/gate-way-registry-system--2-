import React, { useContext } from "react";
import { SideBar, Navbar, VehiclesForm } from "../components";
import { FaCar } from "react-icons/fa";
import AppContext from "../context/AppContext";

const CarRegistrationForm = () => {
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
          content=" CarRegistration Form"
          icon={<FaCar size={28} className="mr-4" />}
          chevronTrue={false}
        />
        <VehiclesForm />
      </div>
    </div>
  );
};

export default CarRegistrationForm;
