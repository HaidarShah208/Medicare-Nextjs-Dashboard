'use client'
import Loader from '@/app/(components)/loader/Loader';
import { IMEGES } from '@/app/constant/assets/allAssets'
import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function ForgotPassword() {
  const router = useRouter();
  const { loading } = useSelector((state:any) => state.forgotPassword); 
  const [formData, setFormData] = useState({
    email: '',
  });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter email.");
      return;
    }

    const data = {
      service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID || "",
      template_params: {
        to_email: formData.email,
        to_name: formData.email,
        from_name: "Medicare app",
        user_email: formData.email,
        otp: otp,
      },
    };

    try {
      const res = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        data
      );
      localStorage.setItem(
        "otpData",
        JSON.stringify({ email: formData.email, otp })
      );
      router.push("/otp");
    } catch (error) {
      toast.error("Error creating otp");
    }
  };

  useEffect(() => {
    setTimeout(function () {
      localStorage.removeItem("otpData");
    }, 60 * 1000);
  }, [otp]);


  return (
    <div className='flex justify-center items-center h-screen '>
    <div className=''>
  <div className="flex flex-col justify-center sm:w-[544px]  w-[300px] items-center mt-7">
    <p className={`text-[38px] my-5` }>Enter your email</p>
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
