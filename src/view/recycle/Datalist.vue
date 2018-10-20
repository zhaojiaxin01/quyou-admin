<template>
    <div class="datalist">
        <bread-crumb></bread-crumb>
        <div>
            <div class="panel">
                <div class="datalistTable">
                    <el-table ref="multipleTable" :data="datalist" tooltip-effect="dark">
                        <el-table-column prop="id" label="ID">
                        </el-table-column>
                        <el-table-column prop="create_time" label="创建时间" width="300">
                        </el-table-column>
                        <el-table-column prop="update_time" label="删除时间" width="300">
                        </el-table-column>
                        <el-table-column :prop="dataname" label="名称" width="300">
                        </el-table-column>
                        <el-table-column label="操作" width="300">
                            <template scope="scope">
                                <el-button type="success" size="mini" plain @click="recovery(scope.$index,scope.row)">
                                    恢复
                                </el-button>
                                <el-button type="danger" size="mini" plain @click="deleteData(scope.$index,scope.row)">
                                    删除
                                </el-button>
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
                datalist: [],
                name: '',
                modelName: '',
                dataname: ''
            }
        },
        created() {
            this.init();
        },
        methods: {
            // 初始化
            init() {
                const name = this.$route.query.name;
                console.log(name);
                this.$post('admin.php/trash/trashDataList', {name: name}).then(res => {
                    if (res.code === 0) {
                        this.datalist = res.data.list.data;
                        this.dataname = res.data.dynamic_field;
                        this.modelName = res.data.model_name
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
            // 恢复数据
            recovery(index, row) {
                this.$post('admin.php/trash/restoreData', {id: row.id, model_name: this.modelName}).then(res => {
                    if (res.code == 'success') {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }
                    this.init();
                })
            },
            // 删除数据
            deleteData(index, row) {
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post('admin.php/trash/trashDataDel', {id: row.id, model_name: this.modelName}).then(res => {
                        if (res.code == 'success') {
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            });
                        }
                        this.init();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            }
        }
    }
</script>

<style scoped>
    .datalistTable {
        padding: 15px;
        min-height: 700px;
    }

    .datalist {
        margin-top: 60px;
    }


</style>
<style>
    @media ( max-width: 768px ) {
        .el-message-box {
            width: 85%;
        }
    }
</style>