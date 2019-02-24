var OrderController= require("../controllers/order.server.controller");

module.exports = function(app){
    app.route("/order/create")        /*  创建订单 */
    .post(OrderController.createOrder);

    app.route("/order/find")        /*  订单查找 */
    .post(OrderController.orderFind);

}