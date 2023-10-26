import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateAdminMutation } from "../slices/adminApiSlice";
import AppContext from "../context/AppContext";
import { FaUserAlt,FaUserEdit } from "react-icons/fa";
import { SideBar, Spinner, Button, Navbar } from "../components";
import { setCredentials } from "../slices/authSlice";

const Profile = () => {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const { collapse } = useContext(AppContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminInfo } = useSelector(state => state.auth);

  const [update, { isLoading }] = useUpdateAdminMutation();

  useEffect(
    () => {
      setName(adminInfo.name);
      setIdNumber(adminInfo.idNumber);
    },
    [adminInfo.setName, adminInfo.setIdNumber]
  );

  const submitHandler = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await update({
          _id: adminInfo._id,
          name,
          idNumber,
          password
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated");
        navigate(-1);
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  };

  const handleFormClear = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
  };

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
          content="User Profile"
          icon={<FaUserAlt className="mr-4" />}
          chevronTrue={false}
        />
        <div className="flex w-full flex-col shadow-lg shadow-gray-300 p-4 rounded-md h-full items-center">
          <h1 className="text-lg  font-bold flex items-center mb-3"><FaUserEdit size={25} className="mr-10"/> Update Profile</h1>
          <form
            className="grid gap-4 grid-cols-1 place-items-center shadow-lg w-full h-full shadow-gray-300 p-4 rounded-md"
            onSubmit={submitHandler}
          >
            <div className="inputBox">
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <span>Name</span>
              <i />
            </div>
            <div className="inputBox">
              <input
                id="idNumber"
                type="text"
                value={idNumber}
                onChange={e => setIdNumber(e.target.value)}
              />
              <span>ID Number</span>
              <i />
            </div>

            <div className="inputBox">
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <span>Password</span>
              <i />
            </div>

            <div className="inputBox">
              <input
                id="confirmpass"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <span>Confirm Password</span>
              <i />
            </div>

            <div className="flex items-center ml-2 mt-6">
              <Button
                buttonContent="Update Profile"
                width="21.5em"
                mr="1.2em"
                py=".75em"
                px="1em"
                justifyCenter="center"
                icon={isLoading && <Spinner />}
              />
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
