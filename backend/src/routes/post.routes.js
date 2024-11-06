const {Router} = require('express');

const router = Router();
const Posts = require('../models/post.model.js');

router.post("/api/upload", async (req,res) =>{
    const{base64} = req.body;

    if(!base64){
        return res.status(400).json({success: false, message: "please send a file"});
    }
    try {
        const newImage = await Posts.create({myfile: base64});
        newImage.save();

        return res.status(201).json({success: true, message: "New image uploaded"});
    } catch (error) {
        return res.status(409).json({success: false, message: error.message});
    }
});

router.get("/api/upload", async (req,res) =>{
    try {
        const findPosts = await Posts.find({});
        return res.status(200).json({success: true, data: findPosts});
    } catch (error) {
        return res.status(409).json({success: false, message: error.message});
    }
})


module.exports = router;