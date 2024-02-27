const express = require("express");
const router = express.Router();

const userDetails = require("./../models/user");

router.get('/all/:userId', async (req,res)=>{
    try{
        // console.log(req.body)
        // const { userId } = req.body;
        const userId = req.params.userId;
        if(!userId){
            return res.status(400).json({error: "User Id Missing"});
        }

        const user = await userDetails.findOne({_id: userId});
        if(!user){
            return res.status(401).json({error: "User not found"});
        }
        
        return res.status(200).json({success: "User Found SuccessFully", name: user.name, images: user.images});
    }
    catch(error){
        console.log("POST ALL DATA", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
});

module.exports = router;