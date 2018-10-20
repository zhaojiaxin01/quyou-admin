<template>
	<div class="page-heading breadcrumbBox">
            <el-breadcrumb class="app-levelbar" separator="/">
                <el-breadcrumb-item v-for="(item,index)  in itemList" :key="item">
               <!--    <router-link v-if='item.redirect==="noredirect"||index==itemList.length-1' to="" class="no-redirect">{{item.name}}</router-link> -->
                  <router-link :to="item.path">{{item.name}}</router-link>
                </el-breadcrumb-item>
            </el-breadcrumb>
    </div>
</template>
<script>
    export default {
      created() {
        this.getBreadcrumb()
      },
      data() {
        return {
          itemList: null
        }
      },
      methods: {
        getBreadcrumb() {
          let matched = this.$route.matched.filter(item => item.name);
          const first = matched[0];
          // if (first && (first.name !== '首页' || first.path !== '')) {
          //   matched = [{ name: '首页', path: '/platform' }].concat(matched)
          // }
          this.itemList = matched;

        }
      },
      watch: {
        $route() {
          this.getBreadcrumb();
        }
      }
    }
</script>
<style scoped>
    .el-breadcrumb{padding-top:0;padding-bottom: 15px;}
    .page-heading{padding: 5px 0px;}
</style>