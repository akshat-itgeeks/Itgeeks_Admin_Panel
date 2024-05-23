import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import InputComponent from '../../components/InputComponent';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useGetStoreByIdQuery, useUpdateStoreByIdMutation } from '../../services/StoreServices';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoEye, IoEyeOff } from 'react-icons/io5';

function EditStore(
    {
        close,
        Id
    }
) {

    const [storeData, setStoreData] = useState([]);
    const [updateStore] = useUpdateStoreByIdMutation();
    const [loading, setLoading] = useState(false);
    const [passwordType,setPasswordType]= useState("password")

    /* fetching user data */
    console.log(Id)
    const { data: SingleStoreData, isLoading, isFetching } = useGetStoreByIdQuery({ Id })

    useEffect(() => {
        if (isLoading || isFetching) {

        }
        else {
            setStoreData(SingleStoreData?.result)
        }
    }, [SingleStoreData, isLoading, isFetching])
    console.log(SingleStoreData)


    /* state for showPassword */
    const [showPass, setShowPass] = useState('password')

    const validationSchema = yup.object().shape({
        name: yup.string().required('name is required').trim(),
        accessToken: yup.string().required('token is required').trim(),
        apiKey: yup.string().required('key is required').trim(),
        apiPassword: yup.string().required('password is required').trim()
    });

    /* initial values */
    const initialValues = {
        name: storeData?.name?.split('.m')[0] || '',
        accessToken: storeData?.accessToken || '',
        apiKey: storeData?.apiKey || '',
        apiPassword: storeData?.apiPassword || ''
    };


    /* handle form submit */
    const handleSubmit = (data) => {
        data.name = data.name + ".myshopify.com"
        // removing spaces from store name //
        let ndata = data.name.replaceAll(' ', '')
        data.name = ndata
        console.log(data);
        setLoading(true)
        updateStore({ data, Id })
            .then((res) => {
                if (res?.error) {
                    toast.error(res?.error?.data?.message)

                }
                else if (res?.data) {
                    toast.success("Data Successfully Updated")
                }
                close()
                setLoading(false)
            })
            .catch((err) => {
                toast.error("Something went wrong")
                console.log(err)
                close()
                setLoading(false)
            })

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
                                        type={'text'}
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
                                    type={"text"}
                                    label={'Api Access Token'}
                                    placeholder={'Api Access Token'}
                                    name={'accessToken'}
                                    onChange={settingsProps.handleChange}
                                    value={settingsProps.values.accessToken}
                                />
                                <InputComponent
                                    required
                                    type={"text"}
                                    label={'Store Api Key'}
                                    placeholder={'Store Api Key'}
                                    name={'apiKey'}
                                    onChange={settingsProps.handleChange}
                                    value={settingsProps.values.apiKey}
                                />
                                <div className=' select-none flex relative items-center'>

                                    <InputComponent
                                        required
                                        type={passwordType}
                                        label={'Store Api Password'}
                                        placeholder={'Store Api Key'}
                                        name={'apiPassword'}
                                        onChange={settingsProps.handleChange}
                                        value={settingsProps.values.apiPassword}
                                    />
                                    <span className=' cursor-pointer absolute bottom-3 right-3'>
                                        {
                                            passwordType ==='text'
                                            ?
                                            <IoEye onClick={()=>setPasswordType("password")} size={18}/>
                                            :
                                        <IoEyeOff onClick={()=>setPasswordType("text")} size={18}/>
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className='flex select-none items-center justify-center gap-3'>
                                <button type='button' onClick={() => close()} className='text-white mt-1 border-none outline-none bg-slate-500 hover:opacity-75 rounded px-4 py-[5px]'>
                                    <span className='flex w-full items-center justify-center py-1'>Cancel</span>
                                </button>
                                <button type='submit' className='mt-1 border-none outline-none bg-slate-500 text-white hover:opacity-75 rounded px-4 py-[5px]'>
                                    <span className='flex w-full items-center px-2 justify-center py-1'> {loading ? <span className=' py-1 px-[15.5px] animate-spin'><AiOutlineLoading3Quarters /></span> : "Update"}</span>
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