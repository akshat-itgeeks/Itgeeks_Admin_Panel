import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import '../pages.css'
import toast from 'react-hot-toast';
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline, IoMenu } from "react-icons/io5";
import { IoBarChart } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import CompanyLogo from '../../Assets/itg_logo.png'

function Dashboard() {

  const navigate = useNavigate();
  const [ToggleProfile, setToggleProfile] = useState(false);
  const [activeTab,setActiveTab]= useState('home')
  const [sideBarToggle,setSideBarToggle]= useState(true)

  /////// handling user logout /////////
  const handleLogout=()=>
    {
      localStorage.removeItem('IsUserLogged')
      toast.success('Logout Successfull')
      setTimeout(() => {
        
        navigate('/')
      }, 500);
    }

    //////// handle sidebar toggle ////////
    const handletoggle=()=>
      {
        setSideBarToggle(!sideBarToggle)
      }

      const handleProfileToggle=()=>
        {
          setToggleProfile(!ToggleProfile)
        }

        let pathName= (window.location.pathname.split('/'))
        let ActivePath=(pathName[pathName.length-1])
  return (
    <div>
      <div className=' h-11 transition-all duration-500 relative px-2 py-0 flex justify-end items-center  w-full bg-slate-700'>
        <span onClick={()=>handletoggle()} className='w-full  '>
          <span className='text-lg cursor-pointer text-white select-none italic pl-1'>ItGeeks</span>
        </span>
        <span onClick={() => handleProfileToggle()} className=' select-none cursor-pointer flex items-center justify-center text-slate-50 w-8 h-8 bg-slate-400 rounded-full  italic  font-semibold'>
          A
        </span>
        {
        

          <div className={` ${ToggleProfile?"mymove":"mymoveReverse"} transition-all duration-500 top-[45px] px-2 select-none  text-white  flex flex-col gap-1 absolute w-[120px] z-50 rounded py-1 bg-slate-500`}>
            <span onClick={()=>{navigate('profile');setToggleProfile(false)}} className=' transition ease-in duration-200 self-center cursor-pointer flex gap-1 items-center'><FaRegUser size={14} /> Profile</span>
            <hr className='  bg-white' />
            <span onClick={()=>handleLogout()} className=' transition ease-in duration-200 cursor-pointer self-center flex items-center gap-1'> <RiLogoutBoxLine/> Logout</span>
          </div>
        }


      </div>
      <div className=' h-[calc(100vh-45px)] bg-slate-100 py-0 pl-0  flex gap-1'>
        <div className={` transition-all ${sideBarToggle?"w-[220px] ":" w-[120px]"} duration-300 h-full  flex`}>
          <div className=' transition-all duration-500 myScrollBar overflow-y-scroll    bg-slate-100 rounded shadow-sm  border h-full px-4 py-4 flex flex-col gap-2'>
            <span className=' font-semibold text-[18px] transition-all duration-500 flex items-center justify-center px-0 pb-1'> <img src={CompanyLogo} className={`${sideBarToggle?" transition-all duration-200 w-[80px] h-[70px]":" transition-all duration-200 w-[46px] h-[46px]"}`} alt="" /> </span>
            <span className={` ${ActivePath ==='dashboard'?" bg-slate-600  text-white":" bg-white"} cursor-pointer  border h-16 rounded  py-2 flex gap-2 items-center px-3 `} onClick={() => {navigate('') }}> <IoHomeOutline />{sideBarToggle?<span className='  m-0 p-0'>Home</span>:''} </span>
            <span onClick={()=>{navigate('profile')}} className={` ${ActivePath ==='profile'?" bg-slate-600 px-3 h-16 text-white":" bg-white"} cursor-pointer  border rounded  px-3 py-2 flex gap-2 items-center ${sideBarToggle?"px-36":"px-1"} `}> <FaRegUser />{sideBarToggle?"Profile":""}</span>
            <span className={` ${ActivePath ==='menu'?" bg-slate-600  text-white":" bg-white"} cursor-pointer  border rounded px-3 py-2 h-16 flex gap-2 items-center ${sideBarToggle?"px-36":"px-1"}`} onClick={() => {navigate('menu')}}><IoMenu/> {sideBarToggle?"Menu":""}  </span>
            {
              Array(12).fill(0).map((itm)=>
              {
                return <>
            <span className={` transition-all duration-500 cursor-pointer  h-16 border rounded ${sideBarToggle?" w-36":" px-1"} px-3 py-2 flex gap-2 items-center bg-white`} onClick={() => navigate('')}> <IoHomeOutline />{sideBarToggle?"Home":""}</span>
                
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
