'use client'
import Loader from '@/app/(components)/loader/Loader';
import { IMEGES } from '@/app/constant/assets/allAssets'
import { forgotPassword } from '@/store/slices/forgotPassword';
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
  });

  const { loading, error } = useSelector((state) => state.forgotPassword); // Get loading and error states from the store

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter email.");
      return;
    }
    dispatch(forgotPassword(formData.email) as any); // Dispatch forgotPassword action with the email
  };
  return (
    <div className='flex justify-center items-center h-screen '>
    <div className=''>
  <div className="flex flex-col justify-center sm:w-[544px]  w-[300px] items-center mt-7">
    <p className={`text-[38px]`}>Get your new password</p>
    <form className="w-full max-w-sm  mt-7" onSubmit={handleSubmit}>
    
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-[16px] font-bold mb-2">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="appearance-none border-b-2 border-gray-300 w-full py-2 px-3 bg-[#F7F7F7] text-gray-700 leading-tight focus:outline-none focus:border-gray-800" placeholder="Enter your email" />
      </div>
      <div className="mb-6">
        <button type="submit" className="bg-[#0000AC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">
        {loading?<div className=' flex justify-center items-center'><Loader/></div>:'Finish'}
          </button>
      </div>
    </form>
</div>
    </div>
    <div className='w-[900px] bg-[#0000AC] sm:flex hidden justify-center items-center'>
    <div className="flex justify-center items-center">
        <Image src={IMEGES.Signup} className='w-[669px]' alt='info'/>
    </div>
</div>
</div>
  )
}
