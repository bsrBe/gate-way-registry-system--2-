import React, { useContext } from "react";
import { Navbar, SideBar, VistorsForm } from "../components";
import { FaWpforms } from "react-icons/fa6";
import AppContext from "../context/AppContext";

const VisitorsRegistrationForm = () => {
  const { collapse } = useContext(AppContext);
  return (
    <div className="w-full flex">
      <SideBar />
      <div
        className={`flex absolute ${collapse
          ? "w-[calc(100vw-3em)]"
          : "w-[calc(100%-18em)]"} ${collapse
          ? "left-[2.7em]"
          : "left-[18em]"} overflow-x-hidden h-[100svh] flex-col bg-white  px-1 py-1`}
      >
        <Navbar
          icon={<FaWpforms size={30} className="mr-4" />}
          content="Visitors Registration form"
          chevronTrue={false}
        />

        <VistorsForm />
      </div>
    </div>
  );
};

export default VisitorsRegistrationForm;
