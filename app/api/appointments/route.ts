import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import { format } from "date-fns"

export const POST = async (request: NextRequest) => {
    try {
      const { patientsName, purpose,  status, duration, type, onlineConsultation,selectedDate, selectedTime,room} =
        await request.json();
  
      if (!patientsName || !purpose || !status || !duration || !type) {
        return new NextResponse("Missing something", {
          status: 400,
        });
      }
  
      try {
  
        const formattedDate = new Date(selectedDate);  
        const formattedTime = new Date(selectedTime);

        const appointments = await prisma.appointmentData.create({
          data: {
            patientsName,
            purpose,
            status,
            duration,
            type,
            onlineConsultation,
            selectedDate:formattedDate.toISOString(), // Store date as ISO string for Prisma
            selectedTime:formattedTime.toISOString(),
            room
          },
        });
  
        console.log("Created user:",appointments  );
        return new NextResponse(
          JSON.stringify({ data: appointments, success: true }),
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
      const  appointments = await prisma.appointmentData.findMany();
  
      return new NextResponse(
        JSON.stringify({ data: appointments, success: true }),
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error("Error fetching appointments:", error);
      return new NextResponse(JSON.stringify(error), { status: 400 });
    }
  };