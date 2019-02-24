var mongoose = require("mongoose");

var OrderSchema = new mongoose.Schema({
    orderPrice:Number,
    product:Object,
    account:String,
    time:Date
});

var Order = mongoose.model("Order",OrderSchema)