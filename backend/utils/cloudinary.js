const cloudinary = require('cloudinary').v2
require('dotenv').config();

const Cloudinary = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// Log the cloudinary configuration to check if it's set up correctly
// console.log('Cloudinary config:', {
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET 
// }); 

module.exports = Cloudinary;