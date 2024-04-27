'use client'
import { signupUser } from '@/store/slices/signup';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import Loader from '../loader/Loader';

function SignupForm() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      userName: "",
      companyName: "",
      industryName: "",
      employees: "",
      confirmPassword: "",
    });
  
    const handleInputChange = (e: any) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async(e: any) => {
      e.preventDefault();
      console.log(formData);
  
      try {
        setLoading(true);
       await dispatch(signupUser(formData) as any);
        toast.success("Registered successfully"); 
        window.location.assign("/login");
    
      setLoading(false);
      } catch (error) {
          toast.error("Error in registration"); 
        console.error("Signup failed:", error);

      }
    };
  return (
    <form className="w-full max-w-sm mt-7" onSubmit={handleSubmit}>
    <div className="mb-6">
      <label
        htmlFor="name"
        className="block text-gray-700 text-[16px] font-bold mb-2"
      >
        Name
      </label>
      <input
        type="text"
        id="userName"
        name="userName"
        value={formData.userName}
        onChange={handleInputChange}
        className="appearance-none border-b-2 border-gray-300 w-full  px-3 text-gray-700 leading-tight focus:outline-none bg-[#F7F7F7] focus:border-gray-800"
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="email"
        className="block text-gray-700 text-[16px] font-bold mb-2"
      >
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="companyName"
        className="block text-gray-700 text-[16px] font-bold mb-2"
      >
        Company Name
      </label>
      <input
        type="text"
        id="companyName"
        name="companyName"
        value={formData.companyName}
        onChange={handleInputChange}
        className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="industryName"
        className="block text-gray-700 text-[16px] font-bold mb-2"
      >
        Industry
      </label>
      <input
        type="text"
        id="industryName"
        name="industryName"
        value={formData.industryName}
        onChange={handleInputChange}
        className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="employees"
        className="block text-gray-700 text-[16px] font-bold mb-2"
      >
        How many employees do you have
      </label>
      <input
        type="text"
        id="employees"
        name="employees"
        value={formData.employees}
        onChange={handleInputChange}
        className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="password"
        className="block text-gray-700 text-[16px] font-bold mb-2"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
      />
    </div>
    <div className="mb-6">
      <label
        htmlFor="confirmPassword"
        className="block text-gray-700 text-[16px] font-bold mb-2"
      >
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full  px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
      />
    </div>
    <div className="mb-6">
      <button
        type="submit"
        className="bg-[#0000AC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
      >
        {loading?<div className=' flex justify-center items-center'><Loader/></div>:'Finish'}
      </button>
    </div>
  </form>
  )
}

export default SignupForm
