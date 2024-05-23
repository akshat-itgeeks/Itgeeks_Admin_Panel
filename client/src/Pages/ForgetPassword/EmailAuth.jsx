import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../../components/InputComponent';
import toast from 'react-hot-toast'
import { useResetPasswordMutation } from '../../services/AuthServices';

function EmailAuth() {

    let navigate = useNavigate();
    const [UserData, setUserData] = useState('');
    const [linksend,setLinkSend]= useState(false);
    const [loading,setLoading]= useState(false);
    const [resetPassword]= useResetPasswordMutation()


    /* form initialValues */
    const [initialValues, setInitialValues] = useState({
        email:''
    });


    /* form Validation using Yup */
    const validationSchema = yup.object().shape({
        email: yup.string().trim().required("email is required").email(),
    });


    /* handling form submit */
    const handleSubmit = (data,{ resetForm } ) => {
        setLoading(true)
        setUserData(data)
        // tutorialService.resetPassword(data)
        resetPassword({data})
        .then((dta)=>
        {
            if(dta?.data)
                {
                    setTimeout(() => {
                        
                        toast.success(dta?.data?.message)
                        setLinkSend(true);
                        resetForm();
                    }, 100);
                    setTimeout(() => {
                        navigate('/')
                    }, 600);
                }
                else if(data.error)
                {
                    toast.error('something went wrong')
                    setLinkSend(false)
                }
                setLoading(false)
        })
        .catch((err)=> {toast.error(err.response.data.message); setLoading(false); setLinkSend(false)})

    };

    
    /*if user already logged in will be redirect to dashboard */
    // let localData= JSON.parse(localStorage.getItem('IsUserLogged'))
    // useEffect(() => {
    //     if (localData || localData != null) {
    //         navigate('/dashboard')
    //     }
    // }, [localData])

    return (
        <div className='h-[100vh] relative flex-col gap-2 flex w-full items-center justify-center'>
                

                <span className=' text-[18px]  text-green-500'> {linksend&& "Check Your Email to Reset Password !"} </span>
          
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {(loginProps) => (
                    <Form className='w-full flex items-center justify-center'>
                        <div className='flex justify-center flex-col gap-8 items-center w-1/2 border rounded shadow px-2 mb-12 py-3'>
                            <div>
                                <span className=' font-mono  text-2xl  tracking-wide'>Reset Password</span>
                            </div>
                            <div className=' w-full items-center justify-center grid grid-cols-1 gap-5'>
                                <div className=' w-1/2 relative  mx-auto'>

                                    <InputComponent
                                        value={loginProps.values.email}
                                        name='email'
                                        onChange={loginProps.handleChange}
                                        type='email'
                                        placeholder={'Enter your email'}
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

export default EmailAuth;
