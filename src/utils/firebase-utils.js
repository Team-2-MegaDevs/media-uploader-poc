import { initializeApp } from "firebase/app";
import filesize from "filesize";
import Compressor from "compressorjs";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInAnonymously,
} from "firebase/auth";

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
  }
};

const uploadImage = (file) => {
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          console.log("Unauthorized");
          break;
        case "storage/canceled":
          console.log("cancelled");

          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        link = downloadURL;
      });
    }
  );
  return link;
};

export const getFileSize = (file) => {
  if (file) {
    return filesize(file.size);
  }
};
