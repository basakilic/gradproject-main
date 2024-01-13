import React, { useState } from "react";
import "./ImageUpload.css"; // Import the CSS file

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleChooseImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
          setImage(reader.result);
        };
      }
    };
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  return (
    <div className="upload-container">
      <div>
        <button className="choose-button" onClick={handleChooseImage}>
          Choose Image
        </button>
        <button className="delete-button" onClick={handleDeleteImage}>
          Delete Image
        </button>
      </div>
      {image && (
        <div className="image-preview">
          <img src={image} alt="Chosen" width={100} height={100} />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
