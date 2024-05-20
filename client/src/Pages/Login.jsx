import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import InputComponent from '../components/InputComponent';
import Cookies from 'js-cookie'
import { setLoginData } from '../Redux/Slices/loginSlice';
import { useDispatch } from 'react-redux';
import tutorialService from '../services/authService';
import { useState } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login(props) {

    const email = "admin@gmail.com"
    const pass = "12345";
    const Dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false)

    let { auth } = props
    let navigate = useNavigate();
    // const [UserData, setUserData] = useState('')

    /* defining initialValues for form */
    const initialValues = {
        email: '',
        password: '',
        rememberMe: false
    };

    /* validation using Yup */
    const validationSchema = yup.object().shape({
        email: yup.string().trim().required("email is required").email(),
        password: yup.string().trim().required("password is required").min(6, "enter minimum 6 character"),
    });

    /* Handle submit form data */
    const handleSubmit = (data) => {

        console.log(data)
        setLoading(true)
        let loginData = {email:data?.email, password:data?.password}
        console.log(data)
        tutorialService.login(loginData)
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false)
                    Cookies.set("AuthLogin", `userActive`, { expires: 1, path: "/" });
                    Cookies.set("isLogged", `logged`);
                    Dispatch(setLoginData(data))
                    // localStorage.setItem('IsUserLogged', JSON.stringify(data))
                    // toast.success("Login Successfull")
                    navigate('/dashboard')
                }
                else {
                    setLoading(false)
                    console.log(res)
                    toast.error(res?.data?.message)
                }

            })
            .catch((err) => {
                setLoading(false)
                toast.error(err.response.data.message)

            }
            )
    };


    /* if user is already logged in will redirect to dashboard */
    const userToken = Cookies.get("AuthLogin");
    console.log(userToken)
    useEffect(() => {
        if (userToken || userToken != null) {
            auth(true)
            navigate('/dashboard')
        }
    }, [userToken])
    // const userLogin = Cookies.get("isLogged");
    // console.log(userLogin)
    // useEffect(() => {
    //     if (userLogin || userLogin != null) {
    //         auth(true)
    //         navigate('/dashboard')
    //     }
    // }, [userLogin])

    return (
        <div className='h-[100vh] bg-slate-50 flex w-full items-center justify-center'>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(val) => handleSubmit(val)}
            >
                {(loginProps) => (
                    <Form className='w-full flex items-center justify-center'>
                        <div className='flex bg-white justify-center flex-col gap-8 items-center lg:w-1/2 w-5/6 border rounded-lg shadow px-2 mb-20 py-3'>
                            <div>
                                <span className=' font-mono  text-[26px]  tracking-wide'>LOGIN</span>
                            </div>
                            <div className=' w-full items-center justify-center grid grid-cols-1 gap-5'>
                                <div className=' w-2/3 lg:w-1/2 relative  mx-auto'>
                                    <InputComponent
                                        name={'email'}
                                        onChange={loginProps.handleChange}
                                        placeholder={'Enter your Email'}
                                        value={loginProps.values.email}
                                    />
                                </div>
                                <div className='relative w-2/3 lg:w-1/2 self-center  mx-auto'>
                                    <InputComponent
                                        value={loginProps.values.password}
                                        name={'password'}
                                        onChange={loginProps.handleChange}
                                        type={'text'}
                                        placeholder={'Enter your password'}
                                    />
                                </div>
                                <div className=' w-2/3 lg:w-1/2 flex  flex-col mx-auto self-center gap-0'>
                                    <div className=' flex gap-1'>

                                        {/* <input type="checkbox" name='rememberMe' /> */}
                                        {/* <input type="checkbox" name='rememberMe' onClick={(e) => loginProps.setFieldValue('rememberMe', e.target.checked)} />
                                        <span className=' text-[14px]'>Remember me ?</span> */}
                                    </div>
                                    <div className=' w-full flex  mx-auto justify-end flex-col items-end '>
                                        <span onClick={() => navigate('/forgetPassword')} className=' cursor-pointer text-slate-600'>Forgot Password ?</span>
                                    </div>
                                </div>
                            </div>

                            <div className=' w-2/3 lg:w-1/2  gap-1 flex flex-col'>

                                <button type='submit' className=' mt-1 border-none outline-none bg-slate-400 hover:opacity-75 rounded px-4 py-2'> {isLoading?<span className=' flex w-full items-center justify-center animate-spin py-1 '><AiOutlineLoading3Quarters size={17}/></span>:"LOGIN"}</button>
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
