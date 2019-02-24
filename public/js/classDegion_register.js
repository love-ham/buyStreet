(function(control){
    control =  control || (window.control = {});
    control.timer = {};
    control.sign = {};
    control.urlBase = window.location.origin;
    rander();
    bindEvent();
    function login(data){
        var url = control.urlBase + "/user/register";
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
            $(".log_btn").val("注册中...").attr("disabled",true);
        }
        function logined(){
           $(".log_btn").val("立即注册").attr("disabled",false);
        }
        function success(data){
           logined();
           var rigister = JSON.parse(data).rigister;
           if(rigister){
              $(".log_warring").text("注册成功，请登录").fadeIn("600");
              setTimeout(function(){
               $(".log_warring").fadeOut("600");
               window.location.href = control.urlBase;  
              },2000);
           }else{
              $(".log_warring").text("注册失败，请重试").fadeIn("600");
              setTimeout(function(){
               $(".log_warring").fadeOut("600");  
              },2000);
           }

       }
       function fail(){
           logined();
              console.log("fail");
       }
    }
    
    function bindEvent(){
        $('.log_btn').on("click",function(e){
            var data = {
                account:$(".l_user").val(),
                password:$("#pw_first").val()
            }
            login(data);
        });
        inputEvent($(".l_user"),control.timer.account,accountCheck);  //用封装函数绑定事件     account
        inputEvent($("#pw_first"),control.timer.pw_first,pwCheck);      //密码绑定事件
        inputEvent($("#pw_second"),control.timer.pw_second,confirmCheck);      //确认密码绑定事件
        inputEvent($(".l_ipt"),control.timer.codeCheck,codeCheck);             //验证码
        $("input[type = checkbox]").on("change",function(e){            //协议
           control.sign.agreement = $(this).prop("checked");
           totalCheck();
        })
        $("#codeChange").on("click",function(){
             rander();
        })
    }
    function inputEvent(event,timer,fun,time){      //封装input事件函数
        time = time || 1500;
        event.on("input",function(e){             
            clearTimeout(timer);
            timer = setTimeout(function(){
                fun();
            },time);
        });
    }
    function rander(){
        codeGenerater(4);
        $(".identifyCode").text(control.code);
        $(".log_btn").addClass("btnDisabled").attr("disabled",true);
    }
    function codeGenerater(codeLength){
       var range = ["a","b","c","d","e","f","g","h","i","g","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y",
       "z","A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",1,2,3,4,5,6,7,8,9,0];
       var str = "";
       for(var i = 0 ; i < codeLength ; i++){
           str += range[Math.floor(Math.random()*62)];
       }
       control.code = str;
       return str;
    }
    function totalCheck(){
        var sign = control.sign;
        if(sign.account && sign.pw && sign.confirm && sign.checkCode && sign.agreement){
            $(".log_btn").removeClass("btnDisabled").attr("disabled",false);
            return true;
        }else{
            $(".log_btn").addClass("btnDisabled").attr("disabled",true);
            return false
        }
        
    }
    function accountCheck(){
        var account = $(".l_user").val();
        if(!account){
            control.sign.account = false;
            $(".account .judge").text("×").attr("class","judge wrong");
            $(".account .judgeContent").text("账号不能为空").css("color","red");
            return;
        }
        var url = control.urlBase + "/user/account" + "?account="+account;
        $.ajax({
            type: "GET",
            url: url,
            success:success,
            fail:fail
        });
        function success(data){
            var status = JSON.parse(data).account;
            control.sign.account = !status;
            totalCheck();
            if(!status){
                $(".account .judge").text("√").attr("class","judge right");
                $(".account .judgeContent").text("账号可用").css("color","rgb(17, 216, 17)");
            }else{
                $(".account .judge").text("×").attr("class","judge wrong");
                $(".account .judgeContent").text("账号已存在").css("color","red");
            }
        }
        function fail(){
            control.sign.account = false;
            console.log("请检查网络配置");
        }
    }
    function pwCheck(){
        var pw = $("#pw_first").val();
        var pw_second = $("#pw_second").val();
        control.sign.pw = !!pw;
        totalCheck();
        if(pw){
            $(".pw .judge").text("√").attr("class","judge right");
            $(".pw .judgeContent").text("密码可用").css("color","rgb(17, 216, 17)"); 
        }else{
            $(".pw .judge").text("×").attr("class","judge wrong");
            $(".pw .judgeContent").text("密码不能为空").css("color","red");
        }
        if(pw_second || ($(".pwConfirm .judge").hasClass("right") || $(".pwConfirm .judge").hasClass("wrong") ) ){
            confirmCheck();
        }
        
    }
    function confirmCheck(){
        var pw_first = $("#pw_first").val();
        var pw_second = $("#pw_second").val();
        control.sign.confirm = pw_first === pw_second;
        totalCheck();
        if(control.sign.confirm){
            $(".pwConfirm .judge").text("√").attr("class","judge right");
            $(".pwConfirm .judgeContent").text("密码可用").css("color","rgb(17, 216, 17)"); 
        }else{
            $(".pwConfirm .judge").text("×").attr("class","judge wrong");
            $(".pwConfirm .judgeContent").text("两次密码不一致").css("color","red");
        }
    }
    function codeCheck(){
        var code = $(".l_ipt").val();
        control.sign.checkCode = code.toLocaleLowerCase() === control.code.toLocaleLowerCase() ;
        totalCheck();
        if(control.sign.checkCode){
            $(".checkCode .judge").text("√").attr("class","judge right");
            $(".checkCode .judgeContent").text("验证码正确").css("color","rgb(17, 216, 17)"); 
        }else{
            $(".checkCode .judge").text("×").attr("class","judge wrong");
            $(".checkCode .judgeContent").text("验证码错误").css("color","red");
        }
    }
}(window.control))


