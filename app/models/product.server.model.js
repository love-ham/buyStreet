var mongoose = require("mongoose");

var ProductSchema = new mongoose.Schema({
    product:String,
    price:String,
    imgSrc:String
});

var Product = mongoose.model("Product",ProductSchema);