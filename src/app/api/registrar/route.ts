import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
   const body = await req.json();

   const user = await prisma.user.findUnique({
      where: {
         name: body.username,
      },
   });
   const email = await prisma.user.findUnique({
      where: {
         email: body.email,
      },
   });

   if (user) {
      console.log(user);
      return NextResponse.json({ user: true });
   } else if (email) {
      console.log(email);
      return NextResponse.json({ email: true });
   } else {
      const newUser = await prisma.user.create({
         data: {
            name: body.username,
            email: body.email,
            password: body.password,
         },
      });
      console.log(newUser);

      return NextResponse.json({ userCreated: true });
   }
}
