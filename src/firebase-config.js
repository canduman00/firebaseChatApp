// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmGXJahjRURCR5QV_Hd7KIHH331EBgnC4",
  authDomain: "chatapp-2a1f8.firebaseapp.com",
  projectId: "chatapp-2a1f8",
  storageBucket: "chatapp-2a1f8.appspot.com",
  messagingSenderId: "800931898588",
  appId: "1:800931898588:web:dc04cb60f2fa12fc0d0019"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);