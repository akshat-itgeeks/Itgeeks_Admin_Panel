import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import InputComponent from '../../components/InputComponent';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import storeService from '../../services/storeService';
import { useAddNewStoreMutation } from '../../services/StoreServices';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Cookies from 'js-cookie'


function AddStore(
    {
        close
    }
) {

    
    const UserToken= Cookies.get("AuthLogin");
    const [AddStore] = useAddNewStoreMutation();
    const [showPassword, setShowPassword] = useState("password")

    /* validation schema */
    const validationSchema = yup.object().shape({
        name: yup.string().required('name is required').trim(),
        accessToken: yup.string().required('token is required').trim(),
        apiKey: yup.string().required('key is required').trim(),
        apiPassword: yup.string().required('password is required').trim()
    });

    /* initial values */
    const initialValues = {
        name: '',
        accessToken: '',
        apiKey: '',
        apiPassword: ''
    };

    /* handle form submit */
    const handleSubmit = (data) => {
        data.name = data.name + ".myshopify.com"
        let ndata = data.name.replaceAll(' ', '')
        data.name = ndata;
        console.log(data)

        // storeService.addStore(data)
        AddStore({ data })
            .then((res) => {
                if (res?.error) {
                    console.log(res.error)
                    toast.error(res?.error?.data?.message || "Something went wrong")
                }

                else if (res?.data) {
                    toast.success("Store successfully Added")
                }
                close()
            })
            .catch((err) => {
                console.log(err)
                toast.error("Something went wrong")
            })



    };

    return (
        <div className=' flex p-2 flex-col gap-3'>
            <div className=' flex text-lg font-semibold justify-between'>
                Create Store
                <div>
                    <span onClick={() => close()} className=' bg-slate-500 text-white cursor-pointer py-2 px-3 rounded'>X</span>
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
                                    name={'apiKey'}
                                    onChange={settingsProps.handleChange}
                                    value={settingsProps.values.apiKey}
                                />
                                <div className=' relative flex  items-center'>

                                    <InputComponent
                                        required
                                        type={showPassword}
                                        label={'Store Api Password'}
                                        placeholder={'Store Api Key'}
                                        name={'apiPassword'}
                                        onChange={settingsProps.handleChange}
                                        value={settingsProps.values.apiPassword}
                                    />
                                    <span className=' absolute cursor-pointer right-2 bottom-3'>
                                        {
                                            showPassword === "text" ?
                                                <IoEye onClick={() => setShowPassword("password")} size={18} />
                                                :
                                                <IoEyeOff onClick={() => setShowPassword("text")} size={18} />

                                        }
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center justify-center gap-3'>
                                <button type='reset' className='text-white mt-1 border-none outline-none bg-slate-500 hover:opacity-75 rounded px-4 py-[5px]'>
                                    <span className='flex w-full items-center justify-center py-1'>Reset</span>
                                </button>
                                <button type='submit' className='mt-1 border-none outline-none bg-slate-500 text-white hover:opacity-75 rounded px-4 py-[5px]'>
                                    <span className='flex w-full items-center px-2 justify-center py-1'>Create</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddStore;