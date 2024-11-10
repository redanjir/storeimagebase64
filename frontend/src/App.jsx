import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const url = "http://192.168.1.94:3000/api/upload";
  const [images, setImages] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputfile = document.getElementById("file-upload");
    const file = inputfile.files[0];

    if (!file) {
      console.error("No file selected.");
      return { success: false, message: "Please upload a file." };
    }

    const base64 = await convertToBase64(file);

    try {
      await axios.post(url, { base64 });
      console.log("uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleClick = async () => {
    try {
      const response = await axios.get(url);
      const { data: { data } } = response;
      setImages(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onScanSuccess = (decodedText, decodedResult) => {
    console.log(`Code scanned = ${decodedText}`, decodedResult);
    setIsScanning(false); // Stop scanning after success
  };

  const onScanFailure = (error) => {
    console.warn(`Code scan error = ${error}`);
  };

  useEffect(() => {
    if (isScanning) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: 250,
        },
        /* verbose= */ false
      );
      html5QrcodeScanner.render(onScanSuccess, onScanFailure);

      // Cleanup scanner when the component is unmounted
      return () => html5QrcodeScanner.clear();
    }
  }, [isScanning]);

  return (
    <>
      <div>
        <form className="upload__form" onSubmit={handleSubmit}>
          <label htmlFor="file-upload">Upload File</label>
          <input
            className="input__file"
            type="file"
            name="uploadfile"
            id="file-upload"
            accept=".jpeg, .png, .jpg"
            capture="user"
          />
          <button type="submit">Submit</button>
        </form>

        <button onClick={() => handleClick()}>hi load image</button>

        <button onClick={() => setIsScanning(!isScanning)}>
          {isScanning ? "Stop Scanner" : "Start Scanner"}
        </button>

        {/* QR Reader Element */}
        {isScanning && <div id="qr-reader" style={{ width: "100%" }}></div>}

        <div className="image__gallery">
          {images.map((image, index) => (
            <img key={index} src={image.myfile} alt={`Uploaded ${index}`} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
