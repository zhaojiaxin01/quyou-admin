<template>
    <div class="platformBox">
        <!--面包屑-->
        <bread-crumb></bread-crumb>
        <div class="panel">
            <div class="platform">
                <div>
                    <div class="buttonBox">
                        <router-link :to="{path:'aplatMsg/step1'}">
                            <el-button type="primary">新增</el-button>
                        </router-link>
                        <el-button class="refreshBox" @click="refresh"><i class="fa fa-refresh"></i></el-button>
                    </div>
                    <div class="searchBox">
                        <input type="text" class="search" v-model.trim="searchText"
                               placeholder="平台名称/负责人/域名/平台版本" @keyup.enter="toSearch">
                        <button type="button" @click="toSearch"><i class="fa fa-search"></i></button>
                    </div>
                </div>
                <div class="table">
                    <!--表格信息-->
                    <el-table :data="platformList" v-loading="loading" element-loading-text="拼命加载中"
                              element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                              style="width: 100%">
                        <el-table-column label="平台ID" prop="id" fixed>
                        </el-table-column>
                        <el-table-column label="平台名称" fixed>
                            <template scope="scope">
                                <div @click="toMessage(scope.$index, scope.row)"
                                     style="cursor: pointer;color: #00afc9;">{{scope.row.name}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="平台版本">
                            <template scope="scope">
                                <span>{{scope.row.version}}代</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="客户姓名" prop="resperson">
                        </el-table-column>
                        <el-table-column label="游戏域名" prop="domain" width="200px">
                        </el-table-column>
                        <el-table-column label="平台状态" class="status" width="200">
                            <template scope="scope">
                                <div v-for="item in codeStatus">
                                    <div v-if="item.id == scope.row.id">
                                        <div v-if="item.code == 0">
                                            <img src="../../assets/images/success.png" width="20"
                                                 style="margin-top: -5px">
                                            <span style="color: #60e25e;">{{item.msg}}</span>
                                        </div>
                                        <div v-if="item.code == 1">
                                            <el-tooltip placement="bottom-end" effect="dark">
                                                <div slot="content">
                                                    <span>{{item.msg}}</span>
                                                    <p/>
                                                    <span @click="ServerEdit(scope.$index, scope.row)"
                                                          style="cursor: pointer;color: #00a0e9;text-decoration: underline;">前往服务器控制台查看</span>
                                                </div>
                                                <div style="cursor: pointer;">
                                                    <img src="../../assets/images/tip.png" width="18"
                                                         style="margin-top: -5px">
                                                    <span style="color: red;">{{item.msg}}</span>
                                                </div>
                                            </el-tooltip>
                                        </div>
                                        <div v-if="item.code == 2">
                                            <el-tooltip placement="bottom-end" effect="dark">
                                                <div slot="content">
                                                    <span>{{item.msg}}</span>
                                                    <p/>
                                                    <span @click="toDomain(scope.$index, scope.row)"
                                                          style="cursor: pointer;color: #00a0e9;text-decoration: underline;">前往域名控制台查看</span>
                                                </div>
                                                <div style="cursor: pointer;">
                                                    <img src="../../assets/images/tip.png" width="18"
                                                         style="margin-top: -5px">
                                                    <span style="color: red;">{{item.msg}}</span>
                                                </div>
                                            </el-tooltip>
                                        </div>
                                        <div v-if="item.code == 3">
                                            <el-tooltip placement="bottom-end" effect="dark">
                                                <div slot="content">
                                                    <span>获取状态异常，原因（地区id错误，当前账户下无服务器)</span></p>
                                                    <span>{{item.msg}}</span>
                                                    <span @click="ServerEdit(scope.$index, scope.row)"
                                                          style="cursor: pointer;color: #00a0e9;text-decoration: underline;">前往服务器控制台查看</span>
                                                </div>
                                                <div style="cursor: pointer;">
                                                    <img src="../../assets/images/tip.png" width="18"
                                                         style="margin-top: -5px">
                                                    <span style="color: red;">{{item.msg}}</span>
                                                </div>
                                            </el-tooltip>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="管理操作" width="300px">
                            <template scope="scope">
                                <!--查看详情-->
                                <el-button size="mini" @click="toMessage(scope.$index, scope.row)"
                                           style="background: #99cccc;color: #fff;border-color: #99cccc">
                                    <i class="fa fa-eye"></i>
                                </el-button>
                                <!--平台实例-->
                                <el-button size="mini" @click="ServerEdit(scope.$index, scope.row)"
                                           style="background: #d8b5b5;color: #fff;border-color: #d8b5b5">
                                    <i class="fa fa-desktop"></i>
                                </el-button>
                                <!--编辑-->
                                <el-button size="mini" @click="platEdit(scope.$index, scope.row)"
                                           style="background: #ccceb0;color: #fff;border-color: #ccceb0">
                                    <i class="fa fa-pencil"></i>
                                </el-button>
                                <!--删除-->
                                <el-button size="mini" type="danger"
                                           @click="deletePlatformDialog(scope.$index, scope.row)"
                                           style="background: #d48484;color: #fff;border-color: #d48484">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--删除平台弹框-->
                    <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" center>
                        <i class=" fa fa-exclamation-circle tipIcon"></i>
                        <div class="tipText">确定要删除 <span style="color: #00afc9;">{{delplatName}}</span> 平台吗？</div>
                        <span slot="footer" class="dialog-footer">
							<el-button @click="deleteDialog = false">取 消</el-button>
							<el-button type="primary" @click="deletePlatform">确 定</el-button>
						 </span>
                    </el-dialog>
                    <!-- 分页 -->
                    <div class="block" style="margin:30px 0;padding-bottom:30px;text-align:right">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="current_page"
                                :page-sizes="[10,20,30,40,50]"
                                :page-size="list_rows"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total" style="display:inline-block;">
                        </el-pagination>
                        <button class="go" @current-change="handleCurrentChange">GO</button>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const getListurl = 'admin.php/platform/getlist';
    export default {
        data() {
            return {
                platformList: [], // 平台列表数据
                loading: false,
                idList: [],
                codeStatus: [], // 状态
                dialogFormVisible: false, // 切换状态检验弹框
                deleteDialog: false, // 删除平台弹框
                deleteId: '', // 要删除平台的id
                delplatName: '', // 要删除平台的名字
                total: 0, // 总数目
                list_rows: 10, // 每页显示*条
                current_page: 1, // 第一页
                searchText: '', // 搜索内容,
            }
        },
        created() {
            this.init();
        },
        methods: {
            // 数据初始化
            init() {
                const _this = this;
                this.$post(getListurl, {page: this.current_page, list_rows: this.list_rows}).then(res => {
                    if (res.code === 0) {
                        const resData = res.data;// resData = res.data.data
                        _this.platformList = resData.data;// 渲染列表
                        for (let i = 0; i < this.platformList.length; i++) {
                            _this.idList.push(this.platformList[i].id);
                        }
                        this.status();
                        _this.total = resData.total // 列表总条数;
                        _this.current_page = resData.current_page  // 第几页
                        _this.searchText = resData.search_data; // 搜索数据
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            // 搜索
            toSearch() {
                const _this = this;
                this.$post('admin.php/platform/getlist', {
                    list_rows: this.list_rows,
                    search_data: this.searchText
                }).then(res => {
                    if (res.code === 0) {
                        _this.platformList = res.data.data;// 渲染列表
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }

                }).catch(err => {
                    console.log(err);
                });
            },
            // 编辑
            platEdit(index, row) {
                this.$router.push({path: 'edit', query: {id: row.id}});
            },
            // 触发删除弹框的事件
            deletePlatformDialog(index, row) {
                this.deleteDialog = true;
                this.deleteId = row.id;
                this.delplatName = row.name;
            },
            // 删除
            deletePlatform() {
                const _this = this;
                _this.$post('admin.php/platform/delPlatform', {id: this.deleteId}).then(res => {
                    if (res.code === 'success') {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                        _this.init();
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                    this.deleteDialog = false
                }).catch(err => {
                    console.log(err);
                });
            },
            // 切换状态
            toggleStatus() {
                this.dialogFormVisible = false
            },
            // 时间格式化
            dateFormat: (row, column) => {
                let date = row[column.property];
                date = new Date(date * 1000);// 如果date为10位不需要乘1000
                const d = new Date();
                const now = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();// 转为为yyyy-mm-dd hh:ss格式
                const Y = date.getFullYear() + '-';
                const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                // return Y+M+D+h+m+s;
                const deadtime = Y + M + D + h + m + s;
                const startTime = new Date(Date.parse(deadtime)); // 到期时间
                const endTime = new Date(Date.parse(now)); // 此时
                const serverStatus = (startTime - endTime) / 365 / 1000;
                if (serverStatus < 0) {
                    return '到期';
                }
                else {
                    return '正常';
                }
            },
            // 刷新
            refresh() {
                const _this = this;
                this.loading = true;
                this.$post(getListurl, {list_rows: this.list_rows, page: this.current_page}).then(res => {
                    if (res.code === 0) {
                        for (let i in this.idList) {
                            _this.idList.splice(i);
                            _this.codeStatus.splice(i);
                        }
                        ;// 清空原id列表、状态
                        _this.platformList = res.data.data;
                        for (let i = 0; i < _this.platformList.length; i++) {
                            _this.idList.push(_this.platformList[i].id);
                        }
                        _this.status();
                        _this.loading = false;
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
            // 跳转至服务器
            ServerEdit(index, row) {
                localStorage.setItem('regionidStorage', '');
                this.$router.push({path: '/serverManage', query: {platformId: row.id, platformName: row.name}});
            },
            // 跳转至域名控制台
            toDomain(index, row) {
                this.$router.push({path: '/domain', query: {platformId: row.id}});
            },
            // 平台跳转
            toMessage(index, row) {
                localStorage.setItem('platformIdStorage', row.id);
                localStorage.setItem('platformNameStorage', row.name);
                this.$router.push({path: '/message', query: {platformId: row.id, platformName: row.name}});
            },
            // 改变每页显示条数
            handleSizeChange(val) {
                this.list_rows = val;
                console.log(this.list_rows);
                this.handleCurrentChange();
            },
            // 跳转页面的方法
            handleCurrentChange(val) {
                const _this = this;
                this.current_page = val;
                this.$post(getListurl, {page: this.current_page, list_rows: this.list_rows}).then(res => {
                    if (res.code === 0) {
                        for (let i in this.idList) {
                            _this.idList.splice(i);
                            _this.codeStatus.splice(i);
                        }
                        ;// 清空原id列表、状态
                        _this.platformList = res.data.data;
                        // 重新赋值id列表
                        for (let i = 0; i < _this.platformList.length; i++) {
                            _this.idList.push(_this.platformList[i].id);
                        }
                        _this.status();
                        _this.loading = false;
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                })
            },
            // 平台状态
            status() {
                for (let i = 0; i < this.idList.length; i++) {
                    this.$post('admin.php/server/getStatus ', {id: this.idList[i]}).then(res => {
                        const platform = res.data;
                        if (res.code === 0) {
                            if ((platform.server.code === 0) && (platform.domain.code === 0)) {
                                this.codeStatus.push({code: '0', id: this.idList[i], msg: '正常'});// 服务器、域名都正常 返回正常
                            }
                            else if ((platform.server.code === 403) && (platform.domain.code === 0)) {
                                this.codeStatus.push({code: '1', id: this.idList[i], msg: platform.server.msg});// 服务器15天内到期 域名正常

                            }
                            else if ((platform.server.code === 0) && (platform.domain.code === 403)) {
                                this.codeStatus.push({code: '2', id: this.idList[i], msg: platform.domain.msg});// 服务器正常 域名到期
                            }
                            else if ((platform.server.code === 'error') && (platform.domain.code === 403)) {
                                this.codeStatus.push({code: '3', id: this.idList[i], msg: '服务器异常'});// 服务器异常 域名到期
                            }
                            else if ((platform.server.code === 'error') && (platform.domain.code === 0)) {
                                this.codeStatus.push({code: '3', id: this.idList[i], msg: '服务器异常'});// 服务器异常 域名到期
                            }
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
        }
    }
</script>
<style>
    /*平台管理列表样式*/
    .table {
        padding: 15px;
    }

    .platformBox {
        margin-top: 60px;
    }

    .countBox {
        height: 80px;
        margin: 15px 0;
        border: 1px solid #eee;
    }

    .iconBox {
        background: #91d7f9;
        height: 80px;
    }

    .buttonBox {
        padding: 15px;
        display: inline-block;
    }

    .platformBox .panel {
        min-height: 800px;
    }

    .platform .el-table th > .cell, .el-table .cell {
        text-align: center;
    }

    .platform .el-switch.is-checked .el-switch__core {
        background-color: #28b3d8;
        border-color: #28b3d8;
    }

    .platform .el-dialog--small {
        width: 20%;
    }

    .platform .el-form-item__content {
        display: block;
    }

    .yzm {
        max-width: 80px;
    }

    .sendYzm {
        background-color: #eee;
    }

    .platform .el-switch__label--left {
        color: #ffffff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        background-color: #005fcc;
        background-image: linear-gradient(to bottom, #325eb5, #1a89c1);
        background-repeat: repeat-x;
        border-color: #0088cc #0088cc #005580;
        border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        width: 71px !important;
    }

    .platform .el-switch__label--right {
        background-color: #f0f0f0;
        background-image: linear-gradient(to bottom, #e6e6e6, #ccc);
        background-repeat: repeat-x;
        border-color: #ffffff #ffffff #d9d9d9;
        left: 13px;
        background-image: linear-gradient(to bottom, #e4e4e4, #ffffff);
        background-repeat: repeat-x;
        color: #333;
        border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
        border-bottom: 1px solid #eee;
        border-right: 1px solid #eee;
        border-radius: 4px;
    }

    .platform .el-switch__label--right span {
        color: #555;
    }

    .platform .el-switch__core .el-switch__button {
        top: -3px;
        left: -4px;
        border-left: 1px solid #cccccc;
        border-right: 1px solid #cccccc;
        position: absolute;
        border-radius: initial;
        transition: transform .3s;
        width: 40%;
        height: 22px;
        z-index: 100;
        border-radius: 4px 0 0 4px;
        background-color: #f5f5f5;
        background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
        background-repeat: repeat-x;
    }

    .platform .el-switch.is-checked .el-switch__core .el-switch__button {
        text-align: center;
        margin-top: -1px;
        margin-bottom: -1px;
        z-index: 2;
        width: 34%;
        border-left: 1px solid #cccccc;
        border-right: 1px solid #cccccc;
        color: #ffffff;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
        background-color: #f5f5f5;
        border-radius: 0 4px 4px 0;
        height: 22px;
        top: -2px;
        left: 6px;
        width: 40%;
        background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
        background-repeat: repeat-x;
    }

    .platform .el-switch__core {
        width: 70px !important;
    }

    .platform .el-switch {
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .platform .el-switch__core {
        border-radius: 4px;
    }

    .go {
        display: inline-block;
        background: #f7f7f7;
        border: 1px solid #d1dbe5;
        top: 7px;
        position: relative;
        padding: 3px;
        border-radius: 2px;
    }

    .go:focus {
        outline: none;
    }

    .platform .el-pagination__total {
        padding-top: 3px;
    }

    .search {
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 36px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 260px;
    }

    .searchBox {
        position: relative;
        display: inline-block;
        float: right;
        margin-top: 15px;
        margin-right: 15px;
    }

    .searchBox button {
        border: none;
        background: #5fbfdc;
        border-radius: 0 3px 3px 0;
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 100%;
        line-height: 100%;
    }

    .searchBox button:focus {
        outline: none;
    }

    .searchBox i {
        font-size: 16px;
        color: #fff;
    }

    .platform .el-pagination button.disabled, .el-pager, .el-pagination .btn-next, .el-pagination .btn-prev, .el-pagination__jump {
        margin-top: 2px;
    }

    .platform .el-table__fixed {
        box-shadow: none;
    }

    @media (max-width: 768px) {
        .platform .el-button + .el-button {
            margin-left: 0;
        }

        .platform .el-button--mini {
            padding: 8px;
            margin: 5px 8px;
        }

        .platform .el-table th > .cell, .el-table .cell {
            padding: 5px;
        }

        .platform .el-table_1_column_9 .cell {
            padding: 4px;
        }

        .platform .el-dialog--small {
            width: 85%;
        }

        .platform .el-pagination__jump {
            display: block !important;
            margin-top: 15px;
            position: relative;
            right: 31px;
        }

        .go {
            top: 2px;
            position: relative;
            top: -30px;
        }

        .platform .el-pagination {
            display: block !important;
        }

        .platform .searchBox {
            margin-bottom: 15px;
            display: block;
        }

        .search {
            width: 130px;
        }

        .el-message-box {
            width: 80%;
        }

        .el-pagination .el-select .el-input {
            width: 55px;
        }

    }

    .el-message {
        top: 15%;
    }

    .tipIcon {
        font-size: 28px;
        margin-right: 8px;
        color: #e6a23c;
        top: 5px;
        position: relative;
    }

    .tipText {
        display: inline-block
    }

    @media (max-width: 768px) {
        .platform .el-pagination__sizes {
            display: none;
        }
    }

    /*.platbtn{background: #429cb1;color:#fff;border-color: #429cb1}*/
    /*.platbtn:hover{background: #2d97ca;color: #fff;border-color: #379ed0;}*/

</style>