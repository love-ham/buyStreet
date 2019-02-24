var mongoose = require("mongoose");
var Product = mongoose.model("Product");

module.exports = {
    createProduct:function(req,res,next){
       var product = req.body.product;
       var price = req.body.price;
       var imgSrc = req.body.imgSrc;
       var product = new Product({
           product:product,
           price:price,
           imgSrc:imgSrc
       })
       product.save(function(err){
          if(err){
              console.log("product save error: ",err);
              res.end("fail");
              return;
          }else{
              res.end("success");
          }
       })
    },
    productSelect:function(req,res,next){
        var product = decodeURI( req.body.product);
        product = new RegExp(product);
        Product.find({product:product},function(err,docs){
            if(err){
                console.log("product find error: ",err);
                 res.end("error");
                return;
            }else{
                if(docs && JSON.stringify(docs) !== "[]"){
                  var success = JSON.stringify({status:true,data:docs});
                  res.end(success);
                  return;
                }  else{
                  var fail = JSON.stringify({status:false});
                  res.end(fail);
                }
            }
        })
    },
    addBuyCar:function(req,res,next){
        var isLogin = module.exports.checkSession(req);
        console.log(isLogin)
        var productId = req.body.productId;
        console.log("productId:", productId)
        if(isLogin){
            if(!req.session.product){
               req.session.product = new module.exports.LikeArr();
            }
            if(req.session.product[productId]){
                req.session.product[productId] = req.session.product[productId] + 1;
            }else{
                //module.exports.LikeArr.push(req.session.product,productId,1);
                req.session.product[productId] = 1 ;
                req.session.product.length++;
                //req.session.product.push(productId,1);
            }
            module.exports.productArrSelect(req,res,function(res,result){
                res.end(JSON.stringify(result));
            });
        }else{
            res.end("请登录！")
        }
    },
    productSelectById:function(productId,fun,res){
        console.log('pro find id',productId);
        Product.findOne({_id:productId},function(err,doc){
            if(err){
                console.log("product find error: ",err);
                 res.end("error");
                return;
            }else{
                if(doc){
                  var success = {status:true,data:doc};
                  fun(success);
                }  else{
                  var fail = {status:false,data:productId};
                  return fail;
                }
            }
        })
    },
    LikeArr:function(){
        this.length = 0;
        this.push = function(event,key,val){
            if(event[key]){
                return false;
            }
            event[key] = val ;
            event.length++;
        };
        this.pop = function(key){
            if(this[key]){
                if(delete this[key]){
                    this.length--;
                    return this;
                }
            }else{
                return true;
            }
            
        }
    },
    productArrSelect:function(req,res,fun){
        var result = [];
        for(var proId in req.session.product){
            if(proId == "length" || proId == "push" || proId == "pop"){
                continue;
            }
            module.exports.productSelectById(proId,function(data){
                if(data.status){
                     data.num = req.session.product[proId];
                     result.push({data:data.data,num:data.num});
                }else{
                    console.log("find selectProductById fail , id:",data.data);
                }
                if(result.length == req.session.product.length){
                    fun(res,result);
                }else{
                    console.log('result.length not equal req.session.product.length!');
                }
            });
        }
    },
    checkSession:function (req){
        if (req.session.name) {          //检查用户是否已经登录
             return true;
        } else {
             return false;
        }
    },
    productIofo:function(req,res,next){
        var productId = req.body.productId;
        try{
        module.exports.productSelectById(productId,function(data){
             if(data.status){
                   res.end(JSON.stringify(data));
                   return;
             }else{
                   res.end("信息有误！");
                   return;
             }
        },res)}
        catch(e){
            res.end("find by id error ")
        }
    },
    deleteBuyCar:function(req,res,next){
        console.log(req.session.product)
       req.session.product = 0;
       console.log('req.session.product',req.session.product);
       res.end('ok');
       return;
    }

}