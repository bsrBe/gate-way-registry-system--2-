import React, { useEffect, useState } from "react";
import { FaRedoAlt, FaSearch } from "react-icons/fa";
import Button from "../shared/Button";
import { FaBars, FaPen, FaRepeat, FaTrash, FaUser, FaUserGroup } from "react-icons/fa6";
import AppContext from "../../context/AppContext";
import { useContext } from "react";
import axios from "axios";

const DashboardSidebar = () => {
  const { user } = useContext(AppContext);
  const [voucher, setVoucher] = useState([]);

  useEffect(() => {
    getVoucher(VOUCHER_ID);
  }, []);

  const VOUCHER_ID = "650aa1a2949526d422dc9f17";

  const getVoucher = async id => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/voucher/${id}`
      );
      setVoucher({ ...response.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[16em] border-l border-gray-300 flex flex-col items-center overflow-x-hidden overflow-y-scroll p-1 shadow-sm fixed right-6 h-full">
      <div className="flex flex-col items-center p-2 w-full bg-gray-200 rounded-md">
        <FaBars
          size={30}
          className="self-start cursor-pointer hover:bg-gray-400 rounded-md p-2"
        />
        <FaUser size={60} className=" p-1" />
        <h1 className="text-xl mt-4 font-bold">Abel Sisay</h1>
        <p className="text-md mt-[-.25em] font-extrabold">Admin</p>
      </div>
      <div className="flex items-center w-full shadow-md border border-gray-400 rounded-full mt-4 py-3">
        <input
          type="text"
          placeholder="Search users"
          className="indent-2 bg-transparent outline-none ml-1 w-full"
        />
        <FaSearch className="text-gray-600 mr-2" />
      </div>

      <div className="flex flex-col w-full py-4 bg-gray-50 items-center">
        <h1 className="text-3xl font-bold mb-4">
          {voucher.voucher}
        </h1>
        <p className="mb-3">Voucher Number</p>
        <Button
          buttonContent="Regenrate"
          mb=".75em"
          icon={<FaRepeat className="mr-4" />}
        />
        <Button
            buttonContent="Refresh"
            bg="green"
            width="9.75em"
            icon={<FaRedoAlt className="mr-4"/>}
        />
      </div>

      <h1 className="flex w-full my-4  p-2 font-bold items-center">
        <FaUserGroup className="mr-3" />
        Users List
      </h1>

      {user.map(item => {
        return (
          <div
            key={item._id}
            className="px-1 mb-3 shadow-sm rounded-md py-3 w-full bg-gray-200 justify-between flex items-center"
          >
            <div className="flex items-center">
              <FaUser className="mr-2" />
              <p>
                {item.name}
              </p>
            </div>
            <div className="flex items-center cursor-pointer">
              <FaPen color="blue" />
              <FaTrash className="ml-2" color="red" />
            </div>
          </div>
        );
      })}
      <hr className="opacity-0 mb-36" />
    </div>
  );
};

export default DashboardSidebar;
