$(function () {
    $.ajax({
        url: '/product/queryProductDetail',
        dataType: 'json',
        data: {
            id: getSearch('productId')
        },
        success: function (info) {
            console.log(info)
            var htmlStr = template('productTpl', info)
            $('.mui-scroll').html(htmlStr)

            // 在轮播图动态渲染完成后, 需要手动初始化
            // 获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 数字框手动初始化
            mui('.mui-numbox').numbox()
        }
    })


    // 选择尺码
    $('.lt_main').on('click','.item_box span',function(){
        $(this).addClass('current').siblings().removeClass('current')
    })

    // 点击前往购物车
    $('#addCart').on('click',function(){
        // size
        var size = $('.item_box span.active').text()
        var num = $('.mui-numbox-input').val()
        // 判断是否登录
        $.ajax({
            url:'/cart/addCart',
            dataType:'json',
            type:'post',
            data:{
                productId:getSearch('productId'),
                num:num,
                size:size
            },
            success:function(info){
                console.log(info)
                if(info.error == 400){
                    // location.href = 'login.html?retUrl='+ location.href
                }
                if(info.success){
                    // 判断是否选择了尺码
                    
                }
            }
        })
    })
})