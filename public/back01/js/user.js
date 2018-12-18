$(function(){
    // 动态获取用户数据并渲染
    var currentPage = 1;
    var pageSize = 5;
    render()
    function render(){
        $.ajax({
            url:'/user/queryUser',
            dataType : 'json',
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            success:function(res){
                // console.log(res)
                    var htmlStr = template('user',res)
                    $('tbody').html(htmlStr)
                    // 实现分页
                    $('#paginator').bootstrapPaginator({
                        // 版本号
                        bootstrapMajorVersion : 3,
                        // 当前页
                        currentPage:currentPage,
                        // 总页数
                        totalPages: Math.ceil(res.total / res.size),
                        // 点击执行的函数
                        onPageClicked:function(a,b,c,page){
                            // page 当前页
                            currentPage = page;
                            render();
                        }
                    })
            }
        })
    

    }

    // 点击按钮,改变状态和按钮
    // 事件委托
    var id
    var isDelete
    $('tbody').on('click','.btn',function(){
        id = $(this).parent().data('id')
        // isDelete传什么,就显示什么
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1 
        $('#userModal').modal('show')
    })
    // 启用禁用
    $('#confirmBtn').on('click',function(){
        $.ajax({
            url : '/user/updateUser',
            type:'post',
            dataType:'json',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(res){
                console.log(res)
                if(res.success){
                    $('#userModal').modal('hide')
                    // 返回true表示后台修改成功
                    render()
                }
            }
        })
    })
})