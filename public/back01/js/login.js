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
                    }
                }
            }
        }

    })

    // 表单校验成功,会触发success.form.bv事件,此时会提交表单
    // 通常我们需要禁止表单的自动提交,使用ajax进行表单提交
    $('#form').on('success.form.bv',function(){
        console.log(11)
    })

    // 获取validator实例对象
    var validator = $('#form').data("bootstrapValidator")
    // 重置按钮
    $('.reset').on('click',function(){
        // 重置表单,并且会隐藏所有的错误提示和图标
        validator.resetForm()
    })
})