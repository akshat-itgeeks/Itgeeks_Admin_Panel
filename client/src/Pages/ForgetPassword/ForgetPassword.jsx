import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';

function ForgetPassword() {

    let navigate = useNavigate();
    const [UserData, setUserData] = useState('')

    ////////// form initialValues ////////////
    const [initialValues, setInitialValues] = useState({
        password: '',
        confirmPassword: '',
    });

    ////////// form Validation using Yup //////////
    const validationSchema = yup.object().shape({
        password: yup.string().trim().required("password is required").min(5, "enter minimum 5 character"),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').trim().required("confirm password is required").min(5, "enter minimum 5 character"),
    });

    /////////// handling form submit ///////////
    const handleSubmit = (data) => {
        setUserData(data)
        navigate('/')
    };
    let localData= JSON.parse(localStorage.getItem('IsUserLogged'))

    /////////// if user already logged in will be redirect to dashboard //////////////
    useEffect(()=>
    {
        if(localData || localData !=null  )
            {
                navigate('/dashboard')
            }
    },[localData])

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
                                <span className=' font-mono  text-2xl  tracking-wide'>Reset Password</span>
                            </div>
                            <div className=' w-full items-center justify-center grid grid-cols-1 gap-5'>
                                <div className=' w-1/2 relative  mx-auto'>
                                   
                                    <InputComponent
                                        value={loginProps.values.password}
                                        name='password'
                                        onChange={loginProps.handleChange}
                                        type='password'
                                        placeholder={'Enter new Password'}
                                    />
                                </div>
                                <div className='relative w-1/2 self-center  mx-auto'>
                                    {/* <input
                                        value={loginProps.values.confirmPassword}
                                        name='confirmPassword'
                                        onChange={loginProps.handleChange}
                                        className='px-2 py-2 rounded w-full border outline-none'
                                        type="password"
                                        placeholder='Confirm your Password'
                                    />
                                    <ErrorMessage className='text-red-400 absolute  text-[14px]   mt-0' name='confirmPassword' component='div' /> */}
                                        <InputComponent
                                        value={loginProps.values.confirmPassword}
                                        name='confirmPassword'
                                        onChange={loginProps.handleChange}
                                        type='password'
                                        placeholder={'Confirm your Password'}
                                    />
                                </div>
                               

                            </div>

                            <div className=' w-1/2  gap-1 flex flex-col'>
                               
                                <button type='submit' className=' mt-1 border-none outline-none bg-slate-400 rounded px-4 py-2'>Submit</button>
                            </div>
                            
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ForgetPassword;
