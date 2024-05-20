import React, { useEffect, useState } from 'react';
import { Routes, Route,  } from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Dashboard/Home';
import Menu from './Pages/Dashboard/Menu/Menu';
// import NoPageFound from './Pages/NoPageFound';
// import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import Profile from './Pages/Profile/Profile';
import EmailAuth from './Pages/ForgetPassword/EmailAuth';
import Cookies from 'js-cookie'
import Categories from './Pages/Categories/Categories';
import DraftOrders from './Pages/DraftOrders/DraftOrders';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';


function Routing() {
    const [authenticateLogin, setAthenticateLogin] = useState(true)

    const userToken = Cookies.get("AuthLogin");
    //////// Checking if user is logged or not ////////////
    console.log(userToken)
    useEffect((e) => {
        if (!userToken ||  userToken === null) {
            setAthenticateLogin(false)
        }
        else {
            setAthenticateLogin(true)
        }
    }, [])

    // const userToken = Cookies.get("isLogged");
    // useEffect(()=>
    // {

    //     if (!userToken ||  userToken === null) {
    //                 setAthenticateLogin(false)
    //             }
    //             else {
    //                     setAthenticateLogin(true)
    //                 }
            
    // },)
    // console.log(userToken)

    return (
        <div>
            <Routes>
                <Route path="/" element={<Login auth={setAthenticateLogin} />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<EmailAuth />} />
                <Route path="*" element= {<Login auth={setAthenticateLogin}/>} />
                {
                    authenticateLogin ?
                    <Route path="/dashboard" element={<Dashboard />} >
                            <Route path='' element={<Home />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="customers" element={<Categories />} />
                            <Route path="draft-orders" element={<DraftOrders/>} />
                            {/* <Route path='home' element={<Home />} /> */}
                            <Route path='menu' element={<Menu />} />
                        </Route> :""
}

            </Routes>
        </div>
    )
}

export default Routing
