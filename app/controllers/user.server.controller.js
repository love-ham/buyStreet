var mongoose = require("mongoose");
var productController = require("./product.server.controller");
var User = mongoose.model("User");

module.exports = {
      userLogin:function(req,res,next){
          var userMsg = req.body;
          var account = userMsg.account,password = userMsg.password;
          var fail = JSON.stringify({"status":false});
          var success = JSON.stringify({"status":true});
          if(!account || !password){
              res.end(fail);
              return;
          }
          User.findOne({account:account,password:password},function(err,doc){
              if(err){
                  console.log(" user find error : ",err);
                  return;
              }
              if(doc){
                  req.session.name = account;  //设置session
                  res.end(success);
            }else{res.end(fail);}

          })
      },
      userRegister:function(req,res,next){
        var userMsg = req.body;
        var account = userMsg.account,password = userMsg.password;
        if(!account || !password){
            res.end("账号或者密码为空");
            return;
        }
        User.findOne({account:account,password:password},function(err,doc){
            if(err){
                console.log(" user register find error : ",err);
                res.end( JSON.stringify({"rigister":false}));
                return;
            }
            if(doc){ 
                res.end( JSON.stringify({"rigister":false}));
          }else{
              var user = new User({             //数据未处理，有时间再处理
                  account:account,
                  password:password
              });
              user.save(function(err){
                  if(err){
                      console.log("user rigister save error: ",err);
                      res.end( JSON.stringify({"rigister":false}));
                      return;
                  }
                  res.end( JSON.stringify({"rigister":true}));;
              })
          }

        })
      },
      accountFind:function(req,res,next){
          var account = req.query.account;
          if(!account){
              res.end("账号为空");
              return;
          }
          User.findOne({account:account},function(err,doc){
             if(err){
                 console.log("account find error : ",err);
                 res.end("error");
                 return;
             }
             console.log(doc)
             if(doc){
                res.end(JSON.stringify({"account":true}));
                 return;
             }else{
                res.end(JSON.stringify({"account":false}));
                return;
             }
          })
      },
      
 
      indexControl:function(req,res,next){
        var fail = JSON.stringify({
            sign:false
        });
        console.log("before res")
          if(productController.checkSession(req)){
              console.log("coming")
               var success = {
                sign:true,
                account:req.session.name,
               };
               if(!req.session.product){
                   console.log("req session product",req.session.product)
                success.product = [];
                res.end(JSON.stringify(success));
               }else{
                productController.productArrSelect(req,res,function(res,result){
                    console.log("result fanhui",result)
                    success.product = result;
                    console.log(success);
                    res.end(JSON.stringify(success));
                });
               }

               return;
          }else{
               res.end(fail);
               return;
          }
      }
}