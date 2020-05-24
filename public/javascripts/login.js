$(document).ready(function () {
    $(".submit").click(function () {
        var values = {};

        var params = $("#login").serializeArray();
        for (var i in params) {
            values[params[i].name] = params[i].value;
        }
        values.password = $.md5(values.password);
        console.log(values);
        var reqUrl;
        if(values.type == 'customer'){
            reqUrl = '/users/customLogin';
        }else{
            reqUrl = '/users/adminLogin';
        }
        $.ajax({
            url :  reqUrl,
            type: 'post',
            dataType: 'json',
            async: false,
            data:JSON.stringify(values),
            contentType: "application/json; charset=utf-8",
            statusCode:{
                200: function(data){
                    layer.open({
                        title: '提示'
                        , content: "登录成功!"
                        , btn: []
                    });
                    // console.log(data.responseText);
                    setTimeout(function(){
                        window.location.href = data.responseText
                    },1000);
                },
                300: function(){
                    alert("用户名或密码错误");
                }
            }
        });
    })
})