import { InputProps } from "@/app/constant/allTypes/AllTypes";
import React from "react";

const ProfileFormInput: React.FC<InputProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block py-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete={name}
        value={value}
        onChange={onChange}
        className="focus:outline-none block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
};

export default ProfileFormInput;
