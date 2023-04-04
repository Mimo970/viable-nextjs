// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, FieldValue } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmitgIbAYUhVwhh2mfsML3_H5vMnX3nQs",
  authDomain: "viable-7da42.firebaseapp.com",
  projectId: "viable-7da42",
  storageBucket: "viable-7da42.appspot.com",
  messagingSenderId: "429733110361",
  appId: "1:429733110361:web:649689dc8745666cb14748",
  measurementId: "G-WYVKJDGMLT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);
export { FieldValue }; // export FieldValue
