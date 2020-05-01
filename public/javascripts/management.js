$(document).ready(function () {
    $(".logout").click(function(){
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

    })
})