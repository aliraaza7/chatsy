import axios from "axios";

const upload = async (file) => {
  const CLOUD_NAME = "djmhuaxvf"; 
  const UPLOAD_PRESET = "uploadImage"; 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );
    return res.data.secure_url; // Returns the image URL
  } catch (err) {
    console.error("Image upload failed", err);
    throw err;
  }
};

export default upload;
