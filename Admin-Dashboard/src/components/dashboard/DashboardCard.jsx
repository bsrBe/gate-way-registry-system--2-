import React, { useState, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRedoAlt } from "react-icons/fa";
import { FaRepeat } from "react-icons/fa6";
import Button from "../shared/Button";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardCard = ({ name }) => {
  const [voucherData, setVoucherData] = useState([]);
  const [voucher, setVoucher] = useState({
    voucher: Math.ceil(Math.random() * 900000000000)
  });

  useEffect(() => {
    getVoucher(VOUCHER_ID);
  }, []);
  // 650aa1a2949526d422dc9f17
  // 650bebd5ce5b38fb72f31eb1

  const VOUCHER_ID = "650aa1a2949526d422dc9f17";

  const getVoucher = async id => {
    try {
      const response = await axios.get(`/api/voucher/${id}`);
      setVoucherData({ ...response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const regenrateVoucher = async (id, voucher) => {
    try {
      await axios.patch(`/api/voucher/regenerate/${id}`, voucher, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      getVoucher(id);
      toast.info("regenerated new Voucher Number!!");
    } catch (error) {
      console.error("Error Editing visitors data:", error);
    }
  };

  const handleVoucherRegenration = () => {
    regenrateVoucher(VOUCHER_ID, voucher);
  };

  const handleVoucherRefresh = () => {
    getVoucher(VOUCHER_ID);
  };

  return (
    <div className="flex justify-between border-t-2 border-b-2 items-center border-gray-300 text-mainThemeColor py-4 mb-6">
      <div className="flex flex-col justify-between">
        <h1 className="text-xl font-bold mb-1">
          Hello,{name}
        </h1>
        <p>welcome back check activites of the system</p>
        <p className="font-extrabold flex items-center mt-1">
          {new Date().toDateString()} <FaCalendarAlt className="ml-2" />
        </p>
      </div>

      <div className="flex px-4 rounded-md shadow-md py-4 items-center border-2 border-gray-100">
        <div className="flex flex-col mr-6">
          <h1 className="text-3xl font-extrabold  text-mainThemeColor voucher">
            {voucherData.voucher}
          </h1>
          <p className="text-sm font-extrabold text-[#6495ed]">
            Verification Voucher Number
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleVoucherRegenration}
            className="flex items-center font-bold py-3 px-4 mr-4 rounded-md bg-indigo-600 text-white"
          >
            <FaRepeat className="mr-4" />
            Regenerate
          </button>
          <button
            onClick={handleVoucherRefresh}
            className="flex items-center font-bold py-3 px-4 rounded-md bg-green-500 text-white"
          >
            <FaRedoAlt className="mr-4" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
