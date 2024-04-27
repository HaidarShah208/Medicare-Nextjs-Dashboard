import { IMEGES, SIDEBAR } from '@/app/constant/assets/allAssets'
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'


interface SidebarProps {
    sidebar: boolean;
    handleToggleSidebar: () => void; 
    
  }
function Sidebar({sidebar, handleToggleSidebar}:SidebarProps) {
  const [selectedItem, setSelectedItem] =  useState<string>('Dashboard')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedItemParam = params.get('selectedItem');
    const pathname = window.location.pathname;
  
    if (selectedItemParam) {
      setSelectedItem(selectedItemParam);
    } else {
      if (pathname.includes('dashboard')) {
        setSelectedItem('Dashboard');
      } else if (pathname.includes('schedule')) {
        setSelectedItem('Schedule');
      } else if (pathname.includes('patients')) {
        setSelectedItem('Patients');
      } else if (pathname.includes('setting')) {
        setSelectedItem('Setting');
      }
    }
  }, [window.location.search]);

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
    if (window.innerWidth <= 768) {
      handleToggleSidebar();
    }
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });  
    window.location.href = '/login';  
  };

  return (
    <nav className={`absolute top-30 left-0 h-screen  bg-white w-[90px] sm:w-[245px] text-[#828282] z-50 border-e transition-transform transform ${sidebar ? 'translate-x-0' : '-translate-x-full z-50 md:translate-x-0'}`}>
      <p className='ps-6 pt-3 text-[12px] text-[#828282]'>MENU</p>
   <Link href="/frontend/dashboard">
   <li className={`flex items-center py-3 px-6 cursor-pointer ${selectedItem === 'Dashboard' && 'text-[#0000AC] border-s-4 border-[#0000AC]'}`} onClick={() => handleItemClick('Dashboard')}>
          <Image src={selectedItem === 'Dashboard' ? SIDEBAR.DashboardFocus : SIDEBAR.Dashboard} alt={'Dashboard'} />
          <span className="ml-4 font-medium hidden sm:block">Dashboard</span>
        </li>
      </Link>
      <Link href="/frontend/schedule">
        <li className={`flex items-center py-3 px-6 cursor-pointer ${selectedItem === 'Schedule' && 'text-[#0000AC] border-s-4  border-[#0000AC]'}`} onClick={() => handleItemClick('Schedule')}>
          <Image src={selectedItem === 'Schedule' ? SIDEBAR.SchedualeFocus : SIDEBAR.Calender} alt={'Calender'} />
          <span className="ml-4 font-medium hidden sm:block">Schedule</span>
        </li>
    </Link>
      <li className="flex items-center py-3 px-6 cursor-pointer">
      <Image src={SIDEBAR.Task} alt={'Task'}/>
        <span className="ml-4 font-medium hidden sm:block">Task</span>
      </li>
   <Link href="/frontend/patients">
   <li className={`flex items-center py-3 px-6 cursor-pointer ${selectedItem === 'Patients' && 'text-[#0000AC] border-s-4  border-[#0000AC]'}`} onClick={() => handleItemClick('Patients')}>
          <Image src={selectedItem === 'Patients' ? SIDEBAR.PetientFocus : SIDEBAR.Petient} alt={'Patients'} />
          <span className="ml-4 font-medium hidden sm:block">Patients</span>
        </li>
   </Link>
      <li className="flex items-center py-3 px-6 cursor-pointer">
      <Image src={SIDEBAR.Message} alt={'Message'}/>
        <span className="ml-4 font-medium hidden sm:block">Message</span>
      </li>
      <li className="flex items-center py-3 px-6 cursor-pointer">
      <Image src={SIDEBAR.Analytics} alt={'Message'}/>
        <span className="ml-4 font-medium hidden sm:block">Analytics</span>
      </li>
      <div className="flex justify-center">
    <hr className="border-t  my-3 w-[168px]" />
</div>
      <p className='ps-7 pt-3 text-[12px] text-[#828282]'>General</p>
   <Link href="/frontend/setting">
   <li className={`flex items-center py-3 px-6 cursor-pointer ${selectedItem === 'Setting' && 'text-[#0000AC] border-s-4  border-[#0000AC]'}`} onClick={() => handleItemClick('Setting')}>
          <Image src={selectedItem === 'Setting' ? SIDEBAR.SettingFocus : SIDEBAR.Setting} alt={'Setting'} />
          <span className="ml-4 font-medium hidden sm:block">Setting</span>
        </li>
   </Link>
      <li className="flex items-center py-3 px-6 cursor-pointer">
      <Image src={SIDEBAR.Support} alt={'Setting'}/>
        <span className="ml-4 font-medium hidden sm:block">Support</span>
      </li>
      <li className="flex items-center py-3 px-6 cursor-pointer" onClick={handleLogout}>
      <Image src={IMEGES.Logout} className='sm:hidden block' alt={'logout'}/>
      </li>
    </nav>
  )
}

export default Sidebar
