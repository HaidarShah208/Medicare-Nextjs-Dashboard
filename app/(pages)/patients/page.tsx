import PatientHeader from "@/app/(components)/patientHeader/PatientHeader";
import PatientsTable from "@/app/(components)/patientsTable/PatientsTable";
import React  from "react";

 
function Patients() {
  return (
    <>
      <p className="ps-3 mb-5 mt-2">Patient register</p>
    <PatientHeader/>
      <PatientsTable/>

   
    </>
  );
}

export default Patients;
