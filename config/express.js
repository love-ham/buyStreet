var express = require("express");
var bodyParser = require("body-parser");
var cookieParser  = require("cookie-parser");
var session = require("express-session");
var redisStore = require("connect-redis")(session);
module.exports = function(){
    var app = express();
    app.use(bodyParser.json());
   /*  //app.use(cookieParser());      //和ssession冲突，后面报错了，网上说1.5版本以后不能同时用了 */
    app.use(session({
        /* genid:function(req){     //生成sessionId  没有设置的话，系统自动调用UID（24）默认方法；
            return genuuid();
        }, */
        name:"sessionId",
        secret:"liujinxin app",
        rolling:false,
        store:new redisStore(),
        cookie:{maxAge:1000*60*60*24*365},
        resave:true,
        saveUninitialized:false
    }));
    app.use(express.static("/home/practise/scms/public")); 

    require("../app/routes/user.server.route")(app);
    require("../app/routes/product.server.route")(app);
    require("../app/routes/order.server.route")(app);

    app.get("/",function(req,res){
        res.contentType('html');
        res.sendFile("/home/practise/scms/public/Login.html");
    })
    app.use(function(req,res,next){
        res.status(404);
        try{
            return res.json("NOT Found");
        }catch(e){
            console.error("404 ");
        }
    });

    app.use(function(err,req,res,next){
        if(!err){
            return next();
        }
        try{
            return res.json(err.message || "server error");
        }catch(e){
            console.error("500 ");
        }
    })
    return app;
}