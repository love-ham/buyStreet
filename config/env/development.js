var config = null;

if(process && process.env &&process.env.NOOD_ENV){
    config = require("./env/" + process.env.NOOD_ENV +".js");
}else{
    config = require("./env/development.js");
}

module.exports = config;