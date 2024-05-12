import React from "react";
import { DASHBOARD, PATIENTS } from "@/app/constant/assets/allAssets";
import AppoitmentsTimeline from "@/app/(components)/appoitmentsTimeline/AppoitmentsTimeline";
import GraphData from "@/app/(components)/graphData/GraphData";
import AppoitmentTiemlineHeader from "@/app/(components)/appoitmentTiemlineHeader/AppoitmentTiemlineHeader";
import ToastNotification from "@/app/(components)/appoitmentNotification/AppoitmentNotification";

export default function Dashboard() {

  return (
    <>
      <p className="text-lg py-3 ps-2">Dashboard &gt; Summary</p>
   <GraphData/>
      <div className="flex">
     
        <div className="w-full mt-3 ms-1 px-4  py-2 bg-white">
          <AppoitmentTiemlineHeader/>
         <AppoitmentsTimeline/>
        </div>
      </div>
      <ToastNotification />
    </>
  );
}
