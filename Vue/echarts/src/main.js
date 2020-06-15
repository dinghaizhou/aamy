import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import '../public/UE/themes/default/css/ueditor.css'
import '../public/UE/themes/default/dialogbase.css'

import '../public/UE/ueditor.config.js'
import '../public/UE/ueditor.all.js'
import '../public/UE/lang/zh-cn/zh-cn.js'
import '../public/UE/ueditor.parse.min.js'

import { Button, Image } from 'element-ui';
Vue.use(Button);
Vue.use(Image);


// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
