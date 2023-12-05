
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAOw9mYZzi9eJVlyNOMeK5wOpNt4z0CRuk",
  authDomain: "fablefrog-8e5db.firebaseapp.com",
  projectId: "fablefrog-8e5db",
  storageBucket: "fablefrog-8e5db.appspot.com",
  messagingSenderId: "112397818545",
  appId: "1:112397818545:web:06c4ea109e78c967d32090",
  measurementId: "G-BDXMCMLLJS"
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);