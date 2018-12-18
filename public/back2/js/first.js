/**
 * Created by 54721 on 2018/12/17.
 */
$(function() {

  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页条数

  // 1. 一进入页面, 发送ajax请求, 完成渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("firstTpl", info);
        $('tbody').html( htmlStr );

        // 根据返回数据, 完成初始化
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 添加点击事件
          onPageClicked: function( a, b, c, page ) {
            console.log( page );
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    })
  }



  // 2. 给添加按钮, 添加点击事件, 显示模态框
  $('#addBtn').click(function() {
    $('#addModal').modal( "show" );
  });


  // 3. 调用表单校验插件, 完成校验
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',         // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 校验字段     先给input设置name
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空
          notEmpty: {
            // 提示信息
            message: "请输入一级分类名称"
          }
        }
      }
    }

  });


  // 4. 阻止默认的提交, 通过 ajax 提交
  $('#form').on("success.form.bv", function( e ) {

    // 阻止默认的提交
    e.preventDefault();

    // 发送 ajax
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $('#form').serialize(),
      dataType: "json",
      success: function( info ) {
        console.log( info )
        if ( info.success ) {

          // 关闭模态框
          $('#addModal').modal("hide");
          // 重新渲染第1页
          currentPage = 1;
          render();

          // 重置表单内容
          // resetForm(true)  表示内容和状态都重置
          // resetForm()      只重置状态
          $('#form').data("bootstrapValidator").resetForm(true);
        }
      }
    })

  })


})
