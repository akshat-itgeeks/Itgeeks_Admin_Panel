import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { json, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import InputComponent from '../components/InputComponent';

function Login(props) {

    let { auth } = props
    let navigate = useNavigate();
    const [UserData, setUserData] = useState('')

    ///////////// defining initialValues for form ///////////////
    const [initialValues, setInitialValues] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    ////////// validation using Yup /////////////
    const validationSchema = yup.object().shape({
        email: yup.string().trim().required("email is required").email(),
        password: yup.string().trim().required("password is required").min(5, "enter minimum 5 character"),
    });

    /////////////// Handle submit form data ///////////////
    const handleSubmit = (data) => {
        localStorage.setItem('IsUserLogged', JSON.stringify(data))
        setUserData(data)
        setTimeout(() => {
            toast.success("Login Successfull")

        }, 200);
        navigate('/dashboard')
    };
    let localData = JSON.parse(localStorage.getItem('IsUserLogged'))

    /////////// if user is already logged in will redirect to dashboard //////////
    useEffect(() => {
        if (localData || localData != null) {
            auth(true)
            navigate('/dashboard')
        }
    }, [localData])

    return (
        <div className='h-[100vh] flex w-full items-center justify-center'>
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(val) => handleSubmit(val)}
            >
                {(loginProps) => (
                    <Form className='w-full flex items-center justify-center'>
                        <div className='flex justify-center flex-col gap-8 items-center w-1/2 border rounded shadow px-2 mb-20 py-3'>
                            <div>
                                <span className=' font-mono  text-2xl  tracking-wide'>LOGIN</span>
                            </div>
                            <div className=' w-full items-center justify-center grid grid-cols-1 gap-5'>
                                <div className=' w-1/2 relative  mx-auto'>
                                    <InputComponent
                                        name={'email'}
                                        onChange={loginProps.handleChange}
                                        placeholder={'Enter your Email'}
                                        value={loginProps.values.email}
                                    />
                                </div>
                                <div className='relative w-1/2 self-center  mx-auto'>
                                    <InputComponent
                                        value={loginProps.values.password}
                                        name={'password'}
                                        onChange={loginProps.handleChange}
                                        type={'text'}
                                        placeholder={'Enter your password'}
                                    />
                                </div>
                                <div className=' w-1/2 flex  mx-auto self-center gap-1'>

                                    <input type="checkbox" name='rememberMe' onClick={(e) => loginProps.setFieldValue('rememberMe', e.target.checked)} />
                                    <span className=' text-[14px]'>Remember me ?</span>
                                </div>

                            </div>

                            <div className=' w-1/2  gap-1 flex flex-col'>

                                <button type='submit' className=' mt-1 border-none outline-none bg-slate-400 rounded px-4 py-2'>LOGIN</button>
                            </div>
                            <div className=' w-full flex  justify-end flex-col items-center  gap-1'>
                                <span onClick={() => navigate('/forgetPassword')} className=' cursor-pointer text-slate-600'>Forgot Password ?</span>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
