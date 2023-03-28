import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from  '../store/store'
import styles from '../styles/Username.module.css';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'

const Recovery = () => {

  const { username } = useAuthStore(state => state.auth)
  const [OTP, setOTP] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      // console.log(OTP)
      if(OTP) return toast.success('OTP has been sent successfully to your email');
      return toast.error('There was a problem generating OTP');
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();

    try {
      let { status } = await verifyOTP({ username, code: OTP})
      if(status === 201){
        toast.success('OTP has been verified successfully')
        return navigate('/reset')
      }
    } catch (error) {
      return toast.error('Wrong OTP, Please check your email address')
    }
  }

  // handler of resend OTP 
  function resendOTP(){
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email</b>,
      error: <b>Something went wrong, unable to send OTP!</b>
    })

    sendPromise.then((OTP) => {
      // console.log(OTP)
    })
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
            <h4 className='text-3xl font-bold'>Hello Again!</h4>
            <span className='py-2 text-xxl w-2/3 text-center text-gray-500'>
              Enter OTP to recover password.
            </span>
          </div>

          <form className='pt-20' onSubmit={onSubmit}>
              <div className="textbox flex flex-col items-center gap-6">

                  <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-500'>
                      Enter 6 digits OTP sent to your email address
                    </span>
                    <input className={styles.textbox} onChange={(e) => setOTP(e.target.value)} type="text" placeholder='OTP' />
                  </div>
                  <button className={styles.btn_blue} type='submit'>Recover</button>

              </div>
            </form>

          <div className="text-center py-4">
            <span className='text-gray-500'>Can't get OTP? <button onClick={resendOTP} className='text-red-500 underline'>Resend Again</button></span>
          </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Recovery