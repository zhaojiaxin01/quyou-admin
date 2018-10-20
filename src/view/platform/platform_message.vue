<template>
    <div>
        <leftside></leftside>
        <div class="message" :style="{left:leftComputed}">
            <div class="panel">
                <div class="messageBox" v-if="imgUrl[2]">
                    <h5 class="title">平台Logo</h5>
                    <div class="baseMsg">
                        <div class="col-md-4 col-xs-12">
                            <div class="labelText">
                                <div class="platlogoBox" v-if="imgUrl[2]">
                                    <div class="platlogo">
                                        <img :src="'https://quyou.l520.net'+imgUrl[2]" @click="bigImg($event)" alt="" style="width:100%;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="messageBox">
                    <h5 class="title">基本资料</h5>
                    <div class="baseMsg">
                        <div class="cardBox col-md-4 col-xs-12" v-if="message!=''">
                            <div class="labelText">
                                <span class="platName">{{platformname}}</span>
                            </div>
                            <div class="text_item">
                                <div class="labelText">
                                    <span>身份证号：</span><span>{{message.id_card}}</span>
                                </div>
                            </div>
                            <div class="text_item">
                                <div class="labelText">
                                    <span>身份证地址：</span><span>{{message.id_maps}}</span>
                                </div>
                            </div>
                            <div class="text_item">
                                <div class="labelText">
                                    <span>手机号码：</span><span>{{message.mobile}}</span>
                                </div>
                            </div>
                            <div class="text_item" v-if="message.note" style="margin-bottom: 30px;">
                                <div class="labelText">
                                    <div>备注：</div>
                                    <div class="col-md-6">
                                        <div v-html="message.note" class="note"></div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="noauth" v-else><span>权限不足，无法查看信息。请联系管理员</span></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="messageBox">
                    <h5 class="title">身份证照片</h5>
                    <div v-if="imgUrl != ''">
                        <div class="idCard">
                            <span class="imgBox">
                            <div v-if="imgUrl[0]">
                                <img :src="'https://quyou.l520.net'+imgUrl[0]" @click="img1show = true" alt=""
                                     style="width:100%;">
                            </div>
                             <div v-else><img src="../../assets/images/noIdcard.jpg" style="width:100%;"></div>
                            </span>
                        </div>
                        <div class="idCard">
                            <span class="imgBox">
                            <div v-if="imgUrl[1]">
                                <img :src="'https://quyou.l520.net'+imgUrl[1]" @click="img2show = true" alt=""
                                     style="width:100%;">
                            </div>
                            <div v-else><img src="../../assets/images/noIdcard.jpg" style="width:100%;"></div>
                            </span>
                        </div>
                    </div>
                    <div class="noauth" v-else><span>权限不足，无法查看信息。请联系管理员</span></div>

                </div>
                <div class="clearfix"></div>
                <div class="messageBox">
                    <h5 class="title">其他信息</h5>
                    <div class="otherBox">
                        <div class="col-md-4 otherInfoBox">
                            <div class="row infoBox">

                                <div class="col-md-5 col-xs-5">
                                    <div class="iconBox">
                                        <img src="../../assets/images/contact.png" alt="">
                                    </div>
                                    <div class="iconText">客服信息</div>
                                </div>

                                <div class="col-md-7 col-xs-7">
                                    <div class="infotext" v-if="kfInfo.name">
                                        <div class="messageBox">
                                            <span>名字：</span>
                                            <span>{{kfInfo.name}}</span>
                                        </div>
                                        <div class="messageBox">
                                            <span>地址：</span>
                                            <span><a :href="kfInfo.url" target="_blank">{{kfInfo.url}}</a></span>
                                        </div>
                                        <div class="messageBox">
                                            <span>账户：</span>
                                            <span>{{kfInfo.user}}</span>
                                        </div>
                                        <div class="messageBox">
                                            <span>密码：</span>
                                            <span v-if="kfPwd">{{kfInfo.pwd}}</span>
                                            <span v-if="kfnoshow" @click="showkfPwd"><img
                                                    src="../../assets/images/openEyes.png" title="点击可见密码" alt=""
                                                    width="20px" style="cursor: pointer"></span>
                                            <span v-if="kfshow" @click="noshowkfPwd"><img
                                                    src="../../assets/images/closeEyes.png" alt="" width="20px"
                                                    title="点击密码不可见" style="margin-left: 5px;cursor: pointer;"></span>
                                        </div>
                                    </div>
                                    <div class="info404" v-else>
                                        <span>信息未录入，暂无数据。</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-4 otherInfoBox">
                            <div class="row infoBox">

                                <div class="col-md-5 col-xs-5">
                                    <div class="iconBox">
                                        <img src="../../assets/images/message.png" alt="">
                                    </div>
                                    <div class="iconText">短信信息</div>
                                </div>

                                <div class="col-md-7 col-xs-7">
                                    <div class="infotext" v-if="smsInfo.name">
                                        <div class="messageBox">
                                            <span>名字：</span>
                                            <span>{{smsInfo.name}}</span>
                                        </div>
                                        <div class="messageBox">
                                            <span>地址：</span>
                                            <span><a :href="smsInfo.url" target="_blank">{{smsInfo.url}}</a></span>
                                        </div>
                                        <div class="messageBox">
                                            <span>账户：</span>
                                            <span>{{smsInfo.user}}</span>
                                        </div>
                                        <div class="messageBox">
                                            <span>密码：</span>
                                            <span v-if="smsPwd">{{smsInfo.pwd}}</span>
                                            <span v-if="smsnoshow" @click="showsmsPwd"><img
                                                    src="../../assets/images/openEyes.png" title="点击可见密码" alt=""
                                                    width="20px" style="cursor: pointer"></span>
                                            <span v-if="smsshow" @click="noshowsmsPwd"><img
                                                    src="../../assets/images/closeEyes.png" alt="" width="20px"
                                                    title="点击密码不可见" style="margin-left: 5px;cursor: pointer;"></span>
                                        </div>
                                    </div>
                                    <div class="info404" v-else>
                                        <span>信息未录入，暂无数据。</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="clearfix"></div>
                        <div class="col-md-4 otherInfoBox">
                            <div class="row infoBox">

                                <div class="col-md-5 col-xs-5">
                                    <div class="iconBox">
                                        <img src="../../assets/images/email.png" alt="">
                                    </div>
                                    <div class="iconText">邮箱信息</div>
                                </div>

                                <div class="col-md-7 col-xs-7" style="padding-top: 20px;">
                                    <div class="infotext" v-if="email.user">
                                        <div class="messageBox">
                                            <span>账号：</span>
                                            <span>{{email.user}}</span>
                                        </div>
                                        <div class="messageBox">
                                            <span>密码：</span>
                                            <span v-if="ePwd">{{email.pwd}}</span>
                                            <span v-if="enoshow" @click="showePwd"><img
                                                    src="../../assets/images/openEyes.png" title="点击可见密码" alt=""
                                                    width="20px" style="cursor: pointer"></span>
                                            <span v-if="eshow" @click="noshowePwd"><img
                                                    src="../../assets/images/closeEyes.png" alt="" width="20px"
                                                    title="点击密码不可见" style="margin-left: 5px;cursor: pointer;"></span>
                                        </div>


                                        <div class="messageBox">
                                            <span>地址：</span>
                                            <span><a :href="email.url" target="_blank">{{email.url}}</a></span>
                                        </div>
                                    </div>
                                    <div class="info404" v-else>
                                        <span>信息未录入，暂无数据。</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="col-md-4 otherInfoBox">
                            <div class="row infoBox">

                                <div class="col-md-5 col-xs-5">
                                    <div class="iconBox">
                                        <img src="../../assets/images/aliyun.png" alt="">
                                    </div>
                                    <div class="iconText">阿里云信息</div>
                                </div>

                                <div class="col-md-7 col-xs-7" style="padding-top: 30px;">
                                    <div class="infotext" v-if="aliyun.user">
                                        <div class="labelText">
                                            <span>账号：</span><span>{{aliyun.user}}</span>
                                        </div>
                                        <div class="labelText">
                                            <span>密码：</span>
                                            <span v-if="aliyunPwd">{{aliyun.pwd}}</span>
                                            <span v-if="Anoshow" @click="showAPwd"><img
                                                    src="../../assets/images/openEyes.png" title="点击可见密码" alt=""
                                                    width="20px" style="cursor: pointer"></span>
                                            <span v-if="Ashow" @click="noshowAPwd"><img
                                                    src="../../assets/images/closeEyes.png" alt="" width="20px"
                                                    title="点击密码不可见" style="margin-left: 5px;cursor: pointer;"></span>
                                        </div>
                                    </div>
                                    <div class="info404" v-else>
                                        <span>信息未录入，暂无数据。</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <!--图片蒙层-->
        <div class="prop1" v-show="img1show">
            <div><i class="fa fa-times-circle close" @click="img1show = false"></i></div>
            <div class="imgbox">
                <img :src="'https://quyou.l520.net'+imgUrl[0]" @click="img1show = !img1show">
            </div>
        </div>
        <div class="prop2" v-show="img2show">
            <div><i class="fa fa-times-circle close" @click="img2show = false"></i></div>
            <div class="imgbox">
                <img :src="'https://quyou.l520.net'+imgUrl[1]" @click="img2show = !img2show">
            </div>
        </div>
    </div>
</template>

<script>
    import leftside from '@/view/platform/platform_Leftside.vue';
    import {getCookie} from '@/util/util.js';

    export default {
        name: "platform_message",
        data() {
            return {
                img1show: false,
                img2show: false,
                platformname: '',// 平台名称
                message: [],
                kfInfo: [],
                smsInfo: [],
                imgUrl: [],
                aliyun: [],
                // 阿里云密码是否显示
                aliyunPwd: false,
                Ashow: false, // 显示
                pay: [],
                Anoshow: true, // 不显示
                kfPwd: false,
                kfshow: false,
                kfnoshow: true,
                // 客服密码是否显示
                smsPwd: false,
                smsshow: false,
                smsnoshow: true,
                // 邮箱密码是否显示
                ePwd: false,
                eshow: false,
                enoshow: true,

                // 邮箱
                email: []
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                const _this = this;
                const platformId = this.$route.query.platformId;
                this.platformname = this.$route.query.platformName;
                const imgArr = [];
                this.$post('admin.php/platform/getInfo', {id: platformId}).then(res => {
                    if (res.code === 0) {
                        _this.message = res.data;
                        _this.kfInfo = JSON.parse(_this.message.kf_info);
                        _this.smsInfo = JSON.parse(_this.message.sms_info);
                        _this.imgUrl = JSON.parse(_this.message.img_url);
                        _this.aliyun = JSON.parse(_this.message.aliyun_user);
                        _this.email = JSON.parse(_this.message.exmail);
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })

            },
            // 显示阿里云密码
            showAPwd() {
                this.aliyunPwd = true;
                this.Ashow = true;
                this.Anoshow = false;
            },
            // 不显示阿里云密码
            noshowAPwd() {
                this.aliyunPwd = false;
                this.Ashow = false;
                this.Anoshow = true;
            },
            // 显示客服密码
            showkfPwd() {
                this.kfPwd = true;
                this.kfshow = true;
                this.kfnoshow = false;
            },
            // 不显示客服密码
            noshowkfPwd() {
                this.kfPwd = false;
                this.kfshow = false;
                this.kfnoshow = true;
            },
            // 显示短信密码
            showsmsPwd() {
                this.smsPwd = true;
                this.smsshow = true;
                this.smsnoshow = false;
            },
            // 不显示短信密码
            noshowsmsPwd() {
                this.smsPwd = false;
                this.smsshow = false;
                this.smsnoshow = true;
            },
            // 显示短信密码
            showePwd() {
                this.ePwd = true;
                this.eshow = true;
                this.enoshow = false;
            },
            // 不显示短信密码
            noshowePwd() {
                this.ePwd = false;
                this.eshow = false;
                this.enoshow = true;
            }
        },
        components: {
            leftside
        },
        computed: {
            leftComputed() {
                // 兼容
                  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    if (this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                                return '0';
                        }
                        else{
                            return '360px'

                        }
                    }
                    if (!this.$store.state.show) {
                        if (!this.$store.state.leftSideshow) {
                            return '0';
                        }
                        else{
                             return '130px';
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

        }
    }
</script>

<style scoped>
    .detailBox {
        margin-left: 15px;
        padding: 15px;
    }

    .message {
        display: block;
        position: fixed;
        top: 60px;
        /*left: 380px;*/
        width: 100%;
        height: 100%;
        overflow-y: scroll;
    }

    .message .panel {
        border-radius: 0px;
        padding-left: 15px;
        padding-bottom: 80px;
    }

    .messageBox {
        padding: 10px;
        padding-left: 30px;
    }

    .messageBox .title {
        border-left: 3px solid #00afc9;
        padding-left: 15px;
        font-weight: 700;
    }

    .messageBox .labelBox {
        padding-left: 30px;
    }

    .labelText {
        padding: 8px 0;
    }

    .smallTitle {
        font-weight: 700;
        padding-bottom: 15px;
    }

    .SmallTitleBox .messageBox {
        padding: 5px 30px;
    }

    .imgBox img {
        margin-top: -3px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
    }

    .imgBox {
        float: left;
        margin-right: 15px;
        margin-top: 15px;
        width: 300px;
        height: 200px;
        overflow: hidden;
        border-radius: 5px;
    }

    .platlogo {
        width: 90px;
        height: 90px;
        display: inline-block;
        overflow: hidden;
        border-radius: 15px;
        padding: 5px;
    }

    .platlogo img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 15px;
    }

    /*****/
    .cardBox {
        border-radius: 0;
    }

    .platName {
        font-size: 16px;
        color: #0071cb;
        font-weight: bold;
        text-shadow: 0px 0px 5px #ffe73c;
    }

    .platlogoBox {
        display: inline-block;
        position: relative;
        top: 20px;
    }

    .message .infoBox {
        padding: 10px;
        border: 1px solid #eee;
        border-radius: 5px;
        margin: 10px 0;
        overflow: hidden;
        min-height: 204px;
    }

    .message .infoBox:hover {
        box-shadow: 0px 0px 10px #dadada;
        transition: all 1s;
    }

    .message .infoBox:hover .iconBox {
        transform: rotate(-15deg);
        opacity: 0.9;
        transition: all 1s;
    }

    .iconBox {
        display: block;
        margin: 0 auto;
        width: 86px;
        height: 86px;
        margin-top: 30px;
        padding: 20px;
        overflow: hidden;
        border-radius: 50%;
        background: #0777cb;
    }

    .iconBox img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .iconText {
        font-size: 16px;
        text-align: center;
        padding: 15px 0;
    }

    .infotext .messageBox {
        padding-left: 0;
    }

    .idCard {
        margin: 15px;
        padding: 0 15px;
    }

    .cardBox {
        padding: 20px 30px;
    }

    .note {
        padding: 0 30px;
    }

    @media (max-width: 768px) {
        .message .panel {
            padding-left: 0;
        }

        .messageBox {
            padding-left: 10px;
        }

        .idCard {
            margin: 0;
        }

        .otherBox, .otherInfoBox {
            padding: 0 !important;
        }

    }

    .info404 {
        height: 160px;
        line-height: 160px;
    }

    .messageBox a {
        word-wrap: break-word;
    }

    .platcard {
        border: 1px solid #eee;
        display: inline-block;
        padding: 0 15px;
        box-shadow: 0px 0px 8px #eee;
        border-radius: 15px 15px 0 0;
    }

    .platcard .labelText {
        padding: 0;
    }

    .text_item {
        height: 36px;
        line-height: 36px;
    }

    .message .el-card {
        border-radius: 0;
        border: 1px solid #eee;
    }

    .otherBox {
        padding: 0 15px;
    }

  /*  .left230 {
        left: 230px;
    }

    .left202 {
        left: 202px;
    }*/

    .noauth {
        padding: 30px;
    }

    .prop1 {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .prop1 .imgbox img {
        max-width: 85%;
        max-height: 60%;
        display: block;
        position: absolute;
        left: 0;
        top: 15%;
        right: 0;
        margin: auto;
        z-index: 1000;
    }

    .prop1 .close {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 36px;
        color: #fff;
    }

    .prop2 {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .prop2 .imgbox img {
        max-width: 85%;
        max-height: 60%;
        display: block;
        position: absolute;
        left: 0;
        top: 15%;
        right: 0;
        margin: auto;
        z-index: 1000;
    }

    .prop2 .close {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 36px;
        color: #fff;
    }
</style>