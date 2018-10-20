<template>
    <div class=" stepBox">
        <div class="panel">
            <el-steps :active="active" finish-status="success" simple>
                <el-step title="步骤1(必填)"></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3"></el-step>
            </el-steps>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          active: 1,
        }
      },
      beforeUpdate() {
        switch (this.$route.path) {
          case '/aplatMsg/step1':this.active = 1; break;
          case '/aplatMsg/step2':this.active = 2; break;
          case '/aplatMsg/step3':this.active = 3; break;
        }
      }
    }
</script>
<style>
    .next {
        margin-top: 12px;
        margin-bottom: 30px;
        margin-left: 12%;
        width: 150px;
        background: #39bfe2;
        color: #fff;
        border-color: #39bfe2;
    }

    .next:focus {
        outline: none;
        border-color: #39bfe2;
        color: #fff;
    }

    .next:hover {
        color: #fff;
    }
    .stepBox{margin-top: 60px;}
    .stepBox .panel {
        box-shadow: none;
    }

    .stepBox .el-steps {
        background: #fff;
        padding: 15px 30px;
        width: 100%;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        /*.stepBox .el-step.is-horizontal{width: 45% !important;}*/
        .next {
            width: auto;
        }

        .el-dialog--tiny {
            width: 85%;
        }
    }

    .stepBox .el-step__head.is-text.is-success {
        background-color: #00b8f5;
        border-color: #62c7ec;
    }

    .stepBox .el-step__title.is-success {
        font-weight: 700;
        color: #4fb5e6;
    }

    .stepBox .el-step__line-inner {
        transition-delay: 0ms;
        width: 50%;
        content: '';
        background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0));
        -webkit-background-size: 40px 40px;
        background-size: 40px 40px;
        background-color: #00b8f5;
        float: left;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10px;
        transition: all 0.5s ease-in-out;
        -webkit-transition: all 0.5s ease-in-out;
        animation: progress-bar-stripes 2s linear infinite;
    }

    .stepBox .el-step__line.is-horizontal {
        top: 10px;
        height: 11px;
        left: 32px;
        right: 0;
        background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0));
        -webkit-background-size: 40px 40px;
        background-size: 40px 40px;
        background-color: #ebebeb;
    }

    .stepBox .el-step__icon {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        line-height: 2rem;
        box-shadow: 0 0 0 5px #ebebeb;
    }

    /*.stepBox .el-step__head.is-text.is-process{background: #fff;color: #999;}*/
    .stepBox .el-step__head.is-text.is-process {
        color: #e6e0e0;
        background-color: #ffffff;
        border-color: #bfcbd9;
    }
</style>