import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import '../pages.css'
import toast from 'react-hot-toast';
import { FaRegUser, FaToggleOn } from "react-icons/fa";
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import CompanyLogo from '../../Assets/itg_logo.png'
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function Dashboard() {

  const LoginData = useSelector(state => state.loginSlice.data)

  console.log(LoginData)
  window.addEventListener("beforeunload", function (e) {
    if (LoginData?.rememberMe === true) {
      return
    }
    else if (LoginData?.rememberMe === false) {
      
       Cookies.remove("AuthLogin");
      }
     
    }
   

  );


  const navigate = useNavigate();
  const [ToggleProfile, setToggleProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('home')
  const [sideBarToggle, setSideBarToggle] = useState(true);
  const location = useLocation()
  /////// handling user logout /////////
  const handleLogout = () => {
    // localStorage.removeItem('IsUserLogged')
    Cookies.remove("AuthLogin");

    setTimeout(() => {

      navigate('/')
    }, 500);
  }

  //////// handle sidebar toggle ////////
  const handletoggle = () => {
    setSideBarToggle(!sideBarToggle)
  }

  const handleProfileToggle = () => {
    setToggleProfile(!ToggleProfile)
  }

  let pathName = (window.location.pathname.split('/'))
  let ActivePath = (pathName[pathName.length - 1])

  const userToken = Cookies.get("AuthLogin");


//   useEffect(() => {
//     if (!userToken || userToken === null) {
//         navigate('/')
//     }
// }, [userToken])


  return (
    <div>
      <div className=' h-11  relative px-2 py-0 flex justify-end items-center  w-full bg-slate-700'>
        <span className='w-full  '>
          <span className='text-lg cursor-pointer text-white select-none italic pl-1'>ItGeeks</span>
        </span>

        <span onClick={() => handleProfileToggle()} className=' select-none cursor-pointer flex items-center justify-center text-slate-50 w-8 h-8 bg-slate-400 rounded-full  italic  font-semibold'>
          A
        </span>
        {


          <div className={` ${ToggleProfile ? "mymove" : "mymoveReverse"} transition-all duration-500 top-[45px] px-2 select-none  text-white  flex flex-col gap-1 absolute w-[120px] z-50 rounded py-1 bg-slate-500`}>
            <span onClick={() => { navigate('profile'); setToggleProfile(false) }} className=' transition ease-in duration-200 self-center cursor-pointer flex gap-1 items-center'><FaRegUser size={14} /> Profile</span>
            <hr className='  bg-white' />
            <span onClick={() => handleLogout()} className=' transition ease-in duration-200 cursor-pointer self-center flex items-center gap-1'> <RiLogoutBoxLine /> Logout</span>
          </div>
        }

      </div>
      <div className=' h-[calc(100vh-45px)] w-full py-0 pl-0  flex gap-0'>
        <div className={`  h-full   flex ${sideBarToggle ? "w-[225px] " : " w-[115px]"}`}>
          <div className='  w-auto    bg-slate-100  shadow-sm border-r-2 border-slate-300   h-full px-3 py-2 flex flex-col gap-2'>
            <span onClick={() => handletoggle()} className={` self-end pb-2 cursor-pointer text-black ${sideBarToggle ? "px-0" : "px-3"} `}>
              {
                sideBarToggle ?

                  <AiOutlineMenuFold size={25} />
                  :
                  <AiOutlineMenuUnfold size={25} />
              }
            </span>
            <span className=' font-semibold text-[18px]  flex items-center justify-center px-0 pb-1 select-none'> <img src={CompanyLogo} className={`${sideBarToggle ? " select-none  w-[80px] h-[70px]" : " w-[46px] h-[46px]"}`} alt="" /> </span>
            <span className={`  ${ActivePath.includes('dashboard') ? " bg-slate-600  text-white" : " bg-white"} cursor-pointer  border  rounded  py-2 flex gap-2 items-center px-4 `} onClick={() => { navigate('') }}> <IoHomeOutline />{sideBarToggle ? <span className='  m-0 p-0'>Home</span> : ''} </span>
            <span onClick={() => { navigate('profile') }} className={` px-4 ${ActivePath.includes('profile') ? " bg-slate-600 px-4  text-white" : " bg-white"} cursor-pointer  border rounded  px-3 py-2 flex gap-2 items-center ${sideBarToggle ? "px-6" : "px-1"} `}> <FaRegUser />{sideBarToggle ? "Profile" : ""}</span>
            <span className={`  ${ActivePath.includes('menu') ? " bg-slate-600  text-white" : " bg-white"} cursor-pointer  border rounded px-4 py-2  flex gap-2 items-center ${sideBarToggle ? "px-6" : "px-1"}`} onClick={() => { navigate('menu') }}><IoMenu /> {sideBarToggle ? "Menu" : ""}  </span>
            <span className={`  ${ActivePath.includes('customers') ? " bg-slate-600  text-white" : " bg-white"} cursor-pointer  border rounded px-4 py-2  flex gap-2 items-center ${sideBarToggle ? "px-6" : "px-1"}`} onClick={() => { navigate('customers') }}><IoMenu /> {sideBarToggle ? "Customers" : ""}  </span>
            {
              Array(2).fill(0).map((itm, indx) => {
                return <>
                  <span key={indx} className={` cursor-pointer    border rounded ${sideBarToggle ? " w-40" : " w-18"} px-4 py-2 flex gap-2 items-center bg-white`} onClick={() => navigate('')}> <IoHomeOutline />{sideBarToggle ? "Home" : ""}</span>

                </>
              })
            }
          </div>
        </div>
        <div className=' w-full'>

          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
