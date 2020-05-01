$(document).ready(function () {
    $(".submit").click(function () {
        var values = {};

        var params = $("#login").serializeArray();
        for (var i in params) {
            values[params[i].name] = params[i].value;
        }
        $.ajax({
            url :  '/users/login',
            type: 'post',
            dataType: 'json',
            async: false,
            data:JSON.stringify(values),
            contentType: "application/json; charset=utf-8",
            succcess: function(data){
                console.log(data);
            },
            statusCode:{
                200: function(data){
                    alert("成功！！！");
                    console.log(data.responseText);
                    setTimeout(function(){
                        window.location.href = data.responseText
                    },3000);
                },
                300: function(){
                    alert("用户名或密码错误");
                }
            }
        });
    })
})