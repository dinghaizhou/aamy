<template>
    <div>
        词云
        <div id="wordCloud" style="width: 800px;height: 300px;border:1px solid red;"></div>
        <div id="dataset" style="width: 800px;height: 300px;border:1px solid red;"></div>
    </div>
</template>

<script>
import "echarts-wordcloud";
export default {
    mounted() {
        this.myChart = this.$echarts.init(document.getElementById("wordCloud"));
        this.myChart2 = this.$echarts.init(document.getElementById("dataset"));
        this.drawTable();
        this.drawTable2();
    },
    methods: {
        drawTable() {
            let option = {
                
                color: ['#AEDD81','#00CCFF', '#FC9D99'],
                xAxis: {
                    type: "category",
                    data: [
                        "Matcha Latte",
                        "Milk Tea",
                        "Cheese Cocoa",
                        "Walnut Brownie"
                    ]
                },
                yAxis: {},
                series: [
                    // {
                    //     type: "bar",
                    //     name: "2015",
                    //     data: [89.3, 92.1, 94.4, 85.4]
                    // },
                    {
                        type: "line",
                        name: "2016",
                        data: [95.8, 89.4, 91.2, 76.9]
                    },
                    {
                        type: "bar",
                        name: "2017",
                        data: [97.7, 83.1, 92.5, 78.1]
                    }
                ]
            };
            this.myChart.setOption(option);
        },
        drawTable2() {
            let option = {
                legend: {},
                tooltip: {},
                dataset: {
                    // 提供一份数据。
                    source: [
                        ['product', '2015', '2016', '2017'],
                        ['Matcha Latte', 43.3, 85.8, 93.7],
                        ['Milk Tea', 83.1, 73.4, 55.1],
                        ['Cheese Cocoa', 86.4, 65.2, 82.5],
                        ['Walnut Brownie', 72.4, 53.9, 39.1]
                    ]
                },
                // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
                xAxis: {type: 'category'},
                // 声明一个 Y 轴，数值轴。
                yAxis: {},
                // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
                series: [
                    {type: 'bar'},
                    {type: 'line'},
                ]
            }
            this.myChart2.setOption(option);
        }
    }
};
</script>

<style>
</style>