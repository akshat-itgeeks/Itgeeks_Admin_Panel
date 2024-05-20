import React, { useState } from 'react'
import InputComponent from '../../../components/InputComponent'
import { Formik } from 'formik'
import { Form } from 'react-router-dom'
import * as yup from 'yup'

function MenuEdit(
    {
        close,
    }
) {

    /* validation  */

    const validationSchema= yup.object().shape(
        {
            name:yup.string().required('')
        }
    )

    const [initialValues,setInitialValues]=useState(
        {
            name:'',

        }
    )

    const handleSubmit = (data) => {
        console.log(data)

    }

    return (
        <div className=' w-full flex flex-col gap-3'>
            <div className=' flex w-full justify-between items-center'>
                <div>
                    MENU EDIT
                </div>

                <span className=' bg-slate-500 px-3  py-1 rounded-lg text-white self-end cursor-pointer ' onClick={() => close()}>X</span>

            </div>
            <div className=' grid-cols-2 gap-2'>
                {/* <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(e) => handleSubmit(e)}
                >
                    {(profileProps) =>
                    (
                        <Form className=' w-full'>

                            <div className=' mx-auto py-4 px-6  gap-8 items-center flex flex-col w-full'>
                                <div className='  grid grid-cols-2 gap-4 w-full'>

                                    <InputComponent
                                        label={'Name'}
                                        name={'name'}
                                        placeholder={'Enter your Name'}
                                        value={profileProps.values.name}
                                        // onChange={profileProps.handleChange}
                                        onChange={(e) => profileProps.setFieldValue('name', e.target.value)}

                                    />
                                    <InputComponent
                                        label='Email'
                                        name={'email'}
                                        placeholder={'Enter your Email'}
                                        value={profileProps.values.email}
                                        onChange={profileProps.handleChange}
                                    />
                                    <InputComponent
                                        label='Currunt Password'
                                        type={'string'}
                                        name={'password'}
                                        placeholder={'Enter currunt password'}
                                        value={profileProps.values.password}
                                        onChange={profileProps.handleChange}
                                    />
                                    <InputComponent
                                        label='New Password'
                                        type={'string'}
                                        name={'confirmPassword'}
                                        placeholder={'Enter new Password'}
                                        value={profileProps.values.confirmPassword}
                                        onChange={profileProps.handleChange}
                                    />

                                </div>

                                <button type='submit' className=' hover:opacity-80 bg-slate-700 text-white rounded py-2 px-5 '>Update </button>
                            </div>
                        </Form>

                    )
                    }
                </Formik> */}
            </div>
        </div>
    )
}

export default MenuEdit