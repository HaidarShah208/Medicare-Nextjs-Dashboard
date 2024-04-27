import React from "react";
import { IMEGES } from "@/app/constant/assets/allAssets";
import Image from "next/image";
import Link from "next/link";
import SignupForm from "@/app/(components)/signupForm/SignupForm";
 

function Signup() {
 
  return (
    <div className="flex">
      <div>
        <div className="flex flex-col justify-center w-[544px]  items-center mt-7 mb-7">
          <p className={`text-[38px]`}>Welcome to Medicare</p>
          <p className={`text-[22px]`}>Tell us about your company</p>
     <SignupForm/>
          <p className="text-gray-700 text-start text-sm mb-3">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0000AC] font-bold">
              Login
            </Link>
          </p>       
        </div>
      </div>
      <div className='w-[900px] bg-[#0000AC] sm:flex hidden justify-center items-center'>
    <div className="flex justify-center items-center">
        <Image src={IMEGES.Signup} className='w-[669px]' alt='info'/>
    </div>
</div>
    </div>
  );
}

export default Signup;
