import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
// 面包屑
import breadCrumb from '@/components/breadCrumb.vue';
Vue.component('breadCrumb', breadCrumb);

// 引入路由
import router from './router'

//引入自定义样式
import '@/assets/css/style.css';
import '@/assets/css/style-responsive.css';

//引入axios配置及cookie方法
import {post,fetch,patch,put} from '@/util/http'
import {delCookie,getCookie} from '@/util/util'


// 富文本样式
import'../static/utf8-jsp/ueditor.config.js'
import'../static/utf8-jsp/ueditor.all.min.js'
import'../static/utf8-jsp/lang/zh-cn/zh-cn.js'
import'../static/utf8-jsp/ueditor.parse.min.js'

//引入elment-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/index.js'


 //alert弹框
// Vue.use(iView);
Vue.use(ElementUI);
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;


new Vue({
  el: '#app',
  router,  // 注入到根实例中
  store,
  render: h => h(App)
})