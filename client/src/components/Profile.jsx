import React, { useState} from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { profileVerification } from '../helper/validate'
import covertToBase64 from '../helper/convert'

import styles from '../styles/Username.module.css'
// import extend from '../styles/Profile.module.css' 


const Profile = () => {
  const [file, setFile] = useState()


  const formik = useFormik({
    initialValues : {
      firstname: '',
      lastname: '',
      mobile: '',
      email: '',
      address: ''
    },
    validate: profileVerification,
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
        <title>Profile!</title>
        <meta name='description' content='Experience real-time interactive login UI.' />
      </Helmet>
      {/* *************Header Title**************** */}
      
      
    <div className="container mx-auto">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass}`}>

          <div className="title flex flex-col items-center">
            <h4 className='text-3xl font-bold'>Profile!</h4>
            <span className='py-2 text-xxl w-2/3 text-center text-gray-500'>
              You can update the details!.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={file ? file : avatar} className={`${styles.profile_img}`} alt="avatar" />
                  </label>

                  <input onChange={onUpload} type="file" id="profile" />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex justify-center gap-5">
                  <input {...formik.getFieldProps('firstname')} className={styles.textbox} type="text" placeholder='Firstname' />
                  <input {...formik.getFieldProps('lastname')} className={styles.textbox} type="text" placeholder='Lastname' />
                </div>
                <div className="name flex justify-center gap-5">
                  <input {...formik.getFieldProps('mobile')} className={styles.textbox} type="text" placeholder='Mobile No.' />
                  <input {...formik.getFieldProps('email')} className={styles.textbox} type="text" placeholder='Email' />
                </div>

                  <input {...formik.getFieldProps('address')} className={styles.textbox} type="text" placeholder='Address' />
                  <button className={styles.btn_blue} type='submit'>Update</button>

              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Come back later? <Link className='text-red-500 underline' to="/">Logout</Link></span>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile