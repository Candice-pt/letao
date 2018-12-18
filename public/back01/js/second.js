$(function () {
    // 动态渲染
    var currentPage = 1
    var pageSize = 5
    render()
    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info)
                var htmlStr = template('second', info)
                $('tbody').html(htmlStr)
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page,
                            render()
                    }
                })
            }
        })
    }

    // 添加分类
    $('.secondBtn').on('click', function () {
        $('#secondModal').modal('show')
        // 动态渲染一级分类
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                console.log(info)
                var htmlStr = template('one', info)
                $('.dropdown-menu').html(htmlStr)
            }
        })
    })

    $('.dropdown-menu').on('click', 'a', function () {
        $('.choice').text($(this).text())
        // 设置隐藏域的值
        $('.category').val($(this).data('id'))
    })
    // 文件初始化
    $('#fileupload').fileupload({
        dataType: 'json',
        // e : 事件对象
        // data:图片上传后的对象,通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data)
            // 图片地址
            var imgAddr = data.result.picAddr
            console.log(imgAddr)
            $('#formImg').attr('src', imgAddr)

            // 设置隐藏域的值存文件的路径
            $('.secondImg').val(imgAddr)

            // 改变图片隐藏域的状态
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    })

    // 校验表单
    $('form').bootstrapValidator({
        // 指定不校验类型
        excluded: [],
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请选择图片'
                    }
                }
            }
        }
    })
    // 校验成功,发送ajax请求
    $('#form').on('success.form.bv',function(e){
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            url : '/category/addSecondCategory',
            dataType:'json',
            type:'post',
            data:$('#form').serialize(),
            success:function( info ){
                console.log(info)
                if(info.success){
                    // 关闭模态框
                    $('#secondModal').modal('hide')
                    render()
                    // 清空表单
                    $('#form').data('bootstrapValidator').resetForm(true)
                    // 清空一级分类
                    $('.choice').text('请输入一级分类')
                    // 清空图片
                    $('#formImg').attr('src','images/default.png')
                }
            }
        })
    })
})