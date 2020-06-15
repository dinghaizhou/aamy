<template>
    <div>
        ============================5、driver.js引导页插件============================
        <div id="menu2" @click="$router.push('/')">
            菜单

            sss
        </div>
        <div id="menu3">
            菜单

            sss
        </div>
    </div>
</template>
 
<script>
    /* eslint-disable no-console,no-unused-vars */
    import Driver from 'driver.js'
    import 'driver.js/dist/driver.min.css';
    export default {
        name: "Driver_5",
        data(){
          return {
              driver:null
          }
        },
        created(){
           this.driver = new Driver({
                animate: true, // 是否启动动画
                opacity: 0.5, // 背景透明度设置，0表示背景完全透明
                allowClose: false,
                doneBtnText: '完成',
                closeBtnText: '关闭',
                nextBtnText: '下一个',
                prevBtnText: '上一个',
                onHighlightStarted: Element => {
                    console.log('onHighlightStarted()被调用了');
                },
                onHighlighted: Element => {
                    console.log('onHighlighted()被调用了');
                },
                onDeselected: Element => { // 取消选择时被调用
                    console.log('onDeselected()被调用了');
                    // onDeselected()被调用了
                    console.log(Element);
                },
                onReset: Element => { // 关闭
                    console.log('onReset()被调用了');
                },
                onNext: Element => {
                    console.log('onNext()被调用了');
                },
                onPrevious: Element => {
                    console.log('onPrevious()被调用了');
                }
            })
        },
        mounted(){
            this.$nextTick(function () {
                    this.startDriver();
            });
        },
        methods:{
            startDriver() {
                // 定义步骤
                let _this = this;
                this.driver.defineSteps([
                    {
                        element: '#menu2',
                        popover: {
                            title: '菜单',
                            description: '单击展开',
                            position: 'bottom'
                        },
                        onNext: (val) => {
                            console.log(val,'下一步');
                        }
                    },
                    {
                        element: '#menu3',
                        popover: {
                            title: '菜单',
                            description: '单击展开',
                            position: 'bottom'
                        },
                        onNext: () => {
                            console.log('下一步');
                        }
                    }
                ]);
                // 启动
                this.driver.start();
            },
        }
    }
</script>
 
<style scoped>
 
    #menu2 {
        width: 100px;
        height: 900px;
        background-color: yellow;
    }
    #menu3 {
        margin-top: 10px;
        width: 100px;
        height: 100px;
        background-color: red;
    }
 
</style>