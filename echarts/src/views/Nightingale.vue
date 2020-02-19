<template>
    <div>
        南丁格尔
        <div id="wordCloud" style="width: 500px;height: 300px;border:1px solid red;"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.myChart = this.$echarts.init(document.getElementById("wordCloud"));
        this.drawTable();
    },
    methods: {
        drawTable() {
            let option = {
                color: ['#AEDD81','#00CCFF', '#FC9D99'],
                // 全局样式
                backgroundColor: "#2c343c",
                textStyle: {
                    color: "rgba(255, 255, 255)"
                },
                tooltip: {
                    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
                },

                visualMap: {
                    // 不显示 visualMap 组件，只用于明暗度的映射
                    show: true,
                    // 映射的最小值为 80
                    min: 200,
                    // 映射的最大值为 600
                    max: 600,
                    inRange: {
                        // 明暗度的范围是 0 到 1
                        colorLightness: [1, 0]
                    }
                },
                roseType: "angle",
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: "55%",

                        // label: {
                        //     textStyle: {
                        //         color: "rgba(255, 255, 255, 0.2)"
                        //     }
                        // },
                        // 设置扇形的颜色
                        // itemStyle: {
                        //     color: "#c23531",
                        //     shadowBlur: 200,
                        //     shadowColor: "rgba(0, 0, 0, 0.5)"
                        // },
                        data: [
                            {
                                value: 235,
                                name: "视频广告",
                                // itemStyle: {
                                //     color: "#efefef"
                                // }
                            },
                            { value: 274, name: "联盟广告" },
                            { value: 310, name: "邮件营销" },
                            { value: 335, name: "直接访问" },
                            { value: 400, name: "搜索引擎" }
                        ]
                    }
                ]
            };
            this.myChart.setOption(option);
        }
    }
};
</script>

<style>
</style>