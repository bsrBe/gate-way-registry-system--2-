import React, { useContext, useState } from "react";
import {Button, SideBar } from "../components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppContext from "../context/AppContext";
import {
  FaGlobe,
  FaLock,
  FaShirt,
  FaGears,
  FaChevronRight,
  FaGear,
  FaChevronDown,
  FaMoon,
  FaSun
} from "react-icons/fa6";

const Settings = () => {
  const { collapse } = useContext(AppContext);

  const {userInfo}=useSelector(state=>state.auth)

  // collapse chevron state & handler functions
  const [open,setOpen]=useState({
    language:true,
    theme:true
  })

  const handleOpenLang = () => {
    setOpen((prev) => ({
      ...prev,
      language:!prev.language
    }));
  };
  const handleOpenTheme = () => {
    setOpen((prev) => ({
      ...prev,
      theme:!prev.theme
    }));
  };
 // collapse chevron state & handler functions


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
        <div className="flex flex-col p-4 rounded-md w-full h-full text-mainThemeColor">
          <h1 className="text-primaryColor flex items-center mb-8  justify-between">
            <div className="flex items-center text-2xl"><FaGear size={30} className="mr-4"/>
             Settings
            </div>
            <Link to="/profile">
             <div className="profile flex cursor-pointer items-center shadow-sm  border-[.1px] bg-gray-50 px-2 py-[.3em] rounded-full"> 
             <div className="h-8 mr-3 w-8 bg-mainThemeColor rounded-full text-xl flex items-center justify-center text-white">
              {userInfo.name[0].toUpperCase()}
             </div>
              <p className="font-bold text-lg">{userInfo.name}</p>
              </div>
            </Link>
            </h1>
          {/* languages */}
          <div className="flex flex-col p-4  mb-4 shadow-md hover:bg-gray-100 rounded-md">
            <p onClick={handleOpenLang}  className="flex cursor-pointer items-center justify-between w-full">
              <span className="flex items-center">
                <FaGlobe size={25} className="mr-8" />Languages
              </span>
              {open.language ?<FaChevronDown size={15}/>:<FaChevronRight size={15} />}
            </p>
            {open.language && <>
            <label htmlFor="languages" className="mt-8 mb-2 text-red-500">*Choose Default Language</label>
            <select id="languages" className="py-2 outline-none rounded-sm border-2 border-primaryColor">
              <option value="">Select Language</option>
              <option value="En-us">English(US)</option>
              <option value="En-uk">English(UK)</option>
              <option value="Amharic">Amharic</option>
              <option value="Other languages">Other languages</option>
            </select>
            <div className="flex items-center mt-8">
            <p className="text-mainThemeColor mr-4 font-bold ">Default Language:</p>
            <Button buttonContent="English" width='6em' />
            </div>
            </>}  
          </div>
          {/* languages */}

          

          {/*Theme */}
          <div className="flex flex-col  p-4  mb-4 shadow-md hover:bg-gray-100 rounded-md">
            <p onClick={handleOpenTheme} className="flex cursor-pointer items-center justify-between w-full">
              <span className="flex items-center">
                <FaShirt size={25} className="mr-8" />App Theme
              </span>
              {open.theme ?<FaChevronDown size={15}/>:<FaChevronRight size={15} />}
            </p>
            {open.theme && 
            <>
            <div className="flex flex-col mt-4"> 
              {/* app-theme */}
              <div className="flex items-center">
                <p className="text-mainThemeColor mr-20 font-bold">Choose App Theme</p>
                <Button buttonContent="Light Mode" border="1px solid #000"  px="1em" py="1em" icon={<FaSun size={20} className="mr-4"/>} mr='1em' width="10em" bg="#fff" color="#131313"/>
                <Button buttonContent="Dark Mode" width="10em" bg="#131313" px="1em" py="1em" icon={<FaMoon size={20}  className="mr-4"/>} color="#fff"/>
              </div>
              {/* app-theme */}
            </div>
            </>}
          </div>
          {/*Theme */}
        </div>
     
      </div>
    </div>
    
  );
};

export default Settings;
