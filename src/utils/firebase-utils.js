import { initializeApp } from "firebase/app";
import filesize from "filesize";
import Compressor from "compressorjs";
import reactDom from "react-dom";

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

  //check file type
  if (file.type.match("image.*")) {
    //compress image
    new Compressor(file, {
      quality: 0.8,
      success: (compressedImage) => {
        //upload CompressedImage (as a blob)
        console.log({ compressedImage });
      },
    });
  } else {
    //upload file(audio)
    console.log("uploading audio");
  }

  console.log({ file });
};

export const getFileSize = (file) => {
  if (file) {
    return filesize(file.size);
  }
};
