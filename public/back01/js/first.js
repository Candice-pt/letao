$(function(){
    var currentPage = 1
    var pageSize = 5
    render()
    // 渲染页面
    function render(){
        $.ajax({
            url : '/category/queryTopCategoryPaging',
            dataType : 'json',
            data:{
               page:currentPage,
               pageSize:pageSize
            },
            success:function(info){
                console.log(info)
                var htmlStr = template('cate',info)
                $('tbody').html(htmlStr)
    
                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(info.total / info.size),
                    onPageClicked:function(a,b,c,page){
                        currentPage = page
                        render()
                    }
                })
            }
        })
    }

    // 一级模态框
    $('.btn-add').on('click',function(){
        $('#firstModal').modal('show')
    })

    // 表单校验
    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',         // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
       },
       fields:{
           categoryName:{
               validators:{
                   notEmpty:{
                       message:'请输入一级分类名'
                   }
               }
           }
       }
    })
    // 校验成功发送ajax请求
    $('#form').on('success.form.bv',function(e){
        e.preventDefault()
        // 发送请求添加分类
        $.ajax({
            url:'/category/addTopCategory',
            type : 'post',
            dataType:'json',
            data:$('#form').serialize(),
            success:function(res){
                console.log(res)
                if(res.success){
                    // console.log(11)
                    // 关闭模态框
                    $('#firstModal').modal('hide')
                    currentPage = 1;
                    render()

                    // 清空内容
                    $('#form').data('bootstrapValidator').resetForm(true)
                }
            }
        })
    })
})