import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"          
cloudinary.config({ 
  cloud_name: 'dzd7dc6w6', 
  api_key: '938811496458131', 
  api_secret: 'IglXdbIOi_c6i5AanMptohdJGEo' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
       //  fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
         fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}