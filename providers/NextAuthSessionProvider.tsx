"use client";
import { SessionProvider } from "next-auth/react";
interface NextAuthSessionProviderProps {
  children: React.ReactNode;
}

export const NextAuthSessionProvider = ({ children }:NextAuthSessionProviderProps) => {
  return <SessionProvider> {children} </SessionProvider>;
};
