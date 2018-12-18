$(function () {
    // 动态渲染
    var currentPage = 1
    var pageSize = 3
    render()
    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info)
                var htmlStr = template('protmp', info)
                $('tbody').html(htmlStr)
                // 分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page
                        render()
                    }
                })
            }
        })
    }

    // 显示模态框
    $('#addPro').on('click', function () {
        $('#proModal').modal('show')
        // 发送ajax请求,渲染二级分类
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                console.log(info)
                var htmlStr = template('proTmp', info)
                console.log(htmlStr)
                $('.dropdown-menu').html(htmlStr)
            }
        })
    })

    // 表单添加二级分类项
    $('.dropdown-menu').on('click', 'a', function () {
        $('.choice').text($(this).text())
        $('[name="brandId"]').val($(this).data('id'))
    })

    // 文件上传初始化
    // 用数组接收图片路径
    var picArr = []
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // 图片对象,包括图片名和路径
            var imgSrc = data.result
            console.log(imgSrc)
            picArr.unshift(imgSrc)
            $('.picFile').prepend('<img src="' + imgSrc.picAddr + '" alt="" style="width:100px" id="formImg">')
            // 判断只能显示三张
            if (picArr.length > 3) {
                // 删除数组的最后一项
                picArr.pop()
                // 删除最后一张图片
                $('.picFile img:last-of-type').remove()
            }
            // 当图片为3张时修改此时的状态为成功
            if(picArr.length == 3){
                // 修改状态
                $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID')
        }

    }
})

    // 校验表单
    $('#form').bootstrapValidator({
        // 配置排除项, 对隐藏域也进行校验
        excluded: [],
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',         // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品分类'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码要求必须是xx-xx的格式,xx为两位数字'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '请输入3张图片'
                    }
                }
            },
        }
    })

    // 校验成功
    $('#form').on('success.form.bv',function(e){
        e.preventDefault()
        // 获取表单数据,与文件字符串拼接
        var str = $('#form').serialize()
        console.log(str)
        var jsonStr = JSON.stringify(picArr)
        str += '&picArr=' + jsonStr
        // 发送请求添加数据
        $.ajax({
            url:'/product/addProduct',
            type:'post',
            dataType:'json',
            data:str,
            success:function(info){
                if(info.success){
                    $('#proModal').modal('hide')
                    currentPage = 1
                    render()
                    // 置空数组
                    picArr = []
                    // 清空表单
                    $('#form').data('bootstrapValidator').resetForm(true)
                    $('.choice').text('请输入二级分类')
                    $('.picFile img').remove()
                }
            }
        })
    })
})