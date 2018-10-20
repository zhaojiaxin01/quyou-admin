<template>
<div class="login-bg">
    <div class="login" >
    <div class="message">后台系统登录</div>
        <div class="login_title">登录</div>
        <div id="darkbannerwrap"></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
            <hr class="hr15">
            <hr class="hr15">
            <button class="btn btn-lg btn-login btn-block" type="button" @click="submitForm('ruleForm')">
                <i class="fa fa-check"></i>
            </button>
            <hr class="hr20" >
        </el-form>
    </div>
</div>
</template>

<script>
import { setCookie, getCookie, delCookie } from '@/util/util.js'
import { post } from '@/util/http.js'
import swal from 'sweetalert';
export default{
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      user_token:'',
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  beforeCreate: function() {
      document.getElementsByTagName("body")[0].className="loginBg";
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const self = this;
          delCookie('user_token');
          this.$post('admin.php/login',{ username: this.ruleForm.username, password: this.ruleForm.password }).then(res => {
            self.user_token = res.data.user_token;
            if (res.code !== 0) {
              swal('提示信息!', '登录失败，'+ res.msg, 'error');
              return false;
            }
            else {
              console.log("我登录了")
              setCookie('user_token', this.user_token, 1);// 设置token过期为1天
              localStorage.setItem('memberId', res.data.member_id);
              localStorage.setItem('nickname', res.data.nickname);
              self.$router.push('/platform');
            }
          }).catch(err =>{
            console.log(err);
          });
        }
        else {
          console.log('信息提交失败');
          return false;
        }
      });
    }
  }
}
</script>

<style>
    @import '../../assets/css/login.css';
    .loginBg {
        background: url(../../../static/images/login_bg.png) no-repeat center;
        background-size: cover;
        overflow: hidden;
    }
    .login .el-form-item__content {
        margin-left: 0 !important;
    }
    .login .btn-block {
        padding: 12px;
        background: #2f8790;
    }

    .login  .btn-login i {
        font-size: 30px;
        color: #fff;
    }

    .login  button:focus {
        outline: none;
        border: none;
    }

    .login  .btn-login:hover {
        background-color: #236269 !important;
        transition: all 1s;
    }

    @media (max-width: 768px) {
        .login {
            width: 85%;
        }
    }

    .login  .el-form-item__content {
        display: block;
    }
</style>


