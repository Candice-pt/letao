$(function(){
    $.ajax({
        url:'/user/queryUserMessage',
        dataType:'json',
        success:function(info){
            console.log(info)
            if(info.error == 400){
                location.href = 'login.html?retUrl='+location.href
            }
        }
    })
})