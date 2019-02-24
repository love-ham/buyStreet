var mongoose = require("mongoose");
var config = require("./config.js");

module.exports = function(){
   var db = mongoose.connect(config.mongodb,{useNewUrlParser:true});

   require("../app/models/user.server.model.js");
   require("../app/models/product.server.model.js");
   require("../app/models/order.server.moder");
   
   return db;
}