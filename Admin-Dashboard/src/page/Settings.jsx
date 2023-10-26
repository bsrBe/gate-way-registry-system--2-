import React, { useContext, useState } from "react";
import {Button, SideBar } from "../components";
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

  // collapse chevron state & handler functions
  const [open,setOpen]=useState({
    language:false,
    password:false,
    theme:false,
    advanced:false
  })

  const handleOpenLang = () => {
    setOpen((prev) => ({
      ...prev,
      language:!prev.language
    }));
  };
  const handleOpenPass = () => {
    setOpen((prev) => ({
      ...prev,
      password:!prev.password
    }));
  };
  const handleOpenTheme = () => {
    setOpen((prev) => ({
      ...prev,
      theme:!prev.theme
    }));
  };
  const handleOpenAdvanced=()=>{
    setOpen((prev)=>({
      ...prev,
      advanced:!prev.advanced
    }))
  }
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
          <h1 className="text-primaryColor flex items-center mb-8 text-2xl"><FaGear size={30} className="mr-4"/>Settings</h1>
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

          {/* Password-Management*/}
          <div className="flex flex-col  p-4  mb-4 shadow-md hover:bg-gray-100 rounded-md">
            <p onClick={handleOpenPass} className="flex cursor-pointer items-center justify-between w-full">
              <span className="flex items-center">
                <FaLock size={25} className="mr-8" /> Password Management
              </span>
              {open.password ?<FaChevronDown size={15}/>:<FaChevronRight size={15} />}  
            </p>
            {open.password && 
              <>
              <div className="flex flex-col mt-8">
                <label htmlFor="old" className="my-2 text-red-500">*Please Enter Your Old Password</label>
                <input type="password" className=" indent-4 py-3 rounded-md border-2 outline-none mb-4 w-[80%] border-primaryColor" placeholder="Enter Your Old Password" id="old" />
                <label htmlFor="new" className="my-2 text-red-500">*Please Enter Your New Password</label>
                <input disabled='true' type="password" className=" indent-4 py-3 rounded-md border-2 outline-none mb-4 w-[80%] border-primaryColor" placeholder="Enter Your New Password" id="new" />
                <label htmlFor="confirm" className="my-2 text-red-500">*Please Confirm Your Password</label>
                <input disabled='true' type="password" className=" indent-4 py-3 rounded-md border-2 outline-none mb-4 w-[80%] border-primaryColor" placeholder="Confirm Your Password" id="confirm" />
                <Button buttonContent="Change Password" width="14em"/>
              </div>
              </>
              }
          </div>
          {/* Password-Management*/}

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

              {/* main-theme */}
              <div className="flex items-center justify-between mt-8">
                <p className="text-mainThemeColor mr-4 font-bold">Choose Main Theme Color</p>
                <Button  px="1em" py="1em"  width="3em" bg="#0c2a4c" color="#fff"/>
                <Button  width="3em" bg="#dcc380" px="1em" py="1em" color="#fff"/>
                <Button  width="3em" bg="#0000ff" px="1em" py="1em" color="#fff"/>
                <Button  width="3em" bg="#008000" px="1em" py="1em" color="#fff"/>
                <Button  width="3em"  px="1em" py="1em"/>
                <Button  width="3em" bg="#ff4500" px="1em" py="1em" color="#fff"/>
              </div>
              {/* main-theme */}
              
              {/* accent-color */}
              <div className="flex items-center justify-between mt-8">
                <p className="text-mainThemeColor mr-14 font-bold">Choose Accent Color</p>
                <Button  px="1em" py="1em" width="3em" bg="#dcc380" color="#fff"/>
                <Button width="3em" bg="#0c2a4c" px="1em" py="1em" color="#fff"/>
                <Button width="3em" bg="#0000ff" px="1em" py="1em" color="#fff"/>
                <Button width="3em" bg="#008000" px="1em" py="1em" color="#fff"/>
                <Button width="3em"  px="1em" py="1em"/>
                <Button width="3em" bg="#ff4500" px="1em" py="1em" color="#fff"/>
              </div>
              {/* accent-color */}
             
             {/* Button-color */}
             <div className="flex items-center mt-8">
                <p className="text-mainThemeColor mr-[4.5rem] font-bold">Choose Main Button Color</p>
                <Button  px="1em" py="1em" mr='1em' width="3em" bg="#0c2a4c" color="#fff"/>
                <Button  width="3em" mr='1em' bg="#ff0000" px="1em" py="1em" color="#fff"/>
                <Button  width="3em" mr='1em' px="1em" py="1em"/>
              </div>
             {/* Button-color */}

             {/* custom */}
             <div className="flex items-center mt-8">
                <p className="text-mainThemeColor mr-[4.5rem] font-bold">Choose Custom Main Theme</p>
                <input type="color" className="w-16 h-10 cursor-pointer" id="" />
              </div>
             {/* custom */}

            </div>
            </>}
          </div>
          {/*Theme */}
          
          {/* Advanced-settings */}
          <div className="flex flex-col p-4 mb-4 shadow-md hover:bg-gray-100 rounded-md">
            <p onClick={handleOpenAdvanced} className="flex items-center cursor-pointer justify-between w-full">
              <span className="flex items-center">
                <FaGears size={25} className="mr-8" /> Data Setting
              </span>
              {open.advanced ?<FaChevronDown size={15}/>:<FaChevronRight size={15} />} 
            </p>{open.advanced && 
              <>
              <div className="flex flex-col mt-8">
                <h1>Advanced Setting</h1>
              </div>
              </>}
          </div>
          {/* Advanced-settings */}
        </div>
     
      </div>
    </div>
    
  );
};

export default Settings;
