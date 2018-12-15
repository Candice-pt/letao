$(document).ajaxStart(function(){
    NProgress.start()
})
$(document).ajaxStop(function(){
    NProgress.done()
})
$(function(){
    // 需求:在第一个ajax发送的时候,开启进度条
        //在全部ajax回来的时候,结束进度条

    // ajax全局事件
    //  .ajaxComplete() 当每一个ajax完成时,调用
    //  .ajaxSuccess() 当ajax返回成功时调用
    //  .ajaxError() 当ajax返回失败时调用
    //  .ajaxSend() 当ajax发送前调用

    // .ajaxStart() 当第一个ajax发送时调用
    // .ajaxStop() 当全部的ajax完成时调用


    // 一级二级菜单显示
    $('.category').click(function(){
        $('.child').stop().slideToggle()
    })

    // 左边栏隐藏事件
    $('.icon_left').click(function(){
        $('.lt_aside').toggleClass('hideMenu')
        $('.lt_main').toggleClass('hideMenu')
        $('.lt_topbar').toggleClass('hideMenu')
    })

    // 注销登录
    $('.icon_right').click(function(){
        // console.log($.cookie('itcast-name'))
        // 打开模态框
        $('#myModal').modal('show')
    })
    // 取消按钮
    // $('#cancelBtn').click(function(){
    //     $('#myModal').modal('hide')
    // })
    // 退出按钮
    $('#logoutBtn').click(function(){
        $.ajax({
            url : '/employee/employeeLogout',
            dataType: 'json',
            success: function(res){
                if(res.success){
                    location.href = 'login.html'
                }
            }
        })
    })
})