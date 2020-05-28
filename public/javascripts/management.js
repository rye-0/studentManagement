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
                    <td>${Sno}</td>  
                    <td>${Sname}</td>                  
                    <td>${Smath}</td>
                    <td>${Schinese}</td>
                    <td>${Senglish}</td>
                    <td>${Sphysics}</td>     
                    <td>${Spolitics}</td>                
                </tr>`;
    return template;
}

function initialize(){
    $(".addInfo").hide();
    $(".statistical").hide();
    $(".statisticalStudent").hide();
    $("#classGraph").hide();
    $("#graph").hide();
    $("#barGraph").hide();
    $("#pieChart").hide();
    $(".listCols").empty();
    $(".listRows").empty();
    $(".search").hide();
}

$(document).ready(function () {
    initialize()
    $(".logout").click(function(){//退出登录
        layer.open({
            title: '提示'
            , content: "确定要退出？"
            ,btn:['确定','取消']
            ,yes:function(){
                $.ajax({
                    url :  '/users/logout',
                    type: 'get',
                    dataType: 'json',
                    async: false,
                    statusCode:{
                        200: function(data){
                            layer.open({
                                title: '提示'
                                , content: "成功退出！"
                                ,btn:[]
                            });
                            setTimeout(function(){
                                window.location.href = data.responseText
                            },1000);
                        },
                    }
                })
            }
        });
    })
    $(".basicInfo").click(function(){//获取学生基本信息
        initialize();
        $.ajax({
            url :  '/manage/getBasicInfo',
            type: 'get',
            dataType: 'json',
            async: false,
            statusCode:{
                200: function(data){
                    console.log(data);
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
        initialize();
        $.ajax({
            url :  '/manage/getGradeInfo',
            type: 'get',
            dataType: 'json',
            async: false,
            statusCode:{
                200: function(data){
                    console.log(data);
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
    $(".searchInfo").click(function(){//模糊查找
        initialize()
        $(".search").show();
        $(".searchSubmit").unbind("click").click(function(){
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
                        data.rows.forEach(function(val,index){
                            $(".listRows").append(gradeInfoTemplate(index+1, val.Sno, val.Sname, val.Smath, val.Schinese, val.Senglish, val.Sphysics,val.Spolitics));
                        })
                        $(".search").hide();
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
    $(".statisticalScore").click(function(){//成绩统计
        initialize();
        $("#graph").show();
        $("#barGraph").show();
        $(".statistical").show();
        $(".statistSubmit").unbind("click").click(function(){
            var values = {};
            var params = $("#statistical").serializeArray();
            for (var i in params) {
                values[params[i].name] = params[i].value;
            }
            // console.log(values);
            $.ajax({
                url :  '/manage/statisticalScore',
                type: 'post',
                dataType: 'json',
                async: false,
                data: JSON.stringify(values),
                contentType: "application/json; charset=utf-8",
                statusCode:{
                    200: function(res){
                        console.log(res);
                        var myChart1 = echarts.init(document.getElementById('graph'));
                        var myChart2 = echarts.init(document.getElementById('barGraph'));
                        var graph = {
                            title: {
                                text: '成绩分析',
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            legend: {

                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'value',
                                boundaryGap: [0, 0.01]
                            },
                            yAxis: {
                                type: 'category',
                                data: [ '最低分', '平均分', '最高分', '通过人数']
                            },
                            series: [
                                {
                                    type: 'bar',
                                    data: [res.min, res.average, res.max, res.passNumber]
                                },
                                {
                                    type: 'bar',
                                    data: [,,,300]
                                }
                            ]
                        };
                        var barGraph = {
                            color: ['#3398DB'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: [ '优秀', '良好', '中等', '不及格'],
                                    axisTick: {
                                        alignWithLabel: true
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    type: 'value'
                                }
                            ],
                            series: [
                                {
                                    type: 'bar',
                                    barWidth: '60%',
                                    data: [res.score_exce,res.score_fine,res.score_medi,res.score_fail]
                                }
                            ]
                        };
                        myChart1.setOption(graph);
                        myChart2.setOption(barGraph);
                    }
                }
            })
        })
    })
    $(".statisticalStu").click(function(){
        initialize();
        $("#classGraph").show();
        $("#pieChart").show();
        $(".statisticalStudent").show();
        $.ajax({
            url :  '/manage/statisticalStu',
            type: 'get',
            dataType: 'json',
            async: false,
            statusCode:{
                200: function(data){
                    console.log(data);
                    var num = [];
                    var classes = [];
                    for(var i =0; i < data.classes.length; i++){
                        num[i]= data.classes[i].num;
                        classes[i] = data.classes[i].Sclass;
                    }
                    console.log(classes);
                    var myChart3 = echarts.init(document.getElementById('pieChart'));
                    var myChart4 = echarts.init(document.getElementById('classGraph'));
                    var pieChart = {
                        title: {
                            text: '学生统计',
                            subtext: '',
                            left: 'center'
                        },
                        tooltip: {
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['男生', '女生']
                        },
                        series: [
                            {
                                name: '人数',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: [
                                    {value: data.sum - data.man, name: '女生'},
                                    {value: data.man, name: '男生'},
                                ],
                                emphasis: {
                                    itemStyle: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    var classChart = {
                        color: ['#3398DB'],
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'line'
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: classes,
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                type: 'bar',
                                barWidth: '60%',
                                data: num
                            }
                        ]
                    };
                    myChart3.setOption(pieChart);
                    myChart4.setOption(classChart);
                },
            }
        })
    })
})