// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsuNx9VHjiRw5Kcg5clO4gaPC9asksTT8",
    authDomain: "react-social-952b9.firebaseapp.com",
    projectId: "react-social-952b9",
    storageBucket: "react-social-952b9.appspot.com",
    messagingSenderId: "535796169959",
    appId: "1:535796169959:web:c85b3229b6b37d49c5f642",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);