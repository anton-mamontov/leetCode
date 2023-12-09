// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgVLZjlgp6pQj4dMsQGz94mVtN-TNxwI4",
  authDomain: "mamont-code.firebaseapp.com",
  projectId: "mamont-code",
  storageBucket: "mamont-code.appspot.com",
  messagingSenderId: "800289000019",
  appId: "1:800289000019:web:5673e0c45c80b2cb1f94a6"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app)
const firestore = getFirestore(app);

export {auth, firestore, app}