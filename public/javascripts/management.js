var basicInfoTemplate = function(index, Sno, Sname, Ssex, Sclass, Smath, Schinese, Senglish, Sphysics,Spolitics){
    var template = `<tr class = "row">
                    <td>${index}</td>
                    <td>${Sno}</td>
                    <td>${Sname}</td>
                    <td>${Ssex}</td>
                    <td>${Sclass}</td>
                    <td>${Smath}</td>
                    <td>${Schinese}</td>
                    <td>${Senglish}</td>
                    <td>${Sphysics}</td>
                    <td>${Spolitics}</td>
                </tr>`;
    return template;
}
$(document).ready(function () {
    $(".logout").click(function(){
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
    $(".basicInfo").click(function(){
        $.ajax({
            url :  '/users/getBasicInfo',
            type: 'get',
            dataType: 'json',
            async: false,
            statusCode:{
                200: function(data){
                    data.message.forEach(function(val,index){
                        $(".list").append(basicInfoTemplate(index+1, val.Sno, val.Sname, val.Ssex, val.Sclass, val.Smath, val.Schinese, val.Senglish, val.Sphysics,val.Spolitics))

                    })
                },
            }
        })
    })
})