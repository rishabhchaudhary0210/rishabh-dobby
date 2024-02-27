
const mongoose = require('mongoose');
require('dotenv').config();

const connectToMongo = (dbUrl) => {
    mongoose.set("strictQuery", true);
    try {
        mongoose.connect(dbUrl, {
            dbName: 'image-uploader'
        },
        );
    } catch (err) {
        console.log(err);
    }
    mongoose.connection.on("error", (err) => {
        console.log("Error in Connection");
        console.log(err);
    })
    mongoose.connection.once("open", () => {
        console.log("SuccessFully Connected To the DB");
    })
    
}

module.exports = connectToMongo;