<template>
    <div class="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "app",
    components: {
    },
    data: () => {
        return {
            list: [
                {
                    name: '词云',
                    path: 'wordcloud'
                }
            ]
        }
    }
};
</script>
