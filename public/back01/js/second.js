$(function(){
    // 动态渲染
    var currentPage = 1
    var pageSize = 5
    render()
    function render(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            dataType:'json',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info)
                var htmlStr = template('second',info)
                $('tbody').html(htmlStr)
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total / info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page,
                        render()
                    }
                })
            }
        })
    }

    // 添加分类
    $('.secondBtn').on('click',function(){
        $('#secondModal').modal('show')
        // 动态渲染一级分类
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            dataType:'json',
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info)
                    var htmlStr = template('one',info)
                    $('.dropdown-menu').html(htmlStr)
            }
        })
    })

    $('.dropdown-menu').on('click','a',function(){
        // console.log($(this).text())
        $('.choice').text($(this).text())
    })
    // 文件初始化
    $('#fileupload').fileupload({
        dataType:'json',
        // e : 事件对象
        // data:图片上传后的对象,通过data.result.picAddr可以获取上传后的图片地址
        done:function(e,data){
            console.log(data)
            // 图片地址
            var imgAddr = data.result.picAddr
            console.log(imgAddr)
            $('#formImg').attr('src',imgAddr)
        }
    })
})