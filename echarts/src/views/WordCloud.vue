<template>
    <div>
        <img src="./logo.png" alt />
        词云
        <div id="wordCloud" style="width: 1000px;height: 500px;border:1px solid red;"></div>
    </div>
</template>

<script>
import "echarts-wordcloud";
export default {
    mounted() {
        this.myChart = this.$echarts.init(document.getElementById("wordCloud"));
        this.drawTable();
    },
    methods: {
        drawTable() {
            var maskImage = new Image();
            var keywords = {
                visualMap: 22199,
                continuous: 10288,
                contoller: 620,
                map: 20285,
                animationDuration: 3425,
                animationDelay: 2431,
                splitNumber: 5175,
                axisLine: 12738,
                lineStyle: 19601,
                splitLine: 7133,
                axisTick: 8831,
                axisLabel: 17516,
                pointer: 590,
                color: 23426,
                title: 38497,
                formatter: 15214,
                slider: 7236,
                legend: 66514,
                grid: 28516,
                smooth: 1295,
                smoothMonotone: 696,
                sampling: 757,
                feature: 12815,
                saveAsImage: 2616,
                polar: 6279,
                calculable: 879,
                backgroundColor: 9419,
                excludeComponents: 130,
                show: 20620,
                text: 2592,
                icon: 2782,
                dimension: 478,
                inRange: 1060,
                animationEasing: 2983,
                animationDurationUpdate: 2259,
                animationDelayUpdate: 2236,
                animationEasingUpdate: 2213,
                xAxis: 89459,
                brush: 3
            };
            var data = [];
            for (var name in keywords) {
                data.push({
                    name: name,
                    value: Math.sqrt(keywords[name])
                });
            }

            //词云形状的黑白矢量图
            maskImage.src =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAC3klEQVRoQ+2ZW4hNURjHf+NZRMQjqXkiuRVFKDVyl9zLi1zLrUnT5AHlQXJXCpMXuZQwitC8KIWHEeFFePMgismDMk/611ras+2z91r7rH32PnVW7aZz+r7/9/3Wt2et9a3TRpOPtibPnxZA2RVsVaCZKrAA0DPf/P0J2OcTcBPoA35nQA0HVgErgYnAqMjzyGi8BF64TI7LK7QWOADMcRD8BdwHzgP9MftZRmc5IIisIYAzwO00wzQAJazEBeA7vgK7gXvGcZ2BGucrZAAEkliRWgBLgQc5gsVdNAHDgFMBtJYAesWGjCSAueY1GB0gaEiJH4Bev+dR0TjAZKAXmBQyckAtLRargfdWMw5wCdgeMGARUpeBHUkAMxJWjiISCKE5E3gloWgFmmH2Lfy/KliAkcBAiKlpoIY2wAELMAV428DgIUJNA95YgFDrfojEXDW0GvVagD1mp3R1roKdNsmzFmAvcK4KWXnk0AWcsAArzO7r4V+66TagxwJMt+tq6Wm5J7AGuGsBxgLf3H0rYanjeX90I9NJb3ElUstO4gawOb4TbzBdVbZ7+Raa6CdxAH1W0zC7/PxSM7gFbEw6zOm7TcD1CgOo31a/8roWgL4/BByrKMRR4Eg0t1otpYwOVwxCm+2FeE5pTX2VjhfdwPGkCc26VukAHpdcCf1f6s4pcWQByKkd+FACxB9Ax/yPabFdAOQ/BngHjG8QiHqTqS6xXAGkpfudp8A8F+E6bK4BW1z9fQCsZg+w1TWAp90+374kD0ARe8V3c+E75NLKBT4vgLR3ARddgmTYPAMWAYN5tOoBULz1gM4meYdeRzUmuUe9AAqs2bsDjPDM4iBw0tPnP/MQABJVR3fVcen7DOwPdPsd9FfKCQZiYcqsPgR2Al/qnXnrH6oCVk+vkSqhfjU+TgOdoRIvCsDqLjObkX7d0SWs7l2vhE5eeqErUESOqZotgIZPeSxgqwJlV+AvEc9mMZ0DubcAAAAASUVORK5CYII=";
            maskImage.onload = () => {
                let option = {
                    color: ["#AEDD81", "#00CCFF", "#FC9D99"],
                    backgroundColor: "#fff",
                    tooltip: {
                        pointFormat:
                            "{series.name}: <b>{point.percentage:.1f}%</b>"
                    },
                    series: [
                        {
                            type: "wordCloud",
                            gridSize: 20,
                            // Text size range which the value in data will be mapped to.
                            // Default to have minimum 12px and maximum 60px size.
                            sizeRange: [12, 80],
                            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
                            rotationRange: [0, 0, 0, 0],
                            drawOutOfBound: false,
                            maskImage: maskImage,

                            textStyle: {
                                normal: {
                                    color: function() {
                                        return (
                                            "rgb(" +
                                            Math.round(Math.random() * 255) +
                                            ", " +
                                            Math.round(Math.random() * 255) +
                                            ", " +
                                            Math.round(Math.random() * 255) +
                                            ")"
                                        );
                                    }
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowColor: "#333"
                                }
                            },
                            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                            // Default to be put in the center and has 75% x 80% size.
                            top: "0%",
                            shape: 'diamond',
                            width: "100%",
                            height: "100%",

                            data: data.sort(function(a, b) {
                                return b.value - a.value;
                            })
                        }
                    ]
                };
                this.myChart.setOption(option);
                this.myChart.on("click", function(params) {
                    // 在用户点击后控制台打印数据的名称
                    console.log(params);
                });
            };
        }
    }
};
</script>

<style>
</style>