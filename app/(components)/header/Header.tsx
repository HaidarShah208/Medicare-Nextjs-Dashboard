import React, { useEffect, useState } from "react";
import { IMEGES } from "@/app/constant/assets/allAssets";
import Image from "next/image";
import { getSession, signOut } from "next-auth/react";
import { Users } from "@/app/constant/allTypes/AllTypes";


interface HeaderProps {
  handleToggleSidebar: () => void; 
}

function Header({ handleToggleSidebar }: HeaderProps) {
  const [user, setUser] = useState<Users | null>(null);
 
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getSession();
      setUser(userData as Users);
    };
    fetchUser();
  }, []);


  const handleLogout = async () => {
    await signOut({ redirect: false });  
    window.location.href = '/login';  
  };

  const formatDate = (date: Date): string => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options as any).format(date);
  };
  const currentDate = new Date();
  return (
    <div className="border-b border-dark header flex justify-between items-center bg-black-primary bg-white px-4 h-[92px] w-full">
        <Image className="block md:hidden pe-1"
          src={IMEGES.Toggle}
          alt="toggle"
          onClick={() => handleToggleSidebar()}
        />
     <Image src={IMEGES.Logo} alt={"logo"} className="sm:pe-0 pe-2 mx-1 sm:mx-0"/>
      <p className="text-[#0000AC] hidden md:block text-[37px] mx-3 border-e pe-6">Medicare</p>
      <form className="flex flex-1 bg-black-primary border border-gray-400 rounded">
        <input
          type="text"
          placeholder="Search"
          className=" border-none focus:border-transparent  focus:outline-none font-light bg-transparent p-1 h-[40px] w-auto flex-1 "
        />
        <button type="submit" className="border-none me-4 bg-transparent">
          <Image src={IMEGES.Search} alt={"logo"}  />
        </button>
      </form>
      <div className="flex-col h-[50px] sm:w-[108px] sm:pt-0 pt-4 w-full me-3"><p className="text-end sm:text-[15px] text-[6px]">{user?.user.name}</p><p className="text-end sm:text-[15px] text-[3px]">General Doctor</p></div>
      <div className="px-2 sm:text-[15px] text-[10px] h-[40px] border border-gray-400 rounded justify-center text-center pt-2 me-1 sm:me-3 sm:block  hidden">{formatDate(currentDate)}</div>
      <div className="header_icons  flex items-center space-x-4">
        <Image src={IMEGES.Email} className="sm:block hidden " alt={"email"} />
        <Image src={IMEGES.Notification} className="sm:block hidden " alt={"notification"} />
        <Image src={IMEGES.Logout} className="sm:block hidden cursor-pointer" alt={"logout"} onClick={handleLogout}/>
      </div>
    </div>
  );
}

export default Header;
