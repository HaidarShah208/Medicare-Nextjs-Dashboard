'use client'
import React from 'react'
import { signIn } from 'next-auth/react';
import Image from 'next/image';

function GoogleButton() {

  return (
    <div>
         <button  onClick={() => signIn("google", { callbackUrl: "/" })} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
            <div className="relative flex items-center space-x-6 justify-center">
              <Image width="40" height="40"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="absolute left-0 w-5"
                alt="google logo"
              />
              <span className="block w-max  font-semibold tracking-wide text-gray-700  text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                Continue with Google
              </span>
            </div>
          </button>
    </div>
  )
}

export default GoogleButton
