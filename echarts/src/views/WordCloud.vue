<template>
    <div>
        词云
        <div id="wordCloud" style="width: 800px;height: 300px;border:1px solid red;">
    </div>
    </div>
</template>

<script>
import 'echarts-wordcloud';
export default {
    mounted() {
        this.myChart = this.$echarts.init(document.getElementById("wordCloud"));
        this.drawTable();
    },
    methods: {
        drawTable() {
            let option ={
                color: ['#AEDD81','#00CCFF', '#FC9D99'],
                backgroundColor:'#fff',
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                series: [{
                    type: 'wordCloud',
                            gridSize: 20,
                            // Text size range which the value in data will be mapped to.
                            // Default to have minimum 12px and maximum 60px size.
                            sizeRange: [12, 60],
                            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
                            rotationRange: [0, 0, 0, 0],
                            // maskImage: maskImage,
                            textStyle: {
                                normal: {
                                    color: function() {
                                        return 'rgb(' +
                                            Math.round(Math.random() * 255) +
                                            ', ' + Math.round(Math.random() * 255) +
                                            ', ' + Math.round(Math.random() * 255) + ')'
                                    }
                                }
                            },
                            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                            // Default to be put in the center and has 75% x 80% size.
                            top: '0%',
                            // shape: 'pentagon',
                            width:'100%',
                            height:'100%',
                    data:[
                        {
                            name: 'Sam S Club',
                            value: 10000,
                        }, {
                            name: 'Macys',
                            value: 6181
                        }, {
                            name: 'Amy Schumer',
                            value: 4386
                        }, {
                            name: 'Jurassic World',
                            value: 4055
                        }, {
                            name: 'Charter Communications',
                            value: 2467
                        }, {
                            name: 'Chick Fil A',
                            value: 2244
                        }, {
                            name: 'Planet Fitness',
                            value: 1898
                        }, {
                            name: 'Pitch Perfect',
                            value: 1484
                        }, {
                            name: 'Express',
                            value: 1112
                        }, {
                            name: 'Home',
                            value: 965
                        }, {
                            name: 'Johnny Depp',
                            value: 847
                        }, {
                            name: 'Lena Dunham',
                            value: 582
                        }, {
                            name: 'Lewis Hamilton',
                            value: 555
                        }, {
                            name: 'KXAN',
                            value: 5500
                        }, 
                        {
                            name: 'Sam S Club',
                            value: 10000,
                        }, {
                            name: 'Macys',
                            value: 6181
                        }, {
                            name: 'Amy Schumer',
                            value: 4386
                        }, {
                            name: 'Jurassic World',
                            value: 4055
                        }, {
                            name: 'Charter Communications',
                            value: 2467
                        }, {
                            name: 'Chick Fil A',
                            value: 2244
                        }, {
                            name: 'Planet Fitness',
                            value: 1898
                        }, {
                            name: 'Pitch Perfect',
                            value: 1484
                        }, {
                            name: 'Express',
                            value: 1112
                        }, {
                            name: 'Home',
                            value: 965
                        }, {
                            name: 'Johnny Depp',
                            value: 847
                        }, {
                            name: 'Lena Dunham',
                            value: 582
                        }, {
                            name: 'Lewis Hamilton',
                            value: 555
                        }, {
                            name: 'KXAN',
                            value: 550
                        }, {
                            name: 'Point Break',
                            value: 265
                        }]
                }]
            }
            this.myChart.setOption(option)
        }
        
    }
}
</script>

<style>

</style>