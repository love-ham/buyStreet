
    function buyCarButton(event){
    control =  window.control || (window.control = {});
    bindEvent(event);
    console.log("wanl ")
    function bindEvent(event){
        event.on("click",function(e){
            e.preventDefault();
            console.log("isLogin",control.isLogin);
            if(control.isLogin){
               var productId =  $(e.target).attr("productId");
               console.log(productId)
               buyCarAjax(productId);
            }else{
                alert("请登录！");
            }
            e.stopPropagation();
        })
    }
    function buyCarAjax(productId){
        var url = control.urlBase + "/product/buyCar";
        var data = JSON.stringify({productId:productId});
        $.ajax({
            type: "POST",
            url: url,
            data:data,
            contentType:'application/json',
            success:success,
            fail:fail
        });
        function success(data){
            console.log(data)
            var data =  JSON.parse(data);
            control.renderBuyCar(data);
       }
       function fail(){
           logined();
              console.log("fail");
       }
    }
  
 }
