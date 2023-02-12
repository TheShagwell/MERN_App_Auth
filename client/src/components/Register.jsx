import React, { useState} from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { registerVerification } from '../helper/validate'
import covertToBase64 from '../helper/convert'

import styles from '../styles/Username.module.css'


const Register = () => {
  const [file, setFile] = useState()


  const formik = useFormik({
    initialValues : {
      username: '',
      email: '',
      password: ''
    },
    validate: registerVerification,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile : file || ''})
      console.log(values);
    }
  })

  // ********** Formik doesn't support file upload, hence we need to create this handler **********
  const onUpload = async (e) => {
    const base64 = await covertToBase64(e.target.files[0])
    setFile(base64);
  }    


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
            <h4 className='text-3xl font-bold'>Register!</h4>
            <span className='py-2 text-xxl w-2/3 text-center text-gray-500'>
              Happy to join you!.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                  </label>

                  <input onChange={onUpload} type="file" id="profile" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                  <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email' />
                  <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username' />
                  <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='Password' />
                  <button className={styles.btn_blue} type='submit'>Sign In</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Already Register? <Link className='text-red-500 underline' to="/">Login Now</Link></span>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register