import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordVerification } from '../helper/validate'

import styles from '../styles/Username.module.css'

const Recovery = () => {

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
              Enter OTP to recover password.
            </span>
          </div>

          <form className='pt-20'>
              <div className="textbox flex flex-col items-center gap-6">

                  <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-500'>
                      Enter 6 digits OTP sent to your email address
                    </span>
                    <input className={styles.textbox} type="text" placeholder='OTP' />
                  </div>
                  <button className={styles.btn_blue} type='submit'>Sign In</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Can't get OTP? <button className='text-red-500 underline'>Resend Again</button></span>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Recovery