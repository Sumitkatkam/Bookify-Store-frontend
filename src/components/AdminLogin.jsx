import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios'; 
import getbaseUrl from '../utils/baseUrl';

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const navigate = useNavigate();

    const onSubmit = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`${getbaseUrl()}/api/auth/admin`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const auth = response.data;
        console.log(auth);
        if(auth.token){
            localStorage.setItem('token', auth.token)
            setTimeout(() => {
                localStorge.removeItem('token')
                alert('Token has been expired, Please Sign In again');
                navigate("/")
            }, 3600 * 1000)
        }
        alert("Admin Login Successfull!");
        navigate("/dashboard");
    } catch (error) {
      setMessage("Invalid credentials")
    }
    }
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold mb-4'>Admin Dashboard Sign In.</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
            <input {...register("username", { required: true })} type="text" name="username" id="username" placeholder='Username' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'/>
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input {...register("password", { required: true })} type="password" placeholder='Enter your password' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'/>
          </div>
          {
            message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          }
          <div className='py-4'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-6 rounded-3xl focus:outline-none'>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin;