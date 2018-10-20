import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
	show: true,// 左侧导航状态
    leftSideshow:true // 平台信息左侧导航状态
}
const store = new Vuex.Store({
  state,
})

export default store