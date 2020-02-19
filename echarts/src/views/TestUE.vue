<template>
    <div>
        <UE ref="UE" :config="config" :id="ue1" :defaultMsg="defaultMsg"></UE>
        <el-button @click="getContent">
            保存
        </el-button>
        <div v-html="html"></div>
    </div>
</template>

<script>
import UE from '../components/UE.vue'

export default {
    data: () => {
        return {
            config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            },
            ue1: "ue1", // 不同编辑器必须不同的id
            defaultMsg: '',
            html: ''
        }
    },
    components: { 
        UE
    },
    methods: {
        getContent() {
            console.log(222)
            this.html = this.$refs['UE'].getUEContent();
        }
    }
};
</script>

<style>

</style>