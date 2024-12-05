const product = require("../models/product")
const category = require("../models/category");
const { default: mongoose } = require("mongoose");
const create =async(req, res)=>{
    try {
        const {name, description, price, category_id} = req.body;


        if(!mongoose.isValidObjectId(category_id)){
            return res.status(404).json({message:"Invalid category id"})
        }

        const newProduct = await product.create({name, description, price, category_id})
        res.status(201).json({message:'Success', newProduct})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:'INTERNAL SERVER ERROR'})
    }
}

const findAll =async(req, res)=>{
    try {
        const data = await product.find()
        res.status(200).json({message:'Success', data})
        
    } catch (error) {
        res.status(500).json({message:'INTERNAL SERVER ERROR'})
    }
}

const findOne =async(req, res)=>{
    try {
        const {id} = req.params
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({message:'Invalid id'})
        }
        const data = await product.findById(id)
        res.status(200).json({message:'Success', data})
        
    } catch (error) {
        res.status(500).json({message:'INTERNAL SERVER ERROR'})
    }
}

const update =async(req, res)=>{
    try {
        const {name, description, price, category_id} = req.body;
        const {id} = req.params

        if(!mongoose.isValidObjectId(category_id)){
            return res.status(404).json({message:"Invalid category id"})
        }
        const newProduct = await product.findByIdAndUpdate(id, {name, description, price, category_id})
        const data = await product.findById(id)
        res.status(202).json({message:'Success', data})

    } catch (error) {
        res.status(500).json({message:'INTERNAL SERVER ERROR'})
    }
}

const remove =async(req, res)=>{
    try {
        const {id} = req.params
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({message:"Invalid category id"})
        }

        await product.findByIdAndDelete(id)
        const data = await product.findById(id)

        res.status(200).json({message:"Success"})

        
    } catch (error) {
        res.status(500).json({message:'INTERNAL SERVER ERROR'})
    }
}

module.exports = {
    remove,
    create, 
    findAll, 
    findOne, 
    update
}