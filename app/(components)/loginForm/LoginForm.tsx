'use client'
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Loader from '../loader/Loader';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Change = {
  target: {
    name: string;
    value: string;
  };
};

function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: Change) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password.");
      return;
    }
    try {
      setIsLoading(true);
      console.log("Submitting with state:", formData);
      const user = await signIn("credentials", {
        ...formData,
        redirect: false,
      });
      console.log("signIn response:", user);

      if (user && user.ok) {
        toast.success("You Are successfully Login");
        router.push("/");
      } else {
        if (user && user.error === "CredentialsSignin") {
          toast.error("Invalid email or password");
        } else {
          toast.error("An error occurred while logging in");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred while logging in");
    }
  };

  

  return (
       <form className="w-full max-w-sm mt-7" onSubmit={handleSubmit}>
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
                onChange={handleChange}
                className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
                placeholder="Enter your email"
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
                onChange={handleChange}
                className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
                placeholder="Enter your password"
              />
            </div>
            <p className="text-gray-700 text-end mb-4 text-sm ms-60">
          <Link
            href="/forgotPassword"
            className="text-[#0000AC] font-bold"
          >
            Lost your password ?
          </Link>
        </p>
            <div className="mb-6">
              <button
                type="submit"
                className="bg-[#0000AC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
              >
               {isLoading?<div className=' flex justify-center items-center'><Loader/></div>:'Finish'}
              </button>
            </div>
          </form>
  )
}

export default LoginForm
