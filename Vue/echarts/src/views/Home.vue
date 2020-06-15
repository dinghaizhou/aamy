<template>
    <div class="home">
        <ul>
            <router-link v-for="item in list" :key="item.path" :to="'/' + item.path" tag="li">
                <a href="">{{item.name}}</a>
            </router-link>
        </ul>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "home",
    components: {
    },
    data: () => {
        return {
            list: [
                {
                    name: '词云',
                    path: 'wordcloud'
                },
                {
                    name: '南丁格尔图',
                    path: 'nightingale'
                },
                {
                    name: 'dataset的使用方法',
                    path: 'dataset'
                },
                {
                    name: 'dataZoom的使用方法',
                    path: 'dataZoom'
                },
                {
                    name: '需求图谱',
                    path: 'example_01'
                },
                {
                    name: 'UE',
                    path: 'UE'
                },
                 {
                    name: '折线图图例开关',
                    path: 'lineLegend'
                },
                {
                    name: '站点引导',
                    path: 'driver'
                },
                {
                    name: 'el 按需加载',
                    path: 'element'
                },
            ]
        }
    }
};
</script>
