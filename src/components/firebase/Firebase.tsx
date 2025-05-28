// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0Eea48LfaiHgroEkmoRLtLELy5gTHnSc",
    authDomain: "firstfirebaseauth-eee09.firebaseapp.com",
    projectId: "firstfirebaseauth-eee09",
    storageBucket: "firstfirebaseauth-eee09.firebasestorage.app",
    messagingSenderId: "389444782368",
    appId: "1:389444782368:web:b85138328216f447396f45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }
