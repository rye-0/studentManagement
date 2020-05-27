var registerInfo = "<form class=\"layui-form\" id=\"register\">\n" +
    "        <div class=\"layui-form-item\">\n" +
    "            <label class=\"layui-form-label\">用户名</label>\n" +
    "            <div class=\"layui-input-block\">\n" +
    "                <input type=\"text\" name=\"userName\" placeholder=\"请输入同户名\" autocomplete=\"off\" class=\"layui-input\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"layui-form-item\">\n" +
    "            <label class=\"layui-form-label\">密码</label>\n" +
    "            <div class=\"layui-input-block\">\n" +
    "                <input type=\"password\" name=\"password\" placeholder=\"请输入密码\" autocomplete=\"off\" class=\"layui-input\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"layui-form-item\">\n" +
    "            <label class=\"layui-form-label\">确认密码</label>\n" +
    "            <div class=\"layui-input-block\">\n" +
    "                <input type=\"password\"  placeholder=\"请重新输入密码\" autocomplete=\"off\" class=\"layui-input\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"layui-form-item\">\n" +
    "            <label class=\"layui-form-label\">联系方式</label>\n" +
    "            <div class=\"layui-input-block\">\n" +
    "                <input type=\"text\" name=\"contactInfo\" placeholder=\"请重新输入手机号\" autocomplete=\"off\" class=\"layui-input\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>"

$(document).ready(function () {
    $(".submit").click(function () {
        var values = {};

        var params = $("#login").serializeArray();
        for (var i in params) {
            values[params[i].name] = params[i].value;
        }
        values.password = $.md5(values.password);
        // console.log(values);
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

    $(".register").click(function(){
        layer.open({
            title: '注册'
            , content: registerInfo
            ,btn:['注册']
            ,yes: function(){
                var values = {};

                var params = $("#register").serializeArray();
                for (var i in params) {
                    values[params[i].name] = params[i].value;
                }
                // console.log(values);
                $.ajax({
                    url :  '/users/register',
                    type: 'post',
                    dataType: 'json',
                    async: false,
                    data: JSON.stringify(values),
                    contentType: "application/json; charset=utf-8",
                    statusCode:{
                        200: function(data){
                            // console.log(data);
                            layer.open({
                                title: '信息'
                                , content: "成功注册！"
                            })
                        },
                        300: function(){
                            layer.open({
                                title: '提示'
                                , content: "用户已经存在！"
                            })
                        }

                    }
                })
            }
        });

    })
})