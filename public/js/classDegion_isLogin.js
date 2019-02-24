
(function(control){
    control =  control || (window.control = {});
    control.isLogin = false;
    control.timer = {};
    control.renderBuyCar =  function(data){
        var str = "";
        var price = 0;
        data.forEach(function(item){
            str += '<li>\
            <div class="img"><a href="#"><img src="'+ item.data.imgSrc+'" width="58" height="58" /></a></div>\
            <div class="name"><a href="#">'+ item.data.product +'</a></div>\
            <div class="price"><font color="#ff4e00">￥'+item.data.price+'</font> X'+ item.num +'</div>\
                      </li>'
            price += item.data.price * item.num;
        })
        $(".cars").html(str);
        $(".price_sum span").text(price);
        $('.car_t span').text(data.length);
    }

    $(function(){
            var url = control.urlBase + "/index";
            $.ajax({
                type: "POST",
                url: url,
                success:success,
                fail:fail
            });
            function success(data){
                console.log('123')
            data = JSON.parse(data);
            console.log("login return")
            if(data.sign){
                window.control.buyCarData = data.product;
                var str ='亲爱的'+data.account+',欢迎您</a>&nbsp;|&nbsp;<a href="http://jiajieshi.club/Member_Order.html">我的订单</a>&nbsp;|'
                $("#userInformation").html(str);
                $(".un_login").css("display","none");
                control.isLogin = true;
                control.renderBuyCar(data.product);
            }else{
                return;
            }
           }
           function fail(data){
               //logined();
                  console.log("fail");
           }
        }
    )

}(window.control))
