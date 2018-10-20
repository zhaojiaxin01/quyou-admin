<template>
    <div class="addPlat">
        <el-form :inline="true" class="demo-form-inline">
            <div class="bigBox">
                <!--身份证信息-->
                <div class="inputBox">
                    <h5>身份证信息</h5>
                    <div class="InputGroup">
                        <div>
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
                                    <div class="idcardText">
                                        <span class="tip">*</span>
                                        <label class="el-form-item__label">上传身份证照片：</label>
                                    </div>
                                    <div class="col-xs-6 zm" style="width: 200px;">
                                        <el-upload
                                                class="avatar-uploader"
                                                action="https://quyou.l520.net/admin.php/file/uploadfile"
                                                :show-file-list="false"
                                                :headers="myHeaders"
                                                :on-success="handleAvatarSuccess1"
                                                :before-upload="beforeAvatarUpload">
                                            <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </div>
                                    <div class="col-xs-6 fm" style="width: 200px;">
                                        <el-upload
                                                class="avatar-uploader"
                                                action="https://quyou.l520.net/admin.php/file/uploadfile"
                                                :show-file-list="false"
                                                :headers="myHeaders"
                                                :on-success="handleAvatarSuccess2"
                                                :before-upload="beforeAvatarUpload">
                                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
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
                                    <div class="col-md-5 col-xs-12">
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
                    <h5>客服平台信息</h5>
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
                    <h5>短信平台信息</h5>
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
                    <h5>邮箱信息</h5>
                    <div class="InputKfGroup">
                        <el-form-item label="地址：">
                            <el-input v-model="info.exmail.url" placeholder="请输入邮箱地址"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="账户：">
                            <el-input v-model="info.exmail.user" placeholder="请输入邮箱账户"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="密码：">
                            <el-input type="password" v-model="info.exmail.pwd" placeholder="请输入邮箱密码"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="inputBox">
                    <h5>阿里云信息</h5>
                    <div class="InputKfGroup">
                        <div>
                            <el-form-item label="账户：">
                                <el-input v-model="info.aliyun.user" placeholder="请输入阿里云账户"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="密码：">
                                <el-input type="password" v-model="info.aliyun.pwd" placeholder="请输入阿里云密码"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <!--提交-->
            </div>
           <div class="step2btn">
               <el-button style="margin-top: 12px;" @click="prev" class="next" ref="next">上一步</el-button>
               <el-button style="margin-top: 12px;" @click="next" class="next" ref="next">下一步</el-button>
           </div>
        </el-form>
    </div>
</template>

<script>
    import { getCookie } from '@/util/util.js';
    const usertoken = getCookie('user_token');
    export default {
      data() {
        return {
          ue: '',
          active: 2,
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
            aliyun: {
               user: '',
               pwd: '',
            },
          },
          localInfo: ''
        }
      },
      created() {
        this.init();
      },
      methods: {
        init() {
          const step1Info = localStorage.getItem("step1Info");
          this.localInfo = JSON.parse(step1Info);
          if (localStorage.getItem("step2Info")) {
            const step2Info = JSON.parse(localStorage.getItem("step2Info"));
            this.info.card = step2Info.info.card;
            this.info.maps = step2Info.info.maps;
            this.info.mobile = step2Info.info.mobile;
            this.info.note = step2Info.info.note;
            this.info.kefu = step2Info.info.kefu;
            this.info.sms = step2Info.info.sms;
            this.info.exmail = step2Info.info.exmail;
            this.info.aliyun = step2Info.info.aliyun;
          }
        },
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
        handleAvatarSuccess1(res, file) {
          if (res.code === 0) {
            this.$message({
              message: '上传成功！',
              type: 'success'
            });
            this.imageUrl1 = URL.createObjectURL(file.raw);
            this.info.img[0] = res.data;
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        },//上传身份证1成功后
        handleAvatarSuccess2(res, file) {
          if (res.code === 0) {
            this.$message({
              message: '上传成功！',
              type: 'success'
            });
            this.imageUrl2 = URL.createObjectURL(file.raw);
            this.info.img[1] = res.data;
          } else {
            this.$message({
            message: res.msg,
            type: 'error'
            });
          }
        },//上传身份证2成功后
        prev() {
          this.$router.push('step1');
        },
        // submit() {
        //   console.log(this.content);
        //   this.$message.success('提交成功！');
        // },
        next() {
            console.log(this.info.img[0],this.info.img[1]);
          if (!(this.info.card && this.info.maps && this.info.mobile)) {
            this.$message({
              message: '身份证信息未填写完整！',
              type: 'warning'
            });
          }
          // else if (!(this.info.img[0] && this.info.img[1])) {
          //   this.$message({
          //     message: '请上传身份证正反面照片！',
          //     type: 'warning'
          //   });
          // }
          else {
            this.info.note = UE.getEditor('ueditor').getContent();
            this.localInfo.info = this.info;
            const info = JSON.stringify(this.localInfo);
            localStorage.setItem("step2Info", info);
            this.$router.push('step3');
          }
        }
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
    }


</script>

<style>
    .addPlat .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .addPlat .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .addPlat .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .addPlat .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .addPlat .el-upload__input {
        display: none;
    }

    .el-select-dropdown__item.selected {
        background-color: #1c8de0 !important;
    }

    /*输入框*/
    .addPlat .bigBox {
        padding: 15px;
    }

    .inputbox .el-input {
        width: auto;
        display: inline-block;
    }

    .inputBox {
        padding: 7px;
    }

    .inputBox h5 {
        font-weight: 700;
        margin-bottom: 15px;
        color: #444;
        border-left: 3px solid #00afc9;
        padding-left: 10px;
    }

    .InputGroup {
        padding-left: 15px;
    }

    .InputGroup .el-form-item, .InputKfGroup .el-form-item {
        margin-bottom: 15px;
    }

    .InputGroup .el-form-item label {
        width: 150px;
        text-align: left;
    }

    .InputKfGroup .el-form-item label {
        width: 80px;
    }

    .InputGroup .el-input__inner {
        height: 30px;
        color: #666;
    }

    .zm {
        padding-left: 0;
    }

    .addPlat .tip {
        color: #ff0000;
        margin-right: 7px;
    }

    /*富文本*/
    .ql-editor {
        min-height: 250px;
    }

    .quill-editor {
        width: 55%;
    }

    @media (max-width: 768px) {
        .addPlat .avatar {
            width: 120px;
            height: 120px;
            display: block;
        }

        .zm, .fm {
            width: 50% !important;
        }

        .quill-editor {
            width: 100%;
        }

        .addPlat .avatar-uploader-icon {
            width: 120px;
            height: 120px;
            line-height: 120px;
        }

        .addPlat .el-dialog--tiny {
            width: 90%;
        }

        .addPlat .bigBox {
            padding: 0;
        }
    }

    .addPlat .el-form--inline .el-form-item {
        display: block;
    }

    .addPlat .selectButton button:focus {
        border-color: #878b8c;
    }

    .ql-snow .ql-editor img {
        max-width: 50%;
    }

    .ql-snow .ql-picker-label {
        line-height: 100%;
    }

    #edui1_iframeholder {
        min-height: 150px;
    }
    .idcardText{width: 170px;display: inline-block;float:left;overflow: hidden}

    @media(max-width: 768px){.zm{clear: both;}}
    .step2btn{padding-bottom: 30px;padding-left: 30px;}
    .step2btn button{background: #23b7e5;border: 1px solid #82d8f3;color: #fff;}
</style>