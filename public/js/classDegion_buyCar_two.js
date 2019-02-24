(function(control){
    control =  control || (window.control = {});
    control.isLogin = false;
    control.timer = {};
    control.renderBuyCar =  function(data){
        var str = "";
        control.price = 0;
        data.forEach(function(item){
            str += '<li>\
            <div class="img"><a href="#"><img src="'+ item.data.imgSrc+'" width="58" height="58" /></a></div>\
            <div class="name"><a href="#">'+ item.data.product +'</a></div>\
            <div class="price"><font color="#ff4e00">￥'+item.data.price+'</font> X'+ item.num +'</div>\
                      </li>'
            control.price += item.data.price * item.num;
        })
        $(".cars").html(str);
        $(".price_sum span").text(control.price);
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
            data = JSON.parse(data);
            if(data.sign){
                var str ='亲爱的'+data.account+',欢迎您</a>&nbsp;|&nbsp;<a href="#">我的订单</a>&nbsp;|'
                $("#userInformation").html(str);
                $(".un_login").css("display","none");
                control.isLogin = true;
                control.renderBuyCar(data.product);
                renderProInfo(data.product);
                bindConfirmButton(data);
            }else{
                return;
            }
           }
           function fail(){
               logined();
                  console.log("fail");
           }
        }
    )
    function renderProInfo(data){
         var str = '';
        data.forEach(function(item,index){
            console.log(item);
            if(index/2 == 0){
                 str += '<tr>';
            }else{
                str += '<tr class="car_tr">';
            }
            str += '                <td>\
             <div class="c_s_img"><img src="'+ item.data.imgSrc +'" width="73" height="73" /></div>'+ item.data.product+'</td>\
                 <td align="center">颜色：灰色</td>\
                 <td align="center">'+item.num +'</td>\
                 <td align="center" style="color:#ff4e00;">￥'+ item.data.price +'</td>\
                  <td align="center">26R</td>\
          </tr>'
        })
        str += '              <tr>\
        <td colspan="5" align="right" style="font-family:"Microsoft YaHei";">\
            商品总价：￥'+ control.price +' ； 返还积分 56R  \
        </td>\
      </tr>'
       $(str).appendTo($('#buyCarTable'));
       $('#totalPay').text('￥'+ control.price);
       $('#totalPayOne').text('￥'+ control.price);
    }
    function bindConfirmButton(data){
        $("#confirmButton").on("click",function(){
            orderAjax(data);
        })
        function orderAjax(data){
            productData = data.product;
            accountData = data.account;
            var product = {};
            productData.forEach(function(item,index){
                  product[item.data._id] = item.num;
            })
            var reqData = {
                orderPrice:control.price,
                product:product,
                account:accountData
            }
            reqData = JSON.stringify(reqData);
            url = control.urlBase + "/order/create"
            $.ajax({
                type: "POST",
                url: url,
                data:reqData,
                contentType:'application/json',
                success:success,
                fail:fail
                });
                
                function success(data){
                  data = JSON.parse(data);
                  if(data.orderId){
                 //还要清空session
                 url = url = control.urlBase + "/product/delete"
                 $.ajax({
                    type: "POST",
                    url: url,
                    success:function(data){console.log("ok")},
                    fail:function(data){console.log("not ok")}
                    });
                 prama = encodeURIComponent("o="+data.orderId+"&p="+control.price);
                 window.location.href = control.urlBase + "/BuyCar_Three.html?"+prama;
                  }else{
                      alert("创建订单失败，请重试！");
                  }
 
                  
                }
               function fail(){
                console.log("fail")
               }
        }
        
        
    }

}(window.control))