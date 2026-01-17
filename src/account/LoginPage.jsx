import React, { useState } from 'react';
import Login from '@react-login-page/page1';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LOCAL_URL, PROD_URL } from '../utils/api';
import { GoogleLogin } from '@react-oauth/google';
import GoogleLoginButton from './LoginWithGoogle';
import { ToastErrorMessage, ToastSuccessMessage } from '../utils/toastMessages';

const LoginPage = () => {
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

    
    const handleLogin = ()=>{
        if(!username || !password) {
            ToastErrorMessage("Enter proper details")
            return
        }
        axios.post(`${PROD_URL}/user/token/`,{user_id: username,password: password})
        .then(response=>{
            localStorage.setItem('accessToken',response.data.access);
            localStorage.setItem('refreshToken',response.data.refresh);
            navigate('/')
            ToastSuccessMessage("Login Successful")
        })
        .catch(err=>{
            navigate('/signup/')
        })
    }



    return (<>
        <div className='min-h-screen bg-gradient-to-br flex justify-center items-center from-gray-900 to-black'>
            {/* Login Section */}
            <div className='bg-black border rounded-2xl border-slate-600 p-8'>
            <div >
                <div className='flex justify-center items-center'>
                    <h1 className=' text-white'>Login !!</h1>
                </div>

                <div className='flex flex-col gap-4'>
                    {/* User ID */}
                    <div className=''>
                        <p className=' text-white text-[10px] bg-black '>user id</p>
                        <input type="text" onChange={(e)=>setUsername(e.target.value)} className='text-white focus:border-slate-900 border rounded-xl px-3 py-1 border-slate-700' placeholder='Enter user id' />
                    </div>

                    {/* Password */}
                    <div>
                        <p className='text-white text-[10px] '>password</p>
                        <input type="password" onChange={(e)=>setPassword(e.target.value)} className='text-white focus:border-slate-900 border rounded-xl px-3 py-1  border-slate-700' placeholder='Enter password' />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button onClick={handleLogin} className='text-white cursor-pointer  hover:bg-gray-800 p-2 rounded-xl bg-gray-900 '>Submit</button>
                        <p></p>
                    </div>

                </div>

            </div>  
            OR 
            <div>
                <GoogleLoginButton />
            </div>   
            </div>      
        </div>

</>)}

export default LoginPage;