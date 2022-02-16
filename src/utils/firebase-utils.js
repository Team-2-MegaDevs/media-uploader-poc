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

export const signIn = () => {
	signInAnonymously(auth)
		.then(() => {
			console.log("we are signed in");
		})
		.catch(error => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
};

export const handleUpload = file => {
	return new Promise((resolve, reject) => {
		try {
			//check file size
			getFileSize(file);
			//check file type
			if (file.type.match("image.*")) {
				//compress image
				console.log("compressing image");
				resolve(imageCompression(file));
			} else {
				//upload file(audio)
				console.log("uploading audio");
				resolve(uploadAudio(file));
			}
		} catch (err) {
			//something went wrong, rejecting the promise
			reject(err.message);
		}
	});
};

const imageCompression = image => {
	return new Promise((resolve, reject) => {
		new Compressor(image, {
			quality: 0.8,
			success: compressedImage => {
				resolve(uploadImage(compressedImage));
			},
			error: error => {
				reject(error.message);
			},
		});
	});
};

const uploadImage = async file => {
	const storageRef = ref(storage, "images/" + file.name);
	return new Promise((resolve, reject) => {
		try {
			uploadBytes(storageRef, file).then(snapshot => {
				getDownloadURL(snapshot.ref).then(downloadURL => {
					resolve(downloadURL);
				});
			});
		} catch (err) {
			reject(err.message);
		}
	});
};

const uploadAudio = async file => {
	const storageRef = ref(storage, "audio/" + file.name);
	return new Promise((resolve, reject) => {
		try {
			uploadBytes(storageRef, file).then(snapshot => {
				getDownloadURL(snapshot.ref).then(downloadURL => {
					resolve(downloadURL);
				});
			});
		} catch (err) {
			reject(err.message);
		}
	});
};

export const getFileSize = file => {
	if (file) {
		return filesize(file.size);
	}
};

export const parseLink = link => {
	if (link) {
		return link.split("&token")[0];
	}
};
