import React, { useState, useEffect } from "react";
import {useNavigate,Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import Spinner from './Spinner'
import Button from './shared/Button'

const LoginCard = () => {
  const [idNumber,setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [revealPassword,setRevealPassword]=useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(
    () => {
      if (userInfo) {
        navigate("/home");
      }
    },
    [navigate, userInfo]
  );

  const submitHandler = async e => {
    e.preventDefault();
    try {
      const res = await login({ idNumber, password }).unwrap();
      dispatch(setCredentials({...res}));
      toast.success("User Logged in Succesfuly")
      navigate('/')
    } catch (err) {
        toast.error(err?.data?.message || err.error)
    }
  };

  const passwordReval=()=>{
    setRevealPassword(prev=>!prev)
  }

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-xl font-bold mb-3 flex items-center">Login</h1>
      <form
        className="w-full flex flex-col shadow-lg  p-4 rounded-md"
        onSubmit={submitHandler}
      >
        <label htmlFor="#idnumber">ID Number</label>
        <div className="inputBOx"></div>
        <input
          id="idnumber"
          type="text"
          placeholder="Enter  ID Number"
          className="p-3  my-2 bg-transparent rounded-lg border-[.5px] border-[#ffffff50] focus:border-accentColor outline-none"
          value={idNumber}
          onChange={e => setIdNumber(e.target.value)}
        />
        <label htmlFor="#password">Password</label>

        <div className="flex  items-center justify-between my-2 mb-6 rounded-lg border-[.5px] border-[#ffffff50] focus:border-accentColor hover:border-accentColor">
        <input
          id="password"
          type={revealPassword?"text":"password"}
          className="p-3 bg-transparent outline-none w-full"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
     
        {revealPassword?
        <div onClick={passwordReval} className="bg-[#6495ed] py-[.35em] rounded-md text-white cursor-pointer px-4  mr-2">hide</div>
        :<div onClick={passwordReval} className="bg-[#6495ed] py-[.35em] rounded-md text-white cursor-pointer px-4  mr-2">show</div>
          }
        </div>

        <Button
           buttonContent="Sign In"
           width="100%"
           icon={isLoading ? <Spinner/>:<FaSignInAlt className="mr-3"/>}
           py='.5em'
        />
        <Link to="/register" className="mt-3">
          <p className="w-full px-4 py-3 border text-white border-indigo-500 rounded-md">Don't Have an Account yet Register?</p>   
        </Link>
      </form>
    </div>
  );
};

export default LoginCard;
