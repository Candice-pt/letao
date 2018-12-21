// 进度条效果
$(document).ajaxStart(function(){
    // 当当前页面的第一个ajax发送出去
    // 开启进度条
    NProgress.start()
})
$(document).ajaxStop(function(){
        NProgress.done()
})
$(function(){

})