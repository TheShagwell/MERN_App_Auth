import React from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
// import { Link } from 'react-router-dom'
// import avatar from '../assets/profile.png'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordVerification } from '../helper/validate'
import { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store'
import { Navigate, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/fetch.hook'

import styles from '../styles/Username.module.css'

const Password = () => {

  const { username } = useAuthStore(state => state.auth)
  const navigate = useNavigate()

  const [{isLoading, apiData, status, serverError}] = useFetch('createResetSession')

  // useEffect(() => {
  //   if(status) {
      
  //   };
  // }, [isLoading, apiData, serverError])

  const formik = useFormik({
    initialValues : {
      password: 'global@333',
      confirm_pwd: 'global@333'
    },
    validate: resetPasswordVerification,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let resetPromise = resetPassword({ username, password: values.password})

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset</b>
      });

      resetPromise.then(function(){
        navigate('/password')
      })
    }
  })
  
  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div>
      {/* **************Header Title*************** */}
      <Helmet>
        <title>User login!</title>
        <meta name='description' content='Experience real-time interactive login UI.' />
      </Helmet>
      {/* *************Header Title**************** */}
      
      
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-3xl font-bold'>Hello Again!</h4>
            <span className='py-2 text-xxl w-2/3 text-center text-gray-500'>
              Enter new Password
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password' />
                  <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Repeat Password' />
                  <button className={styles.btn_blue} type='submit'>Reset Now</button>
              </div>

          </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Password