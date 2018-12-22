$(function(){
    $.ajax({
        url:'/user/queryUserMessage',
        dataType:'json',
        success:function(info){
            console.log(info)
            if(info.error == 400){
                location.href = 'login.html?retUrl='+location.href
                return;
            }else{
                console.log(11)
                var htmlStr = template('userTpl',info)
                $('#userInfo').html(htmlStr)
            }
        }
    })

    // 点击退出按钮
    $('#logout').on('click',function(){
        $.ajax({
            url:'/user/logout',
            dataType:'json',
            success:function(info){
                if(info.success){
                    location.href = 'login.html'
                }
            }
        })
    })
})