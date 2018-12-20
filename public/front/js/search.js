$(function(){
    // var arr = [ "匡威", "阿迪王", "匡威王", "特步王" ];
    // var jsonStr = JSON.stringify( arr );
    // localStorage.setItem("search_list", jsonStr)
    // 1.先从localStorage中拿出数据进行渲染
    // 封装读取历史记录函数
    function getHistory(){
        var jsonStr = localStorage.getItem('search_list') || '[]'
        // 转成数组
        var arr = JSON.parse(jsonStr)
        return arr
    }
    // 封装渲染页面
    function render(){
        var arr = getHistory()
        // 进行渲染在页面上
        var htmlStr = template('historyTpl',{arr:arr})
        $('.lt_history').html(htmlStr)
    }
    render()

    // 2.点击清空记录按钮
    $('.lt_history').on('click','.cate_empty',function(){
        // 确认模态框
        // 参数1:内容
        // 参数2:标题
        // 参数3:文本按钮数组
        // 参数4:回调函数
        mui.confirm('你确认要清空历史记录吗?','提示信息',['取消','确认'],function(e){
            console.log(e)
            if(e.index == 1){
                // 清空localStorage中的数据
                localStorage.removeItem('search_list')
                render()
            }
        })
    })

    // 3.点击×删除单条数据
    $('.lt_history').on('click','.btn_delete',function(){
        var that = this
        // 取出localStorage中的数据,删除对应项,在重新存入,并渲染
        mui.confirm('你确认要进行删除操作吗?','提示信息',['取消','确认'],function(e){
            if(e.index == 1){
                var arr = getHistory()
                // 删除对应项
                // 获取当前下标
                var index = $(that).data('id')
                arr.splice(index,1)
                // 转成json字符串,重新存入
                var jsonStr = JSON.stringify(arr)
                localStorage.setItem('search_list',jsonStr)
                render()
            }
        })
    })

    // 4.添加数据
    // 添加没有出现过的数据
    // 添加已出现过的数据
    // 数据条数大于10进行操作
    $('.btn_search').on('click',function(){
        // 获取输入框的值
        var value = $(this).siblings().val().trim()
        if(value === ''){
            mui.toast('请输入搜索关键字')
            return;
        }
        // console.log(value)
        // 取出localStorage中的值,添加value到数组的最前面
        var arr = getHistory()
        // 判断数组中是否已存在该数据
        var index = arr.indexOf(value)
        console.log(index)
        if(index !== -1){
            // 存在相同的数据,删除
            // splice可以删除添加数据
            arr.splice(index,1)
        }
        if(arr.length >= 10){
            arr.pop()
        }
        arr.unshift(value)
        // 重新存入
        localStorage.setItem('search_list',JSON.stringify(arr))
        render()
        // 清空输入框
        $(this).siblings().val('')
    })
})