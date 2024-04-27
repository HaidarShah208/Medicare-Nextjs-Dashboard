"use client"
import { PATIENTS } from '@/app/constant/assets/allAssets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function PatientHeader() {
    const [showInput, setShowInput] = useState(false);
 

    const handleSearchClick = () => {
      setShowInput(!showInput);
    };
  return (
        <div className="h-[72px] w-[1090px] items-center bg-white flex flex-row justify-between px-7">
        <div className="flex justify-center items-center">
          <p className="me-4">Total Patients</p>
          {showInput && (
          <input
            type="text"
            className="border py-1.5 w-[440px]  focus:outline-none px-2 rounded-md border-blue-600"
          
            placeholder="Search by name..."
          />
        )}
        </div>
        <div className="flex">
          <Link href="/frontend/addPatients">
            <Image src={PATIENTS.Add} alt="add" className="me-2" />
          </Link>
          <Image src={PATIENTS.SearchPatient} onClick={handleSearchClick} alt="SearchPatient" />
          <Image src={PATIENTS.Filter} alt="Filter image" className="mx-2" />
          <Image src={PATIENTS.Info} alt="User useful info" />
        </div>
      </div>
  )
}
