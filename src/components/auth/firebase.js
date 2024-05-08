// Import the functions you need from the SDKs you need
import firebase from "./firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuAwP7AMAgpJ942P_Egs5nIo4a2KS2bY4",
  authDomain: "react-auth-tutorial-93047.firebaseapp.com",
  projectId: "react-auth-tutorial-93047",
  storageBucket: "react-auth-tutorial-93047.appspot.com",
  messagingSenderId: "394296762669",
  appId: "1:394296762669:web:80c38a14c5486547c033a4",
  measurementId: "G-W91N1GQCB7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
export {auth , db};
//export  fireDb.database().ref();

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: <YOURAPIKEY>,
//   authDomain: <YOURAUTHDOAMIN>,
//   projectId: <YOURPROJECTID>,
//   storageBucket: <YOURSTORAGEBUCKET>,
//   messagingSenderId: <YOURMESSAGINGSENDERID>,
//   appId: <YOURAPPID>,
//   measurementId: <YOURMEASUREMENTID>,
// };

// const app = initializeApp(firebaseConfig);

// export const db = getFirestore(app);
