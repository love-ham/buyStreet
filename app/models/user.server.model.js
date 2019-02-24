var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    account:String,
    password:String
});

var User = mongoose.model("User",UserSchema);