const { default: mongoose } = require("mongoose");
const orderModel = require("../models/order")
const productModel = require("../models/product")

const create = async(req, res)=>{
    try {
        const {name, phone, product_id, adress} = req.body;
        if(!mongoose.isValidObjectId(product_id))
        {
            res.status(404).json({message:"Invalid product id"})
        }

        const data = await orderModel.create({name, phone, product_id, adress})

        res.status(201).json({message:"Success", data})

    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

const findAll = async(req, res)=>{
    try {
        const data = await orderModel.find()
        res.status(200).json({message:"Success", data})        
        
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

const findOne = async(req, res)=>{
    try {
        const {id} = req.params
        if(!mongoose.isValidObjectId(id)){
            res.status(404).json({message:'Invalid order id'})
        }
        
        const data = await orderModel.findById(id)

        res.status(200).json({message:"Success", data})
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

const update = async(req, res)=>{
    try {
        
        const {id} = req.params
        const {adress, name, product_id, phone} = req.body
        if(!mongoose.isValidObjectId(id)){
            res.status(404).json({message:"Invalid order id"})
        }

        if(!mongoose.isValidObjectId(product_id)){
            return res.status(404).json({message:"Invalid product id"})
        }
        await orderModel.findByIdAndUpdate(id, {adress, name, product_id, phone})
        const data =  await orderModel.findById(id)

        res.status(200).json({message:'Success', data})
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

const remove = async(req, res)=>{
    try {

        const {id} = req.params
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({message:'Invalid id'})
        }
        await orderModel.findByIdAndDelete(id)
        const data = await orderModel.findById(id)

        res.status(200).json({message:"Success", data})
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR"})
    }
}

const ordersByProducts = async(req, res)=>{
    try {
        const data = await productModel.aggregate([
            {
                $lookup:{
                    from:"orders",
                    localField:"_id", 
                    foreignField:'product_id',
                    as:"orders"

                }
            }
        ])
        res.status(200).json({data})
    } catch (error) {
        
    }
}

module.exports = {
    create, 
    findAll, 
    findOne,
    update,
    remove,
    ordersByProducts
}