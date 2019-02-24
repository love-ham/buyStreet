
(function(control){
    control =  control || (window.control = {});
    control.urlBase = window.location.origin;
    function productCreate(prama){
    var url = control.urlBase + "/product/create";
    var data = JSON.stringify(prama);
$.ajax({
    type: "POST",
    url: url,
    data:data,
    contentType:'application/json',
    success:success,
    fail:fail
});
function success(data){
     $("#proName").val("");
   $("#proImgSrc").val("");
    $("#proPrice").val("");
    $(".wraning").text("成功").fadeIn("600");
    setTimeout(function(){
        $(".wraning").fadeOut("600");  
       },2000);
}
function fail(){
    $(".wraning").text("失败").fadeIn("600");
    setTimeout(function(){
        $(".wraning").fadeOut("600");  
       },2000);
}
}
function bindEvent(){
    $("button").on("click",function(e){
           var prama = {};
           prama.product = $("#proName").val();
           prama.imgSrc = $("#proImgSrc").val();
           prama.price = $("#proPrice").val();
           productCreate(prama);
    })
}
bindEvent();
}(window.control))