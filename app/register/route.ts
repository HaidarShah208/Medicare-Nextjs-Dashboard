import { prisma } from "@/config/prisma";
import { NextResponse } from "next/server";

export const POST = async(req:any,)=>{
    try {
        const body=await req.json();
        console.log('body', body)
 await prisma.user.create({
            data: {
              email: body?.email,
              password: body?.password
            },
          })

          return NextResponse.json({ message: "Success" });
        } catch (error) {
            return NextResponse.json({ message: "error" });
    }

 }