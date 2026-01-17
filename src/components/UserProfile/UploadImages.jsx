import axios from "axios";
import { useState } from "react";

function UploadImage() {
  const [image, setImage] = useState(null);

  const upload = async () => {
    if (!image) return alert("No file selected");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Socin_images");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/novelsocinbackend/image/upload",
      formData
    );

    console.log(res.data.secure_url);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={upload}>Upload</button>
    </div>
  );
}

export default UploadImage;
