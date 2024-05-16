import React, { useEffect, useState } from 'react';
import { Routes, Route,  } from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Dashboard/Home';
import Menu from './Pages/Dashboard/Menu';
// import NoPageFound from './Pages/NoPageFound';
// import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import Profile from './Pages/Profile/Profile';
import EmailAuth from './Pages/ForgetPassword/EmailAuth';
import Cookies from 'js-cookie'
import Categories from './Pages/Categories/Categories';


function Routing() {
    const [authenticateLogin, setAthenticateLogin] = useState(true)

    const userToken = Cookies.get("AuthLogin");
    ////////// Checking if user is logged or not ////////////
    // console.log(userToken)
    // useEffect((e) => {
    //     if (!userToken ||  userToken === null) {
    //         setAthenticateLogin(false)
    //     }
    //     else {
    //         setAthenticateLogin(true)
    //     }
    // }, [])

    return (
        <div>
            <Routes>
                <Route path="/" element={<Login auth={setAthenticateLogin} />} />
                {/* <Route path="/forgetPassword" element={<ForgetPassword />} /> */}
                <Route path="/forgetPassword" element={<EmailAuth />} />
                <Route path="*" element= {<Login auth={setAthenticateLogin}/>} />
                {
                    authenticateLogin ?
                    <Route path="/dashboard" element={<Dashboard />} >
                            <Route path='' element={<Home />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="customers" element={<Categories />} />
                            {/* <Route path='home' element={<Home />} /> */}
                            <Route path='menu' element={<Menu />} />
                        </Route> :""
}

            </Routes>
        </div>
    )
}

export default Routing
