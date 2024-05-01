"use client";
import { PATIENTS } from "@/app/constant/assets/allAssets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { deletePatients, fetchPatients } from "@/store/slices/getPatients";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  COLORS,
  GETSTATUSCOLOR,
  GetStatusTextColor,
} from "@/app/constant/color/Color";
import { RootState } from "@/store/store";
import { getAppointments } from "@/store/slices/getAppoitments";

export interface AppointmentDataType {
  dateTime: string;
}

const PatientsPerPage = 5;
export default function PatientsTable() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const toggleMenu = (patientId: string) => {
    setShowMenu((prev) => (prev === patientId ? null : patientId));
  };
  const patients = useSelector(
    (state: RootState) => state.allPatients.patients
  );
  const loading = useSelector((state: RootState) => state.allPatients.loading);

  useEffect(() => {
    fetchPatientsData(currentPage);
  }, [currentPage, dispatch]);

  const fetchPatientsData = async (page: number) => {
    try {
      await dispatch(fetchPatients(page) as any);
    } catch (error) {
      console.error("Error fetching patients:", error);

      toast.error("Failed to fetch patients");
    }
  };

  console.log("fetch patient", fetchPatientsData);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deletePatients(id) as any);
      toast.success("Patient deleted");
      await fetchPatientsData(currentPage);
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.error("Failed to delete patient");
    }
  };

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPatient = currentPage * PatientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - PatientsPerPage;
  const currentPatients = patients.data?.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  ); 
  return (
    <>
      <div className="mt-2  w-[1090px]">
        {loading ? (
          <div className="h-60 flex align-middle justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div className="relative overflow-x-auto h-screen">
            <table className="min-w-full divide-y bg-white">
              <thead className="border-b h-[65px] border-gray-200">
                <tr>
                  <th className="sm:px-6 px-3 py-3 text-center text-xs font-medium text-[#828282] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-[#828282] uppercase tracking-wider">
                    Dignosis
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-[#828282] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-[#828282] uppercase tracking-wider">
                    Last Appointment
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-[#828282] uppercase tracking-wider">
                    Next Appointment
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-[#828282] uppercase tracking-wider">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y ">
                {currentPatients?.map((patient: any) => (
                  <tr
                    key={patient.id}
                    className="bg-white h-[72px] justify-center"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {patient.forename}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {patient.surname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  flex justify-center">
                      <p
                        className={` mt-3 w-[140px] h-[25px] rounded-t-3xl rounded-b-3xl text-[12px] text-center pt-1 `}
                        style={{
                          backgroundColor: GETSTATUSCOLOR(patient.status),
                          color: GetStatusTextColor(patient.status),
                        }}
                      >
                        {patient.status}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {patient.dob}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      Data 5
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Image
                        src={PATIENTS.Options}
                        alt="option"
                        className="relative inline-block object-cover object-center w-12 h-12 rounded-full cursor-pointer"
                        data-popover-target="profile-menu"
                        onClick={() => toggleMenu(patient.id)}
                      />
                      {showMenu === patient.id && (
                        <ul
                          role="menu"
                          data-popover="profile-menu"
                          data-popover-placement="bottom"
                          className="absolute z-10 flex min-w-[90px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-1 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                        >
                          <button  className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 pt-1  text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                            <Image src={PATIENTS.Edit} alt="edit"/>
                            <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                            Edit
                            </p>
                            </button>
                          <button
                            onClick={() => {
                              handleDelete(patient.id);
                              setShowMenu(null);
                            }}
                            role="menuitem"
                            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 pt-1 pb-1 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
                          >
                            <Image src={PATIENTS.Delete} alt="delete" />
                            <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                              Delete
                            </p>
                          </button>
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end me-4 my-3">
              <Pagination
                currentPage={currentPage}
                patientsPerPage={PatientsPerPage}
                totalPatients={patients.data?.length || 0}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
