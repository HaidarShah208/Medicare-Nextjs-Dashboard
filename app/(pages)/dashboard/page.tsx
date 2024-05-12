'use client'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
 
const Dashboard = dynamic(() => import('@/app/(components)/dashboard/Dashboard'),{ ssr: false,loading: () => <p>Loading...</p> })
 
export default function DashboardPage() {
 useEffect(()=>{
  if (typeof window !== "undefined") {
    window.console.log("window.alert from client component");
  }
  
 },[])
  
  return (
    <div>
<Dashboard/>
    </div>
  )
}