import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/adminApiSlice";
import { setCredentials } from "../slices/authSlice";
import Spinner from "./Spinner";
import Button from "./shared/Button";

const RegisterCard = ({ content }) => {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [revealPassword, setRevealPassword] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [voucher,setVoucher]=useState({
    voucher:Math.ceil(Math.random() * 900000000000)
  })
  const [isVoucherValid, setIsVoucherValid] = useState(false);
  const [voucherCorrect, setVoucherCorrect] = useState(false);

  const VOUCHER_ID = "650aa1a2949526d422dc9f17";
  const random = Math.ceil(Math.random() * 90000000);

  const getVoucher = async id => {
    try {
      const response = await axios.get(`/api/voucher/${id}`);
      if (response.status === 200) {
        setVouchers({ ...response.data });
        console.log(vouchers.voucher);
      } else {
        console.error("Voucher not found.");
      }
    } catch (error) {
      console.error("Error fetching Voucher:", error);
    }
  };

  const regenrateVoucher = async (id, voucher) => {
    try {
      await axios.patch(`api/voucher/regenerate/${id}`, voucher, {
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Error Editing visitors data:", error);
    }
  };

  const handleUserInput = event => {

    if (event.target.value == vouchers.voucher) {
      setIsVoucherValid(true);
      toast.success(
        "Voucher Number Correct procced to the rest of Registration 🎉🎉🎉"
      );
    } else {
      setIsVoucherValid(false);
    }

  };

  const handleReg = () => {
    setVoucherCorrect(prev => !prev);
    regenrateVoucher(VOUCHER_ID,voucher);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();
  const { adminInfo } = useSelector(state => state.auth);

  useEffect(
    () => {
      if (adminInfo) {
        navigate("/dashboard");
      }
      getVoucher(VOUCHER_ID);
    },
    [navigate, adminInfo]
  );

  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          name,
          idNumber,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("User Registerd in Succesfuly");
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  };

  const passwordReval = () => {
    setRevealPassword(prev => !prev);
  };

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-xl font-bold mb-3">Admin Register</h1>
      {voucherCorrect
        ? <form
            className="w-full flex flex-col  shadow-lg py-4 px-4 rounded-md"
            onSubmit={submitHandler}
          >
            <label htmlFor="#name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              className="p-3  my-2 bg-transparent rounded-lg border-[.5px] border-[#ffffff50] focus:border-accentColor outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="#email">Id Number</label>
            <input
              id="email"
              type="text"
              placeholder="Enter ID Number"
              className="p-3  my-2 bg-transparent rounded-lg border-[.5px] border-[#ffffff50] focus:border-accentColor outline-none"
              value={idNumber}
              onChange={e => setIdNumber(e.target.value)}
            />
            
            <label htmlFor="#password">Password</label>
            <div className="flex  items-center justify-between my-2 mb-6 rounded-lg border-[.5px] border-[#ffffff50] hover:border-accentColor ">
              <input
                id="password"
                type={revealPassword ? "text" : "password"}
                className="p-3 bg-transparent outline-none w-full"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              {revealPassword
                ? <div
                    onClick={passwordReval}
                    className="bg-[#6495ed] py-[.35em] rounded-md text-white cursor-pointer px-4  mr-2"
                  >
                    hide
                  </div>
                : <div
                    onClick={passwordReval}
                    className="bg-[#6495ed] py-[.35em] rounded-md text-white cursor-pointer px-4  mr-2"
                  >
                    show
                  </div>}
            </div>

            <label htmlFor="#confirmpass">Confirm Password</label>
            <div className="flex  items-center justify-between my-2 mb-6 rounded-lg border-[.5px] border-[#ffffff50] hover:border-accentColor ">
              <input
                id="confirmpassword"
                type={revealPassword ? "text" : "password"}
                autoComplete="true"
                className="p-3 bg-transparent outline-none w-full"
                placeholder="Enter password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />

              {revealPassword
                ? <div
                    onClick={passwordReval}
                    className="bg-[#6495ed] py-[.35em] rounded-md text-white cursor-pointer px-4  mr-2"
                  >
                    hide
                  </div>
                : <div
                    onClick={passwordReval}
                    className="bg-[#6495ed] py-[.35em] rounded-md text-white cursor-pointer px-4  mr-2"
                  >
                    show
                  </div>}
            </div>

            <Button
              buttonContent="Sign Up"
              width="100%"
              icon={isLoading && <Spinner />}
              py=".5em"
            />
            <Link to="/" className="mt-3 text-accentColor">
              <p className="w-full px-4 py-3 border text-white border-indigo-500 rounded-md">
                Already have an account?
              </p>
            </Link>
          </form>
        : <div className="w-full flex flex-col h-full shadow-lg py-4 px-4 rounded-md">
            <p>Enter Verification Voucher Number</p>
            <input
              type="text"
              className="p-3  my-2 bg-transparent rounded-lg border-[.5px] border-[#ffffff50] focus:border-accentColor outline-none"
              placeholder="Enter voucher"
              onChange={handleUserInput}
            />
            <p className="text-blue-500">
              {isVoucherValid && "Voucher is valid!"}
            </p>
            <p className="text-red-500 font-bold">
              {isVoucherValid == false &&
                "Voucher is not valid, please contact system Admin!"}
            </p>
            {isVoucherValid &&
              <button
                onClick={handleReg}
                className="py-[.6em] px-4 mt-4 rounded-md w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold"
              >
                Proceed To Registration
              </button>}
            <Link to="/" className="mt-3 text-accentColor">
              <p className="w-full px-4 py-3 border text-white border-indigo-500 rounded-md">
                Already have an account?
              </p>
            </Link>
          </div>}
    </div>
  );
};

export default RegisterCard;
