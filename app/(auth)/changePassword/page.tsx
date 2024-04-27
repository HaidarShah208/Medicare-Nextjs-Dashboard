import ChangePasswordForm from '@/app/(components)/changePasswordForm/page'
import { IMEGES } from '@/app/constant/assets/allAssets'
import Image from 'next/image'
import React from 'react'

export default function ChangePassword() {
  return (
         <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center sm:w-[544px] w-[300px] items-center mt-7">
          <p className={`text-[38px]`}>Change your password</p>
<ChangePasswordForm/>
        </div>
      </div>
      <div className="w-[900px] bg-[#0000AC] sm:flex hidden justify-center items-center">
        <div className="flex justify-center items-center">
          <Image src={IMEGES.Signup} className="w-[669px]" alt="info" />
        </div>
      </div>
    </div>
  )
}
