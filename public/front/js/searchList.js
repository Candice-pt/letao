$(function () {
    // 一进页面进行渲染
    var proName = getSearch('key')
    $('.lt_search input').val(proName)
    console.log(proName)
    render()
    function render() {
        // 过渡效果
        $('.lt_product ul').html('<div class="loading"></div>')
        var paramsObj = {
            proName: $('.lt_search input').val(),
            page: 1,
            pageSize: 100
        }
        // 判断a是否有active类
        // 获取data-type的值和箭头的指向
        var $current = $('.lt_sort a.active')
        if($current.length == 1){
            var type = $current.data('type')
            paramsObj[type] = $current.find('i').hasClass('fa-angle-down') ? 2 : 1
        }
        setTimeout(function(){
            $.ajax({
                url: '/product/queryProduct',
                dataType: 'json',
                data: paramsObj,
                success: function (info) {
                    // console.log(info)
                    var htmlStr = template('searchTpl', info)
                    $('.lt_product ul').html(htmlStr)
                }
            })
        },1500)

    }
    // 点击搜索框进行搜索
    $('.btn_search').on('click', function () {
        render()
    })

    // 点击价格和库存
    // 1. 如果没有active类就添加
    // 2.如果有active类再点击就切换箭头
    $('.lt_sort a').on('click',function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active').siblings().removeClass('active')
        }else{
            $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
        }
        render()
    })
})