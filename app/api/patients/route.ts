import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";


// Create new patients
export const POST = async (request: NextRequest) => {
    try {
      const { forename, surname,  dob, sex, diagnoses, notes,phonenumber,status } =
        await request.json();
  
      if (!forename || !surname || !dob || !sex || !diagnoses || !notes ||!phonenumber ||!status) {
        return new NextResponse("Missing something", {
          status: 400,
        });
      }
  
      try {
        const patients = await prisma.patientData.create({
          data: {
            forename,
            surname,
            dob,
            sex,
            diagnoses,
            notes,
            phonenumber,
            status
          },
        });
  
        console.log("Created user:", patients);
        return new NextResponse(
          JSON.stringify({ data: patients, success: true }),
          {
            status: 200,
          }
        );
      } catch (error) {
        console.error("Error creating user:", error);
        return new NextResponse(JSON.stringify(error), { status: 400 });
      }
    } catch (error) {
      console.error("Error parsing request:", error);
      return new NextResponse("Internal Server Error", {
        status: 500,
      });
    }
  };


  export const GET = async (request: NextRequest) => {
    try {
      const  patients = await prisma.patientData.findMany();
  
      return new NextResponse(
        JSON.stringify({ data: patients, success: true }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error fetching employees:", error);
      return new NextResponse(JSON.stringify(error), { status: 400 });
    }
  };


  export const PUT = async (request: NextRequest) => {
    try {
      const { id, ...data } = await request.json();
  
      const employee = await prisma.patientData.update({
        where: { id },
        data,
      });
  
      console.log("Updated user:", employee);
      return new NextResponse(JSON.stringify({ data: employee, success: true }), {
        status: 200,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return new NextResponse(JSON.stringify(error), { status: 400 });
    }
  };

  export const DELETE = async (request: NextRequest) => {
    try {
      const { id } = await request.json();
  
      await prisma.patientData.delete({
        where: { id },
      });
  
      console.log("Deleted user with id:", id);
      return new NextResponse(JSON.stringify({ success: true }), {
        status: 200,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new NextResponse(JSON.stringify(error), { status: 400 });
    }
  };