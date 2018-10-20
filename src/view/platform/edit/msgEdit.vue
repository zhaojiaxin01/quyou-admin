<template>
    <div>
        <editside></editside>
        <div class="msgEdit" :style="{left:leftComputed}">
            <div class="panel">
                <div class="msgEditbox">
                    <div class="msgEditTitle">
                        <h5 class="borderLeft">平台信息</h5>
                    </div>
                    <div class="msgForm">
                        <el-form :inline="true" class="demo-form-inline">
                            <div class="bigBox">
                                <!--身份证信息-->
                                <div class="inputBox">
                                    <div class="InputGroup">
                                        <div>
                                            <el-form-item >
                                                <template scope="scope">
                                                    <div class="platlogo"><span
                                                            class="tip">*</span><label class="el-form-item__label">平台Logo：</label>
                                                    </div>
                                                    <div style="display: inline-block;">
                                                        <el-upload
                                                                class="avatar-uploader"
                                                                action="https://quyou.l520.net/admin.php/file/uploadfile"
                                                                :show-file-list="false"
                                                                :headers="myHeaders"
                                                                :on-success="handleAvatarSuccess"
                                                                :before-upload="beforeAvatarUpload">
                                                            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                        </el-upload>
                                                    </div>
                                                </template>
                                            </el-form-item>
                                            <div class="clearfix"></div>
                                            <el-form-item prop="card" :inline-message="true">
                                                <template scope="scope">
                                                    <div class="inputbox">
                                                        <span class="tip">*</span><label class="el-form-item__label">身份证号码：</label>
                                                        <el-input v-model="info.card" placeholder="请输入身份证号码"></el-input>
                                                    </div>
                                                </template>
                                            </el-form-item>
                                        </div>
                                        <div>
                                            <el-form-item prop="maps">
                                                <template scope="scope">
                                                    <div class="inputbox">
                                                        <span class="tip">*</span><label class="el-form-item__label">身份证地址：</label>
                                                        <el-input v-model="info.maps" placeholder="请输入身份证地址"></el-input>
                                                    </div>
                                                </template>
                                            </el-form-item>
                                        </div>
                                        <div>
                                            <el-form-item prop="mobile">
                                                <template scope="scope">
                                                    <div class="inputbox">
                                                        <span class="tip">*</span><label class="el-form-item__label">手机号码：</label>
                                                        <el-input v-model="info.mobile" placeholder="请输入手机号码"></el-input>
                                                    </div>
                                                </template>

                                            </el-form-item>
                                        </div>
                                        <!--上传身份证照片-->
                                        <div>
                                            <el-form-item>
                                                <template scope="scope">
                                                    <div style="display: inline-block;float: left;"><span
                                                            class="tip">*</span><label class="el-form-item__label">身份证照片：</label>
                                                    </div>
                                                    <div class="idCard" style="display: inline-block;">
                                                        <el-upload
                                                                class="avatar-uploader"
                                                                action="https://quyou.l520.net/admin.php/file/uploadfile"
                                                                :show-file-list="false"
                                                                :headers="myHeaders"
                                                                :on-success="handleAvatarSuccess1"
                                                                :before-upload="beforeAvatarUpload">
                                                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                        </el-upload>
                                                    </div>
                                                    <div class="idCard" style="display: inline-block;">
                                                        <el-upload
                                                                class="avatar-uploader"
                                                                action="https://quyou.l520.net/admin.php/file/uploadfile"
                                                                :show-file-list="false"
                                                                :headers="myHeaders"
                                                                :on-success="handleAvatarSuccess2"
                                                                :before-upload="beforeAvatarUpload">
                                                            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                        </el-upload>
                                                    </div>
                                                    <div class="clearfix"></div>
                                                    <div style="font-size: 12px;color: #999;">
                                                        <span class="tip">*</span><span>请上传授权人身份证正反面照片，支持jpg、png、gif、bmp、jpeg格式，大小不超于2M的图片</span><br>
                                                    </div>
                                                </template>
                                            </el-form-item>
                                        </div>
                                        <div>
                                            <el-form-item label="备注信息：">
                                                <template scope="scope">
                                                    <div class="col-md-4 col-xs-12">
                                                        <div class="set">
                                                            <div id="ueditor" type="text/plain"></div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                                <!--客服平台信息-->
                                <div class="inputBox">
                                    <div class="InputGroup">
                                        <el-form-item label="客服平台名称：">
                                            <el-input v-model="info.kefu.name" placeholder="请输入客服平台名称"></el-input>
                                        </el-form-item>
                                        <br/>
                                        <el-form-item label="客服平台地址：">
                                            <el-input v-model="info.kefu.url" placeholder="请输入客服平台地址"></el-input>
                                        </el-form-item>
                                        <br/>
                                        <el-form-item label="客服平台账户：">
                                            <el-input v-model="info.kefu.user" placeholder="请输入账户"></el-input>
                                        </el-form-item>
                                        <br/>
                                        <el-form-item label="客服平台密码：">
                                            <el-input type="password" v-model="info.kefu.pwd" placeholder="请输入密码"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <!--短信平台信息-->
                                <div class="inputBox">
                                    <div class="InputGroup">
                                        <el-form-item label="短信平台名称：">
                                            <el-input v-model="info.sms.name" placeholder="请输入短信平台名称"></el-input>
                                        </el-form-item>
                                        <br/>
                                        <el-form-item label="短信平台地址：">
                                            <el-input v-model="info.sms.url" placeholder="请输入短信平台地址"></el-input>
                                        </el-form-item>
                                        <br/>
                                        <el-form-item label="短信平台账户：">
                                            <el-input v-model="info.sms.user" placeholder="请输入账户"></el-input>
                                        </el-form-item>
                                        <br/>
                                        <el-form-item label="短信平台密码：">
                                            <el-input type="password" v-model="info.sms.pwd" placeholder="请输入名称"></el-input>
                                        </el-form-item>
                                        <br/>
                                    </div>
                                </div>
                                <!--邮箱信息-->
                                <div class="inputBox">
                                    <div class="InputKfGroup">
                                        <el-form-item label="邮箱地址：">
                                            <el-input v-model="info.exmail.url" placeholder="请输入邮箱地址"></el-input>
                                        </el-form-item>
                                        <br/>
                                        <el-form-item label="邮箱账户：">
                                            <el-input v-model="info.exmail.user" placeholder="请输入邮箱账户"></el-input>
                                        </el-form-item>
                                        <br/>
                                        <el-form-item label="邮箱密码：">
                                            <el-input type="password" v-model="info.exmail.pwd" placeholder="请输入邮箱密码"></el-input>
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="inputBox">
                                    <div class="InputKfGroup">
                                        <div>
                                            <el-form-item label="阿里云账户：">
                                                <el-input v-model="info.aliyun.user" placeholder="请输入阿里云账户"></el-input>
                                            </el-form-item>
                                        </div>
                                        <div>
                                            <el-form-item label="阿里云密码：">
                                                <el-input type="password" v-model="info.aliyun.pwd" placeholder="请输入阿里云密码"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                                <!--提交-->
                                <div class="msgSavebtn">
                                    <el-button type="primary" @click="msgSave">保存</el-button>
                                    <el-button type="primary" @click="goback">返回</el-button>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import editside from '@/view/platform/edit/editside.vue';
    import { getCookie } from '@/util/util.js';
    const usertoken = getCookie('user_token');
    export default {
        data() {
            return {
                msg:[],
                imageUrl1: '',
                imageUrl2: '',
                imageUrl3: '',
                myHeaders: { token: usertoken },
                info: {
                    // 身份信息
                    card: '',
                    maps: '',
                    mobile: '',
                    note: '',
                    img: {},
                    note:'',
                    // 客服信息
                    kefu: {
                        name: '',
                        url: '',
                        user: '',
                        pwd: '',
                        code: ''
                    },
                    // 短信信息
                    sms: {
                        name: '',
                        url: '',
                        user: '',
                        pwd: '',
                    },
                    // 邮箱信息
                    exmail: {
                        url: '',
                        user: '',
                        pwd: ''
                    },
                    // 阿里云信息
                    aliyun: {
                        user: '',
                        pwd: '',
                    },
                },
            };
        },
        created(){
            this.init();
        },
        methods: {
            init(){
                const id = this.$route.query.id;
                this.$post('admin.php/platform/getInfo',{ id: id }).then(res =>{
                    // 初始化信息
                  if(res.code === 0){
                      this.msg = res.data;
                      this.info.card = this.msg.id_card;
                      this.info.maps = this.msg.id_maps;
                      this.info.mobile = this.msg.mobile;
                      this.info.kefu = JSON.parse(this.msg.kf_info);
                      this.info.sms = JSON.parse(this.msg.sms_info);
                      this.info.aliyun = JSON.parse(this.msg.aliyun_user);
                      this.info.exmail = JSON.parse(this.msg.exmail);
                      this.info.img = JSON.parse(res.data.img_url);
                      const img = JSON.parse(res.data.img_url);
                      if(img[2]){
                          this.imageUrl1 = 'https://quyou.l520.net/'+img[2];
                      }
                      this.imageUrl2=  'https://quyou.l520.net/'+img[0];
                      this.imageUrl3 =  'https://quyou.l520.net/'+img[1];
                  }
                  else{
                      this.$message({
                          type:'error',
                          message:res.msg
                      })
                  }
                }).catch(err =>{
                    console.log(err);
                })
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPng = file.type === 'image/png';
                const isGif = file.type === 'image/gif';
                const isBmp = file.type === 'image/bmp';
                const isJpeg = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;
                return (!isJPG || !isPng || !isGif || !isBmp || !isJpeg) && isLt2M;
            },// 上传前检验格式大小
            handleAvatarSuccess(res, file) {
                this.imageUrl1 = URL.createObjectURL(file.raw);
                this.info.img[2] = res.data;
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
            },//上传LOGO
            handleAvatarSuccess1(res, file) {
                this.imageUrl2= URL.createObjectURL(file.raw);
                this.info.img[0] = res.data;
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
            },//上传身份证1成功后
            handleAvatarSuccess2(res, file) {
                this.imageUrl3 = URL.createObjectURL(file.raw);
                this.info.img[1] = res.data;
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
            },//上传身份证2成功后
            goback(){
                this.$router.push({path:'platform'})
            },
            msgSave(){
                const id = this.$route.query.id;
                if (!(this.info.card && this.info.maps && this.info.mobile)) {
                    this.$message({
                        message: '身份证信息未填写完整！',
                        type: 'warning'
                    });
                }
                // else if (!(this.info.img[0] && this.info.img[1])) {
                //     this.$message({
                //         message: '请上传身份证正反面照片！',
                //         type: 'warning'
                //     });
                // }
                else {
                    let _this = this;
                    this.info.note = UE.getEditor('ueditor').getContent();
                    this.$post('admin.php/platform/editPlatform',{id:id,type:'1',card:this.info.card,maps:this.info.maps,mobile:this.info.mobile,
                        aliyun_user:this.info.aliyun,img:this.info.img,exmail:this.info.exmail,sms_info:this.info.sms,kf_info:this.info.kefu,note:this.info.note}).then(res =>{
                            console.log(res);
                            if(res.code === 'success'){
                            this.$message({
                                type:'success',
                                message:res.msg+'，3秒后自动跳转至平台列表'
                            });
                            setTimeout(function () {
                                _this.$router.push({path:'platform'});
                            },2000)
                        }
                        else{
                            this.$message({
                                type:'error',
                                message:res.msg
                            })
                        }
                    }).catch(err =>{
                        console.log(res);
                    })
                }
            }
        },
        computed: {
            leftComputed() {
                if (this.$store.state.show) {
                    if (!this.$store.state.leftSideshow) {
                        // console.log("头部收缩，左边隐藏。");
                        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                            return '0'
                        }
                        else {
                            return '52px';
                        }
                    }
                    if (this.$store.state.leftSideshow) {
                        // console.log("头部收缩，左边展开。");
                        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                            return '150px'
                        }
                        else {
                            return '202px';
                        }

                    }
                }
                if (!this.$store.state.show) {
                    if (!this.$store.state.leftSideshow) {
                        // console.log("头部不收缩，左边隐藏。");
                        return '230px';
                    }
                }
            }

        },
        components: {
            editside
        },
        mounted() {
            this.ue = UE.getEditor('ueditor', {
                BaseUrl: '',
                UEDITOR_HOME_URL: 'static/utf8-jsp/',
                toolbars: [
                    ['fullscreen', 'source', 'undo', 'redo'],
                    ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
                ]
            })
        },
        // 销毁实例
        destroyed() {
            // 将editor进行销毁
            this.ue.destroy();

        }
    };
</script>

<style>
    .msgEdit {
        display: block;
        position: fixed;
        top: 60px;
        left: 380px;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }
    .msgEdit .panel{min-height: 900px;}
    .cart{ width: 0;
        height: 0;
        border-top: 50px solid transparent;
        border-bottom: 50px solid transparent;
        border-left: 50px solid orange;}
    .msgEditbox{padding: 15px 30px;}
    .msgEdit  .msgEditTitle{    border-left: 3px solid #0099cc;margin-bottom: 30px;}
    .msgEdit  .msgEditTitle h5{padding-left: 10px;font-weight: bold;text-shadow: 1px 1px 1px #ccc;}
    /*照片上传*/
    .msgEdit .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .msgEdit .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .msgEdit .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 200px;
        text-align: center;
    }

    .msgEdit .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .msgEdit .el-form--inline .el-form-item__label{width: 120px;}
    .idCard .avatar-uploader-icon{ width: 300px;
        height: 200x;margin-right: 15px;}
    .idCard .avatar{width: 300px;height: 200px;}
    .idCard .el-upload{margin-right: 15px;}
    .msgEdit input[type=file] {
        display: none;
    }
    @media(min-width: 768px){
        .msgEdit .platlogo{display: inline-block;float: left;}
    }
    .msgEdit .tip{color:red;margin-right: 5px;}
    .msgForm{margin-bottom: 80px;}
    .msgEdit .bigBox{padding-left: 30px;}
    .msgEdit .inputBox{margin-bottom: 30px;}
    .msgEdit #edui1_iframeholder{min-height: 200px;}
    .msgEdit .el-input{width: auto;}
    .msgEdit .msgSavebtn{padding: 0 30px;margin-bottom: 30px;}
    @media(max-width: 768px){
        .msgEdit .bigBox{padding:15px 20px;}
        .msgEditbox{padding: 15px;}
        .msgEdit .el-form-item__label{text-align: left;}
        .msgEdit .col-xs-12{padding: 0;}

    }
    .serverEditBox .el-form-item__label{text-align: left;}

</style>
