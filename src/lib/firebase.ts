// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyC5KsWNmcVih0kaxJobNFwZhnlyt71-Bpg",
   authDomain: "chat-tiempo-real-d9850.firebaseapp.com",
   databaseURL: "https://chat-tiempo-real-d9850-default-rtdb.firebaseio.com",
   projectId: "chat-tiempo-real-d9850",
   storageBucket: "chat-tiempo-real-d9850.appspot.com",
   messagingSenderId: "871155905628",
   appId: "1:87115590fkjj5628:web:32c2504e300f9c00b0e299",
   measurementId: "G-3ZGNB382DE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
