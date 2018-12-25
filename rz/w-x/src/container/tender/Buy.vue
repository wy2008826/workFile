<template>
    <div class="wraper">
        <section>
            <p v-text="curTenderInfo.name"></p>
            <h4>
                <span>理财期限 <i v-text="timeLimitTxt"></i></span>
                <span>剩余可投 <i v-text="UnitWan(curTenderInfo.lastAccount)"></i>万元</span>
            </h4>
        </section>
        <div class="buy_area">
            <p class="title">投资金额</p>
            <div class="buy_row">
                <span>¥</span>
                <input type="text" v-model="moneyInput" :placeholder="placeholder">
                <label @click="fillMaxMoney">余额最大</label>
            </div>
            <p class="footer">
                账户余额<span v-html="curTenderInfo.userAccount || '0.00'"></span>元
            </p>
        </div>
        <div class="award_area">
            <p class="arrow_item" v-show="curTenderInfo.discount!=0" @click="showCoupon">
                <span>优惠券</span>
                <label class="no" v-if="!hasCouponToUse">暂无可用优惠券</label>
                <label v-if="!curCoupon&&hasCouponToUse">选择可用优惠券</label>
                <label class="yes" v-if="hasCouponToUse &&　curCoupon" v-text="selectedText"></label>
            </p>
            <p class="footer">预期收益 <span v-text="profitTxt">----</span></p>
        </div>
        <p class="msg"><span class="circle"></span>提示：投资后红包金额将返还至您的账户余额</p>
        <p class="buyBtnWraper">
            <Btn :label="'立即投资'" :type="'red'" :click="confirmSubmit"/>
        </p>

        <div class="msg" v-if="(curTenderInfo.proList||[]).length">
            <p>同意签署</p>
            <div class="pro">·
            <router-link v-for="(item,index) in curTenderInfo.proList||[]"
                         :key="index"
                         v-text="'《'+item.name+'》'" :to='"/tender/protocol/"+item.id'>
            </router-link>
            </div>
        </div>
        <!--<div class="amount_area">-->
        <!--<p>-->
        <!--实际支付(元)-->
        <!--<label>6,554.02</label>-->
        <!--</p>-->
        <!--<span class="btn" @click="confirmSubmit">确认投资</span>-->
        <!--</div>-->

        <VDialog :show="showNoPayPassDialog" :disableShadeClose="true" :disableCloseBtn="true">
            <div class="no_paypass_bomb_cont">
                <div class="normal_txt">
                    <p>为保证您的账户安全</p>
                    <p>请先设置交易密码</p>
                </div>
                <p class="btns_bottom">
                    <span @click="closeNoPayPassDialog">取消</span>
                    <router-link tag="span" to="/my/setPwd/3">设置</router-link>
                </p>
            </div>
        </VDialog>

        <!--优惠券 toast-->
        <Toast :show="showCouponToast" v-on:msg="changeCouponToast" :onlyslot="true">
            <div class="toast_wraper">
                <p class="title">
                    <span class="close" @click="changeCouponToast(false)"></span>选择优惠券
                    <span class="not_use" @click="doNotUseCoupon">不使用优惠券</span>
                </p>
                <div class="toast_lists">
                    <RedPacketCard :couponType="card.type" :key="index"
                                   :cardData="card"
                                   :status="0"
                                   v-for="(card,index) in couponLists"
                                   :clickType="'select'" :circleBg="'white'" @click.native="selectCoupon(card)"
                                   class="coupon_card">
                        <span v-show="card==curCoupon" class="select_icon"></span>
                    </RedPacketCard>
                </div>
            </div>
        </Toast>

        <!--输入支付密码弹框-->
        <VDialog :show="showBomb" :close="closeConfirmPass">
            <div class="bomb_cont">
                <Inputs :type="'border'">
                    <input type="password" v-model="payPassval" placeholder="请输入支付密码"/>
                    <router-link to="/resetPwd/2">忘记密码？</router-link>
                </Inputs>
                <Btn :label="'确认'" :type="'red'" :click="confirmPass"/>
            </div>
        </VDialog>
    </div>
</template>
<script>
    import Toast from '@/component/Toast'
    import RedPacketCard from '@/component/RedPacketCard'
    import VDialog from '@/component/Dialog'
    import Inputs from '@/component/Inputs'
    import Btn from '@/component/Btn'
    import API from '@/api'
    import MD5 from 'blueimp-md5'
    import SHA256 from 'sha256'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'Buy',
        data() {
            return {
                bid: this.$route.params.bid,//tender id
                productType:this.$route.params.productType,
                moneyInput: '',
                curCoupon: null,//当前选中的红包
                showCouponToast: false,//是否显示红包列表的toast
                showNoPayPassDialog: false,//提示未设置过交易密码
                showBomb: false,//是否显示输入密码弹框
                payPassval: '',//支付密码
                curTenderInfo:{//当前标的的详情

                },
                category:this.$route.params.category
            }
        },
        async created(){
            const param = {
                bid: this.$data.bid,
                productType: this.$data.productType
            }
            const dataObj = await API.post(API.borrowDetail, param)
            this.$data.curTenderInfo=dataObj
        },
        methods: {
            ...mapActions([
                'showMsg'
            ]),
            showCoupon(){
                if (this.hasCouponToUse) {//有可用加息券
                    this.showCouponToast = true
                }
            },
            changeCouponToast(val){
                this.showCouponToast = val
            },
            selectCoupon(card){
                this.curCoupon = card
                this.showCouponToast = false
//                if (card == this.curCoupon) {//点击切换选中状态
//                    this.curCoupon = null
//                } else {
//                    this.curCoupon = card
//                }
            },
            doNotUseCoupon(){//不使用优惠券
                this.curCoupon = null
                this.showCouponToast = false
            },
            fillMaxMoney(){//填充输入框的最大可投资额度
                this.moneyInput = Math.min(this.curTenderInfo.userAccount, this.curTenderInfo.lastAccount) || ''
            },
            UnitWan(num){
                return (num / 10000)
            },
            confirmSubmit(){//点击底部确认按钮  弹出输入支付密码弹框

                const moneyReg = /^\d+(\.\d{1,2})?$/
                let moneyInput = this.moneyInput//输入框输入金额

                if (!this.info.isPayPasWord) {//没有设置交易密码
                    this.$data.showNoPayPassDialog = true
                    return
                }

                if (!this.moneyInput) {
                    this.showMsg('请输入投资金额')
                    return;
                }  else {
                    if (!moneyReg.test(moneyInput)) {
                        this.showMsg('请输入正确的投资金额')
                        return
                    } else {//输入了正确的数字
                        const lowestAccount=this.curTenderInfo.lowestAccount||100

                        if(moneyInput<lowestAccount){
                            this.showMsg(`输入金额不能小于${lowestAccount}！`)
                            return
                        }

                        if(moneyInput>this.curTenderInfo.userAccount){
                            this.showMsg('输入金额不能大于账户余额！')
                            return
                        }
                        if(moneyInput>this.curTenderInfo.lastAccount){
                            this.showMsg('输入金额不能大于剩余可投金额！')
                            return
                        }

                        this.showBomb = true
                        this.payPassval = ''

                    }
                }
            },
            closeConfirmPass(){
                this.showBomb = false
            },
            closeNoPayPassDialog(){
                this.showNoPayPassDialog=false
            },
            async confirmPass(){//确认交易密码
                let data = {
                    bid: this.bid,
                    money: this.moneyInput,
                    couponId: this.curCoupon && this.curCoupon.id,
                    type: this.curCoupon && this.curCoupon.type,
                    tender_type: 2,
                    payPassword: SHA256(MD5(this.payPassval)),
                    productType:this.$route.params.productType,
                }
                if(this.category==0){
                    data.category=0
                }
                await API.post(API.borrowTender, data)
                this.$router.push('/tender/buySuccess')
            }
        },
        computed: {
            ...mapGetters([
//                'curTenderInfo',
                'info'
            ]),
            hasCouponToUse(){//是否有优惠券可用
                return this.curTenderInfo.list && this.curTenderInfo.list.length > 0
            },
            placeholder(){
                const lowestSingleLimit=this.curTenderInfo.lowestSingleLimit || 1 //投资金额倍数
                return `金额为${lowestSingleLimit}的整数倍`
            },
            couponLists(){
                let lists = this.curTenderInfo.list || []

                lists.map((item, index) => {
                    item.couponType = item.type//1 红包  2 加息券
                    item.up = item.discountItem//加息或者红包金额
                    item.status = 0
                    item.statusType = 0
                    item.endTimes = item.endTime
                })
                return lists
            },
            selectedText(){
                if (this.curCoupon) {//选中有红包和加息券
                    const {type} = this.curCoupon
                    if (type == 1) {//红包
                        return `红包${this.curCoupon.up}元`
                    } else if (type == 2) {//加息券
                        return `加息${this.curCoupon.up}%`
                    }
                }
            },
            profitTxt(){//收益计算
                const moneyReg = /^\d+(\.\d+)?$/
                let moneys = this.moneyInput//输入框输入金额
                if (!moneys) {
                    return '----'
                }
                let income = '0.00'
                let {
                    timeLimit,//期限
                    borrowTimeType,// 0月标 1天标
                    apr,
                    baseApr,
                    exApr
                } = this.curTenderInfo
                let days = borrowTimeType == 0 ? timeLimit * 30 : timeLimit

                let {
                    useDate,//可加息天数
                    useTimeLimit,//可使用标的天数
                    rateAmount,//
                    up,//加息值
                    type,//1、红包 2、 加息劵
                } = this.$data.curCoupon || {}

                income = 0.00 //加息券的收益
                let basicIncome = moneys * (baseApr * 1 + exApr * 1) * days * 0.01 / 365
                if (type == 1) {//使用红包
                    return `${(up + basicIncome).toFixed(2)}(包含红包${up}元)`
                } else if (type == 2) {//使用加息券
                    if (!rateAmount) {//金额限制
                        //全额加息
                        if (useDate == 0) {
                            //无时间限制
                            income = moneys * up * days / 365
                        } else {
                            //有时间限制
                            let useFulDays = Math.min(useDate, days)
                            income = moneys * up * useFulDays / 365
                        }
                    } else {//部分金额加息
                        let usefulMoney = Math.min(moneys, rateAmount)

                        if (useDate == 0) {
                            //无时间限制(只算加息的金额)
                            income = usefulMoney * up * days / 365
                        } else {
                            //有时间限制
                            let useFulDays = Math.min(useDate, days)
                            income = usefulMoney * up * useFulDays / 365
                        }
                    }
                    let jxProfit = income / 100
                    income = basicIncome + jxProfit
                    return `${income.toFixed(2)}元 (包含加息券收益${jxProfit.toFixed(2)}元)`

                } else {//不使用优惠券
                    return `${basicIncome.toFixed(2)}元`
                }

            },
            timeLimitTxt(){//投资期限
                const {
                    borrowTimeType,//0 月标  1 天标
                    timeLimit
                } = this.curTenderInfo
                return borrowTimeType == 0 ? timeLimit + '个月' : timeLimit + '天'
            },
        },
        components: {
            Toast,
            RedPacketCard,
            VDialog,
            Inputs,
            Btn
        }
    }
</script>
<style lang="scss" scoped>

    section {
        @include box((m:0.2rem 0, bg:$white, p:0.26rem 0.3rem 0.3rem, fs:0.28rem, lh:0.4rem));
        p {
            @include box((c:$black5, m:0 0 0.25rem));
        }
        h4 {
            @include box((c:$black2, d:flex));
            font-weight: normal;
            span {
                flex: 1;
            }
        }
    }

    .buy_area {
        @include box((p:0.27rem 0 0 0.3rem, bg:$white));
        .title {
            @include box((lh:0.4rem, fs:0.28rem, c:$black5, m:0 0 0.16rem));
        }
        .buy_row {
            @include box((p:0.23rem 0, d:flex, lh:0.56rem));
            span {
                @include box((w:1.1rem, fs:0.64rem, c:$black2, ta:center));
            }
            input {
                @include box((fs:0.4rem, c:$black2));
                flex: 1;
                &::-webkit-input-placeholder, &::input-placeholder {
                    color: #ccc;
                }
            }
            label {
                @include box((w:2.6rem, h:0.54rem, bdr:0.1rem, fs:0.28rem, ta:center, c:$blue, m:0 0.3rem 0));
                @include thin(all, $blue);
            }
        }
        .footer {
            @include box((lh:0.8rem, fs:0.24rem, c:$black9));
            @include thin(top, #e5e5e5);
            span {
                @include box((c:$red, m:0 0 0 0.1rem));
            }
        }
    }

    .award_area {
        @include box((p:0 0 0 0.3rem, bg:$white, m:0.2rem 0));
        .title {
            @include box((lh:0.8rem, fs:0.28rem));
        }
        .arrow_item {
            @include box((lh:1rem));
            @include thin(bottom, #e5e5e5);
            position: relative;
            &:after {
                $size: 0.3rem;
                content: '';
                @include box((w:$size, h:$size, d:block, m:- $size / 2 0 0));
                @include position((p:absolute, r:0.22rem, t:50%));
                @include bg_img('icon_arrow_right.png');
            }
            span {
                @include box((fs:0.28rem, c:$black2));
            }
            label {
                @include box((fs:0.26rem, fl:right, p:0 0.6rem 0 0));
                &.yes {
                    @include box((c:$red));
                }
                &.no {
                    @include box((c:#ccc));
                }
            }
        }
        .footer {
            @include box((lh:0.8rem, ta:right, p:0 0.3rem 0, fs:0.24rem, c:$black5));
        }
    }

    .msg {
        p{
            float:left;
        }
        @include box((c:$black9, fs:0.2rem, lh:0.28rem, p:0.1rem 0.3rem));
        .pro{
            float:left;
        }
        a {
            @include box((c:$blue, d:block, m:0.03rem 0.2rem 0 0));
            &:first-child{
                margin-top:0;
            }
        }
        .circle {
            $size: 0.16rem;
            @include box((d:inline-block, w:$size, h:$size, bdr:50%, m:0 0.1rem 0 0));
            @include bg_img('tender_detail/icon_circle_circle.png');
        }
    }

    .buyBtnWraper {
        @include box((m:0.38rem 0.3rem 0.17rem 0.3rem))
    }

    .amount_area {
        @include box((w:100%, h:0.88rem, lh:0.88rem, bg:$white, d:flex));
        @include position((p:fixed, l:0, b:0, z:0));
        p {
            @include box((p:0 0.8rem 0 0.3rem, fs:0.3rem, c:$black2));
            flex: 1;
            label {
                @include box((fl:right, fs:0.32rem, c:$red));
            }
        }
        .btn {
            @include box((w:2.4rem, bg:$red, c:$white, ta:center));
        }
    }

    .coupon_card {
        @include box((m:0.3rem 0));
    }

    .toast_wraper {
        @include box((bg:$white));
        .title {
            $H: 0.42rem;
            @include box((ta:center, fs:0.3rem, lh:$H, p:0.3rem 0, c:$black2));
            border-bottom: 0.02rem solid #e5e5e5;
            position: relative;
            .close {
                @include box((w:0.34rem, h:0.34rem, d:block));
                @include bg_img('icon_close.png');
                @include position((p:absolute, t:0.34rem, l:0.34rem));
            }
            .not_use {
                @include box((lh:1.02rem, fs:0.28rem, c:$black2));
                @include position((p:absolute, t:0, r:0.2rem));
            }
        }
        .toast_lists {
            @include box((p:0.3rem 0.3rem));
            max-height: 6.3rem;
            overflow-y: auto;
            .select_icon {
                @include box((w:0.44rem, h:0.44rem, d:inline-block, m:0 0.3rem 0 0));
                @include bg_img('tender_detail/icon_select_packet.png');
            }
        }
    }

    .bomb_cont {
        @include box((p:0.85rem 0.3rem 0.4rem));
    }

    .btns_bottom {
        @include box((d:flex, p:0.24rem 0));
        @include thin(top, #e5e5e5);
        span {
            flex: 1;
            @include box((d:block, lh:0.5rem, ta:center, fs:0.32rem, c:$black2));
            &:first-child {
                color: $black5;
                @include thin(right, #e5e5e5)
            }
        }
    }
    .no_paypass_bomb_cont {
        &:before {
            content: '';
            @include box((d:block, w:2.08rem, h:1.2rem, m:-0.5rem 0 0 1.87rem));
            @include bg_img('my/recharge_set_pay_pass.png');
        }
        .normal_txt {
            @include box((p:0.6rem 0 1rem 0, lh:0.4rem, fs:0.28rem, c:$black5, ta:center));
        }
        .btns_bottom {
            @extend .btns_bottom;
        }
    }
</style>