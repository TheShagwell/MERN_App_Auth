import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordVerification } from '../helper/validate'

import styles from '../styles/Username.module.css'

const Password = () => {
  const formik = useFormik({
    initialValues : {
      password: 'global@333',
      confirm_pwd: 'global@333'
    },
    validate: resetPasswordVerification,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values);
    }
  })
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