(function(control){
    control =  control || (window.control = {});

    $(function(){
            var url = control.urlBase + "/order/find";
            $.ajax({
                type: "POST",
                url: url,
                success:success,
                fail:fail
            });
            function success(data){
                data = JSON.parse(data);
                var str ='';
                data.forEach(function(item,index){
                        var date = item.date.slice(0,-5);
                        var date = date.split("T");
                         str +=  '<tr><td><font color="#ff4e00">'+item.orderId +'</font></td>\
                         <td>'+ date[0]+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+date[1]+'</td>\
                         <td>￥'+ item.price+'</td>\
                         <td>未确认，未付款，未发货</td>\
                         <td>取消订单</td>\
                       </tr>'
                })
                $(str).appendTo($("#orderList"));
           }
           function fail(data){
               //logined();
                  console.log("fail");
           }
        }
    )

}(window.control))