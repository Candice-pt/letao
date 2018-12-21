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
                console.log(info)
                if(info.error == 403){
                    mui.toast('用户名或密码不正确')
                    return;
                }
                if(info.success){
                    // 如果地址栏后面有参数,跳转到指定地址
                    // 如果地址栏中没有参数跳转到user.html
                    // indexOf() 可以判断字符串(有就返回1)和数组
                    if(location.search.indexOf('retUrl')){
                        var url = getSearch('retUrl')
                        url = url.replace('?retUrl=','')
                        // console.log(url)
                        location.href = url
                    }else{
                        location.href = 'user.html'
                    }
                }
            }
        })
    })
})