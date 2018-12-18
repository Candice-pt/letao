/**
 * Created by 54721 on 2018/12/17.
 */

$(function() {
  // 1. 发送ajax请求, 通过模板引擎渲染
  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页多少条

  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        var htmlStr = template( "secondTpl", info );
        $('tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size ), // 总页数
          // 添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }


  // 2. 点击添加分类按钮, 显示模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");

    // 显示模态框, 就立刻发送ajax请求, 请求一级分类的全部数据, 渲染下拉列表
    // 通过 page: 1, pageSize: 100, 获取数据, 模拟获取全部数据的接口
    $.ajax({
      type: "get",
      url : "/category/queryTopCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("dropdownTpl", info);
        $('.dropdown-menu').html( htmlStr );
      }
    })
  });



  // 3. 给下拉列表的 a 注册点击事件, 让下拉列表可选 (通过事件委托注册)
  $('.dropdown-menu').on("click", "a", function() {
    // 获取a的文本
    var txt = $(this).text();

    // 设置给按钮
    $('#dropdownText').text( txt );
  });


  // 4. 调用fileupload方法完成文件上传初始化
  $('#fileupload').fileupload({
    dataType:"json",
    // e 事件对象, data 数据
    // 文件上传完成时, 响应回来时调用 (类似于success)
    done: function (e, data) {
      console.log( data );
      var result = data.result; // 后台返回的对象
      var picUrl = result.picAddr; // 图片路径

      // 设置给 img src
      $('#imgBox img').attr("src", picUrl);
    }
  });

  /*
  * 思路: 选择完图片完成预览时, 发送了一个异步文件上传请求, 真正预览时, 文件已经上传到了服务器
  * 使用插件步骤:
  *   1. 引包   注意依赖问题
  *   2. 指定   name后台接收的name值    data-url 指定后台接口地址
  *   3. 使用 fileupload 初始化, 配置 dataType 和 done 方法即可
  * */


})