const {Schema, model} = require('mongoose')

const schema = new Schema({
    name:{
        type:String, 
        required:String,
        trim:true},
    
    description:{
        type:String, 
        required:true, 
        trim:true
    }
    },
    {
        timestamps:true
    })

module.exports = model("category",schema )
