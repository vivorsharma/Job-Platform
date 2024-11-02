const cloudinary = require('cloudinary')
require('dotenv').config();

const Cloudinary = cloudinary.config({
    cloud_name: process.env.CLOUD_NAMe,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

module.exports = Cloudinary;