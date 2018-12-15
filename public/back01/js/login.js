$(function(){
    $('#form').bootstrapValidator({
        // 指定校验时的图标显示,默认是bootstrap风格
        feedbackIcons: {
            // 有效的
            valid: 'glyphicon glyphicon-ok',
            // 无效的
            invalid: 'glyphicon glyphicon-remove',
            // 校验中
            validating: 'glyphicon glyphicon-refresh'
        },
        // 校验字段
        fields:{
            // 用户名
            username:{
                // 校验规则
                validators:{
                    // 不能为空
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    // 位数2-6位
                    // 长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名长度必须在6到30之间'
                    },
                    callback:{
                        message:'用户名错误'
                    }
                }
            },
            // 密码
            password:{
                // 校验规则
                validators:{
                    // 不能为空
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    // 位数在6-12位
                    stringLength:{
                        min:6,
                        max:12,
                        message:'用户名长度必须在6到30之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        }
    })

    // 提交表单
    // 校验成功后执行
    $('#form').on('success.form.bv',function(e){
        // 阻止默认跳转
        e.preventDefault()
        $.ajax({
            url :'/employee/employeeLogin',
            data:$('#form').serialize(),
            dataType : 'json',
            type : 'post',
            success : function(res){
                if(res.error == 1000){
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if(res.error == 1001){
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
                if(res.success){
                    location.href = 'index.html'
                }
            }
        })
    })

    // 重置
    $('[type="reset"]').on('click',function(){
        $('#form').data('bootstrapValidator').resetForm()
    })
})