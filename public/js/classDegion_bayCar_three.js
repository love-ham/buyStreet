(function(control){
    control =  control || (window.control = {});
    var prama =searchContent(decodeURIComponent(window.location.search));
    $("#orderId").text(prama[0]);
    $("#price").text(prama[1]);
    function searchContent(prama){
        if(prama.length && prama.length > 10){
            prama = prama.slice(1);
            var result = prama.split("&");
            result[0] = result[0].split("=")[1];
            result[1] = result[1].split("=")[1];
            return result;
        }else{
            alert("请求有误！");
            return 0 ;
        }

    }

}(window.control))