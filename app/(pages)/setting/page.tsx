import EditProfileForm from "@/app/(components)/editProfileForm/EditProfileForm";
import GetCurrentUser from "@/app/(components)/getCurrentUser/GetCurrentUser";
import { DASHBOARD } from "@/app/constant/assets/allAssets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Setting() {

  return (
    <div className="">
     <div className="flex justify-between">

     <p className="ps-3 mb-5 mt-2">Setting</p>
     <GetCurrentUser/>
     </div>
      <div className="h-[72px] w-[1100px] items-center bg-white flex flex-row justify-between px-7">
        <div className="">
          <p className="border rounded-md bg-blue-700 text-white px-3 py-1">Your Profile</p>
        </div>
        <div className="flex">
          <Image src={DASHBOARD.Question} alt="question" />
        </div>
      </div>
      <div className="bg-white h-[60px] flex mt-3 rounded ps-6 items-center">
        <p className="text-gray-700 font-bold me-56 my-4 justify-center items-center">
          <Link href={"/changePassword"}>Change your password ?</Link>
        </p>
      </div>
     <EditProfileForm/>
    </div>
  );
}

export default Setting;
