import React, { useContext } from "react";
import Logo from "../assets/image/logo.png";
import {
  FaList,
  FaGear,
  FaChevronRight,
  FaChevronLeft,
  FaBookmark,
  FaChartPie,
  FaChartSimple,
  FaUserGear
} from "react-icons/fa6";
import { FaInfoCircle, FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Button } from "../components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/adminApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import AppContext from "../context/AppContext";
import { useSelector, useDispatch } from "react-redux";

const SideBar = () => {
  const { collapse, handleSidebarCollapse } = useContext(AppContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  const isActiveLink = path => {
    return location.pathname === path;
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.warning("User Logged Out");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.data)
      console.log(err);
    }
  };

  return (
    <div
      draggable="true"
      className={`flex oop flex-col fixed top-0 left-0 ${collapse &&
        "items-center"} overflow-hidden h-[100svh] shadow-xl ${collapse
        ? "bg-mainThemeColor"
        : "bg-mainThemeColor"} ${collapse ? "w-[1em]" : "w-[18em]"}  py-1`}
    >
      <div
        className={`flex  items-center ${collapse
          ? "relative"
          : "fixed"} ${collapse
          ? "w-[0em]"
          : "w-[18em]"} z-10 bg-transparent p-2`}
      >
        <Link to="/home" className="flex">
          <img
            src={Logo}
            alt="Logo of Ethiopian Federal Police"
            className="w-[3.5em] h-[3.5em]"
          />
          {collapse == false &&
            <div className="flex flex-col font-extrabold">
              <h2 className="text-accentColor text-sm ml-4">
                የኢትዮጵያ&nbsp;ፌደራል&nbsp;ፖሊስ
              </h2>
              <h2 className="text-accentColor text-sm ml-4">
                Ethiopian Federal Police
              </h2>
            </div>}
        </Link>

        {collapse
          ? <FaChevronRight
              size={40}
              onClick={handleSidebarCollapse}
              className="fixed left-[0.15em]  cursor-pointer bg-accentColor p-3 rounded-full text-white"
            />
          : <FaChevronLeft
              size={40}
              onClick={handleSidebarCollapse}
              className="ml-6 z-[100] drop-shadow-lg isolate cursor-pointer hover:bg-[#ffffff50] p-3 rounded-full text-accentColor"
            />}
      </div>
      <div
        className={`sidebar text-white ${collapse &&
          "hidden"} flex flex-col overflow-x-hidden overflow-y-scroll w-full mt-[6em] px-3 relative`}
      >
        <p>DASHBOARD</p>
        <Link to="/dashboard">
          <h2
            className={
              isActiveLink(
                "/dashboard"
              )
                ? "active"
                : ""
            }
          >
            <FaChartPie className="mr-4" />
            {collapse == false && <span>Dashboard</span>}
          </h2>
        </Link>
        {/*<hr className="my-2 bg-mainThemeColor" />*/}
        <p>SEARCH</p>
        <Link to="/search">
          <h2
            className={
              isActiveLink(
                "/search"
              )
                ? "active"
                : ""
            }
          >
            <FaSearch className="mr-4" />
            {collapse == false && <span>Search</span>}
          </h2>
        </Link>

        {/*<hr className="my-2 bg-mainThemeColor" />*/}
       <p>ARM'S CONTROLLER</p>
       <Link to='/armscontroller'>
        <h2 className={ isActiveLink(
                "/armscontroller"
              )
                ? "active"
                : ""}>
        <FaBookmark className="mr-4"/>
        {collapse == false && <span>Arms Controller</span>}
        </h2>
       </Link>
        {/*<hr className="my-2 bg-mainThemeColor" />*/}
        <p>LIST</p>
        <Link to="/home">
          <h2 className={isActiveLink("/home") ? "active" : ""}>
            <FaList className="mr-4" />
            {collapse == false && <span>Vistors List</span>}
          </h2>
        </Link>
        <Link to="/registeredarmslist">
          <h2 className={isActiveLink("/registeredarmslist") ? "active" : ""}>
            <FaList className="mr-4" />
            {collapse == false && <span>Registerd Arm's List</span>}
          </h2>
        </Link>
        <Link to="/registeredvehicleslist">
          <h2
            className={isActiveLink("/registeredvehicleslist") ? "active" : ""}
          >
            <FaList className="mr-4" />
            {collapse == false && <span>Registerd Vheicles List</span>}
          </h2>
        </Link>
        {/*<hr className="my-2 bg-mainThemeColor" />*/}
        <p>SYSTEM USER'S MANAGEMENT</p>
        <Link to='/usermange'>
        <h2 className={isActiveLink("/usermange") ? "active" : ""}>
            <FaUserGear className="mr-4" />
            {collapse == false && <span>Users Management</span>}
          </h2>
        </Link>
        {/*<hr className="my-2 bg-mainThemeColor" />*/}
      <p>REPORTS</p>
        <Link to="/armsreport">
          <h2 className={isActiveLink("/armsreport") ? "active" : ""}>
            <FaChartSimple className="mr-4" />
            {collapse == false && <span>Registered Arm's Report</span>}
          </h2>
        </Link>
        <Link to="/vehiclesreport">
          <h2
            className={isActiveLink("/vehiclesreport") ? "active" : ""}
          >
            <FaChartSimple className="mr-4" />
            {collapse == false && <span>Registered Vheicle's Report</span>}
          </h2>
        </Link>
        <Link to="/visitorsreport">
          <h2 className={isActiveLink("/visitorsreport") ? "active" : ""}>
            <FaChartSimple className="mr-4" />
            {collapse == false && <span>Registered Visitor's Report</span>}
          </h2>
        </Link>
        {/*<hr className="my-2 bg-mainThemeColor" />*/}
        <p>Settings</p>
        <Link to="/setting">
          <h2 className={isActiveLink("/setting") ? "active" : ""}>
            <FaGear className="mr-4" />
            {collapse == false && <span>Settings</span>}
          </h2>
        </Link>
        {/*<hr className="my-2 bg-mainThemeColor" />*/}
        <p>ABOUT</p>
        <Link to="/about">
          <h2 className={`pb-[10em] ${isActiveLink("/about") ? "active" : ""}`}>
            <FaInfoCircle className="mr-4" />
            {collapse == false && <span>About</span>}
          </h2>
        </Link>
        <hr className="mb-16 opacity-0" />
        <div onClick={logoutHandler}>
          <Button
            buttonContent="Log Out"
            position={collapse ? "relative" : "fixed"}
            bottom="0"
            collapse={collapse}
            mb=".5em"
            width={collapse ? "0em" : "14em"}
            icon={<FaSignOutAlt className="mr-4" />}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
