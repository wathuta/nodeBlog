const router =require('express').Router();
const Category=require('../models/category')

router.get('/',async (req,res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/',async (req,res)=>{
    const newCat =new Category(req.body); 
    try {
        const savedCategory = await newCat.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        
    }
})
module.exports =router;