import GoogleButton from "@/app/(components)/googleButton/GoogleButton";
import LoginForm from "@/app/(components)/loginForm/LoginForm";
import { IMEGES } from "@/app/constant/assets/allAssets";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center sm:w-[544px] w-[300px] items-center mt-7">
          <p className={`text-[38px]`}>Welcome to Medicare</p>
          <p className={`text-[22px]`}>Tell us about your company</p>
          <LoginForm />
        </div>
        <p className="text-gray-700 text-end text-sm ps-1 me-48">
          <div className="flex">
            <p className="me-1 text-gray-700">already have an account?</p>
            <Link href="/signup" className="text-[#0000AC] font-bold">
              Sign up
            </Link>
          </div>
        </p>
        <div className="flex items-center w-full max-w-sm mb-4 mt-5">
          <div className="flex-grow border-t border-[#101014] mr-4"></div>
          <p className="font-bold text-[#0000AC]">or</p>
          <div className="flex-grow border-t border-[#0000AC] ml-4"></div>
        </div>
        <GoogleButton />
      </div>
      <div className="w-[900px] bg-[#0000AC] sm:flex hidden justify-center items-center">
        <div className="flex justify-center items-center">
          <Image src={IMEGES.Signup} className="w-[669px]" alt="info" />
        </div>
      </div>
    </div>
  );
}
