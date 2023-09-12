// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import {getAuth} from "firebase/auth"
  // import dotenv from "dotenv"
  // dotenv.config()
  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAldNkCQLeI7uK5Ob3A6aeZBiITfsequNE",
  authDomain: "relixai.firebaseapp.com",
  projectId: "relixai",
  storageBucket: "relixai.appspot.com",
  messagingSenderId: "403746315701",
  appId: "1:403746315701:web:15244954fc9539fd84cdfc",
  measurementId: "G-H7Y7XT69PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);

