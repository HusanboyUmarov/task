const {Schema, model} = require('mongoose')

const schema = new Schema({
    
    name:{type:String, required:String,trim:true},

    description:{ type:String, required:true, trim:true},

    price:{type:Number, required:true},

    category_id:{
        type:Schema.Types.ObjectId,
        ref:"category", 
        trim:true, 
        required:true}

    },
    {
        timestamps:true
    })

module.exports = model("product",schema )
