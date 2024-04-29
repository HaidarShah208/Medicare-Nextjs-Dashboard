"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import NewAppointment from '../newAppointment/NewAppointment';
import { PATIENTS } from '@/app/constant/assets/allAssets';

export default function AppoitmentTiemlineHeader() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
    <div className="flex justify-between">
    <p className="text-base font-bold ">Upcomming Schedule</p>
    <div className="flex">
      <div className="">
        <p className='text-base font-bold '>New appointment </p>
      </div>
      <div>
        <Image onClick={openModal}
          src={PATIENTS.Add}
          alt="add"
          className="ms-2 w-[23px] h-[23px] cursor-pointer"
        />
      </div>
    </div>
    {isModalOpen && <NewAppointment onClose={closeModal} />} 
  </div>
  )
}
