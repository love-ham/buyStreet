(function(control){
    control =  control || (window.control = {});
    control.search = window.location.search;
    productSelect(searchHandle(control.search));
    function productSelect(product){
        if(!product){
            alert("输入有误");
            return;
        }
        var url = control.urlBase + "/product/info";
        var data = JSON.stringify({
        productId:product
      });
         $.ajax({
        type: "POST",
        url: url,
        data:data,
        contentType:'application/json',
        success:success,
        fail:fail
        });
        function success(data){
        data = JSON.parse(data);
        if(data.status){
            data = data.data;
            var str = '<a href="'+ data.imgSrc+'" title="Images" class="MagicZoom" id="MagicZoom">\
                      <img src="'+ data.imgSrc+'" width="390" height="390" /></a>';
            $("#tsImgS").html(str); //图片渲染
            
            str = '<p>'+data.product+'</p>'  //名字渲染
            $(".des_name").html(str);

            str = '￥' + data.price;        //价格
            $(".des_price b").text(str);

            $("#buyCatButton").attr("productId",data._id); //购物车按钮

            buyCarButton($("#buyCatButton"));    //绑定加入购物车，及加入后购物车渲染
        }else{
            alert("非法访问，请返回上一级！");
        }
        }
       function fail(){
        console.log("fail")
       }
    }
    function searchHandle(search){
        if(search){
            search = search.split("=")[1];
            if(search){
                return search;
            }else{
                alert("输入有误");
                return false;
            }

        }else{
            alert("网络请求错误")
            return false;
        }
    }
}(window.control))