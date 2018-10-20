<template>
    <div class="menulist">
        <div class="panel">
            <div style="padding: 15px;">
                <el-tree
                        :data="menulist"
                        show-checkbox
                        node-key="id"
                        ref="tree"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="checkIdlist"
                        :props="defaultProps"
                >
                </el-tree>
                <div class="menulistBtn">
                    <el-button type="primary" @click="getCheckedKeys">保存</el-button>
                    <el-button type="primary" @click="goback">返回</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {setCookie, getCookie, delCookie} from '@/util/util.js';

    export default {
        data() {
            return {
                menulist: [],
                checkIdlist: [],
                defaultProps: {
                    children: 'child',
                    label: 'name'
                }
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.$post('admin.php/auth/menuList').then(res => {
                    this.menulist = res.data;
                    const rule = localStorage.getItem("rule");
                    var ruleArr = [];//定义一个权限数组
                    ruleArr = rule.split(",");
                    this.checkIdlist = ruleArr;
                })
            },
            getCheckedKeys() {
                const id = this.$route.query.groupListId;
                const CheckedKeys = this.$refs.tree.getCheckedKeys();
                console.log(this.$refs.tree.getCheckedKeys());
                this.$post('admin.php/auth/menuauth', {id: id, rules: CheckedKeys}).then(res => {
                    console.log(res.data);
                    if (res.code === 'success') {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        })
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            },
            goback() {
                this.$router.push({path: 'authGroup'})
            }
        }

    }
</script>

<style scoped>
    .menulist {
        margin-top: 60px;
    }

    .menulist .panel {
        min-height: 800px;
    }

    .menulist .el-tree {
        border: none;
    }

    .menulistBtn {
        padding: 30px;
    }
</style>