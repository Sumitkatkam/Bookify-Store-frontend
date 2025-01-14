import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [message, setMessage] = useState("");
  const {loginUser, signInWithGoogle} = useAuth();
  const navigate = useNavigate();
  console.log(loginUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    console.log(data)
    try {
      await loginUser(data.email, data.password)
      alert("Login successfully!");
      navigate('/'); 
    } catch (error) {
      setMessage("Please enter valid email address and password")
    }
  }
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert('Login successfully!')
      navigate('/');
    } catch (error) {
      alert('Google sign in failed');
    }
  }
  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-2xl font-bold mb-4'>Sign In.</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
            <input {...register("email", { required: true })} type="email" name="email" id="email" placeholder='Email address' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'/>
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input {...register("password", { required: true })} type="password" placeholder='Enter your password' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'/>
          </div>
          {
            message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          }
          <div className='py-4'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-3xl focus:outline-none'>Sign In</button>
          </div>
        </form>
        <p className='align-baselinent font-medium mt-4 text-sm'>Don't have an account? Please <Link to="/register" className='text-blue-500 hover:text-blue-700'>Create New Account</Link></p>
        <div className='py-4'>
          <button onClick={handleGoogleSignIn} className='w-full flex flex-wrap items-center justify-center gap-1 bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
            <FcGoogle />
            Sign in with Google
          </button>
        </div>
        <p className='mt-4 text-center text-gray-500 text-xs'>@2025 Bookify Store. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Login;