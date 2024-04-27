"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "@/store/slices/getPatients";
import { getAppointments } from "@/store/slices/getAppoitments";
import { IMEGES, PATIENTS } from "@/app/constant/assets/allAssets";
import DonutChart from "../pieChart/PieChart";
import ApexChart from "../areaChart/AreaChart";
function GraphData() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const patients = useSelector((state) => state.allPatients.patients);
  const appointments = useSelector(
    (state) => state.getAppointments.appointments
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPatients() as any);
        await dispatch(getAppointments() as any);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  console.log("allAppointments", appointments);

  const maleCount = patients.data
    ? patients.data.filter((patient: { sex: string }) => patient.sex === "male")
        .length
    : 0;
  const femaleCount = patients.data
    ? patients.data.filter(
        (patient: { sex: string }) => patient.sex === "female"
      ).length
    : 0;
  const trueAppointments = appointments.filter(
    (appointment: { onlineConsultation: boolean }) =>
      appointment.onlineConsultation === true
  );
  const falseAppointments = appointments.filter(
    (appointment: { onlineConsultation: boolean }) =>
      appointment.onlineConsultation === false
  );

  const totalAppointmentsCount = appointments.length;
  const trueAppointmentsPercentage = ((trueAppointments.length / totalAppointmentsCount) * 100).toFixed(0);
  const falseAppointmentsPercentage = ((falseAppointments.length / totalAppointmentsCount) * 100).toFixed(0);

  return (
    <div>
      <div className="flex">
        <div className="w-[358px] h-[191px] bg-white">
          <div className="flex justify-between px-4 pt-4">
            <p>Offline Consultations</p>
            <Image src={PATIENTS.Options} alt="options" />
          </div>
          <div className="flex justify-between px-4">
            <div className="flex flex-col">
              <p className="text-[37px] pt-4 pb-2 font-bold">
                {falseAppointments.length}
              </p>
              <div className="flex">
                <Image src={IMEGES.Up} alt="upssss" />
                <p className="text-base text-[#27AE60] ps-2 font-bold">
                  {falseAppointmentsPercentage}%
                </p>
              </div>
            </div>
            <ApexChart appointmentsData={falseAppointments.length} />
          </div>
        </div>
        <div className="w-[358px] h-[191px] bg-white mx-2">
          <div className="flex justify-between px-4 pt-4">
            <p>Online Consultations</p>
            <Image src={PATIENTS.Options} alt="options" />
          </div>
          <div className="flex justify-between px-4">
            <div className="flex flex-col">
              <p className="text-[37px] pt-4 pb-2 font-bold">
                {trueAppointments.length}
              </p>
              <div className="flex">
                <Image src={IMEGES.Upred} alt="upred" />
                <p className="text-base text-red-700 ps-2 font-bold">{trueAppointmentsPercentage}%</p>
              </div>
            </div>
            <ApexChart appointmentsData={trueAppointments.length} />
          </div>
        </div>
        <div className="w-[358px] h-[191px] bg-white">
          <div className="flex justify-between px-4 pt-4">
            <p>Total Paitents</p>
            <Image src={PATIENTS.Options} alt="options" />
          </div>
          <div className="flex justify-between px-4">
            {loading ? (
              <div className="flex justify-center items-center w-full h-full">
                <Loader />
              </div>
            ) : (
              <>
                <div className="flex flex-col">
                  <p className="text-[17px] pt-6 font-bold">
                    Male {maleCount}
                  </p>
                  <p className="text-[17px] pt-6 font-bold">
                  Female {femaleCount}
                  </p>
                </div>
                <DonutChart maleCount={maleCount} femaleCount={femaleCount} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GraphData;
