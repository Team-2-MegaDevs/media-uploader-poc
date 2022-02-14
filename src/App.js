import "./App.css";
import { handleUpload } from "./utils/firebase-utils";

function App() {
  return (
    <div className="App">
      <button className="uploadButton" onClick={handleUpload}>
        Upload File
      </button>
      <span className="uploadProgress"></span>
      <p className="downloadLink"></p>
    </div>
  );
}

export default App;
