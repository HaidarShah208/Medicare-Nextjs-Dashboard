import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
      
      const { patientsName, purpose,  status, duration, type, onlineConsultation,dateTime,room} =
        await request.json();
  
      if (!patientsName || !purpose || !status || !duration || !type) {
        return new NextResponse("Missing something", {
          status: 400,
        });
      }
  
      try {
  
        const today = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Get current time in Pakistan standard time
        const [hours, minutes, seconds] = today.split(':'); // Split the time string into hours, minutes, and seconds
        const timeFormatted = `${hours}:${minutes}:${seconds}`; // Format the time as HH:mm:ss
                const appointments = await prisma.appointmentData.create({
          data: {
            patientsName,
            purpose,
            status,
            duration,
            type,
            onlineConsultation,
            dateTime ,
            dateCreated:timeFormatted ,
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