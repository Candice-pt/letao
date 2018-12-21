$(function(){
    // 初始化srcoll控件
  mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

})
//   提取地址栏中的数据(不能放在入口函数中,否则调用不到)
    function getSearch(key){
        // 解码
        var str = decodeURI(location.search).slice(1)
        var arr = str.split('&')
        var obj = {}
        for(var i=0;i<arr.length;i++){
            var newArr = arr[i].split('=')
            var key = newArr[0]
            var value = newArr[1]
            obj[key] = value;
        }
        return obj[key]
    }
