import { initializeApp } from "firebase/app";
import filesize from "filesize";
import Compressor from "compressorjs";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

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
const storage = getStorage();
const auth = getAuth();

export let link = "";

export const signIn = () => {
  signInAnonymously(auth)
    .then(() => {
      console.log("we are signed in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

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
        uploadImage(compressedImage);
      },
    });
  } else {
    //upload file(audio)
    console.log("uploading audio");
    uploadAudio(file);
  }
};

const uploadImage = (file) => {
  const storageRef = ref(storage, "images/" + file.name);
  uploadBytes(storageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      link = downloadURL;
    });
  });
};

const uploadAudio = (file) => {
  const storageRef = ref(storage, "audio/" + file.name);
  uploadBytes(storageRef, file).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      link = downloadURL;
    });
  });
};

export const getFileSize = (file) => {
  if (file) {
    return filesize(file.size);
  }
};

export const parseLink = (link) => {
  if (link) {
    return link.split("&token")[0];
  }
};
