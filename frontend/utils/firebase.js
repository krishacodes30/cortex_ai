// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexaiauth.firebaseapp.com",
  projectId: "cortexaiauth",
  storageBucket: "cortexaiauth.firebasestorage.app",
  messagingSenderId: "92934548530",
  appId: "1:92934548530:web:d6a48146c5bde0b7de202b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const googleProvider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();