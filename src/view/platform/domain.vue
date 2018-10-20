<template>
    <div>
        <leftside></leftside>
        <div class="domain" :style="{'padding-left':leftComputed}">
           <div class="panel">
               <div class="domainTable">
                   <el-table :data="domain" style="width:100%">
                       <el-table-column label="域名" width="200">
                           <template scope="scope">
                               <span class="blueText">{{scope.row.DomainName}}</span>
                           </template>
                       </el-table-column>
                       <el-table-column label="域名类型" width="250">
                           <template scope="scope">
                              <div v-if="scope.row.DomainRegType == 'PERSONAL'">个人</div>
                               <div v-else>企业</div>
                           </template>
                       </el-table-column>
                       <el-table-column label="域名状态" width="250">
                           <template scope="scope">
                               <div v-if="scope.row.DomainAuditStatus == 'SUCCEED'">正常</div>
                               <div v-if="scope.row.DomainAuditStatus == 'NONAUDIT'">未实名认证</div>
                               <div v-if="scope.row.DomainAuditStatus == 'FAILED'">失败</div>
                               <div v-if="scope.row.DomainAuditStatus == 'AUDITING'">审核中</div>
                           </template>
                       </el-table-column>
                       <el-table-column prop="DeadDateLong" :formatter="dateFormat" label="到期时间" width="200"></el-table-column>
                       <el-table-column label="剩余天数"  class="red" width="200">
                           <template scope="scope">
                               <div v-if="dayRemain(scope.$index,scope.row) > 0">
                                   <img src="../../assets/images/ok.png" alt="" width="20" style="margin-right: 5px;margin-top: -5px;" v-if="dayRemain(scope.$index,scope.row) > 15">
                                   <span v-html="dayRemain(scope.$index,scope.row)" :class="dayRemain(scope.$index,scope.row)< 15 ? 'red':'green'"></span>
                                   <span :class="dayRemain(scope.$index,scope.row)< 15 ? 'red':'green'">天</span>
                                   <span v-if="dayRemain(scope.$index,scope.row) < 15" class="red">(即将过期)</span>
                               </div>
                               <div v-else class="red"><img src="../../assets/images/guoqi.png" alt="" width="20" style="margin-right: 5px;margin-top: -5px;"><span style="font-weight: bold" v-html="dayRemain(scope.$index,scope.row)"></span><span class="red">天</span></div>

                           </template>
                       </el-table-column>
                       <el-table-column label="操作" >
                           <template scope="scope">
                               <el-button type="text"><a href="https://netcn.console.aliyun.com/core/domain/list" target="_blank" style="color: #0000cc;">管理</a></el-button>
                           </template>
                       </el-table-column>

                   </el-table>
               </div>
               <div class="pull-right">
                   <div class="page">
                      <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page="CurrentPageNum"
                              :page-size="PageSize"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="TotalItemNum">
                      </el-pagination>
                  </div>
              </div>
           </div>
        </div>
    </div>
</template>

<script>
    import leftside from '@/view/platform/platform_Leftside.vue'
    export default {
        name: "domain",
        data(){
            return{
                domain: [],
                TotalItemNum: 0, // 总条数
                PageSize:20, // 每页条数
                CurrentPageNum: 1 // 当前页码
            }
        },
        created(){
          this.init();
        },
        methods:{
           init(){
               let id = this.$route.query.platformId;
               let _this = this;
              this.$post('admin.php/server/console',{ id : id,object: 'domainList'}).then(res =>{
                  if(res.code === 0){
                      this.domain = res.data.Data.Domain;
                      this.PageSize = res.data.PageSize; // 每页条数
                      this.CurrentPageNum = res.data.CurrentPageNum; // 当前页码
                      this.TotalItemNum = res.data.TotalItemNum; // 总条数
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
           },
           dateFormat: (row, column) => {
               let date = row[column.property];
               date = new Date(date);// 如果date为10位不需要乘1000
               const Y = date.getFullYear() + '-';
               const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
               const D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
               const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
               const m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
               const s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y+M+D+h+m+s;

            },
            // 剩余天数
            dayRemain: (index,row) => {
                let date =  row.DeadDateLong;
                let d = new Date();// 获取当前时间
                let now = d.getTime();// 当前时间转为时间戳
                const days = Math.round((date-now)/1000/86400);
                return days;
            },
            handleSizeChange(val) {
                this.PageSize = val;
                    this.$post('admin.php/server/console',{ id : '59',object: 'domainList',pageSize:this.PageSize,pageNum:this.CurrentPageNum}).then(res => {
                        if (res.code === 0) {
                            this.domain = res.data.Data.Domain;
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                        }
                    })
            },
            handleCurrentChange(val) {
               this.$post('admin.php/server/console',{ id : '59',object: 'domainList',pageSize:this.PageSize,pageNum:val}).then(res =>{
                   if(res.code === 0){
                       this.domain = res.data.Data.Domain;
                   }
                   else{
                       this.$message({
                           type:'error',
                           message:res.msg
                       })
                   }
               })
            }
        },
        computed:{
            leftComputed(){
                if(this.$store.state.show){
                    if(!this.$store.state.leftSideshow){
                        // console.log("头部收缩，左边隐藏。");
                        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                            return '0'
                        }
                        else{
                            return '0px';
                        }
                    }
                    if(this.$store.state.leftSideshow){
                        // console.log("头部收缩，左边展开。");
                        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                            return '150px'
                        }
                        else{
                            return '155px';
                        }

                    }
                }
                if(!this.$store.state.show){
                    if(!this.$store.state.leftSideshow){
                        // console.log("头部不收缩，左边隐藏。");
                        return '0px';
                    }
                }
            }

        },
        components:{
            leftside
        }
    }
</script>

<style>
.domain{display: block;position: relative;top: 45px;left: 0px;padding-left: 155px;width: 100%;height: 100%;}
.domain .blueText{color:#00a0e9;}
.domain .panel{min-height: 900px;}
.domainTable{padding: 30px 15px;}
.domain .split{margin: 0 5px;color: #dadada;}
@media(max-width: 768px){
    .domain .panel{min-height: 1000px;}
}
.domain .el-button--text {color: #2f4cd8;}
.domain .red{color: #e0492d;}
.domain .green{color: #44af4c;}
.domain .el-pager li.active{color: #fff !important;}
/*.domain .el-table__fixed {*/
    /*box-shadow: none;*/
/*}*/
</style>