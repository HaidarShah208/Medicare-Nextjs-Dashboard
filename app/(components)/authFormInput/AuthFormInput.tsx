import React from 'react';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthFormInput: React.FC<InputProps> = ({ label, name, type = 'text', value, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-gray-700 text-[16px] font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="appearance-none border-b-2 bg-[#F7F7F7] border-gray-300 w-full px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-800"
      />
    </div>
  );
};

export default AuthFormInput;
