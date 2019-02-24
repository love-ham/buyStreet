
(function(control){
    control =  control || (window.control = {});
    control.search = window.location.search;
    productSelect(searchHandle(control.search));
    function productSelect(product){
        if(!product){
            alert("输入有误");
            return;
        }
        console.log(product);
        var url = control.urlBase + "/product/select";
        var data = JSON.stringify({
        product:product
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
            var str = "";
            data.forEach(function(item,index){
                console.log(item._id)
            str += '<li>\
            <div class="img"><a href="#"><img src="'+ item.imgSrc+'" width="210" height="185" /></a></div>\
            <div class="price">\
                <font>￥<span>'+ item.price+'</span></font> &nbsp; 26R\
            </div>\
            <div class="name"><a href="#">'+ item.product +'</a></div>\
            <div class="carbg">\
                <a href="#" class="ss">收藏</a>\
                <a href="#" class="j_car" productId='+item._id +'>加入购物车</a>\
            </div>\
            </li>'
            })
            $(".cate_list").html(str);
            console.log($(".j_car"));
            buyCarButton($(".j_car"));    //绑定加入购物车，及加入后购物车渲染
            bindProInfoEvent();
        }else{
            $(".cate_list .resultNone").css("display","inline-block");
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
    function bindProInfoEvent(){
        $(".cate_list li").on("click",function(e){
            e.preventDefault();
              var productId = $(".j_car",e.currentTarget).attr("productId");
              window.location.href = control.urlBase + "/Product.html?productId="+productId; 
        })
    }

}(window.control))