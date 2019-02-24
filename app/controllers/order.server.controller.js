var mongoose = require("mongoose");
var Order = mongoose.model("Order");

module.exports = {
    createOrder:function(req,res,next){
         var product = req.body.product;
         console.log(product);
         var orderPrice = req.body.orderPrice;
         var account = req.body.account;
         var order = new Order({
            orderPrice:orderPrice,
            product:product,
            account:account,
            time:new Date()
         })
         order.save(function(err){
              if(err){
                  console.log("order save error : ",err);
                  res.end('订单有误');
                  return;
              }else{
                  res.end(JSON.stringify({orderId:order._id}));
                  return;
              }
         })
    },
    orderFind:function(req,res,next){
        var account = req.session.name;
        Order.find({account:account},function(err,docs){
            if(err){
                console.log("order find error : " ,err);
                return;
            }else{
                var result = [];
                if(docs){
                    docs.forEach(function(item,index){
                        result[index] = {};
                          result[index].orderId = item._id;
                          result[index].date = item.time;
                          result[index].price = item.orderPrice;
                    })
                }
                res.end(JSON.stringify(result));
            }
        })
    }
}