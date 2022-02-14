import { initializeApp } from "firebase/app";
import filesize from "filesize";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: "speak-habla-poc.firebaseapp.com",
  projectId: "speak-habla-poc",
  storageBucket: "speak-habla-poc.appspot.com",
  messagingSenderId: "1068238770911",
  appId: `${process.env.REACT_APP_APP_ID}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const handleUpload = (file) => {
  //check file size
  getFileSize(file);
  console.log({ file });
};

export const getFileSize = (file) => {
  if (file) {
    return filesize(file.size);
  }
};
