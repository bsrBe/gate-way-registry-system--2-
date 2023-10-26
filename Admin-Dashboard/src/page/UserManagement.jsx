import React, { useContext } from "react";
import { SideBar, Navbar, UserManagementTable } from "../components";
import AppContext from "../context/AppContext";
import { FaUserGear } from "react-icons/fa6";

const UserManagement = () => {
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
          icon={<FaUserGear className="mr-4"/>}
          content="System Users Management"
        />
        <UserManagementTable />
      </div>
    </div>
  );
};

export default UserManagement;
