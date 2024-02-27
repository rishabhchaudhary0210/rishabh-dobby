const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;

const connectToMongo = require("./connection");

const app = express();

app.use(morgan('tiny'));
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({limit:'50mb',extended: false}));

app.use(express.json());


//user auth routes
app.use("/auth", require("./routes/auth"));

//file handling routes
app.use("/file", require('./routes/file'));

//get All data
app.use("/data", require("./routes/data"));

const start = async ()=>{
    try {
        await connectToMongo(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server started on PORT : ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();
