import React, { useState } from 'react';
import InputComponent from '../../../components/InputComponent';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import Select from 'react-select';
import toast from 'react-hot-toast';

function MenuEdit({ close }) {

    /* validation schema */
    const validationSchema = yup.object().shape({
        name: yup.string().required('Name is required').trim(),
        email: yup.string().email('Invalid email').required('Email is required').trim(),
        number: yup.string().matches(/^[0-9]+$/, "Enter numbers only").min(10, "Enter a valid number").required('Number is required').trim(),
        status: yup.boolean().required('Status is required')
    });

    /* initial values */
    const initialValues = {
        name: '',
        email: '',
        number: '',
        status: ''
    };

    /* handle form submit */
    const handleSubmit = (data) => {
        console.log(data);
        toast.success("Data updated successfully")
        setTimeout(() => {
            
            close()
        }, 300);
    };

    /* select options */
    const options = [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' }
    ];

    return (
        <div className='w-full flex flex-col gap-5 py-1'>
            <div className='flex w-full justify-between items-center'>
                <div className='uppercase text-lg font-semibold'>
                    Edit User
                </div>
                {/* <span className='bg-slate-500 px-3 py-1 rounded-lg text-white self-end cursor-pointer' onClick={() => close()}>X</span> */}
            </div>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(menuProps) => (
                        <Form className='flex flex-col gap-[25px]'>
                            <div className='items-center grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                <InputComponent
                                    label={'Name'}
                                    placeholder={'Enter your name'}
                                    name={'name'}
                                    onChange={menuProps.handleChange}
                                    value={menuProps.values.name}
                                />
                                <InputComponent
                                    label={'Email'}
                                    placeholder={'Enter your email'}
                                    name={'email'}
                                    onChange={menuProps.handleChange}
                                    value={menuProps.values.email}
                                />
                                <InputComponent
                                    label={'Number'}
                                    placeholder={'Enter your number'}
                                    name={'number'}
                                    onChange={menuProps.handleChange}
                                    value={menuProps.values.number}
                                />
                                <div className='w-full'>
                                    <label className='block text-sm   my-[1.2px] font-medium text-gray-700'>Status</label>
                                    <Select
                                        value={options.find(option => option.value === menuProps.values.status)}
                                        onChange={(option) => menuProps.setFieldValue('status', option.value)}
                                        options={options}
                                        name='status'
                                        className='self-center pt-0'
                                    />
                                    {menuProps.errors.status && menuProps.touched.status ? (
                                        <div className='text-red-400 absolute text-sm mt-0'>{menuProps.errors.status}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='flex items-center justify-center gap-3'>
                                <button type='button' onClick={() => close()} className='text-white mt-1 border-none outline-none bg-slate-500 hover:opacity-75 rounded px-4 py-2'>
                                    <span className='flex w-full items-center justify-center py-1'>Cancel</span>
                                </button>
                                <button type='submit' className='mt-1 border-none outline-none bg-slate-500 text-white hover:opacity-75 rounded px-4 py-2'>
                                    <span className='flex w-full items-center justify-center py-1'>Update</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default MenuEdit;
