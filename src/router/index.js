import Vue from 'vue';
import Router from 'vue-router';

// 引入配置
import { post, fetch, patch, put } from '@/util/http'
import { delCookie, getCookie, setCookie } from '@/util/util'

// 登录、首页
import home from '../view/home.vue';// 首页
import login from '../view/login/login.vue';

// 平台
import platform from '../view/platform/platform.vue'// 用户中心
import serverList from '../view/platform/serverList.vue';// 服务器列表
import message from '../view/platform/platform_message.vue';// 服务器列表
import domain from '../view/platform/domain.vue';// 服务器列表
import addmsg from '../view/platform/addmsg/addMsg.vue';// 步骤条
import step1 from '../view/platform/addmsg/step1.vue';// 服务器列表 步骤1 添加资本资料
import step2 from '../view/platform/addmsg/step2.vue';// 步骤2 添加服务器信息
import step3 from '../view/platform/addmsg/step3.vue';// 步骤2 添加服务器信息

// 修改平台列表信息
import edit from '../view/platform/edit/platformEdit'
import msgEdit from '../view/platform/edit/msgEdit'
import serverEdit from '../view/platform/edit/serverEdit'


// 系统设置
import admin from '../view/system/admin.vue';// 系统管理员
import adminEdit from '../view/system/admin_edit.vue';// 编辑
import authGroup from '../view/system/authGroup.vue';// 新增
import userGroup from '../view/system/adminUserGroup.vue';// 用户权限组
import menuset from '../view/system/menuset.vue';// 用户权限组
import menuchild from '../view/system/menuchild.vue';// 子菜单
import menulastchild from '../view/system/menulastchild.vue';// 三级子菜单
import menulist from '../view/system/menulist.vue';// 用户授权

// 回收站
import recycle from '../view/recycle/recycle.vue';
import datalist from '../view/recycle/Datalist.vue';

// 要告诉 vue 使用 vueRouter
Vue.use(Router);
const routes = [
  {
    path: '/login',
    component: login,
    name: '登录'
  },
  {
    path: '/',
    component:home,
    name: '平台管理',
    redirect: '/platform',
    icon: 'fa fa-user',
    children:
    [
      { path: 'platform', component: platform, name: '平台列表', icon: 'fa fa-list-alt', meta: { requireAuth: true }},
      { path: 'serverManage', component: serverList, name: '服务器管理', hidden: true, icon: 'fa fa-list-ul', meta: { requireAuth: true }},
      { path: 'domain', component: domain, name: '域名', hidden: true, icon: 'fa fa-list-ul', meta: { requireAuth: true }},
      { path: 'message', component: message, name: '平台信息', hidden: true, icon: 'fa fa-list-ul', meta: { requireAuth: true }},
      { path: 'edit', component: edit, name: '修改列表信息', hidden: true,icon: 'fa fa-list-alt', meta: { requireAuth: true }},
      { path: 'msgEdit', component: msgEdit, name: '修改详细信息', hidden: true,icon: 'fa fa-list-alt', meta: { requireAuth: true }},
      { path: 'serverEdit', component: serverEdit, name: '修改服务器信息', hidden: true,icon: 'fa fa-list-alt', meta: { requireAuth: true }},
      { path: 'aplatMsg', component: addmsg, name: '新增', hidden: true, icon: 'fa fa-list-ul', meta: { requireAuth: true },children:[
           { path: 'step1', component: step1, name: '资本资料', hidden: true, icon: 'fa fa-list-ul', meta: { requireAuth: true } },
           { path: 'step2', component: step2, name: '服务器信息', hidden: true, icon: 'fa fa-list-ul', meta: { requireAuth: true } },
           { path: 'step3', component: step3, name: '阿里云支付宝信息', hidden: true, icon: 'fa fa-list-ul', meta: { requireAuth: true } }
       ] }
    ]
    },
  {
    path: '/',
    component: home,
    name: '系统设置',
    icon: 'fa fa-laptop',
    children: [
      { path: 'menulist', component: menulist, name: '用户授权',hidden:true, meta:{requireAuth: true}},
      { path: 'admin', component: admin, name: '系统用户',icon:'fa fa-user-md', meta:{requireAuth: true}},
      { path: 'adminEdit', component: adminEdit, name: '管理员设置',hidden:true, meta:{requireAuth: true}},
      { path: 'authGroup', component: authGroup, name: '权限管理',icon:'fa fa-wrench', meta:{requireAuth: true}},
      { path: 'userGroup', component: userGroup, name: '设置用户权限组',hidden:true,icon:'fa fa-list-ul', meta:{requireAuth: true}},
      { path: 'menuset', component: menuset, name: '菜单节点',icon:'fa fa-bars', meta:{requireAuth: true}},
      { path: 'menuchild', component: menuchild, name: '菜单节点 / 子菜单',hidden:true,icon:'fa fa-bars', meta:{requireAuth: true}},
      { path: 'menulastchild', component: menulastchild, name: '菜单节点 / 子菜单 / 子菜单',hidden:true,icon:'fa fa-bars', meta:{requireAuth: true}},
      { path: 'datalist',component: datalist,hidden:true,name: '回收站 / 数据列表', meta: { requireAuth: true }},
      { path: 'recycle',component: recycle,name: '回收站',icon:'fa fa-trash-o', meta: { requireAuth: true }},

    ]
  }
]
const router = new Router({
  routes,
  hashbang: false,
  // mode: 'history'
})
// 路由守卫检测权限
router.beforeEach((to, from, next) => {
  const user_token = getCookie('user_token');
  if (to.meta.requireAuth) {
    if (getCookie('user_token') && getCookie('user_token') !== 'undefined') {
      next();
    }
    else {
      next({ path: '/login' });
    }
  }
  next();
});
export default router;