<template>
    <div>
        图例开关
        <div id="line" style="width: 800px;height: 300px;border:1px solid red;"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.myChart = this.$echarts.init(document.getElementById("line"));
        this.drawTable();
    },
    methods: {
        drawTable() {
            let option = {
                legend: {
                    show: true,
                    data: [
                        {name: '系列1', icon:'rect'},
                        {name: '系列2'}
                    ],
                    selected: {
                        // 选中'系列1'
                        '系列1': true,
                        // 不选中'系列2'
                        '系列2': false
                    },
                    // selectedMode: false
                },
                xAxis: {
                    type: "category",
                    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                },
                yAxis: {
                    type: "value",
                    min: function (value) {
                        return value.min - (value.max - value.min)*0.2;
                    }
                },
                series: [
                    {
                        name: '系列1',
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: "line"
                    },
                    {
                        name: '系列2',
                        data: [120, 232, 301, 234, 190, 330, 120],
                        type: "line"
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