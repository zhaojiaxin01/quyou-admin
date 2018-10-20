<template>
    <div class="userGroup">
        <header class="panel-heading custom-tab ">
            <ul class="nav nav-tabs">
                <li class="">
                    <router-link :to="{path:'adminEdit',query : { id: this.id }}">修改用户</router-link>
                </li>
                <li class="active">
                    <router-link :to="{path:'userGroup',query : { id: this.id }}">设置权限组</router-link>
                </li>

            </ul>
        </header>
        <div class="panel-body" style="background: #fff;">
            <div class="tab-content">
                <div class="tab-pane active">
                    <div style="margin: 30px 0" v-if="adminGroup != ''">
                        <el-checkbox-group v-model="groupList" @change="CheckedChange">
                            <el-checkbox v-for="item in adminGroup" :label="item.id" :key="item.id">{{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div class="noauth" v-else>
                        暂无权限，请联系管理员
                    </div>
                    <div>
                        <el-button type="button" class="el-button el-button--primary" @click="userSelectGroup">保存
                        </el-button>
                        <el-button type="button" class="el-button el-button--primary" @click="toBack">取消</el-button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                adminGroup: [],
                groupId: [],
                id: '',
                groupList: [] //当前权限组
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                let _this = this;
                this.id = this.$route.query.id;
                // 获取所有权限组
                this.$post('admin.php/auth/groupList').then(res => {
                    console.log(res);
                    if(res.code === 0){
                        _this.adminGroup = res.data;
                    }
                    else{
                        _this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                }).catch(function (err) {
                        console.log(err);
                });
                // 查看用户当前权限组
                this.$post('admin.php/member/memberAuthInfo', {id: this.id}).then(function (res) {
                    if (res.code === 0) {
                        const groupArr = [];//权限组数组、以便初始化勾选框
                        const Resdata = res.data;
                        for (let i = 0; i < Resdata.length; i++) {
                            groupArr.push(res.data[i].group_id);
                        }
                        _this.groupList = groupArr;
                    }
                    else {
                        _this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }

                })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            toBack() {
                this.$router.go(-1);
            },
            CheckedChange(val) {
                this.groupId = val;
                console.log(val);
            },
            userSelectGroup() {
                this.$post('admin.php/member/memberAuth', {id: this.id, group_id: this.groupId}).then(res => {
                    console.log(res);
                    if (res.code == 'success') {
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        this.$router.push('admin');
                    }
                    else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .userGroup {
        margin-top: 60px;
    }

    .userGroup .panel {
        padding: 15px;
    }

    .userGroup .panel-body {
        min-height: 600px;
    }

    .noauth {
        padding: 30px;
    }
</style>