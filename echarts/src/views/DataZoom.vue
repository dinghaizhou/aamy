<template>
    <div>
        dataZoom
        <div id="dataZoom" style="width: 800px;height: 600px;border:1px solid red;"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.myChart = this.$echarts.init(document.getElementById("dataZoom"));
        this.drawTable();
    },
    methods: {
        drawTable() {
            let that = this;
            var dataCount = 100;
            var data = generateData(dataCount);
            // let data_01 = [
            //     {date:'2015-01', value: 11},
            //     {date:'2015-02', value: 12},
            //     {date:'2015-03', value: 13},
            //     {date:'2015-04', value: 14},
            //     {date:'2015-05', value: 15},
            //     {date:'2015-06', value: 16},
            //     {date:'2015-07', value: 17},
            //     {date:'2015-08', value: 18},
            //     {date:'2015-09', value: 18},
            //     {date:'2015-10', value: 18},
            //     {date:'2015-11', value: 18},
            //     {date:'2015-12', value: 18}
            // ]
            var option = {
                title: {
                    text: that.$echarts.format.addCommas(dataCount) + " Data",
                    left: 10
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        saveAsImage: {
                            pixelRatio: 2
                        }
                    }
                },
                // tooltip: {
                //     trigger: "axis",
                //     axisPointer: {
                //         type: "shadow"
                //     }
                // },
                grid: [
                    {
                        left: "10%",
                        right: "8%",
                        height: "70%"
                    },
                    {
                        left: "10%",
                        right: "8%",
                        bottom: "10%",
                        height: "15%"
                    }
                ],
                dataZoom: [
                    {
                        type: "inside",
                        xAxisIndex: [0]
                    },
                    {
                        type: "slider",
                        xAxisIndex: [0],
                        top: '86%'
                    }
                ],
                xAxis: [
                    {
                        data: data.categoryData,
                        silent: false,
                        splitLine: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        }
                    },
                    {
                        data: [1, 2, 3, 4, 5, 6, 7],
                        gridIndex: 1,
                        silent: false,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                    }
                ],
                yAxis: [
                    {
                        splitArea: {
                            show: false
                        }
                    },
                    {
                        gridIndex: 1,
                        show: false
                    }
                ],
                // singleAxis: {

                // },
                series: [
                    {
                        type: "line",
                        data: data.valueData,
                        smooth: true,
                        // Set `large` for large data amount
                        large: true,
                        showSymbol: false
                    }
                ]
            };

            function generateData(count) {
                var baseValue = Math.random() * 1000;
                var time = +new Date(2011, 0, 1);
                var smallBaseValue;

                function next(idx) {
                    smallBaseValue =
                        idx % 30 === 0
                            ? Math.random() * 700
                            : smallBaseValue + Math.random() * 500 - 250;
                    baseValue += Math.random() * 20 - 10;
                    return Math.max(
                        0,
                        Math.round(baseValue + smallBaseValue) + 3000
                    );
                }

                var categoryData = [];
                var valueData = [];

                for (var i = 0; i < count; i++) {
                    categoryData.push(
                        that.$echarts.format.formatTime(
                            "yyyy-MM-dd\nhh:mm:ss",
                            time
                        )
                    );
                    valueData.push(next(i).toFixed(2));
                    time += 1000;
                }

                return {
                    categoryData: categoryData,
                    valueData: valueData
                };
            }

            this.myChart.setOption(option);
        }
    }
};
</script>

<style>
</style>