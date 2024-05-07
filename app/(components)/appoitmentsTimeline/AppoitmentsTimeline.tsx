"use client";
import { AppointmentTypes, patientInformation } from "@/app/constant/allTypes/AllTypes";
import { DASHBOARD, PATIENTS } from "@/app/constant/assets/allAssets";
import { getAppointments } from "@/store/slices/getAppoitments";
import { RootState } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import NewAppointment from "../newAppointment/NewAppointment";



function AppointmentsTimeline() {
  const dispatch = useDispatch();
  const [showDetailsMap, setShowDetailsMap] = useState<{ [id: string]: boolean }>({});
  const [editAppointmentData, setEditAppointmentData] = useState<AppointmentTypes | null>(null);
  const appointmentData: patientInformation[] = useSelector((state: RootState) => state.getAppointments.appointments);
  
  const handleClick = (id: string) => {
    setShowDetailsMap(prevState => ({
      ...prevState,
      [id]: !prevState[id]  
    }));
  };

  useEffect(() => {
    dispatch(getAppointments() as any);
  }, [dispatch]);



  //handle delete
  const handleDelete = async (id: string) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        id: id,
      });

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
      };

      await fetch("/api/appointments", requestOptions);
      toast.success("success Appointment SuccessFully Deleted");
      setShowDetailsMap({});
    } catch (error) {
      toast.error("An error occurred while deleting the appointment");
    }
  };
  
  // handle edit
  const handleEdit = (appointment: React.SetStateAction<AppointmentTypes | null>) => {
    console.log("Editing appointment:", appointment);
    setEditAppointmentData(appointment);
    setShowDetailsMap({});
  };

  const today = new Date();
  const timeSlot = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "1:00",
    "2:00",
    "3:00",
  ];

  return (
    <div>
      <div className="mt-4 -ms-4">
        {timeSlot.map((slot, index) => {
          const appointmentsInSlot = appointmentData.filter((appointment) => {
            const appointmentDate = new Date(appointment.dateTime);
            const appointmentTime = appointmentDate.getHours();
            return (
              appointmentDate.getFullYear() === today.getFullYear() &&
              appointmentDate.getMonth() === today.getMonth() &&
              appointmentDate.getDate() === today.getDate() &&
              appointmentTime === parseInt(slot.split(":")[0])
            );
          });

          return (
            <div key={index}>
              <div className="flex">
                <div className="w-16 text-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {slot}
                  </span>
                </div>
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-800 dark:after:bg-gray-800">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-800 dark:bg-gray-800"></div>
                  </div>
                </div>

                <div className="grow pt-0.5 pb-8 ">
                  {appointmentsInSlot.map((appointment, idx) => (
                    <div key={idx} className="flex flex-col  mt-8  ">
                      <div
                        className="flex cursor-pointer rounded-lg border px-2 py-2 justify-between"
                        onClick={() => handleClick(appointment.id)}
                      >
                        <div className="flex  ">
                          <div className="pt-2">
                            <div className="circle w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                          <p className="ps-2">{slot}</p>
                          <p className="ps-3">{appointment.patientsName}</p>
                        </div>
                        <div className="flex ">
                          <p className="pe-3 text-sm text-[#828282]">
                            upcomming
                          </p>
                          <Image src={DASHBOARD.UpArrow} alt="uparrow" />
                        </div>
                      </div>
                      {showDetailsMap[appointment.id] && (
                        <div className="border py-3 rounded-lg mt-2">
                          <div className="flex">
                            <p className="font-bold text-[#1D1D1D]  me-3 ms-2">
                              Patient:
                            </p>
                            <p className="text-sm">
                              {appointment.patientsName}
                            </p>
                          </div>
                          <div className="flex my-2">
                            <p className="font-bold text-[#1D1D1D]  me-3 ms-2">
                              Duration:
                            </p>
                            <p className="text-sm">{appointment.duration} min</p>
                          </div>
                          <div className="flex">
                            <p className="font-bold text-[#1D1D1D]  me-3 ms-2">
                              Purpose:
                            </p>
                            <p className="text-sm">{appointment.purpose}</p>
                          </div>
                          <hr className="w-full my-3" />
                          <div className="flex justify-between px-2">
                            <div className="flex">
                              <Image
                                src={PATIENTS.Delete}
                                className="cursor-pointer w-6"
                                alt="delete"
                                onClick={() => {
                                  handleDelete(String(appointment.id));  
                                }}
                              />
                              <Image
                                src={DASHBOARD.User}
                                className="mx-2 w-6"
                                alt="user"
                              />
                              <Image
                                src={PATIENTS.Edit}
                                className="cursor-pointer w-6"
                                alt="edit"
                                onClick={() => handleEdit(appointment)}
                              />
                            </div>
                            <button
                              type="button"
                              className="w-full text-sm inline-flex justify-center rounded-md   border border-transparent  text-white  shadow-sm px-1 py-1 bg-indigo-700 font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                              Begin appointment
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {editAppointmentData && (
        <NewAppointment
          onClose={() => setEditAppointmentData(null)}
          appointmentData={editAppointmentData}
        />
      )}
    </div>
  );
}

export default AppointmentsTimeline;
