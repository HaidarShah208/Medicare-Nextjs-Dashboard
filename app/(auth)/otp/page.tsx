'use client'
import { IMEGES } from '@/app/constant/assets/allAssets'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function Otp() {
  const router = useRouter();
    const [formData, setFormData] = useState({
        otp: '',
      });
      const [otp, setOtp] = useState({ email: "", otp: "" });
      const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      useEffect(() => {
        const otpValue = localStorage.getItem("otpData");
        console.log("🚀  useEffect  otpValue:", otpValue);
        if (otpValue !== null) {
          const parsedOtp = JSON.parse(otpValue);
          if (parsedOtp) {
            setOtp(parsedOtp);
          }
        }
      }, []);
      const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!formData.otp) {
          toast.error("Please enter otp.");
          return;
        }
        try {
          if (!otp.otp || otp.otp == "") {
            toast.error("OTP Expired");
            return;
          }
    
          const matchOtp = otp.otp == formData.otp;
    
          if (!matchOtp) {
            toast.error("OTP not matched");
            return;
          }
          router.push("/newPassword");
        } catch (error) {
          toast.error(`Error changing password: ${error}`);
        }
    }
  return (
    <div className='flex justify-center items-center h-screen '>
    <div className=''>
  <div className="flex flex-col justify-center sm:w-[544px]  w-[300px] items-center mt-7">
    <p className={`text-[38px]`}>Write your otp</p>
    <form className="w-full max-w-sm  mt-7" onSubmit={handleSubmit}>
    
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-[16px] font-bold mb-2">Your otp</label>
        <input type="number" id="number" name="otp" value={formData.otp} onChange={handleInputChange} className="appearance-none border-b-2 border-gray-300 w-full py-2 px-3 bg-[#F7F7F7] text-gray-700 leading-tight focus:outline-none focus:border-gray-800" placeholder="Enter your email" />
      </div>
      <div className="mb-6">
        <button type="submit" className="bg-[#0000AC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline">
<div className=' flex justify-center items-center'>Finish</div>
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

export default Otp
