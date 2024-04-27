import type { Metadata } from "next";
import { Mukta } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/provider";
import ToastProvider from "@/providers/ToastProvider";
import { NextAuthSessionProvider } from "@/providers/NextAuthSessionProvider";

export const inter = Mukta({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Medicare app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider/>
        <Providers>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </Providers>
      </body>
    </html>
  );
}