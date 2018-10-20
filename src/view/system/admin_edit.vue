<template>
    <div class="adminEdit">
        <div class="panel">
            <header class="panel-heading custom-tab ">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <router-link :to="{path:'adminEdit',query : { id: this.id }}">修改用户</router-link>
                    </li>
                    <li class="">
                        <router-link :to="{path:'userGroup',query : { id: this.id }}">设置权限组</router-link>
                    </li>

                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content">
                    <div class="tab-pane active" id="home">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                                 class="demo-ruleForm">
                            <el-form-item label="用户名" prop="nickname">
                                <el-input v-model="ruleForm.nickname" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="pass">
                                <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="passComfirm">
                                <el-input type="password" v-model="ruleForm.passComfirm" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="phone">
                                <el-input v-model="ruleForm.phone" placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="头像上传" prop="phone">
                                <template scope="scope">
                                    <el-upload
                                            class="avatar-uploader"
                                            action="https://quyou.l520.net/admin.php/file/uploadfile"
                                            :show-file-list="false"
                                            :headers="myHeaders"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                        <img v-if="imageUrl" :src="'https://quyou.l520.net'+imageUrl" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </template>
                            </el-form-item>

                            <el-form-item label="状态">
                                <template>
                                    <el-switch v-model="ruleForm.status" active-color="#13ce66" inactive-color="#ff4949"
                                               :on-value="1" :off-value="0">
                                    </el-switch>
                                </template>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button type="primary" @click="toBack">返回</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getCookie} from '@/util/util.js';

    const usertoken = getCookie("user_token");
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (this.ruleForm.pass != '') {
                    if (value !== this.ruleForm.pass) {
                        callback(new Error('两次输入密码不一致!'));
                    }
                    else {
                        callback();
                    }
                }
                else {
                    callback();
                }
            };
            var validateMobile = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                } else {
                    if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(value))) {
                        callback(new Error('手机号码错误!'));
                    }
                    callback();
                }
            };
            return {
                myHeaders: {token: usertoken},
                initDate: [],
                id: '',
                imageUrl: '',
                portrait: '', // 头像地址
                ruleForm: {
                    passComfirm: '',
                    nickname: '',
                    region: '',
                    email: '',
                    phone: '',
                    status: 1,
                    pass: '',
                },

                rules: {
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                    ],
                    passComfirm: [
                        {validator: validatePass, trigger: 'blur'}

                    ],
                    phone: [
                        {validator: validateMobile, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                    ],
                }
            };
        },
        created() {
            this.init();
        },

        methods: {
            init() {
                const data = localStorage.getItem("rowData");
                this.initData = JSON.parse(data);
                this.ruleForm.nickname = this.initData.nickname;
                this.ruleForm.phone = this.initData.mobile;
                this.ruleForm.email = this.initData.email;
                this.id = this.$route.query.id;
                this.ruleForm.status = this.$route.query.status;
                // 初始化头像
                this.$post('admin.php/member/getPortrait', {id: this.id}).then(res => {
                    if (res.code === 0) {
                        this.imageUrl = res.data.portrait;
                    }
                })

            },
            // 返回
            toBack() {
                this.$router.push('admin');
            },
            // 上传前检查
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPng = file.type === 'image/png';
                const isGif = file.type === 'image/gif';
                const isBmp = file.type === 'image/bmp';
                const isJpeg = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isJPG && !isPng && !isGif && !isBmp && !isJpeg) {
                    this.$message.error('上传头像图片只能是jpg、png、gif、bmp、jpeg格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return (!isJPG || !isPng || !isGif || !isBmp || !isJpeg) && isLt2M;
            },// 上传前检验格式大小
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.portrait = res.data // 头像
                if (res.code === 0) {
                    this.$message({
                        message: '上传成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            },//上传头像成功后
            submitForm(formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post('admin.php/member/memberEdit', {
                            id: this.id,
                            nickname: this.ruleForm.nickname,
                            portrait: this.portrait,
                            password: this.ruleForm.pass,
                            email: this.ruleForm.email,
                            mobile: this.ruleForm.phone,
                            status: this.ruleForm.status
                        }).then(res => {
                            if (res.code == 'success') {
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                localStorage.removeItem("rowData");
                            }
                            else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(err => {
                            console.log(err);
                        })

                    }
                    else {
                        console.log('修改失败！填写有误！');
                        return false;
                    }
                });
            }
        },

    }
</script>

<style rel="stylesheet">
    .adminEdit {
        margin-top: 60px;
    }

    .adminEdit .el-input {
        width: 20%;
    }

    @media (max-width: 768px) {
        .adminEdit .el-input {
            width: 100%;
        }
    }

    .adminEdit .el-form-item__content {
        display: block !important;
    }

    .adminEdit .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: relative;
        display: inline-block;
        top: 100%;
        left: 15px;
    }

    .gobackBtn {
        color: #fff;
    }

    .gobackBtn:hover {
        color: #fff !important;
    }

    .adminEdit .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .adminEdit .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .adminEdit .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .adminEdit .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    input[type=file] {
        display: none;
    }
</style>