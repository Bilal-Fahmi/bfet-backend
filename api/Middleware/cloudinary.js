const cloudinary = require("cloudinary").v2;
require('dotenv').config()

console.log("api key",process.env.CLOUDINARY_API_SECERT);

cloudinary.config({
  cloud_name: "dkqcordxf",
  api_key: "875816722488277",
  api_secret: process.env.CLOUDINARY_API_SECERT,
});

const options = {
  overwrite: true,
  invalidate: true,
  resoure_type: "auto",
};

module.exports = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, options, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};
