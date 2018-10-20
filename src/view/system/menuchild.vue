<template>
    <div class="menuchild">
        <bread-crumb></bread-crumb>
        <div class="panel">
            <div class="addbtn">
                <el-button type="primary" @click="menuChildaddform = true">添加</el-button>
            </div>
            <div class="menuchildTable">
                <el-table :data="menuChildList" style="width: 100%">
                    <el-table-column prop="id" label="ID" width="180"></el-table-column>
                    <el-table-column prop="name" label="名称" width="180"></el-table-column>
                    <el-table-column prop="sort" label="排序" width="180"></el-table-column>
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
                                <el-button type="text" size="mini">
                                    <router-link :to="{path:'/menuLastChild',query:{id:scope.row.id}}">子菜单</router-link>
                                </el-button>
                                <span class="split">|</span>
                                <el-button type="text" size="mini" @click="menueditshow(scope.$index,scope.row)">编辑
                                </el-button>
                                <span class="split">|</span>
                                <el-button type="text" size="mini" @click="menuDelete(scope.$index,scope.row)">删除
                                </el-button>
                                <span class="split">|</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--添加弹框-->
            <el-dialog title="子菜单添加节点" :visible.sync="menuChildaddform">
                <el-form :inline="true" :model="menuchild" class="demo-form-inline" ref="menuChildList">
                    <el-form-item label="名称：">
                        <el-input v-model="menuchild.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="排序：">
                        <el-input v-model="menuchild.sort" placeholder="排序号"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="url：">
                        <el-input v-model="menuchild.url" placeholder="请输入url"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <template scope="scope">
                            <el-switch v-model="menuchild.status" active-color="#13ce66" inactive-color="#ff4949"
                                       :on-value="1" :off-value="0">
                            </el-switch>
                        </template>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="menuChildaddform = false">取 消</el-button>
                    <el-button type="primary" @click="menuchildAdd">确 定</el-button>
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
</template>

<script>
    export default {
        data() {
            return {
                menuChildList: [],
                menuChildaddform: false,
                menuchild: {
                    id: '',
                    name: '',
                    sort: '',
                    url: '',
                    status: ''
                },
                menuedit: {
                    name: '',
                    sort: '',
                    url: '',
                    status: '',
                },
                menueditform: false,
                id: '',
                menuid: ''
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.id = this.$route.query.id;
                this.$post('admin.php/auth/menuList', {pid: this.id}).then(res => {
                    for (let i in res.data) {
                        if (res.data[i].id == this.id) {
                            this.menuChildList = res.data[i].child;
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            menuchildAdd() {
                if (this.menuchild.name != '' && this.menuchild.sort != '' && this.menuchild.url != '' && this.menuchild.status != '') {
                    this.$post('admin.php/menu/menuAdd', {
                        pid: this.id,
                        name: this.menuchild.name,
                        sort: this.menuchild.sort,
                        url: this.menuchild.url,
                        status: this.menuchild.status
                    }).then(res => {
                        if (res.code === 'success') {
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                            this.menuChildaddform = false;
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
                this.menuid = row.id;
            },
            menueditSave() {
                this.$post('admin.php/menu/menuEdit', {
                    pid: this.id,
                    id: this.menuid,
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
    .menuchild {
        margin-top: 60px;
    }

    .menuchildTable {
        padding: 15px;
    }

    .menuchild .addbtn {
        padding: 15px 15px 0
    }

    .menuchild .split {
        margin: 0 2px;
        color: #dadada;
    }

    .menuchild .menuOptions button, .menuchild .menuOptions button a {
        color: #0000cc;
    }

    .menuchild .el-form-item__label {
        width: 80px;
    }

    .menuchild .el-dialog--small {
        width: 23%;
    }
    .menuchild .panel{min-height: 700px;}
    @media (max-width: 768px) {
        .menuchild .el-dialog--small {
            width: 85%;
        }
    }
</style>