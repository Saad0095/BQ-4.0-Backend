import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  secure: true,
});

export const uploadImage = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    await fs.promises.unlink(imagePath);
    console.log("Image's URL:", result.url);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};