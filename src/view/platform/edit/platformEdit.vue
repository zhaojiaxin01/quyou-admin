<template>
    <div>
       <editside></editside>
        <div class="platEdit" :style="{left:leftComputed}">
            <div class="panel">
                <div  class="editbox">
                <div class="editTitle"><h5 class="borderLeft">平台列表</h5></div>
                <div class="edit">
                    <el-form ref="editplatForm" :model="editplatForm" :rules="rules" label-width="80px">
                        <el-form-item label="平台名称" prop="name">
                            <el-input v-model="editplatForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="平台域名" prop="domain">
                            <el-input v-model="editplatForm.domain"></el-input>
                        </el-form-item>
                        <el-form-item label="客户姓名">
                            <el-input v-model="editplatForm.resperson"></el-input>
                        </el-form-item>
                        <el-form-item class="version">
                            <template scope="scope">
                                <label class="el-form-item__label">平台版本</label>
                               <div class="versionselect">
                                   <el-select v-model="editplatForm.version" placeholder="请选择">
                                       <el-option label="1" value="1">
                                       </el-option>
                                       <el-option label="2" value="2">
                                       </el-option>
                                   </el-select>
                               </div>
                            </template>
                        </el-form-item>
                        <el-form-item label="状态">
                            <template>
                                <el-switch v-model="editplatForm.status" active-color="#13ce66" inactive-color="#ff4949" :on-value="1" :off-value="0">
                                </el-switch>
                            </template>
                        </el-form-item>
                        <div class="editSavebtn">
                            <el-button type="primary" @click="submitForm('editplatForm')">保存</el-button>
                            <el-button type="primary" @click="goback">返回</el-button>
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
    export default {
        data() {
            return {
                activeName2: 'first',
                editplatForm:{
                    name:'',
                    domain:'',
                    resperson:'',
                    version:'',
                    status:''
                },
                rules:{
                    name: [
                        { required: true, message: '请输入平台名称', trigger: 'blur' },
                    ],
                    domain: [
                        { required: true, message: '请输入平台域名', trigger: 'blur' },
                    ],
                }
            };
        },
        created(){
          this.init();
        },
        methods: {
            init(){
                const id = this.$route.query.id;
                let _this = this;
                 this.$post('/admin.php/platform/getlist',{ id:id }).then(res =>{
                     console.log(res);
                     if(res.code === 0){
                         const platformList = res.data.data;
                         for(let i in platformList){
                            _this.editplatForm.name = platformList[i].name;
                            _this.editplatForm.domain = platformList[i].domain;
                            _this.editplatForm.resperson = platformList[i].resperson;
                            _this.editplatForm.version = platformList[i].version;
                            _this.editplatForm.status = platformList[i].status;
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
            handleClick(tab, event) {
                console.log(tab, event);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       this.$post('admin.php/platform/editPlatform',{id:this.$route.query.id,type:'0',name:this.editplatForm.name,domain:this.editplatForm.domain,resperson:this.editplatForm.resperson,version:this.editplatForm.version,status:this.editplatForm.status }).then(res =>{
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
                        }).catch(err =>{
                            console.log(err);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            goback(){
                this.$router.push('platform');
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
    };
</script>

<style>
    .platEdit {
        display: block;
        position: fixed;
        top: 60px;
        left: 380px;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }

    .platEdit .panel{min-height: 900px;}
    .platEdit .el-tabs--border-card{min-height: 700px;}
    .version .el-form-item__content{margin-left: 10px !important;}
    .platEdit .el-tabs--border-card>.el-tabs__content{padding: 30px;margin-top: 15px;}
    .platEdit .el-form{width: 25%;}
    @media(max-width: 768px){
        .platEdit .el-form{width: 100%;}
        .platEdit{padding: 0;}
    }
    .platEdit .editSavebtn{padding: 15px;}
    .platEdit  .editTitle{    border-left: 3px solid #0099cc;margin-bottom: 30px;}
    .platEdit  .editTitle h5{padding-left: 10px;font-weight: bold;text-shadow: 1px 1px 1px #ccc;
        }
    .editbox{padding: 15px 30px;}
    .platEdit .edit{padding:0 30px;}
    .versionselect{display: inline-block;width: 150px;}
</style>