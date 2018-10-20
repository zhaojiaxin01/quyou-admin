<template>
    <div class="addPlat">
        <div class="panel">
            <el-form :inline="true" class="demo-form-inline">
                <!--阿里云信息   -->
                <!--{{localInfo }}-->
                <!--服务器信息-->
                <div class="inputBox">
                    <h5>服务器信息</h5>
                    <div class="InputGroup">
                        <el-form-item prop="keyid">
                            <template scope="scope">
                                <div class="inputbox">
                                    <span class="tip">*</span><label class="el-form-item__label">Access Key ID</label>
                                    <el-input v-model.trim="server.keyid" placeholder="请输入访问密钥ID"></el-input>
                                </div>
                            </template>
                        </el-form-item><br/>
                        <el-form-item>
                            <template scope="scope" prop="secret">
                                <div class="inputbox">
                                    <span class="tip">*</span><label class="el-form-item__label">Access Key Secret</label>
                                    <el-input v-model.trim="server.secret" placeholder="请输入访问密钥"></el-input>
                                </div>
                            </template>

                        </el-form-item><br/>
                        <el-form-item prop="instanceid">
                            <template scope="scope">
                                <div class="inputbox">
                                    <span class="tip">*</span><label class="el-form-item__label">服务器ID</label>
                                    <div v-if="instanceid" v-for="item in instanceid" style="display: inline-block;"><el-input :placeholder="item"></el-input></div>
                                    <div class="selectBtn">
                                        <el-button size="mini" style="margin-top: 7px;" @click="selectServer">
                                            <span>选择服务器</span>
                                        </el-button>
                                    </div>

                                </div>
                            </template>
                        </el-form-item>
                        <br/>
                        <el-form-item>
                            <template scope="scope">
                                <div class="inputbox">
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
                                <div class="inputbox">
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
                    </div>

                </div>
                <div class="savebtn">
                      <el-button style="margin-top: 12px;" @click="prev" class="next" ref="next">上一步</el-button>
                      <el-button style="margin-top: 12px;" @click="next" class="next" ref="next">完成</el-button>
                </div>
                <el-dialog title="请选择服务器" :visible.sync="dialogVisible" size="tiny" >
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
               <el-button @click="dialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
               </span>
                </el-dialog>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                active:3,
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
                server:{
                    keyid:'',
                    secret:'',
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
                dialogVisible:false,
                loading:false,
                serverId:[],
                localInfo:'',
                true1:true,
                false1:false
            }
        },
        created(){
            this.init()
        },
        methods:{
            init(){
                this.localInfo  = JSON.parse(localStorage.getItem("step2Info"));
                if(localStorage.getItem("step3Info")){
                    const step3Info  = JSON.parse(localStorage.getItem("step3Info"));
                    this.server = step3Info.server;
                }

            },
            selectServer(){
                if(this.server.keyid != '' && this.server.secret != '' ){
                    this.dialogVisible = true;
                }
                else if(this.server.keyid == ''){
                    this.$message({
                        message: '请输入Access Key ID',
                        type: 'warning'
                    });
                }
                else if(this.server.secret == ''){
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
                this.$post('admin.php/aliyun/console',{ keyId: this.server.keyid,secret:this.server.secret,regonId:regionid,object: 'beInstances' }).then(res =>{
                    this.serverId = res.data.Instances.Instance;
                }).catch(err =>{
                    console.log(err);
                });
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
            },// 选择服务器
            prev(){
                this.$router.push('step2');
            },
            // 提交信息
            next(){
                // if(!(this.server.keyid && this.server.secret && this.server.instanceid && this.server.regionid)){
                //     this.$message({
                //         message: '服务器信息未填写完整！',
                //         type: 'warning'
                //     });
                // }
                // else if((this.server.single === '')||(this.server.alioss === '')){
                //     this.$message({
                //         message: '服务器信息未填写完整！',
                //         type: 'warning'
                //     });
                // }
                // else{
                    this.localInfo.server = this.server;// 将页面填写的数据赋值给本地的数据。
                    const infoString =  JSON.stringify(this.localInfo);
                    localStorage.setItem("step3Info",infoString);
                    const info = JSON.parse(localStorage.getItem("step3Info"));
                    this.$post('admin.php/platform/addinfo',{list: info.list,info: info.info,server: info.server}).then(res =>{
                        if(res.code === 0){
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            localStorage.removeItem('step1Info');//删除本地数据储存
                            localStorage.removeItem('step2Info');
                            localStorage.removeItem('step3Info');
                            this.$router.push({path:'/platform'});
                        }
                        else{
                            this.$message({
                                message:res.msg,
                                type: 'error'
                            });
                        }
                    }).catch(err =>{
                        console.log(err);
                    })
                // }


            }
        }
    }
</script>

<style scoped>
    .addPlat .bigBox{padding: 15px;}
    .inputbox .el-input{width: 170px;display: inline-block;}
    .inputBox{padding: 7px;}
    .inputBox h5{font-weight: 700;margin-bottom: 15px;color:#444;border-left: 3px solid #00afc9;padding-left: 10px;}
    .InputGroup{padding-left: 15px;}
    .InputGroup .el-form-item,.InputKfGroup .el-form-item { margin-bottom: 15px;}
    .InputGroup .el-form-item label{width: 150px;text-align: left;}
    .InputKfGroup .el-form-item label{width: 80px;}
    .InputGroup .el-input__inner{height: 30px;color: #666;}
    .addPlat .el-form--inline .el-form-item{display: block;}
    .addPlat .selectButton button:focus{border-color: #878b8c;}
    /*弹出框*/
    .selectSerId{width: 100%;}
    .selectSerId .el-select{margin: 0 auto;display: block;margin-top: 30px;width: 85%;}
    .el-select-dropdown.is-multiple .el-select-dropdown__item.selected{color: #fff !important;}
    .inputbox{display: inline-block;}
    .addPlat .el-form-item__error{display: inline-block;margin-left: 15px;position: relative}
    .next{margin-left: 0;}
    .savebtn{padding: 5px 30px;margin-bottom: 30px;}
    .inputbox .el-input{margin-right: 5px;}
    .selectBtn{display: inline-block;}
    @media(max-width: 768px){
        .selectBtn{display: block;}
    }
    .selectBtn button{color: #555;border: 1px solid #bfcbd9;}
    .savebtn button{background: #23b7e5;border: 1px solid #82d8f3;color: #fff;}
</style>