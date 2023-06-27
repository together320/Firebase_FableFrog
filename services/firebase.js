
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
 
  apiKey: "AIzaSyDYkZg2aEuErg8v3CHeGolhTEbLEcGD2sk",
  authDomain: "auth.fablefrog.com",
  projectId: "fablefrog-auth",
  storageBucket: "fablefrog-auth.appspot.com",
  messagingSenderId: "1021054701797",
  appId: "1:1021054701797:web:9693e89d356112927b440c"
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);