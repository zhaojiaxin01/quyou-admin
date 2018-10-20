<template>
    <div class="admin">
        <bread-crumb></bread-crumb>
        <div class="panel">
            <div class="admin_btn">
                <el-form>
                    <el-button type="primary" class="plus add" style="padding: 10px 15px;" @click="showForm">添加
                    </el-button>
                </el-form>
            </div>
            <div class="table">
                <el-table ref="multipleTable" v-loading="loading" element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                          :data="admin" tooltip-effect="dark" style="width: 100%" @selection-change="selectChange">
                    <el-table-column prop="id" label="ID">
                    </el-table-column>
                    <el-table-column prop="username" label="用户名">
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="150">
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机" width="150">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" width="200">
                    </el-table-column>
                    <el-table-column prop="update_time" label="更新时间" width="200">
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建时间" width="200">
                    </el-table-column>
                    <el-table-column label="用户状态" width="150">
                        <template scope="scope">
                            <span v-if="scope.row.status == 1">开启</span>
                            <span v-if="scope.row.status == 0">禁用</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template scope="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index,scope.row )" class="btnp0 adminedit">
                                <i class="fa fa-pencil icon icon0"></i></el-button>
                            <el-button size="mini" type="danger"
                                       @click.native.prevent="deleteAdmin(scope.$index,scope.row )" class="btnp0"><i
                                    class="el-icon-delete icon0"></i></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block text-right">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pagination.current_page"
                            :page-size="perpage"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pagination.total">
                    </el-pagination>
                    <button class="go" @current-change="handleCurrentChange">GO</button>
                </div>
                <!--弹框-->
                <div class="addAdmin">
                    <el-dialog title="添加用户" :visible.sync="addAdminForm">
                        <el-form :inline="true" :model="addForm" :rules="rules" class="demo-form-inline" ref="addForm">

                            <el-form-item label="用户名：" prop="addUsername">
                                <el-input v-model="addForm.addUsername" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <br/>
                            <el-form-item label="手机号：" prop="addMobile">
                                <el-input v-model="addForm.addMobile" placeholder="请输入手机号"></el-input>
                            </el-form-item>
                            <br/>
                            <el-form-item label="密码：" prop="addPassword">
                                <el-input type="addForm.password" v-model="addForm.addPassword" auto-complete="off"
                                          placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码：" prop="addPassword_confirm">
                                <el-input type="addForm.password" v-model="addForm.addPassword_confirm"
                                          auto-complete="off" placeholder="确认密码"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱：" prop="addemail">
                                <el-input v-model="addForm.addemail" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="addAdminForm = false">取 消</el-button>
                            <el-button type="primary" @click="addAdmin('addForm')">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            const validateMobile = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'));
                }
                else {
                    if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(value))) {
                        callback(new Error('手机号码错误!'));
                    }
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                else {
                    if (this.addForm.addPassword_confirm !== '') {
                        this.$refs.addForm.validateField('addPassword_confirm');
                    }
                    callback();
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                }
                else if (value !== this.addForm.addPassword) {
                    callback(new Error('两次输入密码不一致!'));
                }
                else {
                    callback();
                }
            };
            return {
                addAdminForm: false,
                loading: false,
                admin: [],
                multipleSelection: [],
                status: '100',
                pagination: [], // 分页
                perpage: 20,
                addForm: {
                    addUsername: '',
                    addMobile: '',
                    addPassword: '',
                    addPassword_confirm: '',
                    addemail: '',
                },
                rules: {
                    addUsername: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    addMobile: [
                        {validator: validateMobile, trigger: 'blur'}
                    ],
                    addPassword: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    addPassword_confirm: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    addemail: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'}
                    ],
                }

            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                let _this = this;
                this.$post('admin.php/member/memberList', {
                    page: this.pagination.current_page,
                    list_rows: this.perpage
                }).then(res => {
                    if (res.code === 0) {
                        _this.admin = res.data.data;
                        _this.pagination = res.data;
                        _this.perpage = Number(res.data.per_page) // 每页显示多少条
                    }
                    else if (res.code == 'error') {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            },
            // 编辑用户
            handleEdit(index, row) {
                const data = {nickname: row.nickname, mobile: row.mobile, email: row.email};
                localStorage.setItem('rowData', JSON.stringify(data));
                this.$router.push({path: 'adminEdit', query: {id: row.id, status: row.status}});
            },
            // 多选框被勾选
            selectChange(val) {
                this.multipleSelection = val;
            },
            showForm() {
                this.addAdminForm = true;
            },
            // 添加用户
            addAdmin(formName) {
                const _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$post('admin.php/member/memberAdd', {
                            username: this.addForm.addUsername,
                            password: this.addForm.addPassword,
                            password_confirm: this.addForm.addPassword_confirm,
                            email: this.addForm.addemail,
                            mobile: this.addForm.addMobile
                        }).then(res => {
                            if (res.code == 'success') {
                                this.$message({
                                    showClose: true,
                                    message: '会员添加成功！',
                                    type: 'success'
                                });
                                this.addAdminForm = false;
                                _this.init();
                            }
                            else {
                                this.$message({
                                    showClose: true,
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        return false;
                    }
                });
            },
            // 删除用户
            deleteAdmin(index, row) {
                let _this = this;
                this.loading = true;
                this.$post('admin.php/member/memberDel', {id: row.id}).then(res => {
                    if (res.code == 'success') {
                        this.$message({
                            showClose: true,
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.loading = false;
                        _this.init();
                    }
                    else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        });
                    }

                }).catch(err => {
                })
            },
            // 改变每页显示条数的放法
            handleSizeChange(val) {
                this.perpage = val;
                console.log(val);
                this.handleCurrentChange();
            },
            // 跳转页面的方法
            handleCurrentChange(val) {
                const _this = this;
                this.$post('admin.php/member/memberList', {page: val, list_rows: this.perpage}).then(res => {
                    _this.admin = res.data.data;
                })
            }
        }
    }
</script>

<style rel="stylesheet">
    .admin .admin_btn {
        padding: 15px;
    }

    .admin {
        margin-top: 60px;
    }

    .admin .table {
        width: 100%;
        padding: 0 15px;
    }

    .admin .plus {
        background: #41a7ce !important;
        border: 1px solid #41a7ce;
    }

    .admin .jian, .admin .jian:focus {
        background: #dd514c;
        border: 1px solid #dd514c;
    }

    .admin .plus:hover {
        background: #0a6999 !important;
        border: 1px solid #0a6999;
    }

    .admin .jian:hover {
        background: #c62b26;
        border: 1px solid #c62b26;
    }

    .admin .table-bordered {
        border: 1px solid #eee !important;
    }

    .admin .btn-group .btn {
        padding: 0;
        width: 38px;
        height: 34px;
    }

    .admin .btn-group .btn a {
        width: 100%;
        height: 100%;
        display: block;
        line-height: 30px;
    }

    .admin .icon {
        color: #999;
    }

    .admin .searchInput {
        width: 20%;
        float: right;
    }

    .admin .admin_btn a {
        color: #fff;
        padding: 10px 15px;
        display: block;
    }

    .admin .add {
        padding: 0;
    }

    .admin .btnp0 {
        width: 22px;
        height: 22px;
        padding: 0;
    }

    .admin .icon0 {
        width: 100%;
        height: 100%;
        line-height: 22px;
    }

    .admin .block {
        margin: 30px 0;
    }

    .admin .go {
        display: inline-block;
        background: #f7f7f7;
        border: 1px solid #d1dbe5;
        top: 4px;
        position: relative;
        padding: 3px;
        border-radius: 2px;
    }

    .admin .go:focus {
        outline: none;
    }

    .admin .el-pagination {
        display: inline-block;
    }

    /*弹出框*/
    .admin .el-dialog--small {
        width: 25%;
    }

    .admin .el-form-item__label {
        width: 100px;
    }
    .admin .panel{min-height: 700px;}
    @media (max-width: 768px) {
        .admin {
            padding: 0;
        }

        .el-pagination .el-select .el-input {
            width: 55px;
        }

        .admin .el-dialog--small {
            width: 90%;
        }

        .admin .searchInput {
            width: 45%;
        }

        .admin .el-form-item__label {
            width: 75px;
            font-size: 12px;
        }

        .admin .el-dialog__body {
            padding: 20px 10px;
        }

        .admin .go {
            margin-right: 25px;
        }
    }

    .admin .addAdmin .el-form-item label:before {
        content: "*";
        color: red;
        margin-right: 5px;
    }

    .admin .adminedit {
        background: #4290bd;
        border: 1px solid #70a6bf;
    }

    .admin .adminedit span i {
        color: #fff;
        font-size: 13px;
    }


</style>