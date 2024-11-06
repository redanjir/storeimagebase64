import { useState } from 'react';
import './style.css'
import axios from 'axios';

function App() {
  const url = "http://192.168.1.94:3000/api/upload";
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const inputfile = document.getElementById('file-upload');
    const file = inputfile.files[0];
    
    if (!file) {
      console.error("No file selected.");
      return { success: false, message: "Please upload a file." };
    }
  
    const base64 = await convertToBase64(file);

    try {
      await axios.post(url, {base64});
      console.log("uploaded");
    } catch (error) {
      console.log(error);
    }
  }
  
  const convertToBase64 = (file) =>{
    return new Promise((resolve, reject) =>{
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () =>{
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) =>{
        reject(error);
      }
    })
  }

  const handleClick = async () =>{
    try {
      const response = await axios.get(url);
      const {data: {data}} = response;
      setImages(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    <div>
       <form className="upload__form" onSubmit={(e) => handleSubmit(e)}>
        <label  htmlFor="file-upload" >Upload File</label>
        <input
          className='input__file'
          type="file"
          label = "Image"
          name="uploadfile"
          id="file-upload"
          accept=".jpeg, .png, .jpg"
          capture = "user"
        />

        <button type="submit">
          Submit
        </button>

      </form>

      <button onClick={() => handleClick()}>
        hi load image
      </button>

      <div className="image__gallery">
          {images.map((image, index) => (
            <img key={index} src={image.myfile} alt={`Uploaded ${index}`} />
          ))}
      </div>
 
    </div>
    
    </>
  )
}

export default App
