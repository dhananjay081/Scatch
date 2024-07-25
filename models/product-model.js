const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({
    image: String,
    name:String,
    price:Number,
    discount: Number,
    bgcolor: String,
    panelcolor: String,
    textcolot: String
})

module.exports = mongoose.model("products",ProductSchema)