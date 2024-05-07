'use client'
import { getAppointments } from '@/store/slices/getAppoitments';
import { RootState } from '@/store/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 interface AppointmentDataType {
  consultation: string;
  dateTime: string;
  patientsName: string;
  
}

export default function ToastNotification() {
  const appointments:AppointmentDataType[] = useSelector((s: RootState) => s.getAppointments.appointments);
const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAppointments() as any);
  }, []);
  useEffect(() => {
    const checkAppointmentTime = () => {
      const now = new Date() as any;
      appointments.forEach(appointment => {
        const appointmentTime = new Date(appointment.dateTime) as any;
        const timeDifference = appointmentTime - now;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));

        if (minutesDifference === 30 || minutesDifference === 10 || minutesDifference === 4) {
          showToast(`Your appointment with ${appointment.patientsName} is in ${minutesDifference} minutes.`);
        }
      });
    };

    const interval = setInterval(checkAppointmentTime, 70000); 

    return () => clearInterval(interval);
  }, [appointments]);

  return <ToastContainer position="top-center" autoClose={9000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />;
}

function showToast(message:any) {
  toast.error(message);
}
