<template>
    <div style="max-height: 940px; ">
        <leftside></leftside>
        <div class="serverList" :style="{'padding-left':leftComputed}">
            <div class="panel">
                <div class="selectArea">
                    <span class="area">实例列表</span>
                    <!--刷新-->
                    <div class="refreshBtn">
                        <el-button size="small" @click="refresh"><i class="fa fa-refresh"></i></el-button>
                    </div>
                    <!--地区选择-->
                    <div class="selectButton">
                        <el-button size="small" @click="resArea('defaulted')" class="areabtn" ref="defaulted">默认
                        </el-button>
                        <el-button size="small" @click="resArea('north1')" ref="north1" class="areabtn">华北1</el-button>
                        <el-button size="small" @click="resArea('north2')" ref="north2" class="areabtn">华北2</el-button>
                        <el-button size="small" @click="resArea('north3')" ref="north3" class="areabtn">华北3</el-button>
                        <el-button size="small" @click="resArea('north5')" ref="north5" class="areabtn">华北5</el-button>
                        <el-button size="small" @click="resArea('east1')" ref="east1" class="areabtn">华东1</el-button>
                        <el-button size="small" @click="resArea('east2')" ref="east2" class="areabtn">华东2</el-button>
                        <el-button size="small" @click="resArea('south')" ref="south" class="areabtn">华南1</el-button>
                        <el-button size="small" @click="resArea('hongkong')" ref="hongkong" class="areabtn">香港
                        </el-button>
                    </div>
                </div>
                <div class="serverTable">
                    <el-table :data="serverList" v-loading="loading" element-loading-text="拼命加载中"
                              element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                              style="width: 100%">
                        <el-table-column
                                label="实例ID/名称" width="190px">
                            <template scope="scope">
                                <span>{{scope.row.InstanceId}}</span><br>
                                <span>{{scope.row.InstanceName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="所在可用区" width="120px">
                            <template scope="scope">
                      <span v-for="item in ConfigArr">
                      <span v-if="scope.row.RegionId == item.RegionId">{{item.LocalName}}</span>
                      </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="IP地址" width="160px">
                            <template scope="scope">
                                <span v-if="scope.row.EipAddress.IpAddress">{{scope.row.EipAddress.IpAddress}}<span
                                        class="desc9">(弹性)</span><br></span>
                                <span v-if="scope.row.PublicIpAddress.IpAddress[0]">{{scope.row.PublicIpAddress.IpAddress[0]}}<span
                                        class="desc9">(公有)</span><br/></span>
                                <span v-if="scope.row.VpcAttributes.PrivateIpAddress.IpAddress[0]">{{scope.row.VpcAttributes.PrivateIpAddress.IpAddress[0]}}<span
                                        class="desc9">(私有)</span></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="状态" width="160px">
                            <template scope="scope">
                                <span v-if="scope.row.Status == 'Running'"><div class="Bigcircle BigGre"><div
                                        class="smallCircle smallGre">&nbsp;</div></div><span
                                        class="greenText">运行中</span></span>
                                <span v-if="scope.row.Status == 'Starting'"><i class="fa fa-spinner fa-spin"
                                                                               style="rgb(95, 94, 93);font-size:16px;margin-right:5px;"></i><span
                                        class="redText">启动中</span></span>
                                <span v-if="scope.row.Status == 'Stopping'"><i class="fa fa-spinner fa-spin"
                                                                               style="rgb(95, 94, 93);font-size:16px;margin-right:5px;"></i><span
                                        class="redText">停止中</span></span>
                                <span v-if="scope.row.Status == 'Stopped'"><img src="../../assets/images/stop.png"
                                                                                alt=""
                                                                                style="margin-right:5px;margin-top: -3px;"><span
                                        class="redText">已停止</span></span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="配置" width="250px">
                            <template scope="scope">
                                <span>CPU：{{scope.row.Cpu}}核&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>内存：{{scope.row.Memory/1024}}GB(I/O优化)&nbsp;&nbsp;<br></span>
                                <span v-if="scope.row.EipAddress.IpAddress">{{scope.row.EipAddress.Bandwidth}}Mbps(峰值)</span>
                                <span v-else>{{scope.row.InternetMaxBandwidthOut}}Mbps(峰值)</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="付费方式" width="100px">
                            <template scope="scope">
                                <span v-if="scope.row.InstanceChargeType == 'PrePaid'">包年包月</span>
                                <span v-if="scope.row.InstanceChargeType == 'PostPaid'">按量付费</span>
                                <span v-if="scope.row.InstanceChargeType == ''">按量付费</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" width="200px" prop="CreationTime"
                                         :formatter="dateFormat"></el-table-column>
                        <el-table-column label="到期时间" prop="ExpiredTime" :formatter="dateFormat"
                                         width="180px"></el-table-column>
                        <el-table-column label="操作" width="130">
                            <template scope="scope">
                                <el-button size="mini" class="openSer"
                                           v-if="scope.row.Status == 'Stopped'? disabled:abled"
                                           @click="showStartDialog(scope.$index, scope.row)">开机
                                </el-button>
                                <el-button size="mini" class="openSer"
                                           v-if="scope.row.Status == 'Stopping'? disabled:abled"
                                           @click="showStartDialog(scope.$index, scope.row)" disabled>开机
                                </el-button>
                                <el-button size="mini" class="closeSer"
                                           v-if="scope.row.Status == 'Running'? disabled:abled"
                                           @click="showStopDialog(scope.$index, scope.row)">关机
                                </el-button>
                                <el-button size="mini" class="closeSer"
                                           v-if="scope.row.Status == 'Starting'? disabled:abled"
                                           @click="showStopDialog(scope.$index, scope.row)" disabled>关机
                                </el-button>
                                <el-button size="mini" class="restartSer"
                                           v-if="scope.row.Status == 'Running'? disabled:abled"
                                           @click="showReStartDialog(scope.$index, scope.row)">重启
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="dialogBox">
            <!--开机弹框-->
            <el-dialog title="提示" :visible.sync="startDialog" width="30%" center>
                <i class=" fa fa-exclamation-circle tipIcon"></i>
                <div class="tipText">是否启动服务器：
                    <span style="color: #00afc9;">{{IpAddress}}(私有)</span>
                </div>
                <div class="openServermsg">
                    <span style="color: #00afc9;">{{InstanceId}}</span>&nbsp;&nbsp;
                    <span style="color: #00afc9;">{{InstanceName}}？</span>&nbsp;&nbsp;

                </div>
                <span slot="footer" class="dialog-footer">
					<el-button @click="startDialog = false">取 消</el-button>
					<el-button type="primary" @click="openServer">确 定</el-button>
				 </span>
            </el-dialog>
            <!--关机弹框-->
            <el-dialog title="提示" :visible.sync="stopDialog" width="30%" center>
                <i class=" fa fa-exclamation-circle tipIcon"></i>
                <div class="tipText">是否停止服务器：
                    <span style="color: #00afc9;">{{IpAddress}}(私有)</span>
                </div>
                <div class="openServermsg">

                    <span style="color: #00afc9;">{{InstanceId}}</span>&nbsp;&nbsp;
                    <span style="color: #00afc9;">{{InstanceName}}？</span>&nbsp;&nbsp;

                </div>
                <span slot="footer" class="dialog-footer">
					<el-button @click="stopDialog = false">取 消</el-button>
					<el-button type="primary" @click="closeServer">确 定</el-button>
				 </span>
            </el-dialog>
            <!--重启弹框-->
            <el-dialog title="提示" :visible.sync="restartDialog" width="30%" center>
                <i class=" fa fa-exclamation-circle tipIcon"></i>
                <div class="tipText">是否重启服务器：
                    <span style="color: #00afc9;">{{IpAddress}}(私有)</span>
                </div>
                <div class="openServermsg">

                    <span style="color: #00afc9;">{{InstanceId}}</span>&nbsp;&nbsp;
                    <span style="color: #00afc9;">{{InstanceName}}？</span>&nbsp;&nbsp;

                </div>
                <span slot="footer" class="dialog-footer">
					<el-button @click="restartDialog = false">取 消</el-button>
					<el-button type="primary" @click="restartSer">确 定</el-button>
				 </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {resConfig} from '@/assets/js/regions.js';
    import leftside from '@/view/platform/platform_Leftside.vue'

    export default {
        data() {
            return {
                serverList: [],
                startDialog: false,
                stopDialog: false,
                restartDialog: false,
                serverId: '',
                serverIp: '',
                loading: false,
                time: '',
                status: '',
                regionsId: '123',
                InstanceId: '',
                IpAddress: '',
                InstanceName: '',
                Status: '',
                row: '',
                disabled: true,
                abled: false,
                ConfigArr: [],
                platformId: '',
            }
        },
        created() {
            this.init();
            this.Region();
        },
        methods: {
            // 初始化
            init() {
                const _this = this;
                this.platformId = this.$route.query.platformId;
                this.$post('admin.php/server/console', {id: this.platformId, object: 'beInstances'}).then(res => {
                    if (res.code === 0) {
                        this.serverList = res.data.Instances.Instance;// 再次刷新
                        _this.$refs.defaulted.$el.style.background = '#666';
                        _this.$refs.defaulted.$el.style.color = '#fff';
                        setTimeout(() => {
                            _this.$post('admin.php/server/console', {
                                id: this.platformId,
                                object: 'beInstances'
                            }).then(res => {
                                _this.serverList = res.data.Instances.Instance;
                            }).catch(err => {
                                console.log(err);
                            })
                        }, 8000)// 8秒后刷新，重新获取数据
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
            // 刷新数据
            refresh() {
                const regionid = localStorage.getItem('regionidStorage');
                const _this = this;
                const platformId = this.$route.query.platformId;
                this.loading = true;
                _this.$post('admin.php/server/console', {
                    id: platformId,
                    regionId: regionid,
                    object: 'beInstances'
                }).then(res => {
                    if (res.code === 0) {
                        _this.serverList = res.data.Instances.Instance;
                        if (res.data.Instances.Instance == '') {
                            this.$message({
                                showClose: true,
                                message: ' 暂无数据 ',
                                type: 'warning'
                            })
                        }
                        _this.loading = false;
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
            // 区域按钮请求事件
            resArea(area) {
                const _this = this;
                const platformId = this.$route.query.platformId;// 平台id
                this.loading = true;// 显示正在加载
                let regionid = '';
                // 查看点击请求的是哪个按钮，并将地区赋值给regionid
                switch (area) {
                    case 'defaulted':
                        //更改按钮样式
                        regionid = '';
                        _this.$refs.defaulted.$el.style.background = '#666';
                        _this.$refs.defaulted.$el.style.color = '#fff';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'north1':
                        regionid = 'cn-qingdao';
                        _this.$refs.north1.$el.style.background = '#666';
                        _this.$refs.north1.$el.style.color = '#fff';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'north2':
                        regionid = 'cn-beijing';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#666';
                        _this.$refs.north2.$el.style.color = '#fff';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'north3':
                        regionid = 'cn-zhangjiakou';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#666';
                        _this.$refs.north3.$el.style.color = '#fff';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'north5':
                        regionid = 'cn-huhehaote';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#666';
                        _this.$refs.north5.$el.style.color = '#fff';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'east1':
                        regionid = 'cn-hangzhou';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#666';
                        _this.$refs.east1.$el.style.color = '#fff';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'east2':
                        regionid = 'cn-shanghai';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#666';
                        _this.$refs.east2.$el.style.color = '#fff';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'south':
                        regionid = 'cn-shenzhen';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#666';
                        _this.$refs.south.$el.style.color = '#fff';
                        _this.$refs.hongkong.$el.style.background = '#eaeaea';
                        _this.$refs.hongkong.$el.style.color = '#666';
                        break;
                    case 'hongkong':
                        regionid = 'cn-hongkong';
                        _this.$refs.defaulted.$el.style.background = '#eaeaea';
                        _this.$refs.defaulted.$el.style.color = '#666';
                        _this.$refs.north1.$el.style.background = '#eaeaea';
                        _this.$refs.north1.$el.style.color = '#666';
                        _this.$refs.north2.$el.style.background = '#eaeaea';
                        _this.$refs.north2.$el.style.color = '#666';
                        _this.$refs.north3.$el.style.background = '#eaeaea';
                        _this.$refs.north3.$el.style.color = '#666';
                        _this.$refs.north5.$el.style.background = '#eaeaea';
                        _this.$refs.north5.$el.style.color = '#666';
                        _this.$refs.east1.$el.style.background = '#eaeaea';
                        _this.$refs.east1.$el.style.color = '#666';
                        _this.$refs.east2.$el.style.background = '#eaeaea';
                        _this.$refs.east2.$el.style.color = '#666';
                        _this.$refs.south.$el.style.background = '#eaeaea';
                        _this.$refs.south.$el.style.color = '#666';
                        _this.$refs.hongkong.$el.style.background = '#666';
                        _this.$refs.hongkong.$el.style.color = '#fff';
                        break;

                }
                localStorage.setItem('regionidStorage', regionid);
                if (area !== 'defaulted') {
                    _this.$post('admin.php/server/console', {
                        id: platformId,
                        regionId: regionid,
                        object: 'beInstances'
                    }).then(res => {
                        if (res.code === 0) {
                            _this.serverList = res.data.Instances.Instance;
                            if (res.data.Instances.Instance == '') {
                                this.$message({
                                    showClose: true,
                                    message: ' 暂无数据 ',
                                    type: 'warning'
                                })
                            }
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                        }
                        _this.loading = false;
                    }).catch(err => {
                        console.log(err);
                    });
                }
                else {
                    _this.$post('admin.php/server/console', {id: platformId, object: 'beInstances'}).then(res => {
                        if (res.code === 0) {
                            _this.serverList = res.data.Instances.Instance;
                            if (res.data.Instances.Instance == '') {
                                this.$message({
                                    message: ' 暂无数据 ',
                                    showClose: true,
                                    type: 'warning'
                                })
                            }
                            _this.loading = false;
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: res.msg
                            })
                            _this.loading = false;
                        }
                    }).catch(() => {
                        setTimeout(() => {
                            _this.loading = false;
                        }, 10000);
                    });
                }
            },
            // 获取地区json并赋值给configArr
            Region() {
                this.ConfigArr = resConfig();
            },
            // 日期格式化
            dateFormat(row, column) {
                const moment = require('moment');// 引用moment.js
                const date = row[column.property];
                return moment(date).format('YYYY-MM-DD HH:mm');
            },
            // 获取状态
            getStatus() {
                this.$post('admin.php/server/console', {id: this.platformId, object: 'instance'}).then(res => {
                    let StatusArr = [];
                    StatusArr = res.data.InstanceStatuses.InstanceStatus;
                    for (let i = 0; i < StatusArr.length; i++) {
                        if (StatusArr[i].InstanceId === this.InstanceId) {
                            this.Status = StatusArr[i].Status;
                            break;
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            // 显示开机弹框
            showStartDialog(index, row) {
                this.startDialog = true;
                this.InstanceId = row.InstanceId;
                this.IpAddress = row.VpcAttributes.PrivateIpAddress.IpAddress[0];
                this.InstanceName = row.InstanceName;
                this.Status = row.Status;
            },
            // 开机
            openServer() {
                const _this = this;
                this.$post('admin.php/server/console', {
                    id: this.platformId,
                    instanceId: this.InstanceId,
                    object: 'startInstance'
                }).then(res => {
                    if (res.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '开机成功'
                        });
                        // **************开机成功后再次请求数据更新数据
                        _this.getStatus();
                        // 再次刷新状态
                        setTimeout(() => {
                            _this.init()
                        }, 15000)
                        // **********获取结束
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
                this.startDialog = false;

            },
            // 显示关机弹框
            showStopDialog(index, row) {
                this.stopDialog = true;
                this.InstanceId = row.InstanceId;
                this.IpAddress = row.VpcAttributes.PrivateIpAddress.IpAddress[0];
                this.InstanceName = row.InstanceName;
                this.Status = row.Status;
            },
            showReStartDialog(index, row) {
                this.restartDialog = true;
                this.InstanceId = row.InstanceId;
                this.IpAddress = row.VpcAttributes.PrivateIpAddress.IpAddress[0];
                this.InstanceName = row.InstanceName;
                this.Status = row.Status;
            },
            // 关机
            closeServer() {
                const _this = this;
                this.$post('admin.php/server/console', {
                    id: this.platformId,
                    instanceId: this.InstanceId,
                    object: 'stopInstance'
                }).then(res => {
                    // *************关机成功后再次请求数据更新数据
                    if (res.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '关机成功'
                        });
                        _this.getStatus();
                        // 再次刷新状态
                        setTimeout(() => {
                            _this.init()
                        }, 15000);
                        // *************获取结束
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
                this.stopDialog = false;
            },
            // 重启
            restartSer(index, row) {
                const _this = this;
                this.$post('admin.php/server/console', {
                    id: this.platformId,
                    instanceId: this.InstanceId,
                    object: 'reBootServer'
                }).then(res => {
                    // *************重启成功后再次请求数据更新数据
                    if (res.code === 0) {
                        this.$message({
                            type: 'success',
                            message: '重启成功'
                        });
                        _this.getStatus();
                        // 再次刷新状态
                        setTimeout(() => {
                            _this.getStatus();
                        }, 8000)
                        setTimeout(() => {
                            _this.init();
                        }, 15000)
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        });
                    }

                    // *************获取结束
                }).catch(err => {
                    console.log(err);
                });
                this.restartDialog = false;

            }
        },
        // 时间转换
        computed: {
            leftComputed() {
                // 兼容
                  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    if (this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                                return '0';
                        }
                        else{
                            return '380px'

                        }
                    }
                    if (!this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                            return '0';
                        }
                        else{
                             return '150px';
                        }
                    }
                           
                }
                else{
                    if (this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                            return '230px';
                        }
                        else{
                           return '360px';

                        }
                    }
                    if (!this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                            return '52px';
                        }
                        else if(this.$store.state.leftSideshow){
                            return '182px';
                        }
                    }
                }  
            }

        },
        components: {
            leftside
        }
    }
</script>
<style scoped>
    /** 平台服务器列表样式 **/
    .serverList {
        display: block;
        position: fixed;
        top: 60px;
        left: 0px;
        width: 100%;
        height: 100%;
    }

    .serverTable table {
        width: auto;
    }

    .serverTable {
        padding: 15px;
    }

    .desc9 {
        color: #999;
    }

    .greenText {
        color: #090;
    }

    .smallCircle {
        width: 8px;
        height: 8px;
        line-height: 8px;
        border-radius: 50%;
        display: inline-block;
        margin-left: 4px;
    }

    .Bigcircle {
        width: 16px;
        height: 16px;
        line-height: 15px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
    }

    .smallGre {
        background: #44d044;
    }

    .BigGre {
        background: #d2ead2;
    }

    .redText {
        color: #F90;
    }

    table tr td div.cell, table span {
        font-size: 12px;
    }

    .serverTable .el-table--enable-row-transition .el-table__body td {
        padding: 7px 0;
    }

    .serverTable .el-table .cell {
        padding: 7px 15px;
    }

    .serverTable .el-table th > .cell, .el-table .cell, .el-table th > .cell, table tr td span {
        text-align: left;
    }

    .openSer {
        background: #599bca;
        color: #fff;
        font-size: 10px;
        font-weight: bold;
        border: none;
    }

    .closeSer {
        background: #e0502f;
        color: #fff;
        font-size: 10px;
        font-weight: bold;
        border: none;
    }

    .restartSer {
        background: #e0b230;
        color: #fff;
        font-size: 10px;
        font-weight: bold;
        border: none;
    }

    .selectArea {
        padding: 15px;
    }

    .area {
        border-left: 3px solid #599bca;
        height: 36px;
        line-height: 36px;
        padding-left: 5px;
        font-size: 15px;
    }

    .selectButton {
        display: inline-block;
        padding-left: 30px;
    }

    .selectButton button {
        padding: 7px 9px;
        font-size: 12px;
        border-radius: 4px;
        background: #eaeaea;
        color: #666;
        border-color: #eee;
        border-radius: 1px;
    }

    .refreshBtn {
        display: inline-block;
        float: right;
    }

    .refreshBtn button {
        border-radius: 1px;
        background: #f9f9f9;
        color: #222;
        border-color: #d8d8d8;
    }

    .serverTable .el-table__header-wrapper thead div {
        color: #999;
        font-weight: 500;
    }

    .selectButton button:focus {
        background: #616161;
        color: #fff;
    }

    .serverList .panel {
        border-radius: 0px;
        min-height: 900px;
    }

    @media (max-width: 768px) {
        /*开机关机等按钮*/
        .closeSer, .openSer {
            margin-left: 10px;
            margin-bottom: 15px;
        }

        .serverList {
            margin: 0px;
        }

        .serverList .panel {
            min-height: 900px;
        }

        /*实例按钮*/
        .refreshBtn {
            margin-top: 5px;
        }

        .selectButton {
            display: block;
            padding-left: 0;
            padding-top: 15px;
        }

        .selectButton button {
            padding: 7px 9px;
            font-size: 12px;
            border-radius: 4px;
            background: #d2d0d0;
            color: #666;
            border-color: #eee;
            border-radius: 1px;
            width: 54px;
            margin-left: 0;
            margin-bottom: 10px;
        }
    }

    .serverList .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
        color: #fbfbfb;
        cursor: not-allowed;
        background-image: none;
        background-color: #a2a2a2;
        border-color: #3f4144;
    }

    .serverList .el-dialog--small {
        width: 20%;
    }
</style>
<style>
    .dialogBox .el-dialog--small {
        width: 20%;
    }

    .el-table--enable-row-transition .el-table__body td {
        padding: 7px 0;
    }

    .el-table th > .cell, .el-table .cell {
        text-align: left !important;
    }

    @media (max-width: 768px) {
        .el-table .cell, .el-table th > div {
            padding-left: 10px;
            padding-right: 10px;
        }

        .dialogBox .el-dialog--small {
            width: 85%;
        }
    }

    .dialogBox .tipIcon {
        font-size: 24px;
        color: #ffc107;
        margin-right: 5px;
        position: relative;
        top: 2px;
    }

    .dialogBox .tipText {
        display: inline-block;
    }

    .openServermsg {
        padding: 15px 25px;
    }
</style>
