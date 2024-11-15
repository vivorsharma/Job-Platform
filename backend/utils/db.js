const moongoose = require('mongoose');
require("dotenv").config();
const database = process.env.DB

moongoose.connect(database).then(() => {
    console.log(`connected to database successfully`);
}).catch((err) => {
    console.log(`failed to connect`)
})