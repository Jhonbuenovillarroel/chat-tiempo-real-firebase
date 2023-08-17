import database from "./firebase";
import { ref, set, onValue } from "firebase/database";

export function escribirDatosUsuario({
   messageId,
   name,
   message,
}: {
   messageId: number;
   name: any;
   message: string;
}) {
   set(ref(database, "mensajes/" + messageId), {
      username: name,
      message: message,
   });
}

export function obtenerMensajes() {
   return new Promise((resolve, reject) => {
      const messagesPath = ref(database, "mensajes/");
      let messages;
      onValue(
         messagesPath,
         (snapshot) => {
            const data = snapshot.val();
            resolve(data);
         },
         (error) => {
            reject(error);
         }
      );
   });
}

// export function obtenerNuevoMensaje(messageId: number) {
//    return new Promise((resolve, reject) => {
//       const messagesPath = ref(database, "mensajes/");
//       let messages;
//       onValue(
//          messagesPath,
//          (snapshot) => {
//             const data = snapshot.val();
//             resolve(data);
//          },
//          (error) => {
//             reject(error);
//          }
//       );
//    });
// }
