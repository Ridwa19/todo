// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-iTel3utURI2x3j40c6QOx2nIGl_ylxc",
  authDomain: "todoapp-71b2e.firebaseapp.com",
  projectId: "todoapp-71b2e",
  storageBucket: "todoapp-71b2e.appspot.com",
  messagingSenderId: "985370972236",
  appId: "1:985370972236:web:c186c214ffe1bc69dfe4e9",
  measurementId: "G-0LTFFKSYQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
