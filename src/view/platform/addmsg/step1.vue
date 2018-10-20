<template>
    <div class="addPlat">
        <div class="panel" style="min-height: 600px;">
            <el-form :inline="true" class="demo-form-inline">
                <div class="bigBox">
                    <!--基础资料-->
                    <div class="inputBox">
                        <h5>基本信息</h5>
                        <div class="InputGroup">
                            <div>
                                <el-form-item>
                                    <template scope="scope">
                                        <div class="inputbox">
                                            <span class="tip">*</span><label class="el-form-item__label">平台名称：</label>
                                            <el-input v-model="list.name" placeholder="请输入平台名称"></el-input>
                                        </div>
                                    </template>
                                </el-form-item>
                                <div>
                                    <el-form-item>
                                        <template scope="scope">
                                            <div style="width: 170px;display: inline-block;float: left;"><label
                                                    class="el-form-item__label">平台Logo</label></div>
                                            <div class="col-xs-6 zm" style="width: 200px;">
                                                <el-upload
                                                        class="avatar-uploader"
                                                        action="https://quyou.l520.net/admin.php/file/uploadfile"
                                                        :show-file-list="false"
                                                        :headers="myHeaders"
                                                        :on-success="handleAvatarSuccess3"
                                                        :before-upload="beforeAvatarUpload">
                                                    <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                </el-upload>
                                            </div>
                                        </template>
                                    </el-form-item>
                                </div>
                                <el-form-item>
                                    <template scope="scope">
                                        <div class="inputbox">
                                            <span class="tip">*</span><label class="el-form-item__label">平台域名：</label>
                                            <el-input v-model="list.domain" placeholder="请输入平台域名"></el-input>
                                        </div>
                                    </template>
                                </el-form-item>
                                <el-form-item>
                                    <template scope="scope">
                                        <div class="inputbox">
                                            <span class="tip">*</span><label class="el-form-item__label">平台版本：</label>
                                            <el-select v-model="list.version" placeholder="请选择">
                                                <el-option label="1" :value="one">
                                                </el-option>
                                                <el-option label="2" :value="two">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </template>
                                </el-form-item>
                                <el-form-item>
                                    <template scope="scope">
                                        <div class="inputbox">
                                            <span class="tip">*</span><label class="el-form-item__label">客户姓名：</label>
                                            <el-input v-model="list.resperson" placeholder="请输入客户姓名"></el-input>
                                        </div>
                                    </template>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nextbtn">
                    <el-button style="margin-top: 12px;" @click="next" ref="next">下一步</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getCookie } from '@/util/util.js';
const usertoken = getCookie('user_token');
export default {
  data() {
    return {
      active: '1',
      imageUrl3: '',
      myHeaders: { token: usertoken },
      one: 1,
      two: 2,
      list: {
        name: '',
        domain: '',
        resperson: '',
        version: ''
      },
      info: {
      // 身份信息
        card: '',
        maps: '',
        mobile: '',
        note: '',
        // 身份证图片
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
        }
      },
      region: [
                    {
                        value: 'cn-qingdao',
                        label: '华北 1',
                    }, {
                        value: 'cn-beijing',
                        label: '华北 2',
                    },
                    {
                        value: 'cn-zhangjiakou',
                        label: '华北 3',
                    },
                    {
                        value: 'cn-huhehaote',
                        label: '华北 5',
                    },
                    {
                        value: "cn-hangzhou",
                        label: "华东 1"
                    },
                    {
                        value: "cn-shanghai",
                        label: "华东 2"
                    },
                    {
                        value: "cn-shenzhen",
                        label: "华南 1"
                    },
                    {
                        value: "cn-hongkong",
                        label: "香港"
                    }],
      server: {
        keyid: 'LTAIJDrNPbhIctjN',
        secret: 'eGclmDPElAvXjyBHTVgs2iaAcXskLf',
        instanceid: {
          'cn-qingdao': {},
          'cn-beijing': {},
          'cn-zhangjiakou': {},
          'cn-huhehaote': {},
          'cn-hangzhou': {},
          'cn-shanghai': {},
          'cn-shenzhen': {},
          'cn-hongkong': {}
        },
        regionid: '',
        single: '', // 是否为多服务
        alioss: '', // 是否使用云存储
      },
      dialogVisible: false,
      loading: false,
      serverId: [],
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
    // 初始化数据 判断有无输入过
      if (localStorage.getItem('step1Info')) {
        const info = JSON.parse(localStorage.getItem("step1Info"));
        this.list = info.list;
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
    handleAvatarSuccess3(res, file) {
      if (res.code === 0) {
        this.$message({
          message: '上传成功！',
          type: 'success'
        });
        this.imageUrl3 = URL.createObjectURL(file.raw);
        this.info.img[2] = res.data;
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        });
      }
    }, // 上传平台Logo成功后
    selectServer() {
                if (this.server.keyid != '' && this.server.secret != '') {
                    this.dialogVisible = true;
                }
                else if (this.server.keyid == '') {
                    this.$message({
                        message: '请输入Access Key ID',
                        type: 'warning'
                    });
                }
                else if (this.server.secret == '') {
                    this.$message({
                        message: '请输入Access Key Secret',
                        type: 'warning'
                    });
                }
            },// 选择服务器前检验
    resArea(area) {
      const _this = this;
      this.loading = true;// 显示正在加载
      let regionid = '';
      // 查看点击请求的是哪个按钮，并将地区赋值给regionid
      switch (area) {
                    case 'defaulted':
                        //更改按钮样式
                        regionid = 'cn-shenzhen';
                        _this.$refs.defaulted.$el.style.background = '#666';
                        _this.$refs.defaulted.$el.style.color = '#fff';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'north1':
                        regionid = 'cn-qingdao';
                        _this.$refs.north1.$el.style.background = '#666';
                        _this.$refs.north1.$el.style.color = '#fff';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'north2':
                        regionid = 'cn-beijing';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#666';
                        _this.$refs.north2.$el.style.color = '#fff';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'north3':
                        regionid = 'cn-zhangjiakou';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#666';
                        _this.$refs.north3.$el.style.color = '#fff';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'north5':
                        regionid = 'cn-huhehaote';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#666';
                        _this.$refs.north5.$el.style.color = '#fff';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'east1':
                        regionid = 'cn-hangzhou';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#666';
                        _this.$refs.east1.$el.style.color = '#fff';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'east2':
                        regionid = 'cn-shanghai';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#666';
                        _this.$refs.east2.$el.style.color = '#fff';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'south':
                        regionid = 'cn-shenzhen';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#666';
                        _this.$refs.south.$el.style.color = '#fff';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'hongkong':
                        regionid = 'cn-hongkong';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#666';
                        _this.$refs.hongkong.$el.style.color = '#fff';
                        break;

                }
      this.server.regionid = regionid;
      this.$post('admin.php/aliyun/console', {
        keyId: this.server.keyid,
        secret: this.server.secret,
        regonId: regionid,
        object: 'beInstances'
      }).then(res => {
        console.log(res.data.Instances.Instance);
        this.serverId = res.data.Instances.Instance;
      })
    }, // 选择服务器
    next() {
      // 页面跳转前检验
      if (!(this.list.name && this.list.resperson && this.list.domain && this.list.version)) {
        this.$message({
          message: '基本信息未填写完整！',
          type: 'warning'
        });
      }
      else {
        let data = { list: this.list, info: this.info, server: this.server };// 数据赋值
        data = JSON.stringify(data);// 转为json字符串类型
        localStorage.setItem('step1Info', data);// 本地储存数据
        this.$router.push({ path: 'step2' }); // 跳转到下一步
      }
    }
  },
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
        width: 170px;
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
        margin-right: 5px;
    }

    @media (max-width: 768px) {
        .addPlat .avatar {
            width: 120px;
            height: 120px;
            display: block;
        }

        .addPlat .avatar-uploader-icon {
            width: 120px;
            height: 120px;
            line-height: 120px;
        }

        .addPlat .el-dialog--tiny {
            width: 90%;
        }
    }

    .addPlat .el-form--inline .el-form-item {
        display: block;
    }

    .addPlat .selectButton button:focus {
        border-color: #878b8c;
    }

    /*弹出框*/
    .selectSerId {
        width: 100%;
    }

    .selectSerId .el-select {
        margin: 0 auto;
        display: block;
        margin-top: 30px;
        width: 85%;
    }

    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
        color: #fff !important;
    }

    .inputbox {
        display: inline-block;
    }

    .addPlat .el-form-item__error {
        display: inline-block;
        margin-left: 15px;
        position: relative
    }
    .nextbtn{margin-left: 45px;margin-bottom: 30px;}
    .nextbtn button{background: #23b7e5;border: 1px solid #82d8f3;color: #fff;}
</style>