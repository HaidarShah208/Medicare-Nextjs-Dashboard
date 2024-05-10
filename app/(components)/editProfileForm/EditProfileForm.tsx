"use client";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { GetUserData } from "@/app/constant/allTypes/AllTypes";
import toast from "react-hot-toast";
import FormButton from "../formButton/FormButton";
import ProfileFormInput from "../profileFormInput/ProfileFormInput";

export default function EditProfileForm() {
  const [userData, setUserData] = useState<GetUserData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState({
    userName: "",
    companyName: "",
    industryName: "",
    employees: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const session = await getSession();
      if (session && session.user) {
        const userEmail = session.user.email;
        const response = await fetch(`/api/signup?email=${userEmail}`);
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          toast.error("Failed to fetch user data");
        }
      }
    };
    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    if (userData) {
      setEditedData({
        userName: userData.userName,
        companyName: userData.companyName,
        industryName: userData.industryName,
        employees: userData.employees,
      });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/editProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: editedData.userName,
          companyName: editedData.companyName,
          industryName: editedData.industryName,
          employees: editedData.employees,
        }),
      });

      if (response.ok) {
        toast.success("User profile updated successfully");
        setLoading(false);
        setShowModal(false);
        setUserData((prevUserData) => ({
          ...prevUserData,
          userName: editedData.userName,
          companyName: editedData.companyName,
          industryName: editedData.industryName,
          employees: editedData.employees,
        }));
      } else {
        toast.error("Failed to update user profile")
      }
    } catch (error) {
      toast.error("Failed to update user profile")
    }
  };

  if (!userData) {
    return <Loader />;
  }

  return (
    <div className="w-[783px] h-[440px] pt-10 mt-5 bg-white">
      <div className="px-10 py-5 justify-between flex">
        <p className="text-[18px] text-blue-600 font-bold">Edit your profile</p>
      </div>
      <div className="px-10 justify-between flex">
        <p className="text-[18px]">Name</p>
        <div className="py-2 h-[44px] px-4 w-[415px] border rounded text-sm">
          {userData.userName}
        </div>
      </div>
      <div className="px-10 my-5 justify-between flex">
        <p className="text-[18px]">Company Name</p>
        <div className="py-2 h-[44px] px-4 w-[415px] border rounded text-sm">
          {userData.companyName}
        </div>
      </div>
      <div className="px-10 my-5 justify-between flex">
        <p className="text-[18px]">Industry Name</p>
        <div className="py-2 h-[44px] px-4 w-[415px] border rounded text-sm">
          {userData.industryName}
        </div>
      </div>
      <div className="px-10 my-5 justify-between flex">
        <p className="text-[18px]">Employees</p>
        <div className="py-2 h-[44px] px-4 w-[415px] border rounded text-sm">
          {userData.employees}
        </div>
      </div>
      <div className="flex items-end justify-end me-10 mt-3">
        <button
          className="rounded bg-blue-600 text-white py-1 px-2 "
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-100 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-[18px] text-blue-600 font-bold"
                      id="modal-headline"
                    >
                      Edit Your Profile
                    </h3>
                    <div className="mt-5">
                      <form>
                        <ProfileFormInput
                          label="Name"
                          name="userName"
                          value={editedData.userName}
                          onChange={handleInputChange}
                        />
                        <ProfileFormInput
                          label="Company Name"
                          name="companyName"
                          value={editedData.companyName}
                          onChange={handleInputChange}
                        />
                        <ProfileFormInput
                          label="Industry Name"
                          name="industryName"
                          value={editedData.industryName}
                          onChange={handleInputChange}
                        />
                        <ProfileFormInput
                          label="Employees"
                          name="employees"
                          value={editedData.employees}
                          onChange={handleInputChange}
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <FormButton
                  onClick={handleSaveChanges}
                  text={"Save"}
                  loading={loading}
                />
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
