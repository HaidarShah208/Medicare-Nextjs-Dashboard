import OtpForm from "@/app/(components)/otpForm/OtpForm";
import { IMEGES } from "@/app/constant/assets/allAssets";
import Image from "next/image";

function Otp() {
 
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="">
        <div className="flex flex-col justify-center sm:w-[544px]  w-[300px] items-center mt-7">
          <p className={`text-[38px]`}>Write your otp</p>
         <OtpForm/>
        </div>
      </div>
      <div className="w-[900px] bg-[#0000AC] sm:flex hidden justify-center items-center">
        <div className="flex justify-center items-center">
          <Image src={IMEGES.Signup} className="w-[669px]" alt="info" />
        </div>
      </div>
    </div>
  );
}

export default Otp;
