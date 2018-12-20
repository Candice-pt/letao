$(function(){
    // 请求一级分类
    $.ajax({
        url:'/category/queryTopCategory',
        dataType:'json',
        success:function(info){
            var htmlStr = template('leftTpl',info)
            $('.cate_left').html(htmlStr)
            // 页面一加载,首先渲染第一个分类的数据
            renderById($('.cate_left a').eq(0).data('id'))
        }
    })
    // 点击一级导航发送ajax请求获取对应的二级导航
    $('.cate_left').on('click','a',function(){
        // console.log($(this).data('id'))
        var id = $(this).data('id')
        $('.cate_left a').removeClass('active')
        $(this).addClass('active')
        renderById(id)
    })
    // 请求二级分类
    function renderById(id){
        $.ajax({
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(info){
                // console.log(info)
                var htmlStr = template('rightTpl',info)
                $('.cate_right').html(htmlStr)
            }
        })
    }
})