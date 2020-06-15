<template>
    <div>
        <div class="title">title</div>
        <script :id="id" type="text/plain"></script>
    </div>
</template>
<script>
export default {
    name: "UE",
    data() {
        return {
            editor: null
        };
    },
    props: {
        defaultMsg: {
            type: String
        },
        config: {
            type: Object
        },
        id: {
            type: String
        }
    },
    mounted() {
        const _this = this;
        this.editor = window.UE.getEditor(this.id, this.config); // 初始化UE
        this.editor.addListener("ready", function() {
            //延时 lkw20190307 添加, 防止页面加载富文本编辑器来不及赋值/或网络延时加载不上
            setTimeout(function() {
                _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
            }, 300);
        });
    },
    methods: {
        getUEContent() {
            // 获取内容方法
            return this.editor.getContent();
        },
        getUEContentTxt() {
            // 获取纯文本内容方法
            return this.editor.getContentTxt();
        }
    },
    destroyed() {
        this.editor.destroy();
    }
};
</script>
<style>
    .title {
        color: red;
    }
</style>
