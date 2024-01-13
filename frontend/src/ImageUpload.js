import React, { useState } from "react";
import "./imageUpload.css"; // Import the CSS file

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleChooseImage = (e) => {
    // Your logic for choosing an image from local storage
  };

  const handleDeleteImage = () => {
    // Your logic for deleting the chosen image
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


