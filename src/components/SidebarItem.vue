<template>
    <div class="menu-wrapper">
        <template v-for="item in routes">
            <router-link v-if="!item.hidden&&item.children&&item.children.length===1" :to="item.children[0].path"
                         :key="item.children[0].name">
                <el-menu-item :index="item.children[0].path" class='submenu-title-noDropdown menu-list'>
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span v-if="item.children[0].meta&&item.children[0].name"
                          class="title">{{item.children[0].name}}</span>
                </el-menu-item>
            </router-link>
            <el-submenu v-if="!item.hidden&&item.children&&item.children.length>1" :index="item.name||item.path"
                        :key="item.name" class="menu-list">
                <template slot="title">
                    <i v-if="item.icon" :class="item.icon"></i>
                    <span class="title">{{item.name}}</span>
                </template>
                <template v-if="!child.hidden" v-for="child in item.children">
                    <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]"
                                  :key="child.path"></sidebar-item>
                    <router-link v-else :to="item.path+child.path" :key="child.name">
                        <el-menu-item :index="item.path+child.path">
                            <i v-if="child.meta&&child.icon" :class="child.icon"></i>
                            <span v-if="child.meta&&child.name">{{child.name}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    export default {
      name: 'SidebarItem',
      props: {
        routes: {
          type: Array
        }
      },
      data() {
        return {
          currentPath: '',
          routePath: ''
        }
      },
      beforeUpdate() {
            // switch(this.$route.path){
            //     case '/message':this.routePath = '/message';break;
            //     case '/serverManage':this.routePath = '/serverManage';break;
            //     case '/aplatMsg/step1':this.routePath = '/aplatMsg/step1';break;
            //     case '/aplatMsg/step2':this.routePath = '/aplatMsg/step2';break;
            //     case '/aplatMsg/step3':this.routePath = '/aplatMsg/step3';break;
            // }
            // this.currentPath =  this.$route.path;
            // console.log(this.$route.path);
      }
    }
</script>
<style>
    @media (max-width: 768px) {
        .custom-nav .is-opened .sub-menu-list {
            display: block;
        }
    }

    .active {
        color: #00afc9 !important;
    }
</style>