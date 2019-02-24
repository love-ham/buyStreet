(function(control){
    $(getCookie);
     control =  control || (window.control = {});
     control.urlBase = window.location.origin;
     function login(data){
         var url = control.urlBase + "/user/login";
         data = data && JSON.stringify(data);
         $.ajax({
             type: "POST",
             url: url,
             data:data,
             contentType:'application/json',
             beforeSend:logining,
             success:success,
             fail:fail
         });
         function logining(){
             $(".log_btn").val("正在登录...").attr("disabled",true);
         }
         function logined(){
            $(".log_btn").val("登录").attr("disabled",false);
         }
         function success(data){
            //logined();
            var statu = JSON.parse(data).status;
            if(statu){
               window.location.href =control.urlBase + "/Index.html";
            }else{
               warring();
               logined();
            }

        }
        function fail(){
            logined();
               console.log("fail");
        }
     }
     
     $('.log_btn').on("click",function(e){
        if(!check()){
            return false;
        }
         var data = {
             account:$(".l_user").val(),
             password:$(".l_pwd").val()
         }
         if($("input[type = checkbox]").prop("checked")){
            setCookie(data.account,data.password);
         }
         login(data);
     })
     function check(){
         var account = $(".l_user").val();
         var pw = $(".l_pwd").val();
         if(!account){
            warring("账号不能为空！");
             return false;
         }else if(!pw){
            warring("密码不能为空！");
            return false
         }else{
             return true;
         }
     }
     function warring(str){
         str = str || "账号或者密码不正确，请重新输入!";
        $(".log_warring").text(str).fadeIn("600");
        setTimeout(function(){
         $(".log_warring").fadeOut("600");  
        },2000);
     }
     function setCookie(account,password){
         var date = new Date();
         date.setFullYear(date.getFullYear() + 1);
         console.log(date.toString())
         document.cookie = "account="+account+"; expires=" + date.toString() +"; path=/";
         document.cookie = "password="+password+"; expires=" + date.toString() +"; path=/";
     }
     function getCookie(){
         if(!document.cookie){
             return false;
         }
         var cookieArr = document.cookie.split("; ") ;
         var len = cookieArr.length;
         var cookie = {};
         for(var i = 0; i < len ; i++){
           if(cookieArr[i].split("=")[0] === "account"){
                cookie.account = cookieArr[i].split("=")[1];
                continue;
           }
           if(cookieArr[i].split("=")[0] === "password"){
            cookie.password= cookieArr[i].split("=")[1];
            continue;
           }
         }
         $(".l_user").val(cookie.account);
         $(".l_pwd").val(cookie.password);
     }
}(window.control))


