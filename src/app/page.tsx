"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
   const { data: session, status } = useSession();

   if (session) {
      return (
         <main className="p-8">
            <p>Registrado como {session.user?.email}</p>
            <button
               onClick={() => {
                  signOut();
               }}
               className="bg-red-600 mt-5 w-48 h-12 flex items-center justify-center"
            >
               Cerrar Sesión
            </button>
         </main>
      );
   }

   return (
      <main className="p-8">
         <Link
            href="/inicio-sesion"
            className="bg-red-600 w-40 h-10 flex items-center justify-center"
         >
            Iniciar Sesión
         </Link>
         <Link
            href="/registro"
            className="bg-red-600 mt-4 w-40 h-10 flex items-center justify-center"
         >
            Registrarse
         </Link>
      </main>
   );
}
