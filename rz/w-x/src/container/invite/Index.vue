<template>
    <div style="background: #396ea1;padding-bottom: 1.8rem">
        <img class="in_banner" src="https://images.51rz.com/images/app/new_yqhy/eleven-banner.png" />
        <section v-show="token" class="wrap" style="margin-top:0.3rem;">
            <div class="box" style="padding-top:0;">
                <div class="connectBg"></div>
                <h5 class="partner" v-if="obj.isVip">
                    <i><img src="https://images.51rz.com/images/app/new_yqhy/eleven-pic6.png" /></i>
                    高级合伙人
                </h5>
                <h5 class="partner" v-if="!obj.isVip">
                    <i><img src="https://images.51rz.com/images/app/new_yqhy/eleven-pic7.png" /></i>
                    普通合伙人
                </h5>
                <p class="money-text money-mt">待发放现金(元）</p>
                <p class="money-ze" @click="goList(1)">
                    <i v-text="obj.inExamineSum">0</i>
                    <img src="https://images.51rz.com/images/app/new_yqhy/yyGo.png" />
                </p>
                <p class="money-text money-line">每月2日打款至账户余额</p>
                <ul class="money-list">
                    <li @click="goList(0)">
                        <p>邀请好友(人）</p>
                        <em v-text="obj.inviteCount">0</em>
                    </li>
                    <li @click="goList(1)">
                        <p>累计现金(元）</p>
                        <em v-text="obj.rewardSum">0</em>
                    </li>
                    <li @click="goList(1)">
                        <p>累计红包(元）</p>
                        <em v-text="obj.redPacketSum">0</em>
                    </li>
                </ul>
            </div>
        </section>
        <section class="wrap">
            <div class="box">
                <h3><img src="https://images.51rz.com/images/app/new_yqhy/eleven-title.png" /></h3>
                <p style="width:100%;text-align:center;display:inline-block;color:#999;">好友注册起7天内投资满足如下条件，邀请人可获得相应的红包以及现金，奖励可叠加领取。</p>
                <span><img src="https://images.51rz.com/images/app/new_yqhy/eleven-pic1.png" style="width:6.08rem" /></span>
            </div>
        </section>
        <section class="wrap">
            <div class="box" style="padding-bottom:0.4rem;">
                <h3><img src="https://images.51rz.com/images/app/new_yqhy/eleven-title1.png" /></h3>
                <p style="width:100%;text-align:center;display:inline-block;color:#999;">被邀请人投资后，邀请人可获得每笔佣金分红；佣金比例为好友投资收益的百分比。</p>
                <div class="tab-wrap">
                    <table cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <th>邀请人级别</th>
                            <th>高级合伙人</th>
                            <th>普通合伙人</th>
                        </tr>
                        <tr>
                            <td>被邀请人总待收</td>
                            <td>≥200000</td>
                            <td><200000</td>
                        </tr>
                        <tr>
                            <td>好友注册<br />30天内总投资</td>
                            <td>12%</td>
                            <td>10%</td>
                        </tr>
                        <tr>
                            <td>好友注册<br />第31-180天内投资</td>
                            <td>6%</td>
                            <td>5%</td>
                        </tr>
                    </table>
                    <h4>被邀请人总待收为上月最后一天24点所有被邀请人待收总和</h4>
                    <a class="Href" @click="changeDialog(true)">案例说明 ></a>
                </div>
            </div>
        </section>

        <section class="wrap">
            <div class="box">
                <h3><img src="https://images.51rz.com/images/app/new_yqhy/eleven-title2.png" /></h3>
                <div class="hyzx">
                    <span>好友完成注册即可得</span>
                    <img src="https://images.51rz.com/images/app/new_yqhy/eleven-pic.png" />
                    <h4><strong>￥1228</strong>注册红包+<strong>2</strong>张加息券</h4>
                </div>
            </div>
        </section>

        <section class="wrap">
            <div class="box">
                <h3><img src="https://images.51rz.com/images/app/new_yqhy/eleven-title3.png" /></h3>
                <div class="eleven-text">
                    <p>1、除债转标以外，好友所有投资项目都计算在活动范围之内；</p>
                    <p>2、若好友投资满足活动要求，现金奖励将于每月2日发放至您的账户；</p>
                    <p>3、2017年11月2日20：00（含）后邀请的好友投资计入被邀请人总待收，历史被邀请人待收不计算在内；</p>
                    <p>4、10元红包1000元起投，限35天以上项目可用，90元红包5000元起投，限90天以上项目可用；</p>
                    <p>5、如有疑问请致电客服：400-655-8858。(咨询时间：9:00-21:00)。</p>
                    <p>* 本活动最终解释权在法律范围内归金服所有 </p>
                </div>
            </div>
        </section>
        <div class="fixed_href" v-show="dialog">
            <div class="hrefOpen">
                <img class="hrefClose" @click="changeDialog(false)"
                     src="https://images.51rz.com/images/app/new_yqhy/elevenClose.png" />
                <h3>案例说明</h3>
                <p>小张在12月1日邀请了小李，小李于当日注册，并且在12月15日投资了10万元收益为10%的90天标，且上个月即11月30日24点小张的被邀请人总待收≥20万元。则小张可获得收益：<span>100000*10%/365*90*12%=295.89元</span></p>
            </div>
        </div>
        <section class="footer" @click="share">
            <a class="invite_btn">邀请好友</a>
        </section>
    </div>
</template>
<script>
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'Index',
        data() {
            return {
                token: 0,
                uid: 0,
                dialog: false,
                obj: {
                    redPacketSum: '',   //累计红包
                    inExamineSum: '',   //待发放现金
                    rewardSum: '',      //累计现金
                    isVip: false,       //是否是高级合伙人
                    inviteCount: '',    //邀请人数
                }
            }
        },
        methods: {
            getUrlParam(name) {
                const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg)  //匹配目标参数
                if (r!=null) return unescape(r[2]); return null //返回参数值
            },
            changeDialog(show) {
                this.dialog = show
            },
            async getInitData() {
                this.obj = await API.get(API.inviteIndex,{token:this.token})
            },
            share() {
                if(this.token) {
                    window.location.href = `/invite/code?uid=${this.uid}&token=${this.token}`
                }else {
                    this.$router.push('/login')
                }
            },
            goList(flag) {
                window.location.href = `/invite/record/${flag}?token=${this.token}`
            }
        },
        mounted() {
            this.token = this.getUrlParam('token') || this.info.token
            this.uid = this.getUrlParam('uid') || this.info.uid
            if(this.token) {
                this.getInitData()
            }
        },
        computed: {
            ...mapGetters([
                'info'
            ])
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .in_banner{width:100%;}

    .wrap{width:100%;padding:0 0.4rem 0 0.3rem;margin-top:1.3rem;}
    .box{width:100%;border-radius:0.1rem;background:#fff;box-shadow:5px 5px 0 #92bae2;padding-top:0.8rem;position:relative;}
    .box h3{position:absolute;left:50%;margin-left:-1.82rem;top:-0.5rem;height:1.02rem;}
    .box h3 img{width:3.74rem;height:1.02rem;}
    .box span{width:100%;padding:0.42rem 0 0.3rem 0;text-align:center;display:inline-block;}

    .footer{width:7.5rem;text-align:center;height:1rem;position:fixed;bottom:0;z-index:10;background:#fcd31f;}
    .invite_btn {text-decoration:none;display:inline-block;width:100%;height:1rem;line-height:1rem;color:#9e3f08 !important;font-size:0.36rem;text-shadow:1px 1px 5px #fff;}


    .connectBg{width:100%;position:absolute;height:1.6rem;background:url(https://images.51rz.com/images/app/new_yqhy/eleven-pic5.png) no-repeat;background-size:contain;top:-0.6rem;z-index:100;}
    .partner{width:2.14rem;height:0.85rem;background:#ffdf73;border-radius:0 0 0.1rem 0.1rem;box-shadow:0 0.1rem 0 #f1af01;color:#580809;font-size:0.24rem;line-height:0.85rem;font-weight:500;display:inline-block;margin-left:1rem;}
    .partner i{width: 0.42rem;height: 0.47rem; margin: 0 0.05rem 0 0.2rem;float: left;}
    .partner i img{width:0.42rem;height:0.47rem;display:inline-block;}

    .invite-text{width:100%;text-indent:-0.4rem;padding-left:0.4rem;font-size:0.24rem;line-height:0.45rem;color:#222;}
    .invite-btn{width:0.55rem;height:1.7rem;background:#e79130;border-radius:0.1rem 0 0 0.1rem;z-index:20;position:fixed;right:0;top:5rem;color:#fff;padding: 0.15rem 0.17rem;line-height: 0.35rem;}

    .tab-wrap{width:100%;padding:0.2rem 0.2rem 0 0.2rem;text-align:center;}
    .tab-wrap table{width:100%;}
    .tab-wrap table th{height:0.6rem;text-align:center;font-size:0.24rem;color:#fff;background:#92bae2;font-weight:500;border-right:1px solid #ddd;}
    .tab-wrap table th:nth-child(1){width:40%;}
    .tab-wrap table th:nth-child(2){width:20%;}
    .tab-wrap table th:nth-child(3){border-right:none;width:20%;}
    .tab-wrap table td{border-bottom:1px solid #ddd;border-right:1px solid #ddd;padding:0.1rem 0;text-align:center;font-size:0.24rem;color:#497eb0;}
    .tab-wrap table td:first-child{border-left:1px solid #ddd;}
    .tab-wrap h4{width:100%;text-align:left;font-size:0.24rem;color:#999;font-weight:500;padding-top:0.3rem;}
    .Href{display:inline-block;margin-top:0.3rem;width:1.8rem;height:0.48rem;text-align:center;line-height:0.48rem;color:#396ea1;border:1px solid #396ea1;border-radius:1rem;}

    .hyzx{width:100%;text-align:center;}
    .hyzx span{width:3rem;height:0.5rem;line-height:0.5rem;text-align:center;border:1px solid #ddd;color:#333;font-weight:500;padding:0;border-radius:1rem;}
    .hyzx img{width:4.64rem;height:1.62rem;display:inline-block;font-size:0;margin-top:0.2rem;}
    .hyzx h4{width:100%;text-align:center;padding:0.2rem 0;color:#497eb0;font-weight:500;}
    .hyzx h4 strong{font-size:0.3rem;}

    .eleven-text{width:100%;padding:0 0.2rem 0.2rem 0.2rem;}
    .eleven-text p{width:100%;text-indent:-0.4rem;padding-left:0.4rem;font-size:0.24rem;line-height:0.4rem;color:#222;}

    .fixed_href{width:100%;height:100%;position:fixed;left:0;top:0;background:rgba(0,0,0,0.6);z-index:20;}
    .hrefOpen{width:6.5rem;padding:0.2rem;border-radius:0.1rem;border:2px solid #93bbe0;position:absolute;background:#fff;left:6%;top:33%;}
    .hrefClose{width:1rem;height:1rem;position:absolute;right: -0.5rem;top: -0.5rem;}
    .hrefOpen h3{width:100%;text-align:center;font-size:0.3rem;padding-top:0.1rem;}
    .hrefOpen p{padding-top:0.2rem;width:100%;font-size:0.24rem;line-height:0.4rem;color:#555;text-indent: 2em;}
    .hrefOpen p span{color:#ef5933;}

    .money-text{width:100%;font-size:0.24rem;padding-top:0.1rem;color:#999;text-align:center;}
    .money-ze{
        width:100%;text-align:center;font-size:0.6rem;color:#f64e41;
        strong{
            font-weight:500;
        }
    }
    .money-ze img{width:0.13rem;height:0.22rem;display:inline-block;}
    .money-mt{margin-top:0.5rem;}
    .money-line{border-bottom:1px dashed #dfdfdf;width: 90%;margin: 0 auto;padding-bottom:0.2rem;}

    .money-list{width:100%;padding:0.2rem 0;display:inline-block;}
    .money-list li{float:left;width:33%;border-right:1px solid #dfdfdf;text-align:center;font-size:0.24rem;}
    .money-list li p{width:100%;color:#999;}
    .money-list li em{font-style:normal;font-size:0.3rem;color:#333;padding-top:0.2rem;}
    .money-list li:last-child{border-right:none;}
</style>
