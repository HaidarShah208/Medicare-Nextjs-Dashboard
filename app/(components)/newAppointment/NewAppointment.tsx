"use client";
import React, { ChangeEvent, useState } from "react";
import cross from "../../assets/Cross.svg";
import user from "../../assets/User.svg";
import location from "../../assets/Location.svg";
import time from "../../assets/Time.svg";
import no from "../../assets/No.svg";
import notify from "../../assets/Notify.svg";
import Image from "next/image";
import { textColor } from "@/app/(pages)/layout";
import { postAppointment } from "@/store/slices/addAppoitments";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import FormButton from "../formButton/FormButton";
import { FormData } from "@/app/constant/allTypes/AllTypes";



function NewAppointment({ onClose }:any) {
  const dispatch = useDispatch();
  const [loading,setLoading]=useState(false)
  const [showRoomSelector, setShowRoomSelector] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Room 1");
  const [formData, setFormData] = useState<FormData>({
    patientsName: "",
    purpose: "",
    status: "" || null,
    duration: "" || null,
    type: "" || null,
    onlineConsultation: true,
    dateTime: new Date(),
    room: "",
  });

  const handleChange = (key: string, value: string | number | boolean) => {
    setFormData({
      ...formData,

      [key]: value,
    });
  };
  const handleRoomChange = (room: any) => {
    setSelectedRoom(room);
    setShowRoomSelector(false);
  };
  const handleSubmit = async () => {
    if (
      !formData.patientsName ||
      !formData.duration ||
      !formData.purpose ||
      !formData.status ||
      !formData.type
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setLoading(true)
      const requestData = {
        ...formData,
        dateCreated: new Date().toISOString(),
        room: selectedRoom,
      };
      await dispatch(postAppointment(requestData) as any);
      console.log("Form Data:", formData);
      setLoading(false)
      onClose();
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateTimeString = e.target.value;
    const dateTime = new Date(dateTimeString);
    setFormData((prevData) => ({ ...prevData, dateTime }));
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-50 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-[650px]">
          <div className="sm:flex sm:items-start">
            <div className=" w-full text-center sm:mt-0 sm:text-left">
              <div className="flex items-center justify-between px-6 h-[62px] bg-blue-600">
                <h3 className="text-lg leading-6  font-medium  text-white p-3 rounded-t-lg">
                  Add New Entry
                </h3>
                <Image
                  src={cross}
                  alt="cross"
                  className="cursor-pointer"
                  onClick={handleCancel}
                />
              </div>

              <div className="grid grid-cols-1 items-center justify-center mt-10 sm:grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center">
                  <Image src={user} alt="user" />

                  <p className={`text-lg text-${textColor} pt-3`}>
                    PRACTITIONAR
                  </p>

                  <p className="text-base py-2">John Doe</p>

                  <p className="text-base font-bold"> Jeneral Docator</p>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Image src={time} alt="time" />

                  <p className={`text-lg text-${textColor} pt-3`}>
                    DATE AND TIME
                  </p>

                  <p className="text-base py-2">
                    {" "}
                    {dayjs(formData.dateTime).format("MM DD, YYYY")}
                  </p>

                  <p className="text-base font-bold">
                    {" "}
                    {dayjs(formData?.dateTime).format("HH:mm")}
                  </p>

                  <p
                    className={`text-sm cursor-pointer text-blue-600  pt-2`}
                  >
                    change
                  </p>

                  <input
                    type="datetime-local"
                    className="dateTimeInput"
                    name="dateTime"
                    onChange={handleDateChange}
                    style={{
                      width: "40px",
                      position: "relative",
                      bottom: "20px",
                      opacity: 0,
                    }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Image src={location} alt="location" />
                  <p className={`text-lg text-${textColor} pt-3`}>LOCATION</p>
                  <p className="text-base py-2">General clinic</p>
                  <p className="text-base font-bold">{selectedRoom}</p>
                  <p
                    className={`text-sm text-blue-600 pt-2 cursor-pointer`}
                    onClick={() => setShowRoomSelector(true)}
                  >
                    change
                  </p>
                  {showRoomSelector && (
                    <div className="absolute top-64 -left-6  mt-2 w-full flex items-center justify-end">
                      <div className="bg-white border rounded-md p-4">
                        <p className="text-lg font-bold">Choose Room</p>
                        <ul className="mt-2">
                          {[
                            "Room 1",
                            "Room 2",
                            "Room 3",
                            "Room 4",
                            "Room 5",
                          ].map((room) => (
                            <li
                              key={room}
                              className="cursor-pointer py-2 px-4 hover:bg-gray-100"
                              onClick={() => handleRoomChange(room)}
                            >
                              {room}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 mt-10 px-4">
                <div className="col-span-1 ms-3">
                  <p className="text-lg">Patient</p>
                  <p className="pt-16 text-lg">purpose of visite</p>
                  <p className="text-lg pt-16">Appointment Status</p>
                  <p className="text-lg pt-6">Duration</p>
                  <p className="text-lg pt-6">Appointment type</p>
                  <p className="text-lg pt-6">Online consultation</p>
                </div>
                <div className="col-span-2 sm:col-span-1 -ms-28 px-6">
                  <input
                    type="search"
                    value={formData.patientsName}
                    onChange={(e) =>
                      handleChange("patientsName", e.target.value)
                    }
                    className="w-full  border px-2 focus:outline-none h-[44px] "
                  />
                  <textarea
                    typeof="text"
                    value={formData.purpose}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    className="resize-none w-full border h-[84px] my-4  focus:outline-none px-2 pt-1"
                  />
                  <div className="flex space-x-4">
                    <button
                      className={`px-4 py-2 rounded-md ${
                        formData.status === "Confirmation required"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() =>
                        handleChange("status", "Confirmation required")
                      }
                    >
                      Confirmation required
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${
                        formData.status === "Confirmed"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleChange("status", "Confirmed")}
                    >
                      Confirmed
                    </button>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    {[10, 30, 45, 60, 90, 120].map((duration) => (
                      <button
                        key={duration}
                        className={`px-4 py-2 rounded-md ${
                          formData.duration === duration.toString()
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          handleChange("duration", duration.toString())
                        }
                      >
                        {duration}&apos;
                      </button>
                    ))}
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      className={`px-4 py-2 rounded-md ${
                        formData.type === " First time"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleChange("type", " First time")}
                    >
                      First time
                    </button>
                    <button
                      className={`px-4 py-2 rounded-md ${
                        formData.type === "Follow up list"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleChange("type", "Follow up list")}
                    >
                      Follow up list
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      className={`rounded-md py-1 bg-transparent outline-2 outline ${
                        formData.onlineConsultation
                          ? "outline-red-600 bg-gray-200 text-red-800"
                          : "bg-red-600 text-white "
                      }`}
                      onClick={() =>
                        handleChange(
                          "onlineConsultation",
                          !formData.onlineConsultation
                        )
                      }
                    >
                      <div className="flex mx-2">
                        <Image
                          src={no}
                          className="w-[32px] me-2 h-[32px]"
                          alt="no"
                        />
                        <p className="text-lg">No</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="my-14 px-6">
                <div className="flex">
                  <Image src={notify} alt="notify" />
                  <p className="text-lg font-bold ps-2">Send notifications</p>
                </div>
                <p className="text-base mt-1">
                  Appointment confirmation and reminder messages will be
                  automatically sent to clinic SMS notification settings.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
           <FormButton onClick={handleSubmit} text="Save" loading={loading}/>
            <button
              onClick={handleSubmit}
              type="button"
              className="w-full inline-flex justify-center rounded-md   border border-transparent  text-white  shadow-sm px-4 py-2 bg-indigo-700 text-base font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Begin Appointment
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 bg-transparent text-base font-medium text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewAppointment;
