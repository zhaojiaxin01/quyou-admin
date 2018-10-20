<template>
        <div class="header-section">
            <!--切换按钮-->
            <div class="visible-xs">
                <a class="toggle-btn"><i class="fa fa-dedent fa-fw"></i></a>
            </div>
            <div class="visible-lg">
                <a class="toggle_btn"><i class="fa fa-dedent fa-fw"></i></a>
            </div>
            <!--切换按钮结束-->

            <!--搜索-->
            <!-- <form class="searchform" action="index.html" method="post">
              <input type="text" class="form-control" name="keyword" placeholder="请输入关键字" />
            
            </form> -->
            <!--搜索结束-->

            <!--通知菜单 -->
            <div class="menu-right">
                <ul class="notification-menu">
                    <li>
                        <a href="#" class="btn btn-default dropdown-toggle info-number" data-toggle="dropdown">
                            <i class="fa fa-bell-o"></i>
                            <span class="badge">4</span>
                        </a>
                        <div class="dropdown-menu dropdown-menu-head pull-right">
                            <h5 class="title">Notifications</h5>
                            <ul class="dropdown-list normal-list">
                                <li class="new">
                                    <a href="">
                                        <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                        <span class="name">Server #1 overloaded.  </span>
                                        <em class="small">34 mins</em>
                                    </a>
                                </li>
                                <li class="new">
                                    <a href="">
                                        <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                        <span class="name">Server #3 overloaded.  </span>
                                        <em class="small">1 hrs</em>
                                    </a>
                                </li>
                                <li class="new">
                                    <a href="">
                                        <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                        <span class="name">Server #5 overloaded.  </span>
                                        <em class="small">4 hrs</em>
                                    </a>
                                </li>
                                <li class="new">
                                    <a href="">
                                        <span class="label label-danger"><i class="fa fa-bolt"></i></span>
                                        <span class="name">Server #31 overloaded.  </span>
                                        <em class="small">4 hrs</em>
                                    </a>
                                </li>
                                <li class="new"><a href="">See All Notifications</a></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <a href="#" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                            <div class="headPicbox"><img src="../assets/images/photos/user1.jpg" alt="" /></div>
                            <span class="username">夹心卷心菜</span>
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-usermenu pull-right">
                            <li><a href="#"><i class="fa fa-user"></i>  个人中心</a></li>
                            <li><a href="#"><i class="fa fa-cog"></i>设置</a></li>
                            <li @click="logOut"><a href="javascript:;"><i class="fa fa-sign-out"></i>退出登录</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!--通知菜单结束 -->
        </div>
</template>
<script>
import { delCookie } from '@/util/util.js';
export default{
  data() {
    return {
    }
  },
  methods: {
    logOut(){
      delCookie('user_token');
      this.$router.push('/login');
    }
  }
}
</script>
<style>
    .notification-menu .info-number{padding: 17px 20px;}
    .info-number .badge{right: 10px;top:12px;}
    @media(max-width: 768px){
        .tpwthwidt{display: none;}
    }
    .toggle_btn{width: 52px;height: 60px;line-height: 60px;font-size: 20px;padding: 0 15px;cursor: pointer;float: left;color: #212121;border-right: 1px solid #e7e7e7;}
    .toggle_btn:hover{background-color: rgb(71, 180, 214);}
    .toggle_btn:hover .fa-fw{color: #fff;}
</style>

