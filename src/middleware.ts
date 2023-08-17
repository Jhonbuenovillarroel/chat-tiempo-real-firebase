import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname;

   if (path === "/") {
      return NextResponse.next();
   }

   const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
   });

   if (!session && path === "/chat") {
      return NextResponse.redirect(new URL("/inicio-sesion", req.url));
   } else if (session && (path === "/inicio-sesion" || path === "/registro")) {
      return NextResponse.redirect(new URL("/chat", req.url));
   }

   return NextResponse.next();
}
