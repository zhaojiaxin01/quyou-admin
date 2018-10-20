<template>
    <div class="menuset">
        <bread-crumb></bread-crumb>
        <div class="panel">
            <div class="menutable">
                <div style="padding:15px 0;">
                    <el-button type="primary" @click="menuaddform = true">添加</el-button>
                </div>
                <el-table :data="menulist" stripe style="width: 100%">
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="名称" width="250"></el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column prop="url" label="url" width="250"></el-table-column>
                    <el-table-column label="状态">
                        <template scope="scope">
                             <span v-if="scope.row.status == 1">
                                 开启
                             </span>
                            <span v-else>
                                 禁用
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template scope="scope">
                            <div class="menuOptions">
                                <el-button type="text">
                                    <router-link :to="{path:'/menuchild',query:{id:scope.row.id}}">子菜单</router-link>
                                </el-button>
                                <span class="split">|</span>
                                <el-button type="text" @click="menueditshow(scope.$index,scope.row)">编辑</el-button>
                                <span class="split">|</span>
                                <el-button type="text" @click="menuDelete(scope.$index,scope.row)">删除</el-button>
                                <span class="split">|</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <!--添加弹框-->
                <el-dialog title="添加菜单节点" :visible.sync="menuaddform">
                    <el-form :inline="true" :model="menuadd" class="demo-form-inline" ref="menuadd">
                        <el-form-item label="名称：">
                            <el-input v-model="menuadd.name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="排序：">
                            <el-input v-model="menuadd.sort" placeholder="排序号"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="url：">
                            <el-input v-model="menuadd.url" placeholder="请输入url"></el-input>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <template scope="scope">
                                <el-switch v-model="menuadd.status" active-color="#13ce66" inactive-color="#ff4949"
                                           :on-value="1" :off-value="0">
                                </el-switch>
                            </template>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="menuaddform = false">取 消</el-button>
                        <el-button type="primary" @click="menuAdd">确 定</el-button>
                    </div>
                </el-dialog>
                <!--编辑弹框-->
                <el-dialog title="编辑菜单节点" :visible.sync="menueditform">
                    <el-form :inline="true" :model="menuedit" class="demo-form-inline" ref="menuedit">
                        <el-form-item label="名称：">
                            <el-input v-model="menuedit.name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="排序：">
                            <el-input v-model="menuedit.sort" placeholder="排序号"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="url：">
                            <el-input v-model="menuedit.url" placeholder="请输入url"></el-input>
                        </el-form-item>
                        <el-form-item label="状态：">
                            <template scope="scope">
                                <el-switch v-model="menuedit.status" active-color="#13ce66" inactive-color="#ff4949"
                                           :on-value="1" :off-value="0">
                                </el-switch>
                            </template>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="menueditform = false">取 消</el-button>
                        <el-button type="primary" @click="menueditSave">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menulist: [],
                menuadd: {
                    name: '',
                    sort: '',
                    url: 0,
                    status: 1,
                },
                menuedit: {
                    name: '',
                    sort: '',
                    url: '',
                    status: '',
                },
                pid: '',
                menuaddform: false,
                menueditform: false,
                id: ''
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.$post('admin.php/auth/menuList').then(res => {
                    this.menulist = res.data;
                }).catch(err => {
                    console.log(err);
                })
            },
            menuchildshow(index, row) {
                this.menuchildform = true;
                this.pid = row.id;
            },
            // 添加节点
            menuAdd() {
                console.log(this.menuadd.name, this.menuadd.sort, this.menuadd.url, this.menuadd.status);
                if (this.menuadd.name != '' && this.menuadd.sort != '' && this.menuadd.url != '' && this.menuadd.status != '') {
                    this.$post('admin.php/menu/menuAdd', {
                        pid: 0,
                        name: this.menuadd.name,
                        sort: this.menuadd.sort,
                        url: this.menuadd.url,
                        status: this.menuadd.status
                    }).then(res => {
                        if (res.code === 'success') {
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                            this.menuaddform = false;
                            this.init();
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                        }
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
                }
                else {
                    this.$message({
                        type: 'warning',
                        message: '信息未填写完整'
                    })
                }
            },
            // 删除节点
            menuDelete(index, row) {
                let _this = this;
                this.$post('admin.php/menu/menuDel', {id: row.id}).then(res => {
                    if (res.code === 'success') {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        this.init();
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            menueditshow(index, row) {
                this.menueditform = true;
                this.menuedit.name = row.name;
                this.menuedit.sort = row.sort;
                this.menuedit.url = row.url;
                this.menuedit.status = row.status;
                this.id = row.id;
            },
            menueditSave() {
                this.$post('admin.php/menu/menuEdit', {
                    pid: 0,
                    id: this.id,
                    name: this.menuedit.name,
                    sort: this.menuedit.sort,
                    url: this.menuedit.url,
                    status: this.menuedit.status
                }).then(res => {
                    if (res.code === 'success') {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        })
                        this.menueditform = false;
                        this.init();
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }
        }
    }
</script>

<style>
    .menuset {
        margin-top: 60px;
    }

    .menutable {
        padding: 15px;
        min-height: 700px;
    }

    .menuset .menuOptions .split {
        color: #ccc;
        margin: 0 2px;
    }

    .menuset .menuOptions button, .menuset .menuOptions button a {
        color: #0000cc
    }

    .menuset .el-dialog--small {
        width: 25%;
    }

    .menuset .el-form-item__label {
        width: 100px;
    }

    @media (max-width: 768px) {
        .menuset .el-dialog--small {
            width: 85%;
        }
    }
</style>