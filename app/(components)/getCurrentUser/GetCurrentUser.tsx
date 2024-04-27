'use client'
import { Users } from '@/app/constant/allTypes/AllTypes';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function GetCurrentUser() {
    const [user, setUser] = useState<Users | null>(null);
 
    useEffect(() => {
      const fetchUser = async () => {
        const userData = await getSession();
        setUser(userData as Users);
      };
      fetchUser();
    }, []);
  return (
    <div>
      <p className="pe-3 mb-5 mt-2">{user?.user.email}</p>
      
    </div>
  )
}
