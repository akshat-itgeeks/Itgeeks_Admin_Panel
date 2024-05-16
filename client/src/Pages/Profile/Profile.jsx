import React, { useState } from 'react'
import InputComponent from '../../components/InputComponent'
import { Form, Formik, } from 'formik';
import * as yup from 'yup'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaUser } from 'react-icons/fa';

function Profile() {

  let userData = JSON.parse(localStorage.getItem('IsUserLogged'))
  const [userProfileData, setUserProfileData] = useState(userData?.userProfile)
  let userEmail = (userData?.email.split('@'))
  let userName = userEmail[0];
  const navigate = useNavigate();


  /* initial values for profile form  */

  const initialValues =
  {

    name: userData?.name || '',
    email: userData?.email || '',
    rememberMe: userData?.rememberMe || false,
    password: '',
    confirmPassword: '',
    userProfile: userData?.userProfile
  }


  //     {

  //       name:userData?.name,
  //       email:userData?.email,
  //       rememberMe:userData?.rememberMe,
  //       password:userData?.password
  //     }
  //   )
  // },[userData])

  /* form validation using yup  */
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

  /* handle submit */
  const handleSubmit = (data) => {
    data.password = data.confirmPassword
    console.log(data)
    delete data.confirmPassword;
    console.log(data)
    data.userProfile = userProfileData
    localStorage.setItem('IsUserLogged', JSON.stringify(data))
    toast.success('Data Updated Successfully')
    setTimeout(() => {
      navigate('/dashboard')
    }, 200);

  }

  /* Handling user profile input */

  // const handleProfileImage = (e) => {
  //   const file = e.target.files[0];
  //   let imageUrl = URL.createObjectURL(file);
  //   if (file) {
  //     imageUrl = URL.createObjectURL(file);
  //     setUserProfileData(imageUrl);
  //     // toast.success("Image upload successfull")
  //   }
  //   setInitialValues((oldValues) => ({
  //     ...oldValues,
  //     userProfile: imageUrl,
  //   }));

  // };
  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      let imageUrl = URL.createObjectURL(file);
      setUserProfileData(imageUrl);
    }
  };

  console.log(userProfileData)
  return (
    <div className=' w-full h-full bg-white  flex flex-col   gap-3 py-5 items-center'>
      <div  className=' w-2/3  rounded px-2 py-5 shadow-sm bg-slate-50 '>

        <div className=' w-full flex items-center justify-center gap-1 flex-col  py-1'>
          <div className=' flex gap-1'>
            <div className={` bg-slate-200  rounded-full ${userProfileData ? "p-0" : "p-3"} mx-auto`}>
              {
                userProfileData ?

                  <img className=' w-[80px] h-[80px] rounded-full object-cover' src={userProfileData} width={80} height={80} alt="" />
                  :
                  <FaUser className=' rounded-full' size={50} />

              }
            </div>
            <input onInput={(e) => handleProfileImage(e)} accept='image/*' type="file" name='profileImg' id='profileImg' className=' hidden w-0' />
            <label htmlFor='profileImg' className=' self-end pb-2'><FaEdit /></label>
          </div>
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
        </Formik>

      </div>
    </div>
  )
}

export default Profile