"use client"
import { RootState } from '@/store/store';
import { useState } from 'react'
import { useSelector } from 'react-redux';

export default function useSchedule() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const appointments = useSelector((state:RootState) => state.getAppointments.appointments);
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  return (
     { isModalOpen,closeModal,openModal,appointments}
  )
}
