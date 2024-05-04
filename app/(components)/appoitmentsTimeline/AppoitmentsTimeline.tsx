'use client'
import { DASHBOARD, PATIENTS } from '@/app/constant/assets/allAssets';
import { getAppointments } from '@/store/slices/getAppoitments';
import { RootState } from '@/store/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

 interface datssss{
  patientsName:string,
  purpose:string,
  duration:string
 }

function AppointmentsTimeline() {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  const appointmentData:datssss[] = useSelector((state: RootState) => state.getAppointments.appointments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppointments() as any);
  }, [dispatch]);

  const today = new Date();
  const timeSlot = ['8:00', '9:00', '10:00', '11:00', '12:00','1:00', '2:00', '3:00'];

  return (
    <div>
      <div className="mt-4">
        {timeSlot.map((slot, index) => {
          const appointmentsInSlot = appointmentData.filter((appointment) => {
            const appointmentDate = new Date(appointment.dateTime);
            const appointmentTime = appointmentDate.getHours();
            return (
              appointmentDate.getFullYear() === today.getFullYear() &&
              appointmentDate.getMonth() === today.getMonth() &&
              appointmentDate.getDate() === today.getDate() &&
              appointmentTime === parseInt(slot.split(':')[0])
            );
          });

          return (
            <div key={index}>
              <div className="flex">
                <div className="w-16 text-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{slot}</span>
                </div>
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-800 dark:after:bg-gray-800">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-800 dark:bg-gray-800"></div>
                  </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                  {appointmentsInSlot.map((appointment, idx) => (
                    <div key={idx} className="flex mt-8">
                      <div className="pt-2">
                        <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                      </div>
                      <p className="ps-2">{slot}</p>
                      <p className="ps-3">{appointment.patientsName}</p>
                      <p className="ps-3">{appointment.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AppointmentsTimeline;
