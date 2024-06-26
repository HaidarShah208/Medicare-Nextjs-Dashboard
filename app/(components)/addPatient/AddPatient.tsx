'use client'
import { addPatient } from "@/store/slices/addPatients";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import DemoComponent from "../datePicker/DatePicker";
import FormButton from "../formButton/FormButton";
import { Change } from "@/app/constant/allTypes/AllTypes";

function AddPatient() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    forename: "",
    surname: "",
    dob: new Date(),
    sex: "",
    diagnoses: "",
    notes: "",
    phoneNumber: "",
    status:""
  });

  const handleChange = (e: Change) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      dob: date,
    });
  };

  const handleSexChange = (sex: string) => {
    setFormData({
      ...formData,
      sex: sex,
    });
  };

  const handleSubmit = async () => {
    const { forename, surname, dob, sex, diagnoses, notes, phoneNumber,status } =
      formData;
    const formattedDate = `${dob.getFullYear()}-${(dob.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dob.getDate().toString().padStart(2, "0")}`;

    const requestData = {
      forename,
      surname,
      dob: formattedDate,
      sex: sex.toLowerCase(),
      diagnoses,
      notes,
      phonenumber: phoneNumber,
      status
    };

    try {
      setLoading(true);
      await dispatch(addPatient(requestData) as any);
      toast.success("Patient added successfully");
      setLoading(false);
    router.push("/patients");
    } catch (error) {
      toast.error("Error in adding patient");
    }
  };

  const handleCancel = () => {
    router.push("/patients");
  };

  
  return (
    <div>
      <div className="items-center ms-30 flex flex-col">
        <div className="h-[72px] w-[1090px]  items-center bg-white flex flex-row justify-between px-7">
          <div className="jus">
            <p className="">Total Patients</p>
          </div>
          <div className="flex">
            <button
              onClick={handleCancel}
              className="bg-transparent text-[18px] hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Cancel
            </button>
            <FormButton onClick={handleSubmit} text="Save" loading={loading}/>
          </div>
        </div>
        <div className="w-[783px] h-[790px] pt-10 mt-5 bg-white">
          <div className="px-10 py-10 justify-between flex">
            <p className="text-[18px]">Record number</p>
            <div>
              <p className="text-[18px]">
                Record number will be assigned automatically when you save.
              </p>
              <button className="bg-transparent hover:bg-blue-500  font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Assign Manually
              </button>
            </div>
          </div>
          <div className="px-10 justify-between flex">
            <p className="text-[18px]">Forename</p>
            <input
              type="text"
              name="forename"
              value={formData.forename}
              onChange={handleChange}
              className="py-2 px-4 h-[44px] w-[415px] border rounded text-sm"
            />
          </div>
          <div className="px-10 my-5 justify-between flex">
            <p className="text-[18px]">Surname</p>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="py-2 h-[44px] px-4 w-[415px] border rounded  text-sm"
            />
          </div>
          <div className="px-10 my-3 justify-between flex">
            <p className="text-[18px]">Date of Birth</p>
            <DemoComponent onDateChange={handleDateChange} />
          </div>
          <div className="px-10 my-4  flex">
            <p className="me-2 text-[18px]">Sex</p>
            <div className="ms-64">
              <button
                onClick={() => handleSexChange("Male")}
                className={`text-[18px] me-4 hover:bg-blue-500 hover:text-white text-black font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
                  formData.sex === "Male"
                    ? "bg-blue-500 text-white"
                    : "bg-[#f8f8f8]"
                }`}
              >
                Male
              </button>
              <button
                onClick={() => handleSexChange("Female")}
                className={`text-[18px] hover:bg-blue-500 hover:text-white text-black font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
                  formData.sex === "Female"
                    ? "bg-blue-500 text-white"
                    : "bg-[#f8f8f8]"
                }`}
              >
                Female
              </button>
            </div>
          </div>
          <div className="px-10 justify-between flex">
            <p className="text-[18px]">Diagnoses</p>
            <input
              type="text"
              name="diagnoses"
              value={formData.diagnoses}
              onChange={handleChange}
              className="py-2 px-4 w-[415px] h-[44px] border rounded text-sm"
            />
          </div>
          <div className="px-10 my-5 justify-between flex">
            <p className="text-[18px]">Notes</p>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="py-2 px-4 pb-20 w-[415px] border rounded text-sm"
            />
          </div>
          <div className="px-10 justify-between flex">
            <p className="text-[18px]">Phone number</p>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="py-2 px-4 h-[44px] w-[415px] border rounded text-sm"
            />
          </div>
          <div className="px-10 mt-3 justify-between flex">
            <p className="text-[18px] pt-3">Status</p>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[415px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={formData.status} 
                  onChange={handleChange}
                  name="status"
                >
                  <option value="">Select Status</option>
                  <option value="Recovered">Recovered</option>
                  <option value="Awaitingsurgery">Awaiting surgery</option>
                  <option value="Ontreatment">On treatment</option>
                </select>
              </div>
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
