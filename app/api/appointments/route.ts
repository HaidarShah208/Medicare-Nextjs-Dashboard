import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
      
      const { patientsName, purpose,  status, duration, type, onlineConsultation,dateTime,dateCreated,room} =
        await request.json();
  
      if (!patientsName || !purpose || !status || !duration || !type) {
        return new NextResponse("Missing something", {
          status: 400,
        });
      }
  
      try {
  
        const selectedDateTime = new Date(dateTime);
        const hours = selectedDateTime.getHours().toString().padStart(2, '0');
        const minutes = selectedDateTime.getMinutes().toString().padStart(2, '0');
        const timeHHMM = `${hours}:${minutes}`;
        
        
        const appointments = await prisma.appointmentData.create({
          data: {
            patientsName,
            purpose,
            status,
            duration,
            type,
            onlineConsultation,
            dateTime ,
            dateCreated:timeHHMM ,
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


  export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
    if (body.id) {
      await prisma.appointmentData.delete({
        where: {
          id: body.id,
        },
      });
      const appointments = await prisma.appointmentData.findMany();

     return NextResponse.json({ data: appointments, message: "Appointment deleted successfully" });
    }

    return NextResponse.json({
      message: "All params required",
    });
  } catch (error) {
    return NextResponse.json({
      message: "something went wrong during deleting appointment",
      error: JSON.stringify(error),
    });
  }
};


export const PUT = async (request: NextRequest) => {
  try {
    const { id, ...data } = await request.json();
    const appointment = await prisma.appointmentData.update({
      where: { id },
      data,
    });
    console.log("Updated appoitment information:", appointment);
    return new NextResponse(JSON.stringify({ data: appointment, success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error during updating appoitment:", error);
    return new NextResponse(JSON.stringify(error), { status: 400 });
  }
};