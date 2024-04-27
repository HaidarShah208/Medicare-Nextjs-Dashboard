"use client";
import { Users } from "@/app/constant/allTypes/AllTypes";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function EditProfileForm() {
  const [user, setUser] = useState<Users | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getSession();
      setUser(userData as Users);
    };
    fetchUser();
  }, []);
  console.log("usersssss", user);

  return (
    <div className="w-[783px] h-[440px] pt-10 mt-5 bg-white">
      <div className="px-10 py-5 justify-between flex">
        <p className="text-[18px] text-blue-600 font-bold">Edit your profile</p>
      </div>
      <div className="px-10 justify-between flex">
        <p className="text-[18px]">Name</p>
        <div className="py-2 h-[44px] px-4 w-[415px] border rounded  text-sm">
          {user?.user.name}
        </div>
      </div>
      <div className="px-10 my-5 justify-between flex">
        <p className="text-[18px]">Company Name</p>

        <div className="py-2 h-[44px] px-4 w-[415px] border rounded  text-sm"></div>
      </div>
      <div className="px-10 my-5 justify-between flex">
        <p className="text-[18px]">Industry Name</p>
        <div className="py-2 h-[44px] px-4 w-[415px] border rounded  text-sm"></div>
      </div>
      <div className="px-10 my-5 justify-between flex">
        <p className="text-[18px]">Employes</p>
        <div className="py-2 h-[44px] px-4 w-[415px] border rounded  text-sm"></div>
      </div>
      <div className="flex items-end justify-end me-10 mt-3">
        <button className="rounded bg-blue-600 text-white py-1 px-2 ">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
