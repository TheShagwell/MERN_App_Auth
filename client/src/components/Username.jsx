import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { usernameVerification } from '../helper/validate'
import { useAuthStore } from '../store/store'

import styles from '../styles/Username.module.css'

const Username = () => {

  const navigate = useNavigate()
  const setUsername = useAuthStore(state => state.setUsername)
  // const username = useAuthStore(state => state.auth.username)

  // useEffect(() => {
  //   console.log(username)
  // })

  const formik = useFormik({
    initialValues : {
      username: 'soso'
    },
    validate: usernameVerification,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      // console.log(values);
      setUsername(values.username)
      navigate('/password')
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
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  <button className={styles.btn_blue} type='submit'>Let's Go</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-red-500 underline' to="/register">Register Now</Link></span>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Username