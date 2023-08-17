"use client";

import Image from "next/image";
import { FormEvent } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function InicioSesion() {
   const router = useRouter();

   return (
      <main>
         <section className="h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center items-center px-8 py-8 bg-gradient-to-tl from-transparent to-red-950 rounded-md">
               <Image
                  className="w-40"
                  src="/logo.png"
                  width={700}
                  height={800}
                  alt="Logo Loving chat"
               />
               <h1 className="mt-4 text-xl font-bold">Inicia Sesión</h1>
               <form
                  onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                     e.preventDefault();

                     const formData = new FormData(e.currentTarget);

                     const response = await signIn("credentials", {
                        username: formData.get("name"),
                        password: formData.get("password"),
                        redirect: false,
                     });

                     if (response?.error) {
                        if (
                           response.error ===
                           "Illegal arguments: string, undefined"
                        ) {
                           toast.error(
                              "El usuario no existe, por favor registrate"
                           );
                        } else {
                           toast.error(response.error);
                        }
                     } else {
                        toast.success("Inicio de sesión exitoso", {
                           style: {
                              background: "#14B41C",
                           },
                        });
                        setTimeout(() => {
                           router.refresh();
                           router.push("/chat");
                        }, 2000);
                     }
                  }}
                  className="mt-8 flex flex-col gap-4"
                  action=""
               >
                  <div className="flex flex-col gap-1">
                     <label className="text-white text-[15px]" htmlFor="name">
                        Nombre de Usuario
                     </label>
                     <input
                        required
                        className=" bg-[#661d1d98] rounded outline-none px-3 py-1"
                        id="name"
                        name="name"
                        type="text"
                     />
                  </div>
                  <div className="flex flex-col gap-1">
                     <label
                        className="text-white text-[15px]"
                        htmlFor="password"
                     >
                        Contraseña
                     </label>
                     <input
                        required
                        className=" bg-[#661d1d98] rounded outline-none px-3 py-1"
                        id="password"
                        name="password"
                        type="password"
                     />
                  </div>

                  <button className="w-full bg-red-800 py-2 mt-4 rounded">
                     Iniciar Sesión
                  </button>
               </form>
            </div>
         </section>
      </main>
   );
}
