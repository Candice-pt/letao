$(function(){
    $('#loginBtn').on('click',function(){
        var username = $('#username').val().trim()
        var password = $('#password').val().trim()
        if(username === ''){
            mui.toast('用户名不能为空')
            return;
        }
        if(password === ''){
            mui.toast('密码不能为空')
            return;
        }
        $.ajax({
            url:'/user/login',
            dataType:'json',
            type:'post',
            data:{
                username:username,
                password:password
            },
            success:function(info){
                if(info.error == 403){
                    mui.toast('用户名或密码不正确')
                    return;
                }
                if(info.success){
                    // 如果地址栏后面有参数,跳转到指定地址
                    // 如果地址栏中没有参数跳转到user.html
                    // indexOf() 可以判断某个字符在字符串中第一次出现的位置(没有有就返回-1)和数组
                    if(location.search.indexOf('retUrl') != -1){
                        var url = getSearch('retUrl')
                        url = url.replace('?retUrl=','')
                        location.href = url
                    }else{
                        location.href = 'user.html'
                    }
                }
            }
        })
    })
})