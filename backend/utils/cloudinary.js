import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload file to Cloudinary
export const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'medicare',
      resource_type: 'auto'
    });

    // Delete the local file after successful upload
    fs.unlinkSync(filePath);

    return result;
  } catch (error) {
    // Delete the local file if upload fails
    fs.unlinkSync(filePath);
    throw new Error('Error uploading file to Cloudinary: ' + error.message);
  }
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error('Error deleting file from Cloudinary: ' + error.message);
  }
}; 