"use client";
import { Change, Users } from "@/app/constant/allTypes/AllTypes";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthFormButton from "../authFormButton/AuthFormButton";
import AuthFormInput from "../authFormInput/AuthFormInput";

export default function ChangePasswordForm() {
  const [user, setUser] = useState<Users | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getSession();
      setUser(userData as Users);
    };
    fetchUser();
  }, []);
  const currentUserEmail = user?.user.email;
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: Change) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New and confirm password don't match.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: currentUserEmail,
          oldPassword,
          newPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to change password.");
      }
      setLoading(false);
      toast.success("Password changed successfully");
      window.history.back();
    } catch (error) {
      toast.error("Failed to change password. Please try again later.");
    }
  };

  return (
    <form className="w-full max-w-sm mt-7" onSubmit={handleSubmit}>
      <AuthFormInput
        label="Old Password"
        name="oldPassword"
        type="password"
        value={formData.oldPassword}
        onChange={handleChange}
      />
      <AuthFormInput
        label="New Password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
      />
      <AuthFormInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <div className="mb-6">
        <AuthFormButton isLoading={loading} />
      </div>
    </form>
  );
}
