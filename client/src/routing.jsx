import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Home from './Pages/Dashboard/Home';
import Menu from './Pages/Dashboard/Menu';
import NoPageFound from './Pages/NoPageFound';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import Profile from './Pages/Profile/Profile';
import EmailAuth from './Pages/ForgetPassword/EmailAuth';


function Routing() {
    const [authenticateLogin, setAthenticateLogin] = useState(true)


    let IsUserLogged = JSON.parse(localStorage.getItem('IsUserLogged'))

    //////////// Checking if user is logged or not ////////////
    useEffect(() => {
        if (!IsUserLogged ||  IsUserLogged === null) {
            setAthenticateLogin(false)
        }
        else {
            setAthenticateLogin(true)
        }
    }, [IsUserLogged])

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
                            {/* <Route path='home' element={<Home />} /> */}
                            <Route path='menu' element={<Menu />} />
                        </Route> :""
}

            </Routes>
        </div>
    )
}

export default Routing
