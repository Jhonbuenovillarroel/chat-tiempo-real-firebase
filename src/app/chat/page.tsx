"use client";

import { escribirDatosUsuario, obtenerMensajes } from "@/lib/firebase-utils";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { onChildAdded, ref } from "firebase/database";
import database from "@/lib/firebase";
import { toast } from "react-hot-toast";

interface Registro {
   message: string;
   username: string;
}

export default function Chat() {
   const [messageInput, setMessageInput] = useState("");
   const { data: session, status } = useSession();
   const [messages, setMessages] = useState<Registro[]>([]);
   const [data, setData] = useState();
   const ulRef = useRef<HTMLUListElement>(null);

   async function primeraObtencionMensajes() {
      const messagesDB: any = await obtenerMensajes();

      if (messagesDB) {
         setMessages(messagesDB);
      }
   }

   const checkMessages = ref(database, "mensajes/" + messages.length);

   onChildAdded(checkMessages, async (data) => {
      const messagesDB: any = await obtenerMensajes();

      setMessages(messagesDB);

      setMessageInput("");

      console.log("si");
   });

   useEffect(() => {
      if (ulRef.current) {
         window.scrollTo(0, 100000000);
         ulRef.current.focus();
      }
   }, [messages]);

   useEffect(() => {
      primeraObtencionMensajes();
   }, []);

   return (
      <main className="w-full">
         <div className="w-full mb-10">
            <ul
               ref={ulRef}
               className="flex w-full box-border p-8 flex-col gap-4"
            >
               {messages.length === 0 ? (
                  <div>Aún no hay mensajes</div>
               ) : (
                  messages.map((message: any, i) =>
                     message.username === session?.user?.name ? (
                        <li
                           className="bg-white text-black max-w-[240px] sm:max-w-lg justify-self-end self-end flex flex-col w-fit p-4 rounded-md"
                           key={`message_${i}`}
                        >
                           <span>{message.username}:</span>
                           <p className="break-words">{message.message}</p>
                        </li>
                     ) : (
                        <li
                           className="bg-red-700 max-w-[240px] sm:max-w-lg justify-self-end flex flex-col w-fit p-4 rounded-md"
                           key={`message_${i}`}
                        >
                           <span className="w-max">{message.username}:</span>
                           <p className="break-words">{message.message}</p>
                        </li>
                     )
                  )
               )}
            </ul>
         </div>
         <form
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
               e.preventDefault();

               const formData = new FormData(e.currentTarget);

               if (formData.get("message") === "") {
                  toast.error("No puedes enviar texto vacío");
                  return;
               }

               if (messages) {
                  escribirDatosUsuario({
                     messageId: messages.length++,
                     name: session?.user?.name,
                     message: messageInput,
                  });
               } else {
                  escribirDatosUsuario({
                     messageId: 0,
                     name: session?.user?.name,
                     message: messageInput,
                  });
               }
            }}
            className="fixed bg-red-950 flex bottom-0 left-0 right-0"
            action=""
         >
            <input
               id="message"
               name="message"
               value={messageInput}
               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setMessageInput(e.target.value);
               }}
               className="w-full h-10 px-3 outline-none bg-transparent border-2 border-red-700"
               type="text"
            />
            <button className="w-40 bg-red-700">Enviar</button>
         </form>
      </main>
   );
}
