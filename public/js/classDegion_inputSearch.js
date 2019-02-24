(function(control){
    control =  control || (window.control = {});
    control.urlBase = window.location.origin;
    control.timer = {};
    bindEvent();
    function inputContent(input,callback){
        window.callback = renderInput;
        $.ajax({
            type:"GET",
            url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+input,
            dataType:"jsonp",
            jsonp:"cb",
            jsonpCallback: "callback",
            success:function(){
                console.log("success");
            },
            fail:function(){
                console.log("fail");
            }
        })
    }
    function bindEvent(){
        $(".s_ipt").on("input",function(){                 //输入框
            clearTimeout(control.timer.input);
            var input = $(".s_ipt").val();
            control.timer.input = setTimeout(function(){
                inputContent(input,renderInput);
            },500);
        }).blur(function(){
            setTimeout(function(){
                $(".inputContent").css("display","none");
            },200)               //blur 事件会阻断 click事件
        }).focus(function(){
            $(".inputContent").css("display","block");
        })

        $(".s_btn").on("click",function(){
            var product = $(".s_ipt").val();
            jumpTo(product);
        })

    }
    function renderInput(data){
        var content = data.s;
        var str = "";
        content.forEach(function(item,index){
            str += '<div class="contentModel">'+item+'</div>'
        })
        $(".inputContent").html(str).children().on("click",function(e){
            var product = $(e.target).text();
            $(".s_ipt").val(product);
            jumpTo(product);                                 //选中跳转
        });
    } 
    function jumpTo(product){
        url = control.urlBase + "/searchResult.html?product=" + product;
        window.location.href = url;
    }
}(window.control))