<template>
    <div class="detail">
        <div class="hidebtn">
            <button id="hidebtn" ref="hidebtn" @click="$store.state.leftSideshow = false"
                    v-show="$store.state.leftSideshow">
                <img src="../../../assets/images/shousuo.png" alt="">
            </button>
        </div>
        <div class="showbtn">
            <button id="showbtn" ref="showbtn" @click="$store.state.leftSideshow = true"
                    v-show="!$store.state.leftSideshow">
                <img src="../../../assets/images/zhankai.png" alt="">
            </button>
        </div>
        <div class="leftSide" id="leftSide" ref="leftside" v-show="$store.state.leftSideshow"
             :class="$store.state.show ? 'left52':''">
            <div class="smallLeftSide">
                <el-col>
                    <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" active-text-color="#0099cc">
                        <el-menu-item index="1">
                            <router-link :to="{ path:'edit',query:{id:$route.query.id }}">
                            <span scope="title">平台列表</span>
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <router-link :to="{ path:'msgEdit',query:{id:$route.query.id }}">
                                <span scope="title">平台信息</span>
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <router-link :to="{ path:'serverEdit',query:{id:$route.query.id }}">
                                <span scope="title">服务器信息</span>
                            </router-link>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                defaultIndex: '1',
                platformId: '',
                platformName: '',
                leftsideToggle: true,
                show: true
            }
        }
    }
</script>
<style>
    /*平台信息左侧菜单*/
    .smallLeftSide {
        height: 1300px;
        width: 100%;
        overflow-y: scroll;
    }

    .detail ::-webkit-scrollbar {
        width: 15px;
        height: 15px;
        background-color: #eee;
    }

    .detail ::-webkit-scrollbar-track {
        background: #d8d8d8;
    }

    .detail ::-webkit-scrollbar-thumb {
        border-radius: 1px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #888;
    }

    .detailMsg {
        line-height: 30px;
        height: 30px;
    }

    .detail {
        margin-top: -15px;
        margin-left: -15px;
        position: relative;
    }

    .detail .el-menu {
        background: #eaedf1;
        color: #222;
    }

    .detail .el-menu-item:hover, .detail .el-submenu .el-menu-item:hover, .detai .el-submenu__title:hover {
        background: #eee;
    }

    .detail .el-menu-item:hover, .detail .el-submenu .el-menu-item:hover, .detail .el-submenu__title:hover, .detail .el-submenu__title:hover {
        background: #eee;
    }

    .detail .el-menu-item:hover, .detail .el-submenu .el-menu-item:hover {
        background: #eee;
    }

    .detail .el-submenu__title:hover {
        background: #eee !important;
    }

    .detail .el-menu-item span, .detail .el-submenu__title span {
        font-size: 14px;
    }

    .detail .el-menu-item, .detail .el-submenu__title {
        height: 40px;
        line-height: 40px;
    }

    .detail .leftSide {
        position: fixed;
        left: 230px;
        top: 60px;
        overflow: hidden;
        width: 150px;
        background: #eaedf1;
        min-height: 900px;
        z-index: 98;
    }

    .detail .nicescroll-rails div {
        background: rgb(86, 198, 216) !important;
    }

    .detail .el-menu-item, .detail .el-submenu__title {
        font-size: 12px;
    }

    .detail .el-menu-item:focus {
        color: #00afc9;
    }

    .detail .el-menu-item span, .detail .el-submenu__title span {
        display: block;
    }

    .hidebtn {
        z-index: 99;
        position: fixed;
        top: 50%;
        left: 350px;
    }

    #hidebtn {
        border: none;
        border-bottom: 9px solid transparent;
        border-left: none;
        border-right: 18px solid #ffffff;
        border-top: 9px solid transparent;
        position: relative;
        background: none;
        width: 20px;
        height: 50px;
    }

    #hidebtn img {
        position: absolute;
        top: 9px;
        left: 13px;
        width: 16px;
    }

    .showbtn {
        z-index: 99;
        position: fixed;
        top: 50%;
        left: 230px;
    }

    #showbtn {
        border: none;
        border-bottom: 9px solid transparent;
        border-right: none;
        border-left: 18px solid #c5c3c3;
        border-top: 9px solid transparent;
        position: relative;
        background: none;
        width: 20px;
        height: 50px;
    }

    #showbtn img {
        position: absolute;
        top: 9px;
        right: 13px;
        width: 16px;
    }

    #hidebtn:focus, #showbtn:focus {
        outline: none;
    }

    /*有折叠的情况下*/
    .left-side-collapsed .hidebtn {
        left: 172px;
        z-index: 99;
    }

    .left-side-collapsed .showbtn {
        left: 52px;
    }

    .detail {
        display: inline-block
    }

    .detail .el-menu-item {
        padding: 0;
        padding-left: 0 !important;
    }

    .detail .el-menu-item a {
        color: #333;
        display: block;
    }

    .detail .el-menu-item a span {
        margin-left: 20px;
    }

    .leftSide .el-menu-item .router-link-active {
        color: #3c8dbc;
        background: #fff;
    }

    .detail .el-menu-item span:focus {
        color: #00afc9;
        outline: none;
    }

    @media (max-width: 768px) {
        .detail .hidebtn {
            position: fixed;
            top: 45%;
            left: 120px;
        }

        .detail .showbtn {
            left: 0;
            top: 45%;
        }

        .detail .leftSide {
            min-height: 800px;
        }

        .left-side-show .showbtn {
            left: 231px;
        }

        .left-side-show .hidebtn {
            left: auto;
            right: 0;
        }
    }

    .message {
        left: 230px;
    }

    .left52 {
        left: 52px !important;
    }

    @media (max-width: 768px) {
        .left52 {
            left: 0px !important;
        }
    }
</style>