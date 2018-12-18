/**
 * Created by 54721 on 2018/12/18.
 */


$(function() {

  var currentPage = 1;  // 当前页
  var pageSize = 3; // 每页条数
  var picArr = []; // 图片数组, 存放所有用于提交的图片对象


  // 1. 一进入页面, 进行渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("productTpl", info);
        $('tbody').html( htmlStr );

        // 进行分页初始化
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil( info.total / info.size ),
          // 给页码添加点击事件
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


  // 2. 点击添加商品, 显示添加模态框
  $('#addBtn').click(function() {
    $('#addModal').modal("show");

    // 发送ajax请求, 渲染下拉列表, 获取全部的二级分类
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        var htmlStr = template( "dropdownTpl", info );
        $('.dropdown-menu').html( htmlStr );
      }
    })
  });



  // 3. 给所有的下拉框的 a 添加点击事件
  $('.dropdown-menu').on("click", "a", function() {
    // 获取 a 的文本, 设置给 按钮
    var txt = $(this).text();
    $('#dropdownText').text( txt );

    // 获取存储的 id, 设置给隐藏域
    var id = $(this).data("id");
    $('[name="brandId"]').val( id );

    // 手动将隐藏域校验状态改成 VALID
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  });


  // 4. 进行文件上传初始化
  $('#fileupload').fileupload({
    // 返回的数据类型
    dataType: 'json',
    // 图片上传完成的回调函数
    done: function( e, data ) {
      console.log( data );
      var picObj = data.result; // 后台返回的结果对象  图片名称 和 图片地址
      // push pop  shift  unshift
      // 添加到数组最前面
      picArr.unshift( picObj );

      var picUrl = picObj.picAddr;
      // 将新得到的图片, 添加到结构最前面
      $('#imgBox').prepend('<img src="'+ picUrl +'" style="width: 100px" alt="">');

      if ( picArr.length > 3 ) {  // 4
        // 移除数组的最后一项
        picArr.pop();
        // 同时页面结构要更新, 找到最后一个 img 类型的元素, 并且删除
        $('#imgBox img:last-of-type').remove();
      }

      // 如果图片数组长度为 3 张, 说明满3张了, 校验成功
      if ( picArr.length === 3 ) {
        // 更新图片校验状态
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
      console.log( picArr );

    }
  });



  // 5. 表单校验插件初始化
  $('#form').bootstrapValidator({
    // 配置排除项, 对隐藏域也进行校验
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',         // 校验成功
      invalid: 'glyphicon glyphicon-remove',   // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },

    // 配置校验规则
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      // 商品库存必须是非零开头的数字
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          // 正则校验
          // \d 表示 0-9 的数字
          // *  表示出现 0 次 或者 多次
          // +  表示出现 1 次 或者 多次
          // ?  表示出现 0 次 或者 1次
          // {n} 表示出现 n 次
          // {n,m} 出现n次到m次
          regexp: {
            regexp: /^[1-9]\d*$/,     // 1   11    121
            message: '商品库存必须是非零开头的数字'
          }
        }
      },

      // 尺码: 要求必须是 xx-xx 的格式, xx为两位数字
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          // 正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码要求必须是 xx-xx 的格式, xx为两位数字'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },

      // 标记图片是否上传满 3 张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传 3 张图片"
          }
        }
      }
    }
  });


  // 6. 注册表单校验成功事件, 阻止默认的提交, 通过ajax提交
  $('#form').on("success.form.bv", function( e ) {

    e.preventDefault();  // 阻止默认的提交

    // JSON.parse(JSON字符串)   作用: 将json字符串转换成复杂数据类型
    // JSON.stringify(obj/arr)  作用: 将复杂数据类型转换成 json字符串

    var paramsStr = $('#form').serialize(); // 获取了所有的表单数据
    // 还需要拼接上图片数据
    // paramsStr += "&key=value"
    paramsStr += "&picArr=" + JSON.stringify( picArr );

    // 通过ajax提交
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: paramsStr,
      dataType: "json",
      success: function( info ) {
        if ( info.success ) {
          // 添加成功, 关闭模态框, 重新渲染第一页
          $('#addModal').modal("hide");
          currentPage = 1;
          render();

          // 重置表单内容和状态
          $('#form').data("bootstrapValidator").resetForm( true );

          // 下拉按钮文本 和 图片不是表单元素, 需要手动重置
          $('#dropdownText').text("请选择二级分类");
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })

  })



})