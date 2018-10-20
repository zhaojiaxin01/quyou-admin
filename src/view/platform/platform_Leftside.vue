<template>
    <div class="detail">
        <div class="hidebtn" :style="{left:btnLeft}">
            <div id="hidebtn" ref="hidebtn" @click="$store.state.leftSideshow = !$store.state.leftSideshow"
                    v-show="$store.state.leftSideshow">
                <img src="../../assets/images/shousuo.png" alt="">
            </div>
        </div>
        <div class="showbtn" :style="{left:btnLeft}">
            <div id="showbtn" ref="showbtn" @click="$store.state.leftSideshow = true"
                    v-show="!$store.state.leftSideshow">
                <img src="../../assets/images/zhankai.png" alt="">
            </div>
        </div>
        <div class="leftSide" id="leftSide" ref="leftside" v-show="$store.state.leftSideshow" :style="{left:leftComputed}">
            <div class="smallLeftSide">
                <el-col>
                    <el-menu :default-active="defaultIndex" class="el-menu-vertical-demo" active-text-color="#0099cc">
                        <el-menu-item index="1">
                            <router-link
                                    :to="{path:'/message', query: { platformId: $route.query.platformId,platformName:$route.query.platformName}}">
                                <span scope="title">基本信息</span></router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <router-link
                                    :to="{ path: '/serverManage', query: { platformId: $route.query.platformId,platformName:$route.query.platformName} }">
                                <span scope="title">服务器</span></router-link>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <router-link
                                    :to="{ path: '/domain', query: { platformId: $route.query.platformId,platformName:$route.query.platformName} }">
                                <span scope="title">域名</span></router-link>
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
            }
        },
        computed:{
             leftComputed() {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    if (this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                                return '52px';
                        }
                        else{
                            return '230px'

                        }
                    }
                    if (!this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                            return '0';
                        }
                        else{
                             return '0';
                        }
                    }
                           
                }
                else{
                    if (this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                            return '230px';
                        }
                        else{
                           return '230px';

                        }
                    }
                    if (!this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                            return '52px';
                        }
                        else{
                            return '52px';
                        }
                    }
                }
               
            },
            btnLeft() {
                console.log(this.$store.state.show,!this.$store.state.leftSideshow)
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    if (this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                                return '230px';
                        }
                        else{
                            return '360px'

                        }
                    }
                    if (!this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {

                            return '0';
                        }
                        else{
                             return '130px';
                        }
                    }
                           
                }
                else{
                    if (this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                            return '230px';
                        }
                        else{
                           return '360px';

                        }
                    }
                    if (!this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                            return '52px';
                        }
                        else if(this.$store.state.leftSideshow){
                            return '182px';
                        }
                    }
                }
               
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
        top: 60px;
        overflow: hidden;
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

    .hidebtn{
        position: fixed;
        top: 50%;
        z-index: 99;
    }
    #hidebtn {
        border: none;
        border-bottom: 9px solid transparent;
        border-left: none;
        border-right: 18px solid #ffffff;
        border-top: 9px solid transparent;
        background: none;
        width: 20px;
        height: 50px;
    }

    #hidebtn img {
        position: absolute;
        top: 16px;
        left: 5px;
        width: 16px;
    }
    .showbtn{
        z-index: 99;
        position: fixed;
        top: 50%;
    }
    #showbtn {
        border: none;
        border-bottom: 9px solid transparent;
        border-right: none;
        border-left: 18px solid #c5c3c3;
        border-top: 9px solid transparent;
        background: none;
        width: 20px;
        height: 50px;
    }

    #showbtn img {
        position: absolute;
        top: 16px;
        right: 5px;
        width: 16px;
    }

    #hidebtn:focus, #showbtn:focus {
        outline: none;
    }

    /*有折叠的情况下*/
    .left-side-collapsed .hidebtn {
        left: 182px;
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
            left: 130px;
        }

        .detail .showbtn {
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

/*
    @media (max-width: 768px) {
        .left52 {
            left: 0px !important;
        }
    }*/
    .detail .el-menu-vertical-demo:not(.el-menu--collapse){
        top: 60px;
        width: 150px;
    }
</style>