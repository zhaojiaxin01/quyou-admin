<template>
    <div>
        
        <!--头部-->
        <div class="header-section">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                  <div class="toggleBtn" :class="isCollapse?'collToggleBtn':''">
                    <el-radio-button :label="!isCollapse"><div class="toggle_btn" @click="$store.state.show = !$store.state.show">
                        <i class="fa fa-dedent fa-fw"></i>
                    </div></el-radio-button>
                  </div>
                </el-radio-group>
                <!--切换按钮结束-->
                <!--通知菜单 -->
                <div class="menu-right">
                    <ul class="notification-menu">
                        <li>
                            <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                <div class="headPicbox" v-if="portrait"><img :src="'http://192.168.0.251'+portrait" alt=""/>
                                </div>
                                <div class="headPicbox" v-else><img src="../assets/images/headpic.png" alt=""/></div>
                                <span class="username">{{nickname}}</span>
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
                                <li @click="logOut"><a href="javascript:;"><i class="fa fa-sign-out"></i>退出登录</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <!--通知菜单结束 -->
        </div>
        <div>
            <div class="Leftmenu">
                <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
                <div class="siteName">
                    <span class="siteTitle" :class="show?'':'disPlayNone'">后台管理系统</span>
                </div>
                <div class="personMsg visible-xs">

                    <div class="heading" v-if="portrait"><img :src="'http://192.168.0.251'+portrait" alt=""/>
                    </div>
                    <div class="heading" v-else><img src="../assets/images/headpic.png" alt=""/></div>
                    <div class="personName">{{nickname}}</div>
                </div>
               
                <sidebar-item :routes="routes" class="menu-list"></sidebar-item>
                 <div class="visible-xs">
                    <el-menu-item  @click="logOut"><i class="fa fa-sign-out"></i>退出登录</el-menu-item>
                </div>
                </el-menu>
            </div>
           
            <div class="mainBox" :class="show?'':'collmainBox'">
                 <div class="wrapper">
                 <transition name="fade" mode="out-in">
                 <router-view></router-view></transition>

                 </div>
            </div>
        </div>
       

    </div>
</template>
<script>
    import { delCookie } from '@/util/util.js';
    import sidebarItem from 'components/SidebarItem'
    import breadCrumb from 'components/breadCrumb.vue';
    import store from '@/store/index.js';
    import {mapState} from 'vuex'
    export default {
      data() {
        return {
          isCollapse: false,
          nickname: '',
          portrait: '',
          memberId: ''
        }
      },
      store,
      beforeCreate: function() {
        document.getElementsByTagName("body")[0].className="add_bg";
      },
      created() {
        this.init();
      },
      methods: {
      // 初始化折叠菜单，如果是手机则首次不显示左边菜单
        init() {
          this.nickname = localStorage.getItem('nickname');
          this.memberId = localStorage.getItem('memberId');
          this.$post('admin.php/member/getPortrait', { id: this.memberId }).then(res => {
            this.portrait = res.data.portrait;
          })
          // if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          //   this.$store.state.show = false;
          // } else {
          //   this.$store.state.show = true;
          // }
        },
        // 退出登录
        logOut() {
          delCookie('user_token');
          localStorage.removeItem('nickname');
          localStorage.removeItem('memberId');
          this.$router.push('/login');
        }
      },
      components: {
        sidebarItem,
        breadCrumb: breadCrumb,
      },
      computed: {
        ...mapState(['show','leftSideshow']),
        routes() {
            return this.$router.options.routes
        },
      },
      watch: {
      // 监听路由 左侧菜单栏变化
        $route() {
          if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
            this.$store.state.show = true;
          }
        }
      }
    }
</script>

<style>
    .heading {
        width: 60px;
        height: 60px;
        overflow: hidden;
        display: inline-block
    }

    .heading img {
        width: 100%;
    }
    
    /*头部*/
    
    .header-section {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }
    .toggleBtn{
        padding-left: 230px;
    }
    .collToggleBtn{
        padding-left: 52px;
    }
    .notification-menu .info-number {
        padding: 17px 20px;
    }

    .info-number .badge {
        right: 10px;
        top: 12px;
    }

    .toggle_btn:hover {
        background-color: rgb(71, 180, 214);
    }

    .toggle_btn:hover .fa-fw {
        color: #fff;
    }

    /*左侧菜单*/
    .logo {
        color: #7a8e96;
        text-decoration: none;
        display: block;
        font-size: 24px;
        text-align: left;
        font-weight: bold;
        display: block;
        line-height: 60px;
        font-family: "黑体";
        margin-left: 20px;
    }

    .el-breadcrumb {
        font-size: 15px;
        font-weight: 600;
        padding-top: 15px;
    }

    .sideBar .el-menu {
        background-color: #212933;
        color: rgb(119, 147, 167);
        
    }

    .nav-stacked > li + li {
        margin-top: 0;
    }

    .Leftmenu .el-menu {
        background-color: #212a35 !important;
       
    }
    .Leftmenu .el-menu-item, .el-submenu__title{
         color: #7793a7 !important;
    }


    .leftSide_logo {
        position: fixed;
        width: 52px;
        height: 60px;
        background: #1b2128;
        top: 0;
        left: 0;
        z-index: 100;
    }
    /*新折叠菜单*/
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse){
        width: 230px;
        z-index: 999;
        position: fixed;
        bottom: 0;
        top: 0;
    }
    .Leftmenu .el-menu--collapse{
    background-color: #212a35;
    position: fixed;
    width: 52px;
    top: 0;
    bottom: 0;
    height: 100%;
    z-index: 999;
    }
    .el-menu--collapse .el-submenu__icon-arrow,.el-menu--collapse .title{
        display: none;
    }
    .mainBox{
        position: absolute;
        left: 0;
        padding-left: 230px;
        top: 0;
        width: 100%;
    }
    .collmainBox{
        position: absolute;
        left: 0;
        padding-left: 52px;
        top: 0;
        width: 100%;
    }
    @media(max-width: 768px){
        .el-menu--collapse{
            display: none;
        }
        .collmainBox{
        position: absolute;
        left: 0px;
        top: 0;
        padding-left: 0px;
        width: 100%;
        }
        
        .collToggleBtn{
            padding-left: 0;
        }
        .menu-right{
            display: none;
        }
    }
    .toggleBtn .el-radio-button__inner{
        width: 52px;
        height: 60px;
        border:none;
        line-height: 60px;
        font-size: 20px;
        padding: 0 15px;
        cursor: pointer;
        float: left;
        color: #212121;
        border-right: 1px solid #e7e7e7;
    }
    .siteName{
        height: 60px;

    }
    .siteTitle{
        font-family: "黑体";
        color: #586677;
        font-size: 30px;
        text-align: left;
        display: block;
        padding: 18px;
    }
    .disPlayNone{
       display: none;
    } 
    .toggle_btn{
    width: 52px;
    height: 60px;
    margin-left: -17px;
    }
    .personMsg{
        padding: 0 0 15px 12px;
        border-bottom: 1px solid hsla(0,0%,100%,.1);
        position: relative;
    }
    .personName{
        display: inline-block;
        color: #ffffff;
        height: 36px;
        line-height: 36px;
        position: absolute;
        top: 10px;
        left: 90px;
    }
    /*过渡样式*/
    .fade-enter {
      opacity:0;
    }
    .fade-leave{
      opacity:1;
    }
    .fade-enter-active{
      transition:opacity .5s;
    }
    .fade-leave-active{
      opacity:0;
      transition:opacity .5s;
    }
    .add_bg{
    background: #ffffff;
    }
   
</style>