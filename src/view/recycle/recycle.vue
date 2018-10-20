<template>
    <div class="recycle">
        <bread-crumb></bread-crumb>
        <div class="panel">

            <div class="tabs">
                <div class="table">
                    <el-table ref="multipleTable" :data="recycleList" tooltip-effect="dark" style="width: 100%"
                              @selection-change="handleSelectionChange">
                        <el-table-column type="index">
                        </el-table-column>
                        <el-table-column prop="name" label="数据模型名称">
                        </el-table-column>
                        <el-table-column prop="model_path" label="数据模型路径">
                        </el-table-column>
                        <el-table-column prop="number" label="删除数量">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <router-link :to="{path : '/datalist',query:{name:scope.row.name}}">查看数据</router-link>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                recycleList: [],
                multipleSelection: [],
                activeName: 'first'
            }
        },
        created() {
            this.init();
        },

        methods: {
            init() {
                this.$post('admin.php/trash/trashList').then(res => {
                    if (res.code === 0) {
                        this.recycleList = res.data;
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            filterTag(value, row) {
                return row.ticket_status === value;
            }
        }
    }
</script>
<style scoped>
    .recycle {
        margin-top: 60px;
    }
    .recycle .panel{min-height: 700px;}

    .tabs {
        width: 100%;
        padding: 0 15px;
        margin: 15px 0 30px 0;
    }

    .el-table th, .el-table td {
        text-align: center;
    }

</style>
