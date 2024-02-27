const express = require("express");
const router = express.Router();

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const cloudinary = require('./../cloudinary');

const userDetail = require("./../models/user");


const storage = multer.diskStorage({
    // destination: function(req, file, cb) {
    //     cb(null, 'images');
    // },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

router.post('/upload', upload.single('imageUrl'), async (req, res)=>{
    try{
        const name = req.body.name;
        const userId = req.body.userId;

        if(!userId){
            return res.status(401).json({error: "Unauthorized User"});
        }

        const filePath = req.file.path;
        const result = await cloudinary.uploader.upload(filePath, {folder:'image-uploader', use_filename: true});

        const updateUser = await userDetail.findOneAndUpdate({_id : userId}, {$push: {images: {name, imageUrl: result.url}}});

        return res.status(200).json({success: "uploaded image successfully", imageUrl:result.url});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error:"Error Uploading Image"});
    }
    // const name = req.body.name;
    // const imageUrl = req.file.filename;

    // console.log(name, imageUrl);

    // res.json({Upload : "success"});
})

module.exports = router;