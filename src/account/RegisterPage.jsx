import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { LOCAL_URL, PROD_URL } from '../utils/api'
import { ToastErrorMessage, ToastSuccessMessage } from '../utils/toastMessages'
import GoogleLoginButton from './LoginWithGoogle'


function RegisterPage() {
    
    const [image,setImage] = useState(null)
    const navigate = useNavigate()
    const [formData,setFormData] = useState({
                    username:'',
                    user_id:'',
                    email:'',
                    password:'',
                })


    
    const handleDataChange = (e)=>{
        const { name, value } = e.target;
        setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    }


    const handleCreateUser = async() => {

        const {user_id,username,email,password} = formData

        //  Basic validation
        if (!username || !email || !password || !user_id) {
            ToastErrorMessage("Enter proper details")
            return
        }
        const CloudformData = new FormData();
        CloudformData.append("file", image);
        CloudformData.append("upload_preset", "Socin_images");
        let cloudinaryImage = null
        
        if (image){
        // Upload the image to Cloud
        const cloudinaryResponse = await axios.post("https://api.cloudinary.com/v1_1/novelsocinbackend/image/upload",CloudformData);

        cloudinaryImage = cloudinaryResponse.data.secure_url
        }

        const data = {
            username:username,
            user_id:user_id,
            email:email,
            password:password,
            avatar:cloudinaryImage,
        }

        axios.post(`${PROD_URL}/user/create-user/`, data)
            .then((response) => {
                // Usually successful POST is 201 Created
                if (response.status === 200 || response.status === 201) {
                    ToastSuccessMessage("Account created")
                    navigate('/login/')
                }
            })
            .catch((err) => {
                console.error(err)
                ToastErrorMessage(err.response?.data?.message || "Something went wrong")
            })
    }

    return (
        <div className='min-h-screen bg-gradient-to-l flex justify-center items-center from-gray-900 to-black'>
            <div className='bg-black border rounded-2xl flex flex-col gap-2 border-slate-600 px-8 py-3'>
                <div className='flex justify-center items-center '>
                    <h1 className='text-white text-xl font-thin'>Register !!</h1>
                </div>
                <div className='flex flex-col gap-4'>
                    {/* User_ID */}
                    <div>
                        <p className='text-white text-[10px]'>User Id</p>
                        <input 
                            type="text" 
                            name='user_id'
                            onChange={(e) => handleDataChange(e)} 
                            className='text-white focus:border-slate-900 border rounded-xl px-3 py-1 border-slate-700 bg-transparent' 
                            placeholder='Enter user id' 
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <p className='text-white text-[10px]'>username</p>
                        <input 
                            type="text" 
                            name='username'
                            onChange={(e) => handleDataChange(e)} 
                            className='text-white focus:border-slate-900 border rounded-xl px-3 py-1 border-slate-700 bg-transparent' 
                            placeholder='Enter username'
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <p className='text-white text-[10px]'>Email</p>
                        <input 
                            type="email" 
                            name='email'
                            onChange={(e) => handleDataChange(e)} 
                            className='text-white focus:border-slate-900 border rounded-xl px-3 py-1 border-slate-700 bg-transparent' 
                            placeholder='Enter email' 
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <p className='text-white text-[10px]'>password</p>
                        <input 
                            type="password" 
                            name='password'
                            onChange={(e) => handleDataChange(e)} 
                            className='text-white focus:border-slate-900 border rounded-xl px-3 py-1 border-slate-700 bg-transparent' 
                            placeholder='Enter password' 
                        />
                    </div>
                    {/* User Profile Image */}
                    <div>
                        <p className='text-white text-[10px]'>User Profile Image</p>
                        <input 
                            type="file" 
                            accept='image/*'
                            onChange={(e) => setImage(e.target.files[0])} 
                            className='text-white w-50 focus:border-slate-900 border rounded-xl px-3 py-1 border-slate-700 bg-transparent' 
                            placeholder='Enter password' 
                        />
                    </div>
                    <div>
                    
                        <button 
                            onClick={handleCreateUser} 
                            className='w-full text-white cursor-pointer  hover:bg-gray-800 p-2 rounded-xl bg-gray-900 transition-colors'
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <GoogleLoginButton/>
            </div>
        </div>
    )
}

export default RegisterPage