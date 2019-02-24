var loginController = require("../controllers/user.server.controller.js");

module.exports = function(app){
    app.route("/user/login")        /*  //登陆 */
    .post(loginController.userLogin);

    app.route("/user/register")    /*      //注册 */
    .post(loginController.userRegister);

    app.route("/user/account")
     .get(loginController.accountFind); /*  //账号查重 */
/*     app.route("/login/:type")
    .post(loginController.userLogin) */
    app.route("/index")           /*   //首页 */
    .post(loginController.indexControl); 
}