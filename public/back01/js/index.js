$(function(){
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('bar'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data:['人数','销量']
        },
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [200, 100, 120, 80, 40, 144]
        },
        {
            name: '销量',
            type: 'bar',
            data: [500, 200, 360, 100, 100, 200]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    // 饼图
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('pie'));

    // 指定图表的配置项和数据
   var option = {
    title : {
        text: '热门品牌销售',
        subtext: '2018年12月',
        x:'center',
        textStyle:{
            color:'#9595',
            fontSize:20,
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // 图例
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','新百伦','乔丹','彪马']
    },
    series : [
        {
            // 系列名称，用于tooltip的显示
            name: '热门品牌',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'新百伦'},
                {value:135, name:'乔丹'},
                {value:1548, name:'彪马'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})