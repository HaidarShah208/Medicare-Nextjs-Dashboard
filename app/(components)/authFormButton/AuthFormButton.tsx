import React from "react";
import Loader from "../loader/Loader";

export default function AuthFormButton({ isLoading }:any) {
  return (
    <button
      type="submit"
      className="bg-[#0000AC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
    >
      {isLoading ? (
        <div className=" flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        "Finish"
      )}
    </button>
  );
}
