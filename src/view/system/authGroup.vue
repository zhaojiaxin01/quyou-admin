<template>
    <div id="group">
        <bread-crumb></bread-crumb>
        <div class="panel" style="min-height:700px;">
            <div class="table">
                <div style="margin-bottom:20px;">
                    <el-button type="primary" icon="el-icon-add" @click="dialogFormVisible = true">添加</el-button>
                </div>
                <el-table :data="authGroupList" style="width: 100%;text-align:center">
                    <el-table-column
                            type="index">
                    </el-table-column>
                    <el-table-column prop="name" label="分组" width="200px">
                    </el-table-column>
                    <el-table-column prop="describe" label="描述">
                    </el-table-column>
                    <el-table-column prop="update_time" label="更新时间" width="200px">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template scope="scope">
                            <span v-if="scope.row.status===0">关闭</span>
                            <span v-else>开启</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200px">
                        <template scope="scope">
                            <el-button size="mini"><i class="fa fa-pencil addG"
                                                      @click="EditGroup(scope.$index, scope.row)"></i>
                            </el-button>
                            {{this.id}}
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)" class="blueFont">授权
                            </el-button>

                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
                <!-- 添加 -->
                <el-dialog title="添加权限管理组" :visible.sync="dialogFormVisible">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="分组名字：">
                            <el-input v-model="admin_name" placeholder="请输入分组名字"></el-input>
                        </el-form-item>
                        <el-form-item label="描         述：" class="des">
                            <el-input v-model="admin_describe" placeholder="请输入描述"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="GroupAdd">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 编辑 -->
                <el-dialog title="编辑权限管理组" :visible.sync="editFormVisible">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="分组名字：">
                            <el-input v-model="edit_name" :placeholder="edit_name"></el-input>
                        </el-form-item>
                        <el-form-item label="描         述：" class="des">
                            <el-input v-model="edit_describ" :placeholder="edit_describ"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="EditSubmit">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>

</template>
<script>
    import {setCookie, getCookie} from '@/util/util.js';
    import {post} from '@/util/http.js';
    import swal from 'sweetalert';

    export default {
        data() {
            return {
                authGroupList: [], // 分组
                checked: true,
                dialogFormVisible: false,	// 添加弹框是否显示
                editFormVisible: false,
                admin_name: '',	// 添加的分组名字
                admin_describe: '',	// 添加的分组描述
                rules: '',	// 权限
                edit_describ: '',
                edit_name: '',
                edit_id: ''
            }
        },
        created() {
            this.init();//初始化分组数据
        },
        methods: {
            init() {
                let _this = this;
                //请求接口获取分组数据
                this.$post('admin.php/auth/groupList').then(function (res) {
                    if (res.code === 0) {
                        _this.authGroupList = res.data;
                    }
                    else if (res.code == 'error') {
                        _this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
                    .catch(function (err) {
                        console.log(err);
                    });
            },
            //授权
            handleEdit(index, row) {
                this.rules = row.rules;
                console.log(row.rules);
                //把权限赋值存入cookie方便权限列表时读取
                localStorage.setItem("rule", row.rules);
                this.$router.push({path: '/menulist', query: {groupListId: row.id}});//授权页
            },
            EditGroup(index, row) {
                this.editFormVisible = true;
                this.edit_id = row.id;
                this.edit_name = row.name;
                this.edit_describ = row.describe;
            },
            EditSubmit() {
                let _this = this;
                this.$post('admin.php/auth/groupedit', {
                    'id': this.edit_id,
                    'name': this.edit_name,
                    'describe': this.edit_describ
                }).then(function (res) {
                    if (res.code === 'success') {
                        _this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        _this.init();
                    }
                    else {
                        _this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                    //重新获取数据渲染页面
                    _this.init();

                }).catch(function (err) {
                    console.log(err)
                })
                this.editFormVisible = false;
            },
            //删除
            handleDelete(index, row) {
                var id = row.id;//要删除的分组id
                //请求接口删除
                let _this = this;
                this.$post('admin.php/auth/groupdel', {'id': id}).then(function (res) {
                    if (res.code === 'success') {
                        _this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        _this.init();
                    }
                    else {
                        _this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            //添加分组
            GroupAdd() {
                if (this.admin_name != '' && this.admin_describe != '') {
                    let _this = this;
                    this.$post('admin.php/auth/groupadd', {
                        'name': this.admin_name,
                        'describe': this.admin_describe
                    }).then(function (res) {
                        if (res.code === 'success') {
                            _this.$message({
                                type: 'success',
                                message: res.msg
                            });
                            _this.init();
                        }
                        else {
                            _this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                    }).catch(function (err) {
                        console.log(err);
                    })
                    this.dialogFormVisible = false //关闭弹框
                }
                else {
                    this.$message({
                        type: 'warning',
                        message: '信息未填写完整！'
                    });
                }
            }
        }
    }
</script>
<style>
    .table {
        padding: 15px;
        font-size: 14px;
    }

    #group {
        margin-top: 60px;
    }

    #group .el-dialog--small {
        width: 20%;
        top: 32%;
    }

    #group .des .el-form-item__label {
        margin-right: 23px;
    }

    #group .el-dialog__header {
        text-align: center;
    }

    #group .el-table {
        text-align: center;
    }

    #group .cell {
        text-align: center;
    }

    #group .el-table th > .cell {
        text-align: center;
    }

    .addG {
        color: #4da7dc;
    }

    .blueFont {
        color: #227cb1;
    }

    #group .el-dialog .el-form-item__label {
        width: auto;
        padding: 12px 0;
    }

    #group .el-dialog__body {
        text-align: center;
    }

    @media (max-width: 768px) {
        .el-dialog--small {
            width: 85%;
        }

        .table thead th .cell {
            padding: 0;
        }

        .table tbody .cell {
            padding: 5px;
        }

        #group .el-dialog--small {
            width: 90%;
            top: 32%;
        }

        #group .el-dialog__body {
            text-align: left;
        }
    }
    .blueFont span{color: #00a0e9;}
</style>