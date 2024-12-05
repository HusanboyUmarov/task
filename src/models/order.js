const {Schema, model} = require("mongoose")

const schema = new Schema({
    product_id:{
        type: Schema.Types.ObjectId,
        ref: "product",
        trim:true,
        required:true
    },
    phone:{
        type:String, 
        trim:true, 
        required:true
    },
    adress:{
        type:String,
        trim:true,
        required:true
    },
    name:{
        type:String,
        trim:true
    }

},
{
    timestamps:true
})

module.exports = model("order",schema)