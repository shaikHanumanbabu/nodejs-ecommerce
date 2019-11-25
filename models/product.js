const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title:{
        type:String
    },
    featured_image:{
        type:String
    },
    price:{
        type:Number
    },
    product_description :{
        type:String,
        default:"welcome",
        trim:true
    },
    gallery_images:[{
        type:String
    }]

},{timestamps:true})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;