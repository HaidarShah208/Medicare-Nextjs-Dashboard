"use client";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthFormButton from "../authFormButton/AuthFormButton";
import AuthFormInput from "../authFormInput/AuthFormInput";
import { Change } from "@/app/constant/allTypes/AllTypes";



function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: Change) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password.");
      return;
    }
    try {
      setIsLoading(true);
      const user = await signIn("credentials", {
        ...formData,
        redirect: false,
      });
      console.log("signIn response:", user);

      if (user && user.ok) {
        toast.success("You Are successfully Login");
        router.push("/");
      } else {
        if (user && user.error === "CredentialsSignin") {
          toast.error("Invalid email or password");
        } else {
          toast.error("An error occurred while logging in");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error:", error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <form className="w-full max-w-sm mt-7" onSubmit={handleSubmit}>
      <AuthFormInput
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />

      <AuthFormInput
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      <p className="text-gray-700 text-end mb-4 text-sm ms-60">
        <Link href="/forgotPassword" className="text-[#0000AC] font-bold">
          Lost your password ?
        </Link>
      </p>
      <div className="mb-6">
        <AuthFormButton isLoading={isLoading} />
      </div>
    </form>
  );
}

export default LoginForm;
