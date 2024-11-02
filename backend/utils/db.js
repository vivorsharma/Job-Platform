const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
}).then(() =>{
    console.log("Database connected successfully");
}).catch((error) => {
    console.error("Database connection error:", error.message);
    console.log("Database URL:", process.env.DATABASE);

    console.error("Error details:", error);
})