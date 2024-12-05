const { default: mongoose, Error } = require("mongoose");
const categoryRepo = require("../models/category");
const productModel = require("../models/product")

// create Category
const createCategory = async(req, res)=>{
    try {
        const {name, description} = req.body
        const data = await categoryRepo.create({name, description})
        res.status(201).json({message:'Success',data})
    } catch (error) {
        console.log(error)
     res.status(500).json({message:"Internal server error"})   
    }
}

// Find Category
const findCategory = async(req, res)=>{
    try {
        const data = await categoryRepo.find()
        res.json({message:'Success', data})    
    } catch (error) {
     res.status(500).json({message:"Internal server error"})   
    }
}

// Find one
const findOneCategory = async(req, res)=>{
    try{     
           const {id} = req.params
        const oneCategory = await categoryRepo.findById(id)
        res.status(200).json({message:'Success', oneCategory})
    } catch (error) {
     res.status(500).json({message:"Internal server error"})   
    }
}


// update category
const updateCategory = async(req, res)=>{
    try {
        const {id} = req.params
        const {name, description} = req.body
        await categoryRepo.findByIdAndUpdate(id, {name, description})


        const newCategory = await  categoryRepo.findById(id)
        res.status(201).json({message:'Success',newCategory})
    } catch (error) {
     res.status(500).json({message:"Internal server error"})   
    }
}

// delete Category
const deleteCategory = async(req, res)=>{
    try {
        const {id} = req.params
        const data = await categoryRepo.findByIdAndDelete(id)
        
        res.status(201).json({message:'Success', data})
        
    } catch (error) {
     res.status(500).json({message:"Internal server error"})   
    }
}

const aggregateByProducts = async(req, res)=>{
    try {
        const categoryWithProduct = await categoryRepo.aggregate([
            {
                $lookup:{
                    from:"products",
                    localField:"_id", 
                    foreignField:'category_id',
                    as:"products"
                }
            },
        ])
        res.status(200).json({message:"Success", categoryWithProduct})
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    createCategory, 
    findCategory,
    findOneCategory,
    updateCategory,
    deleteCategory,
    aggregateByProducts

}