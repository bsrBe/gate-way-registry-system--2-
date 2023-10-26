import React, { useContext } from "react";
import { SideBar, Navbar } from "../components";
import AppContext from "../context/AppContext";
import { FaInfoCircle } from "react-icons/fa";
import { FaFacebook, FaGlobe, FaInstagram, FaTwitter } from "react-icons/fa6";

const About = () => {
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
          icon={<FaInfoCircle size={22} className="mr-4" />}
          content="About"
          chevronTrue={false}
        />

        <div className="flex flex-col shadow-lg border-1 rounded-md p-8 border-primaryColor w-[80%] text-mainThemeColor mt-12">
          <h1 className="text-2xl font-bold mb-4 text-center">Gate Way Registry System</h1>
          <p className="font-bold text-lg underline">Version:1.00</p>
          <p className="my-4">
            Description: The Gate Registry System, herein referred to as "GRS,"
            is a meticulously designed and technologically advanced system that
            serves the vital function of documenting and maintaining
            comprehensive records pertaining to visitors, firearms, and
            vehicular traffic within the confines of the Federal Police
            Compound. This sophisticated system not only facilitates the
            efficient management of incoming individuals and their associated
            possessions but also empowers authorized users with the capability
            to access,and generate comprehensive reports from the curated data,
            all tailored to meet the specific needs and requirements of the
            users' preferences and mandates.
          </p>
          <p className="text-sm">
            <span className=" underline ">Ethiopian Federal Police.</span>All
            Rights Reserverd &copy;2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
