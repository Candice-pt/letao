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
                    // 添加validatorname判断用户名是否正确
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
                        message:'用户名长度必须在6到12之间'
                    },
                    callback:{
                        message:'密码错误'
                    },
                }
            }
        }

    })

    // 表单校验插件有一个特点,在提交表单时会进行校验
    // 表单校验成功,会触发success.form.bv事件,此时需要提交表单
    // 通常我们需要禁止表单的自动提交,使用ajax进行表单提交
    // 如果校验失败,默认会自动阻止
    $('#form').on('success.form.bv',function(e){
        // console.log(11)
        e.preventDefault()
        // 接下来通过ajax提交数据
        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data:$('#form').serialize(),
            datatype: 'json',
            success:function(res){
                console.log(res)
                if(res.error == 1000){
                    // 更改字段(用户名)的状态
                    $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback')
                }
                if(res.error == 1001){
                    $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback')
                }
                if(res.success == true){
                    // location.assign('index.html')
                    location.href = 'index.html'
                }
            }
        })
    })

    // 重置按钮
    $('.reset').on('click',function(){
        // 获取validator实例对象
        var validator = $('#form').data("bootstrapValidator")
        // 重置表单,并且会隐藏所有的错误提示和图标
        validator.resetForm()
    })
})