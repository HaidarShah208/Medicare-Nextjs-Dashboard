'use client'
import { Change, Users } from '@/app/constant/allTypes/AllTypes';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


export default function ChangePasswordForm() {
  
  const [user, setUser] = useState<Users | null>(null);
 
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getSession();
      setUser(userData as Users);
    };
    fetchUser();
  }, []);
  const currentUserEmail=user?.user.email
 const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: Change) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {oldPassword,newPassword,confirmPassword}=formData
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New and confirm password don't match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUserEmail,
          oldPassword,
          newPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to change password.");
      }
      console.log("Password changed successfully.");
      toast.success("Password changed successfully")
      window.history.back();
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again later.");
    }
  };

  return (
    <form className="w-full max-w-sm mt-7" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="oldPassword" className="block text-gray-700 text-[16px] font-bold mb-2">
          Old Password
        </label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
          placeholder="Old Password"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="newPassword" className="block text-gray-700 text-[16px] font-bold mb-2">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
          placeholder="New Password"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-gray-700 text-[16px] font-bold mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="appearance-none border-b-2  bg-[#F7F7F7] border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
          placeholder="Confirm Password"
        />
      </div>
      <div className="mb-6">
        <button
          type="submit"
          className="bg-[#0000AC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
        >
          Finish
        </button>
      </div>
    </form>
  )
}
