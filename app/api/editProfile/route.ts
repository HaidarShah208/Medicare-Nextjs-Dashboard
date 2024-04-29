import { prisma } from "@/config/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request): Promise<Response> {
    try {
      const session = await getServerSession({ req });
  
      if (!session || !session.user?.email) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const userEmail: string = session.user.email;
  
      const body = await req.json();
      const {
        userName, companyName, industryName, employees
      } = body;
  
      const updatedUser = await prisma.users.update({
        where: {
          email: userEmail,
        },
        data: {
            userName, companyName, industryName, employees
        },
      });
  
      return new Response(JSON.stringify(updatedUser), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err: any) {
      console.log("UPDATE_ERR: " + err);
      return new Response("Internal Server Error", { status: 500 });
    }
  }