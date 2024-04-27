'use client'
import React, { useState } from "react";
import Image from "next/image";
import { DASHBOARD, PATIENTS } from "@/app/constant/assets/allAssets";
import AppoitmentsTimeline from "@/app/(components)/appoitmentsTimeline/AppoitmentsTimeline";
import GraphData from "@/app/(components)/graphData/GraphData";
import NewAppointment from "@/app/(components)/newAppointment/NewAppointment";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <p className="text-lg py-3 ps-2">Dashboad Summary</p>
   <GraphData/>
      <div className="flex">
        <div className=" mt-3 justify-center px-4  pt-4 w-[709px] bg-white">
          <div className="flex justify-between ">
            <p>Tasks</p>
            <div className="flex">
              <p className="">Tasks</p>
              <Image
                src={PATIENTS.Add}
                alt="add"
                className="mx-3 w-[23px] h-[23px]"
              />
            </div>
          </div>
          <div className=" bg-[#FBFBFB] w-[676px] mt-4 me-4 h-[101px] flex flex-col justify-center">
            <div className="flex  justify-between">
              <div className="flex">
                <Image
                  src={DASHBOARD.Tick}
                  alt="add"
                  className="mx-3 w-[23px] h-[23px]"
                />
                <p>Task Completed Successfully</p>
              </div>
              <div>
                <Image
                  src={DASHBOARD.Option}
                  alt="add"
                  className="mx-3 w-[23px] h-[23px]"
                />
              </div>
            </div>
            <div className="flex justify-end me-12">
              <p>2/3/2024</p>{" "}
            </div>
            <div>
              <p className="text-sm ps-12">
                Sign up for Covid - 19 training course for madicines
              </p>
            </div>
            
          </div>
          <div className=" bg-[#FBFBFB] w-[676px] mt-4 h-[101px] flex flex-col justify-center">
            <div className="flex  justify-between">
              <div className="flex">
                <Image
                  src={DASHBOARD.Tick}
                  alt="add"
                  className="mx-3 w-[23px] h-[23px]"
                />
                <p>Task Completed Successfully</p>
              </div>
              <div>
                <Image
                  src={DASHBOARD.Option}
                  alt="add"
                  className="mx-3 w-[23px] h-[23px]"
                />
              </div>
            </div>
            <div className="flex justify-end me-12">
              <p>2/3/2024</p>
            </div>
            <div>
              <p className="text-sm ps-12">
                Sign up for Covid - 19 training course for madicines
              </p>
            </div>
          </div>
          <div className="flex me-2 mt-3 justify-end">
              <p className="pe-2 text-[#0000AC] text-sm text-bold">view all</p>
              <Image src={DASHBOARD.RightArrow} alt="rightarrow"/>
            </div>
        </div>
        <div className="w-[418px] mt-3 ms-3 px-4  py-2 bg-white">
          <div className="flex justify-between">
            <p className="text-base font-bold ">Upcomming Schedule</p>
            <div className="flex">
              <div className="">
                <p>New appointment </p>
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
         <AppoitmentsTimeline/>
        </div>
      </div>
    </>
  );
}
