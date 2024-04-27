"use client"
import { useState } from 'react'
import { useSelector } from 'react-redux';

export default function useSchedule() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const appointments = useSelector((state) => state.getAppointments.appointments);
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
