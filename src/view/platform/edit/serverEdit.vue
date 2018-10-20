<template>
    <div>
        <editside></editside>
        <div class="serverEditBox" :style="{'padding-left':leftComputed}">
            <div class="panel">
                <div class="title">
                    <div class="serverEditTitle">
                        <h5 class="borderLeft">平台信息</h5>
                    </div>
                </div>
                <div class="serverEdit">
                <el-form :inline="true" class="demo-form-inline serverEditForm">
                <div class="inputBox">
                    <div class="InputGroup">
                        <el-form-item prop="keyid">
                            <template scope="scope">
                                <div class="inputbox">
                                    <label class="el-form-item__label" style="margin-right: 13px;">Access Key ID：</label>
                                    <el-input v-model="server.keyid"></el-input>
                                </div>
                            </template>
                        </el-form-item><br/>
                        <el-form-item>
                            <template scope="scope" prop="secret">
                                <div class="inputbox">
                                   <label class="el-form-item__label" style="margin-right: 13px;">Access Key Secret：</label>
                                    <el-input v-model="server.secret"></el-input>
                                </div>
                            </template>
                        </el-form-item><br/>
                        <el-form-item prop="instanceid">
                            <template scope="scope">
                                <div class="inputbox">
                                    <span class="tip">*</span><label class="el-form-item__label">服务器ID：</label>
                                    <div v-if="instanceid" v-for="item in instanceid" class="serverId"><div class="serverIdText">{{item}}</div></div>
                                    <el-button size="mini" style="margin-top: 7px;" @click="selectServer">
                                        <span>选择服务器</span>
                                    </el-button>
                                </div>
                            </template>
                        </el-form-item>
                        <br/>
                        <el-form-item>
                            <template scope="scope">
                                <div class="inputbox select">
                                    <span class="tip">*</span><label class="el-form-item__label">是否多服：</label>
                                    <el-select  v-model="server.single" placeholder="请选择">
                                        <el-option label="是" :value="true1">
                                        </el-option>
                                        <el-option label="否" :value="false1">
                                        </el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-form-item><br/>
                        <el-form-item>
                            <template scope="scope">
                                <div class="inputbox select ">
                                    <span class="tip">*</span><label class="el-form-item__label">是否使用云存储：</label>
                                    <el-select  v-model="server.alioss" placeholder="请选择">
                                        <el-option label="是" :value="true1">
                                        </el-option>
                                        <el-option label="否" :value="false1">
                                        </el-option>
                                    </el-select>
                                </div>
                            </template>
                        </el-form-item><br/>
                        <div class="serverSavebtn">
                            <el-button type="primary" @click="serverSave">保存</el-button>
                            <el-button type="primary" @click="goback">返回</el-button>
                        </div>
                    </div>
                </div>
                    <el-dialog title="请选择服务器" :visible.sync="dialog" size="tiny" >
                        <!--地区选择-->
                        <div class="selectButton">
                        <el-button size="mini" @click="resArea('defaulted')" class="areabtn" ref="defaulted">默认</el-button>
                        <el-button size="mini" @click="resArea('north1')" ref="north1" class="areabtn">华北1</el-button>
                        <el-button size="mini" @click= "resArea('north2')" ref="north2" class="areabtn">华北2</el-button>
                        <el-button size="mini" @click= "resArea('north3')" ref="north3" class="areabtn">华北3</el-button>
                        <el-button size="mini"@click= "resArea('north5')" ref="north5" class="areabtn">华北5</el-button>
                        <el-button size="mini" @click= "resArea('east1')" ref="east1" class="areabtn">华东1</el-button>
                        <el-button size="mini" @click= "resArea('east2')" ref="east2" class="areabtn">华东2</el-button>
                        <el-button size="mini" @click= "resArea('south')" ref="south" class="areabtn">华南1</el-button>
                        <el-button size="mini" @click= "resArea('hongkong')" ref="hongkong" class="areabtn">香港</el-button>
                        </div>
                        <div style="width: 100%;" class="selectSerId">
                        <el-select v-model="instanceid" placeholder="请选择" :multiple="true">
                        <el-option
                        v-for="item in serverId"
                        :key="item.InstanceId"
                        :label="item.InstanceId"
                        :value="item.InstanceId"
                        >
                        <span style="float: left">{{ item.InstanceName }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.InstanceId}}</span>
                        </el-option>
                        </el-select>
                        </div>
                        <span slot="footer" class="dialog-footer">
                         <el-button @click="dialog = false">取 消</el-button>
                         <el-button type="primary" @click="dialog = false">确 定</el-button>
                         </span>
                    </el-dialog>
                </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import editside from '@/view/platform/edit/editside.vue';
    export default {
        data(){
          return{
              region:[
                  {
                      value:'cn-qingdao',
                      label:'华北 1',
                  },{
                      value:'cn-beijing',
                      label:'华北 2',
                  },
                  {
                      value:'cn-zhangjiakou',
                      label:'华北 3',
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
              instanceid:[],
              dialog:false,
              true1:true,
              false1:false,
              server:{
                        keyid:'LTAIJDrNPbhIctjN',
                        secret:'eGclmDPElAvXjyBHTVgs2iaAcXskLf',
                        instanceid:{
                        'cn-qingdao':{},
                        'cn-beijing':{},
                        'cn-zhangjiakou':{},
                        'cn-huhehaote':{},
                        'cn-hangzhou':{},
                        'shanghai':{},
                        'cn-shenzhen':{},
                        'cn-hongkong':{}
                    },
                    regionid:'',
                    single:'',// 是否为多服务
                    alioss:'',// 是否使用云存储
              },
              serverId:[],
              // true1:true,
              // false1:false,

            }
        },
        created(){
          this.init();
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
                            return '0';
                        }
                    }
                    if (this.$store.state.leftSideshow) {
                        // console.log("头部收缩，左边展开。");
                        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                            return '135px'
                        }
                        else {
                            return '135px';
                        }

                    }
                }
                if (!this.$store.state.show) {
                    if (!this.$store.state.leftSideshow) {
                        // console.log("头部不收缩，左边隐藏。");
                        return '0';
                    }
                }
            }

        },
        components:{
            editside,
        },
        methods:{
            init(){
                const id = this.$route.query.id;
                let _this = this;
                this.$post('admin.php/server/getServerInfo',{ id:id }).then(res =>{
                  if(res.code === 0){
                   _this.server.keyid = res.data.keyid;
                   _this.server.secret = res.data.secret;
                   _this.server.regionid = res.data.regionid;
                   _this.instanceid = JSON.parse(res.data.instanceid);
                   _this.server.instanceid = JSON.parse(res.data.instanceid);
                   // 是否多服
                    switch(res.data.single){
                        case 0: _this.server.single = _this.false1; break;
                        case 1: _this.server.single = _this.true1; break;
                    }
                    // 是否云存储
                    switch(res.data.alioss){
                        case 0 : _this.server.alioss = _this.false1; break;
                        case 1 : _this.server.alioss = _this.true1; break;
                    }
                  }
                  else{
                      this.$message({
                          type:'error',
                          message:res.msg
                      })
                  }


               })
            },
            selectServer(){
                this.dialog = true;
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
                this.$post('admin.php/server/console',{ id: this.$route.query.id, regionId: regionid,object: 'beInstances' }).then(res =>{
                    console.log(res.data);
                    this.serverId = res.data.Instances.Instance;
                    if (res.data.Instances.Instance == ''){
                        this.$message({
                            message: ' 暂无数据 ',
                            showClose: true,
                            type:'warning'
                        })
                    }
                });
            },// 选择服务器
            serverSave(){
                const id = this.$route.query.id;
                 // if(!this.server.regionid){
                 //     this.$message({
                 //         type:'warning',
                 //         message:'请选择服务器ID'
                 //     })
                 // }
                 // else{
                     switch(this.server.regionid){
                         case 'cn-shenzhen': this.server.instanceid['cn-shenzhen'] = this.instanceid;break;
                         case 'cn-qingdao': this.server.instanceid['cn-qingdao'] = this.instanceid;break;
                         case 'cn-beijing': this.server.instanceid['cn-beijing'] = this.instanceid;break;
                         case 'cn-zhangjiakou': this.server.instanceid['cn-zhangjiakou'] = this.instanceid;break;
                         case 'cn-huhehaote': this.server.instanceid['cn-huhehaote'] = this.instanceid;break;
                         case 'cn-hangzhou': this.server.instanceid['cn-hangzhou'] = this.instanceid;break;
                         case 'cn-shanghai': this.server.instanceid['cn-shanghai'] = this.instanceid;break;
                         case 'cn-hongkong': this.server.instanceid['cn-hongkong'] = this.instanceid;break;
                     }
                     this.$post('admin.php/platform/editPlatform', { id: id,type: '2',regionid: this.server.regionid, keyid: this.server.keyid, secret: this.server.secret, instanceid: this.server.instanceid, single: this.server.single,alioss: this.server.alioss }).then(res =>{
                       console.log(res);
                       if(res.code === 'success'){
                         this.$message({
                           type:'success',
                           message:res.msg
                         })
                       }
                       else{
                         this.$message({
                           type:'error',
                           message:res.msg
                          })
                       }
                     })
                 // }

            },
            goback(){
                this.$router.push('/platform');
            }
        }
    }
</script>

<style>
    /*.serverEdit{margin-top: 60px;}*/
    .serverEditBox {
        display: block;
        position: relative;
        top: 25px;
        padding-left: 135px;
        width: 100%;
        height: 100%;
    }
    .serverEditBox .title{
        padding: 15px 30px;
    }
    .serverEditBox .panel{min-height: 900px;}
    .serverEditForm{padding: 0 30px;}
    .serverEditBox  .serverEditTitle{    border-left: 3px solid #0099cc;margin-bottom: 30px;}
    .serverEditBox  .serverEditTitle h5{padding-left: 10px;font-weight: bold;text-shadow: 1px 1px 1px #ccc;}
    .serverEditBox .tip{color:red;margin-right: 5px;}
    .serverEditBox .el-form--inline .el-form-item{display: block}
    .serverEditForm .el-input{width: auto;}
    .serverEditBox .el-select{display: block;margin: 20px 0;}
    .select .el-select{display: inline-block;}
    .serverEditBox .el-form--inline .el-form-item__label{width: 130px;}
    .serverEditBox .serverSavebtn{margin-bottom: 30px;}
    .serverId{display: inline-block;}
    @media(max-width: 768px){
        .serverEditBox .el-dialog--tiny{width: 85%;}
        .selectButton button{
            margin-top: 8px;
        }
        .serverEditBox .el-form--inline .el-form-item__label{width: auto;}
        .serverEditBox .el-input, .el-input__inner{margin-bottom: 0;}
        .serverEditBox .el-input, .el-input__inner{width: 100%;}
        .serverId{display: block;}
        .serverEditForm{padding: 0 15px;}
    }
    .serverEditBox .el-form-item__label{text-align: left;}
    .serverEditBox .el-dialog__body .el-input__inner{display: block;width: 100%;}
    .serverIdText{font-size:10px;border: 1px solid #bfcbd9;border-radius: 5px;}

</style>