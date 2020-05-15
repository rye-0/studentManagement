var basicInfoTemplate = function(index, Sno, Sname, Ssex, Sclass){
    var template = `<tr class = "row">
                    <td>${index}</td>
                    <td>${Sno}</td>
                    <td>${Sname}</td>
                    <td>${Ssex}</td>
                    <td>${Sclass}</td>           
                </tr>`;
    return template;
}
var gradeInfoTemplate = function(index, Sno, Sname, Smath, Schinese, Senglish, Sphysics,Spolitics){
    var template = `<tr class = "row">
                    <td>${index}</td>
                    <td>${Sname}</td>
                    <td>${Sno}</td>                    
                    <td>${Smath}</td>
                    <td>${Schinese}</td>
                    <td>${Senglish}</td>
                    <td>${Sphysics}</td>     
                    <td>${Spolitics}</td>                
                </tr>`;
    return template;
}

$(document).ready(function () {

    $(".logout").click(function(){//退出登录
        if(confirm("确定退出")){
            $.ajax({
                url :  '/users/logout',
                type: 'get',
                dataType: 'json',
                async: false,
                statusCode:{
                    200: function(data){
                        alert("成功！！！");
                        console.log(data.responseText);
                        setTimeout(function(){
                            window.location.href = data.responseText
                        },3000);
                    },
                }
            })
        }
    })
    $(".basicInfo").click(function(){//获取学生基本信息
        $.ajax({
            url :  '/users/getBasicInfo',
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
                    $(".listRows").empty();
                    data.rows.forEach(function(val,index){
                        $(".listRows").append(basicInfoTemplate(index+1, val.Sno, val.Sname, val.Ssex, val.Sclass));
                    })
                },

            }
        })
    })
    $(".gradeInfo").click(function(){//获取学生成绩
        $.ajax({
            url :  '/users/getGradeInfo',
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
                    $(".listRows").empty();
                    data.rows.forEach(function(val,index){
                        $(".listRows").append(gradeInfoTemplate(index+1, val.Sno, val.Sname, val.Smath, val.Schinese, val.Senglish, val.Sphysics,val.Spolitics));
                    })
                },

            }
        })
    })
    $(".search").hide();
    $(".searchInfo").click(function(){
        $(".listCols").empty();
        $(".listRows").empty();
        $(".search").show();
        $(".submit").click(function(){
            $.ajax({
                url :  '/users/searchInfo',
                type: 'post',
                dataType: 'json',
                async: false,
                data: {key:$("#search input").val()},
                statusCode:{
                    200: function(data){
                        // console.log(data);
                        $(".listCols").append("<tr class='cols'><th>序号</th></tr>")
                        data.cols.forEach(function(val,index){
                            var colName = "<th>"+val.COLUMN_NAME+"</th>";
                            $(".cols").append(colName);
                        });
                        data.rows.forEach(function(val,index){
                            $(".listRows").append(gradeInfoTemplate(index+1, val.Sno, val.Sname, val.Smath, val.Schinese, val.Senglish, val.Sphysics,val.Spolitics));
                        })
                        $(".search").hide();
                    },
                    300: function(){
                        alert("查不到！");
                    }

                }
            })
        })
    })

})