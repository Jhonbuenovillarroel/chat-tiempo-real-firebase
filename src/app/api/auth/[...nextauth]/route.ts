import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   session: {
      strategy: "jwt",
   },
   providers: [
      CredentialsProvider({
         name: "Credentials",

         credentials: {
            username: {
               label: "Username",
               type: "text",
               placeholder: "jsmith",
            },
            password: {
               label: "Password",
               type: "password",
               placeholder: "*********",
            },
         },

         async authorize(credentials, req) {
            const user = await prisma.user.findUnique({
               where: {
                  name: credentials?.username,
               },
            });

            const correctPassword = await bcrypt.compare(
               credentials?.password,
               user?.password
            );

            if (user) {
               if (correctPassword) {
                  return {
                     id: user.id,
                     name: user.name,
                     email: user.email,
                     image: user.image,
                  };
               } else {
                  throw new Error("Contraseña incorrecta");
               }
            } else {
               throw new Error("El usuario no existe, por favor registrate");
            }
         },
      }),
   ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
