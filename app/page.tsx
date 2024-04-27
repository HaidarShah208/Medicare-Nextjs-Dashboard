"use client"
import Dashboard from './(pages)/frontend/dashboard/page'
import { useEffect, useState } from 'react'
import Header from './(components)/header/Header'
import Sidebar from './(components)/sidebar/Sidebar'
import Signup from './(auth)/signup/page'

export default function Page() {
  const [sidebar, setSidebar] = useState<boolean>(true);  
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);  
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    if (!isSmallScreen) return;  
    setSidebar(prevSidebar => !prevSidebar);
  };
  return (
    <>
    <div>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div>
        <Sidebar sidebar={!isSmallScreen || sidebar} handleToggleSidebar={handleToggleSidebar} />
        <main className={` ${isSmallScreen && !sidebar ? 'ml-2' : 'sm:ml-64 ml-35'}`}>
      <Dashboard/>
      </main>
      </div>
    </div>
    {/* <Signup/> */}
    </>
  )
}
