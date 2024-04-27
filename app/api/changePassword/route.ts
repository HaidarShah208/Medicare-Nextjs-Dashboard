import { prisma } from "@/config/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
export const PUT = async (request: NextRequest) => {
    try {
      const { email, oldPassword, newPassword } = await request.json();
  
      const userLogin = await prisma.users.findUnique({
        where: { email },
      });
      const passwordMatch = await bcrypt.compare(oldPassword, userLogin.password);
      if (!passwordMatch) {
        return new NextResponse(JSON.stringify(Error), { status: 400 });
      }
      const hashPassword = await bcrypt.hash(newPassword, 10);
  
      const user = await prisma.users.update({
        where: { email },
        data: {
          password: hashPassword,
        },
      });
      return new NextResponse(JSON.stringify({ data: user, success: true }), {
        status: 200,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return new NextResponse(JSON.stringify(error), { status: 400 });
    }
  };
  