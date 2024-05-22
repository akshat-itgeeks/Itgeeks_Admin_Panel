import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import InputComponent from '../../components/InputComponent';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import storeService from '../../services/storeService';

function EditStore(
    {
        close,
        Id
    }
) {
    /* state for showPassword */ 
    const [showPass,setShowPass]= useState('password')
    console.log(Id)
    /* validation schema */
    const validationSchema = yup.object().shape({
        name: yup.string().required('name is required').trim(),
        accessToken: yup.string().required('token is required').trim(),
        ApiKey: yup.string().min(10, "min 10 characters").required('key is required').trim(),
        ApiPassword: yup.string().min(5, "min 5 characters required").required('password is required').trim()
    });

    /* initial values */
    const initialValues = {
        name: 'Store 1',
        accessToken: 'Akshat',
        ApiKey: 'jskdafdfa32',
        ApiPassword: '12113'
    };


    /* handle form submit */
    const handleSubmit = (data) => {
        data.name = data.name + ".myshopify.com"
        // removing spaces from store name //
        let ndata= data.name.replaceAll(' ','')
        data.name= ndata

        console.log(data);
        toast.success("Data updated successfully")
        storeService.updateStoreById()
        setTimeout(() => {
            close()
        }, 300);
    };

   

    return (
        <div className=' flex p-2 flex-col gap-3'>
            <div className=' flex text-lg font-semibold justify-between'>
                Update Store
                <div>
                </div>
            </div>
            <div>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(settingsProps) => (
                        <Form className='flex flex-col gap-[25px]'>
                            <div className='items-center grid md:grid-cols-2 grid-cols-1 gap-5'>
                                <div className=' flex items-center gap-1'>

                                    <InputComponent
                                        required
                                        label={'Store Name'}
                                        defaultValue="Store"
                                        placeholder={'Enter Store name'}
                                        name={'name'}
                                        onChange={settingsProps.handleChange}
                                        value={settingsProps.values.name}
                                    />
                                    <span className=' pt-4'>
                                        .myshopify.com
                                    </span>
                                </div>
                                <InputComponent
                                    required
                                    label={'Api Access Token'}
                                    placeholder={'Api Access Token'}
                                    name={'accessToken'}
                                    onChange={settingsProps.handleChange}
                                    value={settingsProps.values.accessToken}
                                />
                                <InputComponent
                                    required
                                    label={'Store Api Key'}
                                    placeholder={'Store Api Key'}
                                    name={'ApiKey'}
                                    onChange={settingsProps.handleChange}
                                    value={settingsProps.values.ApiKey}
                                />
                                <InputComponent
                                    required
                                    type={'password'}
                                    label={'Store Api Password'}
                                    placeholder={'Store Api Key'}
                                    name={'ApiPassword'}
                                    onChange={settingsProps.handleChange}
                                    value={settingsProps.values.ApiPassword}
                                />

                            </div>
                            <div className='flex items-center justify-center gap-3'>
                                <button type='button' onClick={()=>close()} className='text-white mt-1 border-none outline-none bg-slate-500 hover:opacity-75 rounded px-4 py-[5px]'>
                                    <span className='flex w-full items-center justify-center py-1'>Cancel</span>
                                </button>
                                <button type='submit' className='mt-1 border-none outline-none bg-slate-500 text-white hover:opacity-75 rounded px-4 py-[5px]'>
                                    <span className='flex w-full items-center px-2 justify-center py-1'>Update</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default EditStore;