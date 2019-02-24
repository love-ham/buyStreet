var ProductController = require("../controllers/product.server.controller.js");

module.exports = function(app){
    app.route("/product/create")         //创建商品信息
    .post(ProductController.createProduct);

    app.route("/product/select")         //查找商品信息
    .post(ProductController.productSelect);
    console.log("before route")

    app.route("/product/buyCar")         //加入购物车
    .post(ProductController.addBuyCar);
    
    app.route("/product/info")         //加入购物车
    .post(ProductController.productIofo);

    app.route("/product/delete")         //加入购物车
    .post(ProductController.deleteBuyCar);

}