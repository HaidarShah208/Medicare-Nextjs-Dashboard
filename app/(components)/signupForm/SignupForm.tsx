'use client'
import { signupUser } from '@/store/slices/signup';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import AuthFormButton from '../authFormButton/AuthFormButton';
import AuthFormInput from '../authFormInput/AuthFormInput';
import { Change } from '@/app/constant/allTypes/AllTypes';


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
  
    const handleInputChange = (e: Change) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!formData.email || !formData.password || !formData.userName || !formData.companyName || !formData.confirmPassword|| !formData.employees || !formData.industryName) {
        toast.error("Please enter all fields");
        return;
      }
      try {
        setLoading(true);
       await dispatch(signupUser(formData) as any);
        toast.success("Registered successfully"); 
        window.location.assign("/login");
    
      setLoading(false);
      } catch (error) {
          toast.error("Error in registration"); 

      }
    };
  return (
    <form className="w-full max-w-sm mt-7" onSubmit={handleSubmit}>
  <AuthFormInput label="Name" name="userName" value={formData.userName} onChange={handleInputChange} />
      <AuthFormInput label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
      <AuthFormInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleInputChange} />
      <AuthFormInput label="Industry Name" name="industryName" value={formData.industryName} onChange={handleInputChange} />
      <AuthFormInput label="How many employees do you have" name="employees" value={formData.employees} onChange={handleInputChange} />
      <AuthFormInput label="Password" name="password" type="password" value={formData.password} onChange={handleInputChange} />
      <AuthFormInput label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} />

    <div className="mb-6">
   <AuthFormButton isLoading={loading}/>
    </div>
  </form>
  )
}

export default SignupForm
