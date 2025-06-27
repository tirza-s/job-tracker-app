// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABtCETM7pML96thx880zHZVn_nX7-RcbM",
    authDomain: "job-tracker-app-938d5.firebaseapp.com",
    projectId: "job-tracker-app-938d5",
    storageBucket: "job-tracker-app-938d5.firebasestorage.app",
    messagingSenderId: "16169091955",
    appId: "1:16169091955:web:0a66f067b7c4f78e4bfb06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);