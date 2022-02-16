import "./App.css";
import { useState, useEffect } from "react";
import {
	handleUpload,
	getFileSize,
	signIn,
	link,
	parseLink,
} from "./utils/firebase-utils";

function App() {
	const [file, setFile] = useState(null);
	const [isOptimized, setIsOptimized] = useState(false);
	const [fileSize, setFileSize] = useState(null);
	const [url, setUrl] = useState("");

	useEffect(() => {
		signIn();
	}, []);

	return (
		<div className='App'>
			<form
				onSubmit={async ev => {
					ev.preventDefault();
					await handleUpload(file).then(result => {
						console.log(result);
						setUrl(parseLink(result));
					});
				}}
			>
				<input
					className='uploadForm'
					type='file'
					accept='image/*, audio/*'
					onChange={ev => {
						setFile(ev.target.files[0]);
						setIsOptimized(() => {
							//only allow files < 10MB to be uploaded
							return ev.target.files[0].size < 10000000 ? true : false;
						});
						setFileSize(getFileSize(ev.target.files[0]));
					}}
				></input>
				<p className='uploadProgress'>
					Current File Size: {fileSize}.{" "}
					{isOptimized ? "" : "Please upload a file < 10MB!"}
				</p>
				<button type='submit' disabled={!isOptimized}>
					Upload File
				</button>
			</form>
			<a className='downloadLink' href={url} target='_blank'>
				{url ?? url}
			</a>
		</div>
	);
}

export default App;
