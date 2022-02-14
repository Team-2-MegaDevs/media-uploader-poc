// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3d7i3P1t56f3zP869mnhv6tefAlGftZc",
  authDomain: "speak-habla-poc.firebaseapp.com",
  projectId: "speak-habla-poc",
  storageBucket: "speak-habla-poc.appspot.com",
  messagingSenderId: "1068238770911",
  appId: "1:1068238770911:web:7d8c43373eb30b3f62cf6a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const handleUpload = () => {
  console.log({ app });
};
