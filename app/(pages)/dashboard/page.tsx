"use client";
import Loader from "@/app/(components)/loader/Loader";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Dashboard = dynamic(
  () => import("@/app/(components)/dashboard/Dashboard"),
  {
    ssr: false,
    loading: () => (
      <div className=" flex h-[80vh] items-center justify-center">
        <p className="text-center">
          <Loader />
        </p>
      </div>
    ),
  }
);

export default function DashboardPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.console.log("window.alert from client component");
    }
  }, []);

  return (
    <div>
      <Dashboard />
    </div>
  );
}
