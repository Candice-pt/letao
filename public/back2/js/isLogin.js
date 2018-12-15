/**
 * Created by 54721 on 2018/12/15.
 */

// 一进入页面, 发送ajax请求, 获取当前用户的登录状态
// (1) 如果当前用户登录了, 让用户继续访问
// (2) 如果当前用户没登陆, 将用户拦截到登录页
$.ajax({
  type: "get",
  url: "/employee/checkRootLogin",
  dataType: "json",
  success: function( info ) {
    console.log( info );
    if ( info.error === 400 ) {
      // 拦截到登录页
      location.href = "login.html"
    }
    if ( info.success ) {
      // 登录成功
      console.log("当前用户已登陆")
    }
  }
})

