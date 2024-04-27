import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/config/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // true for 465, false for other ports
});

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();

    if (!email) {
      return new NextResponse("please fill all the fields", {
        status: 400,
      });
    }

    const exist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

 

    if (!exist) {
      console.log("user dosen't exist");
      return new NextResponse("User dosen't exists", { status: 400 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    await prisma.users.update({
      where: {
        email: email,
      },
      data: {
        resetToken: resetToken ? resetToken : "",
        resetTokenExpiry: new Date(Date.now() + 3600000),
      },
    });

    await transporter.sendMail({
      from: '"Your App" <>',
      to: email,
      subject: "Password Reset",
      text: `Use this token to reset your password: ${resetToken}`,
    });

    console.log("Password reset token sent to email:", email);

    return new NextResponse("Password reset token sent to email", {
      status: 200,
    });
  } catch (error) {
    console.error("Error parsing request:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
