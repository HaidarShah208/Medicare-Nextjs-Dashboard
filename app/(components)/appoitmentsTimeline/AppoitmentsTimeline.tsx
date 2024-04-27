'use client'
import { DASHBOARD, PATIENTS } from '@/app/constant/assets/allAssets';
import Image from 'next/image';
import React, { useState } from 'react'

function AppoitmentsTimeline() {
  const [showDetails, setShowDetails] = useState(false);

    const handleClick = () => {
        setShowDetails(!showDetails);
      };
  return (
    <div>
         <div className="mt-4 ">
            <div>
              <div className="flex ">
                <div className="w-16 text-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    8:00 AM
                  </span>
                </div>

                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-800 dark:after:bg-gray-800">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-800 dark:bg-gray-800"></div>
                  </div>
                </div>

                <div className="grow pt-0.5 pb-1">
                  <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white"></h3>
                  <div className="flex mt-8">
                    <div className="pt-2">
                      <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                    <p className="ps-2">8:00</p>
                    <p className="ps-3">Ali haider</p>
                  </div>
                  <div className="flex mt-3">
                    <div className="pt-2">
                      <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                    <p className="ps-2">8:00</p>
                    <p className="ps-3">Ali haider</p>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between px-1 mt-3 py-1.5 border rounded-lg cursor-pointer" onClick={handleClick}>
                      <div className="flex">
                        <div className="pt-2">
                          <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                        </div>
                        <p className="ps-2">8:00</p>
                        <p className="ps-3">Ali haider</p>
                      </div>
                      <div className="flex ">
                        <p className="pe-3 text-sm text-[#828282]">upcomming</p>
                        <Image src={DASHBOARD.UpArrow} alt="uparrow" />
                      </div>
                    </div>
                    {showDetails && (
                    <div className="border py-3 rounded-lg mt-2">
                      <div className="flex">
                        <p className="text-bold text-[#1D1D1D]  me-3 ms-2">
                          Patient
                        </p>
                        <p className="text-sm">Bolaji Abdulraheem</p>
                      </div>
                      <div className="flex my-2">
                        <p className="text-bold text-[#1D1D1D]  me-3 ms-2">
                          Time
                        </p>
                        <p className="text-sm">2:00 am</p>
                      </div>
                      <div className="flex">
                        <p className="text-bold text-[#1D1D1D]  me-3 ms-2">
                          Purpose
                        </p>
                        <p className="text-sm">Bolaji Abdulraheem</p>
                      </div>
                      <hr className="w-full my-3" />
                      <div className="flex justify-between px-2">
                        <div className="flex">
                          <Image
                            src={PATIENTS.Delete}
                            className=" w-6"
                            alt="delete"
                          />
                          <Image
                            src={DASHBOARD.User}
                            className="mx-2 w-6"
                            alt="user"
                          />
                          <Image
                            src={PATIENTS.Edit}
                            className=" w-6"
                            alt="edit"
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
                </div>
              </div>

              <div className="flex">
                <div className="w-16 text-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    9:00PM
                  </span>
                </div>
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-800 dark:after:bg-gray-800">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-800 dark:bg-gray-800"></div>
                  </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                <div className="flex mt-8">
                    <div className="pt-2">
                      <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                    <p className="ps-2">9:00</p>
                    <p className="ps-3">Ali haider</p>
                  </div>

                  <div className="flex mt-2">
                    <div className="pt-2">
                      <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                    <p className="ps-2">9:00</p>
                    <p className="ps-3">Ali haider</p>
                  </div>
                </div>
              </div>

              <div className="flex ">
                <div className="w-16 text-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    10:00PM
                  </span>
                </div>

                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-800 dark:after:bg-gray-800">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-800 dark:bg-gray-800"></div>
                  </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                <div className="flex mt-8">
                    <div className="pt-2">
                      <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                    <p className="ps-2">10:00</p>
                    <p className="ps-3">Ali haider</p>
                  </div>
                  <div className="flex mt-2">
                    <div className="pt-2">
                      <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                    <p className="ps-2">10:00</p>
                    <p className="ps-3">Ali haider</p>
                  </div>
                </div>
              </div>

              <div className="flex ">
                <div className="w-16 text-end">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    11:00PM
                  </span>
                </div>

                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-800 dark:after:bg-gray-800">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-800 dark:bg-gray-800"></div>
                  </div>
                </div>

                <div className="grow pt-0.5 pb-8">
                <div className="flex mt-8">
                    <div className="pt-2">
                      <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                    <p className="ps-2">11:00</p>
                    <p className="ps-3">Ali haider</p>
                  </div>
                  <div className="flex mt-2">
                    <div className="pt-2">
                      <div className="circle w-2 h-2 bg-gray-500 rounded-full"></div>
                    </div>
                    <p className="ps-2">11:00</p>
                    <p className="ps-3">Ali haider</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex me-2 justify-end">
              <p className="pe-2 text-[#0000AC] text-sm text-bold">view all</p>
              <Image src={DASHBOARD.RightArrow} alt="rightarrow"/>
            </div>
          </div>
    </div>
  )
}

export default AppoitmentsTimeline
