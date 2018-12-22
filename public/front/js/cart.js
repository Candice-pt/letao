$(function(){
    // 发送请求渲染且判断是否登录
    render()
    function render(){
        $.ajax({
            url:'/cart/queryCart',
            dataType:'json',
            success:function(info){
                console.log(info)
                if(info.error == 400){
                    location.href = 'login.html?retUrl='+location.href
                }else{
                    var htmlStr = template('cartTpl',{info:info})
                    $('.mui-table-view').html(htmlStr)
                }
            }
        })
    }
   

    // 点击删除按钮
    $('.lt_main').on('click','.btn_delete',function(){
        var id = $(this).data('id')
        $.ajax({
            url:'/cart/deleteCart',
            dataType:'json',
            data:{
                id:[id]
            },
            success:function(info){
                console.log(info)
                if(info.success){
                    render()
                }
            }
        })
    })
})