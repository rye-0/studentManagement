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
    "                <input type=\"password\"  placeholder=\"请重新输入密码\" autocomplete=\"off\" class=\"layui-input verify\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"layui-form-item\">\n" +
    "            <label class=\"layui-form-label\">联系方式</label>\n" +
    "            <div class=\"layui-input-block\">\n" +
    "                <input type=\"text\" name=\"contactInfo\" placeholder=\"请重新输入手机号\" autocomplete=\"off\" class=\"layui-input\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </form>"

var basicInfoTemplate = function(index, Sno, Sname, Ssex, Sclass){
    var template = `<tr class = "row">
                    <td>${index}</td>
                    <td>${Sno}</td>
                    <td>${Sname}</td>
                    <td>${Ssex}</td>
                    <td>${Sclass}</td> 
                    <td>                        
                        <button type="button" class="layui-btn layui-btn-primary layui-btn-sm modify"><i class="layui-icon"></i></button>
                        <button type="button" class="layui-btn layui-btn-primary layui-btn-sm delete"><i class="layui-icon"></i></button>
                    </td>          
                </tr>`;
    return template;
}
var gradeInfoTemplate = function(index, Sno, Sname, Smath, Schinese, Senglish, Sphysics,Spolitics){
    var template = `<tr class = "row">
                    <td>${index}</td>      
                    <td>${Sno}</td>  
                    <td>${Sname}</td>                  
                    <td>${Smath}</td>
                    <td>${Schinese}</td>
                    <td>${Senglish}</td>
                    <td>${Sphysics}</td>     
                    <td>${Spolitics}</td>     
                    <td>
                        <button type="button" class="layui-btn layui-btn-primary layui-btn-sm modify"><i class="layui-icon"></i></button>
                        <button type="button" class="layui-btn layui-btn-primary layui-btn-sm delete"><i class="layui-icon"></i></button>
                    </td>           
                </tr>`;
    return template;
}

var customersInfoTemplate = function(index, Uno, Ucontact){
    var template = `<tr class = "row">
                    <td>${index}</td>      
                    <td>${Uno}</td>  
                    <td>${Ucontact}</td>                  
                    <td>
                        <button type="button" class="layui-btn layui-btn-primary layui-btn-sm delete"><i class="layui-icon"></i></button>
                    </td>           
                </tr>`;
    return template;
}

var bindDelete = function (callback){
    $(".delete").click(function(){//删除学生信息
        if(confirm("确定删除该条信息？")) {
            var resData = {};
            var res = $(this).parent().parent().children()[1].innerHTML;
            resData.message = res;
            console.log(resData);
            $.ajax({
                url: '/admin/deleteInfo',
                type: 'post',
                dataType: 'json',
                async: false,
                data: JSON.stringify(resData),
                contentType: "application/json; charset=utf-8",
                statusCode: {
                    200: function (data) {
                        console.log(data);
                        layer.open({
                            title: '提示'
                            , content: "删除成功！"
                        });
                        callback();
                    },
                    300: function () {
                        layer.open({
                            title: '提示'
                            , content: "删除错误，请重试！"
                        });
                    }

                }
            })
        }
    })
}
var bindCustomDelete = function (callback){
    $(".delete").click(function(){//删除客户信息
        if(confirm("确定删除该账号？")) {
            var resData = {};
            var res = $(this).parent().parent().children()[1].innerHTML;
            resData.message = res;
            console.log(resData);
            $.ajax({
                url: '/admin/deleteCustomInfo',
                type: 'post',
                dataType: 'json',
                async: false,
                data: JSON.stringify(resData),
                contentType: "application/json; charset=utf-8",
                statusCode: {
                    200: function (data) {
                        console.log(data);
                        layer.open({
                            title: '提示'
                            , content: "删除成功！"
                        });
                        callback();
                    },
                    300: function () {
                        layer.open({
                            title: '提示'
                            , content: "删除错误，请重试！"
                        });
                    }

                }
            })
        }
    })
}

var bindModify = function (callback) {
    $(".modify").click(function () {
        var lables = [];
        $(".cols").children('th').each(function (j) {
                lables[j] = $(this).text();
        });
        lables.splice(lables.length-1,1);
        lables.splice(0,1);
        var inputs = [];
        $(this).parent().parent().children('td').each(function (j) {
            inputs[j] = $(this).text();
        });
        inputs.splice(inputs.length-1,1);
        inputs.splice(0,1);
        var modifyInfo = "<form  id = 'modifyInfo'>";
        for(var i = 0; i < lables.length; i ++){
            modifyInfo += "<div >" +
                "<label >"+lables[i]+"</lable>" +
                "<input  type='text' autocomplete='off' class='layui-input' name='"+lables[i] +"'placeholder='"+ inputs[i]+"' value='"+ inputs[i] +"'>" +
                "</div>"
        }
        modifyInfo += "</form>";
        layer.open({
            title: '修改信息'
            , content: modifyInfo
            ,btn:['修改']
            ,yes: function(){
                var values = {};

                var params = $("#modifyInfo").serializeArray();
                for (var i in params) {
                    values[params[i].name] = params[i].value;
                }
                console.log(values);
                $.ajax({
                    url :  '/admin/modifyInfo',
                    type: 'post',
                    dataType: 'json',
                    async: false,
                    data: JSON.stringify(values),
                    contentType: "application/json; charset=utf-8",
                    statusCode:{
                        200: function(data){
                            // console.log(data);
                            layer.open({
                                    title: '修改信息'
                                    , content: "修改成功！"
                            })
                            callback()
                        },
                        300: function(){
                            layer.open({
                                title: '提示'
                                , content: "出错啦，请仔细核查信息！"
                            })
                        }

                    }
                })
            }
        });
    })
}

var getBasicInfo = function () {
    initialize();
    $.ajax({
        url :  '/manage/getBasicInfo',
        type: 'get',
        dataType: 'json',
        async: false,
        statusCode:{
            200: function(data){
                // console.log(data);
                $(".listCols").empty();
                $(".listCols").append("<tr class='cols'><th>序号</th></tr>")
                data.cols.forEach(function(val,index){
                    var colName = "<th>"+val.COLUMN_NAME+"</th>";
                    $(".cols").append(colName);
                });
                $(".cols").append("<th>操作</th>");
                $(".listRows").empty();
                data.rows.forEach(function(val,index){
                    $(".listRows").append(basicInfoTemplate(index+1, val.Sno, val.Sname, val.Ssex, val.Sclass));
                })
                bindModify(getBasicInfo);
                bindDelete(getBasicInfo);
            }
        }
    })
}

var getGradeInfo = function (){
    initialize();
    $.ajax({
        url :  '/manage/getGradeInfo',
        type: 'get',
        dataType: 'json',
        async: false,
        statusCode:{
            200: function(data){
                // console.log(data);
                $(".listCols").empty();
                $(".listCols").append("<tr class='cols'><th>序号</th></tr>")
                data.cols.forEach(function(val,index){
                    var colName = "<th>"+val.COLUMN_NAME+"</th>";
                    $(".cols").append(colName);
                });
                $(".cols").append("<th>操作</th>");
                $(".listRows").empty();
                data.rows.forEach(function(val,index){
                    $(".listRows").append(gradeInfoTemplate(index+1, val.Sno, val.Sname, val.Smath, val.Schinese, val.Senglish, val.Sphysics,val.Spolitics));
                })
                bindDelete(getGradeInfo);
                bindModify(getGradeInfo);
            },

        }
    })
}
var getCustomInfo = function(){
    initialize();
    $.ajax({
        url :  '/admin/customersInfo',
        type: 'get',
        dataType: 'json',
        async: false,
        contentType: "application/json; charset=utf-8",
        statusCode:{
            200: function(data){
                // console.log(data);
                $(".listCols").empty();
                $(".listCols").append("<tr class='cols'><th>序号</th></tr>")
                data.cols.forEach(function(val,index){
                    var colName = "<th>"+val.COLUMN_NAME+"</th>";
                    $(".cols").append(colName);
                });
                $(".cols").append("<th>操作</th>");
                $(".listRows").empty();
                data.rows.forEach(function(val,index){
                    $(".listRows").append(customersInfoTemplate(index+1, val.Uno, val.Ucontact));
                })
                bindCustomDelete(getCustomInfo);
            },
        }
    })
}

$(document).ready(function () {
    initialize();
//学生管理
    $(".addStudent").click(function(){//新增学生
        initialize();
        $(".addInfo").show();
        $(".addSubmit").unbind("click").click(function(){
            var values = {};

            var params = $("#addInfo").serializeArray();
            for (var i in params) {
                values[params[i].name] = params[i].value;
            }
            $.ajax({
                url :  '/admin/addInfo',
                type: 'post',
                dataType: 'json',
                async: false,
                data: JSON.stringify(values),
                contentType: "application/json; charset=utf-8",
                statusCode:{
                    200: function(data){
                        // console.log(data);
                        layer.open({
                            title: '提示'
                            , content: "添加成功！"
                        });
                    },
                    300: function(){
                        layer.open({
                            title: '提示'
                            , content: "出错啦，请仔细核查信息！"
                        });
                    }

                }
            })
        })
    })

    $(".searchInfo").click(function(){//模糊查找+修删
        initialize()
        $(".search").show();
        $(".searchSubmit").click(function(){
            initialize();
            $.ajax({
                url :  '/manage/searchInfo',
                type: 'post',
                dataType: 'json',
                async: false,
                data: {key:$("#search input").val()},
                statusCode:{
                    200: function(data){
                        console.log(data);
                        $(".listCols").append("<tr class='cols'><th>序号</th></tr>")
                        data.cols.forEach(function(val,index){
                            var colName = "<th>"+val.COLUMN_NAME+"</th>";
                            $(".cols").append(colName);
                        });
                        $(".cols").append("<th>操作</th>");
                        data.rows.forEach(function(val,index){
                            $(".listRows").append(gradeInfoTemplate(index+1, val.Sno, val.Sname, val.Smath, val.Schinese, val.Senglish, val.Sphysics,val.Spolitics));
                        })
                        $(".search").hide();
                        bindDelete(getGradeInfo);
                        bindModify(getGradeInfo);
                    },
                    300: function(){
                        layer.open({
                            title: '提示'
                            , content: "查不到！"
                        });
                    }

                }
            })
        })
    })
    //获取学生基本信息
    $(".basicInfo").click(getBasicInfo);
    //获取学生成绩
    $(".gradeInfo").click(getGradeInfo);

// 客户管理
    $(".customersInfo").click(getCustomInfo)
    $(".addCustomer").click(function(){
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
                if($(".verify").val() === values.password){
                    values.password = $.md5(values.password);
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
                                getCustomInfo();
                            },
                            300: function(){
                                layer.open({
                                    title: '提示'
                                    , content: "用户已经存在！"
                                })
                            }

                        }
                    })
                }else{
                    layer.open({
                        title: '提示'
                        , content: "两次输入的密码不一致！"
                    })
                }
            }
        });
    })

})