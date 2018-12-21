// 当当前页面的最后一个ajax请求返回回来
$(function () {
    // 1.表单进行校验
    $('#form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    // 长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度必须是2-6位'
                    },
                    callback:{
                        message:'用户名错误'
                    }

                }
            },
            password: {
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    // 长度校验
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码长度必须是6-12位'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    })
    // 2.重置表单内容及校验样式
    $('[type="reset"]').on('click',function(){
        $('#form').data('bootstrapValidator').resetForm()
    })

    // 3.提交表单(submit)会进行表单校验,如果错误会直接禁止
    // 如果校验成功submit按钮会跳转
    $('#form').on('success.form.bv',function(e){
        // 校验成功会触发
        e.preventDefault()
        // 发送ajax请求请求数据
        var username = $('[name="username"]').val()
        var password = $('[name="password"]').val()
        $.ajax({
            url:'/employee/employeeLogin',
            dataType:'json',
            type:'post',
            data:{
                username:username,
                password:password
            },
            success:function(info){
                if(info.error == 1000){
                    // 用户名错误,修改校验状态
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if(info.error == 1001){
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
                if(info.success){
                    location.href = 'index.html'
                }
            }
        })
    })
})