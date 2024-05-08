import React, { useDebugValue, useEffect, useState } from 'react'
import InputComponent from '../../components/InputComponent'
import { Form, Formik, } from 'formik';
import * as yup from 'yup'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Profile() {

  let userData = JSON.parse(localStorage.getItem('IsUserLogged'))
  let userEmail = (userData?.email.split('@'))
  let userName = userEmail[0];
  const navigate= useNavigate()
  const [initialValues, setInitialValues] = useState(
    {

      name: userData?.name || '',
      email: userData?.email || '',
      rememberMe: userData?.rememberMe || false,
      password: '',
      confirmPassword: ''
    }

  )
  //     {

  //       name:userData?.name,
  //       email:userData?.email,
  //       rememberMe:userData?.rememberMe,
  //       password:userData?.password
  //     }
  //   )
  // },[userData])

  const validationSchema = yup.object().shape(
    {
      name: yup.string().required('name is required').trim(),
      email: yup.string().required('email is required').trim().email(),
      password: yup
        .string()
        .required('password is required')
        .trim()
        .test('password-match', 'Password is wrong', function (value) {
          return value === userData.password;
        }),
      confirmPassword: yup.string().required('confirmPassword is required').trim().min(5, 'minimum 5 characters')
    }
  )
  const handleSubmit = (data) => {
    data.password = data.confirmPassword
    console.log(data)
    delete data.confirmPassword;
    console.log(data)

    localStorage.setItem('IsUserLogged', JSON.stringify(data))
    toast.success('Data Updated Successfully')
    setTimeout(() => {
      navigate('/dashboard')
    }, 200);

  }

  return (
    <div className=' w-full h-full bg-slate-100  flex flex-col   gap-6 py-4 items-center'>
      <div className='  py-1'>
        <span className=' font-semibold text-[32px]  capitalize'>Welcome, {userName} !</span>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(e) => handleSubmit(e)}
      >
        {(profileProps) =>
        (
          <Form className=' w-full'>

            <div className=' mx-auto py-4 px-6  gap-8 items-center flex flex-col w-2/3'>
              <div className='  grid grid-cols-2 gap-4 w-full'>

                <InputComponent
                  label={'Name'}
                  name={'name'}
                  placeholder={'Enter your Name'}
                  value={profileProps.values.name}
                  onChange={profileProps.handleChange}
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

              <button type='submit' className=' bg-slate-300 rounded py-2 px-5 '>Update </button>
            </div>
          </Form>

        )
        }
      </Formik>

    </div>
  )
}

export default Profile