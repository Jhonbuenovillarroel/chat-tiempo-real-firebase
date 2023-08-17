"use client";

import Image from "next/image";
import { FormEvent } from "react";
import bcrypt from "bcryptjs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Registro() {
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
               <h1 className="mt-4 text-xl font-bold">Registrate</h1>
               <form
                  onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                     e.preventDefault();

                     const formData = new FormData(e.currentTarget);

                     const password = await bcrypt.hash(
                        formData.get("password"),
                        12
                     );

                     const response = await fetch("/api/registrar", {
                        method: "POST",
                        headers: {
                           "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                           username: formData.get("name"),
                           email: formData.get("email"),
                           password: password,
                        }),
                     });

                     const result = await response.json();

                     if (result.user) {
                        toast.error(
                           "El usuario ya existe, por favor ingresa otro"
                        );
                     } else if (result.email) {
                        toast.error(
                           "El correo ya existe, por favor ingresa otro"
                        );
                     } else if (result.userCreated) {
                        toast.success("Usuario creado exitosamente", {
                           style: {
                              background: "#14B41C",
                           },
                        });

                        setTimeout(() => {
                           router.refresh();
                           router.push("/inicio-sesion");
                        }, 2000);
                     }
                  }}
                  className="mt-6 flex flex-col gap-4"
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
                     <label className="text-white text-[15px]" htmlFor="email">
                        Correo Electrónico
                     </label>
                     <input
                        required
                        className=" bg-[#661d1d98] rounded outline-none px-3 py-1"
                        id="email"
                        name="email"
                        type="email"
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

                  <button className="w-full bg-red-800 py-2 mt-8 rounded">
                     Registrarse
                  </button>
               </form>
            </div>
         </section>
      </main>
   );
}
