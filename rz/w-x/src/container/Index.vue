<template>
    <div class="wrap">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div v-for="(item,index) in banner"
                             :key="index"
                             class="swiper-slide">
                    <a :href="`${item.linkurl}?uid=${info.uid}`">
                        <img :src="item.imgUrl" :alt="item.title"/>
                    </a>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="remind_wrap">
            <div class="remind"
                 v-for="(item,index) in remind"
                 v-if="index == remind_index">
                <div :class="item.img"></div>
                <p v-html="item.msg"></p>
                <router-link v-text="item.btn" :to="item.href"></router-link>
            </div>
        </div>
        <ul class="nav">
            <li v-for="(item,index) in guide"
                         :key="index">
                <a :href="item.linkurl">
                    <img :src="item.imgUrl" />
                    <p v-text="item.name"></p>
                </a>
            </li>
        </ul>
        <div class="project" :class="borrow.status === 10||borrow.status === 1 ?'canBuy':'unBuy'" v-if="borrow.id">
            <p>
                <span v-text="borrow.name"></span>
                <span :class="borrow.status == 10 ? 'icon' : 'icon_gray'"
                      v-text="borrow.productId === 5 ? '新手' : '推荐'"></span>
            </p>
            <p :style="borrow.status==1&&'color:rgba(246,76,62,0.50)'">
                <span v-text="borrow.baseApr"></span>
                <span v-if="borrow.exApr" v-text="`+${borrow.exApr}`"></span>%
            </p>
            <p>
                <span v-text="`期限${borrow.timeLimit}${borrow.borrowTimeType=='0'?'月':'天'}`"></span>
                <span v-text="`${borrow.lowestAccount}元起投`"></span>
            </p>
            <Btn v-if="borrow.status === 10"
                 type="red"
                 label="立即投资"
                 :href="`/tender/detail/${borrow.id}/${borrow.productType}/${borrow.category}`"></Btn>
            <Btn v-if="borrow.status === 1"
                 type="wait"
                 label="即将发售"
                 :href="`/tender/detail/${borrow.id}/${borrow.productType}/${borrow.category}`"></Btn>
            <Btn v-if="borrow.status !== 10&&borrow.status !== 1" type="gray" label="已售罄"></Btn>
        </div>
        <router-link tag="div" to="/know" class="know">
            <div class="index_know"></div>
            <p>了解金服</p>
            <p>一家靠谱的互联网金融理财平台</p>
        </router-link>
        <div class="data">
            <div class="index_data">
                <div>
                    <p v-text="totalTender"></p>
                    <p>累计交易总额</p>
                </div>
                <div>
                    <p v-text="totalUser"></p>
                    <p>累计用户数</p>
                </div>
                <p>创造持久价值 众享财富自由</p>
            </div>
        </div>
        <Menu_nav></Menu_nav>
        <VDialog :show="StopService" disableCloseBtn="true" disableShadeClose="true">
            <div class="StopService">
                <h3 :class="isStop?'now':'before'"
                v-text="isStop?'平台停服提醒':'平台维护提醒'">
                </h3>
                <p>因技术升级平台暂停投资、充值、提现<br/>
                    功能，对此带来的不便敬请谅解！<br/>
                    平台预计维护时间为6小时<br/>
                    (12月2日18:00-12月2日24:00)
                </p>
                <Btn v-if="!isStop"
                     _style="background:#FF3E88;color:#fff;"
                     style="padding:0 0.4rem 0.4rem 0.4rem"
                     :click="hideBeforeStopService"
                     type="btn"
                     label="知道了"></Btn>
                <a v-if="!isStop" class="close" @click="hideBeforeStopService"></a>
            </div>
        </VDialog>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import Menu_nav from '@/component/Menu'
    import Swiper from 'swiper'
    import Btn from '@/component/Btn'
    import API from '@/api'
    import VDialog from '@/component/Dialog'
    export default {
        name: 'index',
        data() {
            return {
                remind: [
                    {
                        msg: `您有<span class="red">0元</span>红包待领`,
                        btn: '立即领取',
                        img: 'index_remind3',
                        href: '/login'
                    },
                    {
                        msg: '开通北京银行<span class="red">资金存管</span>账户',
                        btn: '立即开通',
                        img: 'index_remind1',
                        href: '/my/bankOpen'
                    },
                    {
                        msg: '邀请好友得<span class="red">现金</span>奖励',
                        btn: '立即邀请',
                        img: 'index_remind4',
                        href: '/invite/index'
                    }
                ],
                banner: [],
                guide: [],
                borrow: {
                    id: '',
                    name: '',
                    status: '',
                    productId: '',
                    baseApr: '',
                    exApr: '',
                    timeLimit: '',
                    borrowTimeType: '',
                    lowestAccount: ''
                },
                totalTender: 0,
                totalUser: 0,
                StopService: false,
                isStop: false,
            }
        },
        methods: {
            ...mapActions([
                'showMsg'
            ]),
            setSlide(){
                const swiper = new Swiper('.swiper-container',{
                    autoplayDisableOnInteraction: false,
                    autoplay: 3000,
                    loop: true,
                    pagination: '.swiper-pagination',
                    paginationClickable :true,
                })
            },
            async getData() {
                const {
                    indexBanner={},
                    indexGuide=[],
                    indexBorrow={},
                    inviteAward=0,
                    totalTender=0,
                    totalUser=0,
                } = await API.post(API.getIndex,{type:1})
                this.banner = indexBanner.bannerList
                this.guide = indexGuide
                this.borrow = indexBorrow
                this.totalTender = totalTender
                this.totalUser = totalUser
                this.remind[0].msg = `您有<span class="red">${inviteAward}元</span>红包待领`
                this.$nextTick(() => {
                    this.setSlide()
                })
            },
            hideBeforeStopService() {
                this.StopService = false
            }
        },
        computed: {
            remind_index() {
                //未登录领红包  已登录：先开通存管 再邀请好友
                if(!this.info.uid){
                    return 0
                }else if(this.info.realNameStatus != 1){
                    return 1
                }else{
                    return 2
                }
            },
            ...mapGetters([
                'info'
            ])
        },
        components: {
            Menu_nav,
            Btn,
            VDialog,
        },
        created() {
            this.getData()
        }
    }
</script>
<style lang="scss" scoped>
    @import "./../css/swiper.min.css";
    .wrap{
        padding-bottom: 1.3rem;
        img{
            width: 100%;
        }
    }
    .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
        bottom: 0.9rem;
    }
    .swiper-container{height: 5rem;}
    .remind_wrap{
        max-width: 750px;
        @include position((p:absolute,t:4.2rem,l:0,r:0,z:10));
        @include box((w:100%,h:1.6rem,p:0 0.2rem,m:auto));
        background: -webkit-gradient(linear, 0 0, 0 50%, from(rgba(255,255,255,0)), to(rgba(255,255,255,1)));
    }
    .remind{
        @include box((w:100%,h:100%,bg:$white,bdr:4px,p:0.25rem 0.4rem,bs:0 0.13rem 0.3rem 0 rgba(0,0,0,0.04)));
        p{
            @include box((fs:0.28rem));margin-bottom: 0.2rem;
            span{
                @include box((c:$red));
            }
        }
        a{
            @include box((d:block,w:1.6rem,h:0.44rem,lh:0.4rem,bdr:0.22rem,c:$red,ta:center));
            @include thin(all,$red);
        }
        div{
            @include box((w:1.2rem,h:1.2rem,fl:right));
        }
    }
    .nav{
        margin-top: 0.8rem;
        @include box((d:flex,bg:$white,ta:center));
        li{
            @include box((fx:1,h:1.8rem,fs:0.22rem,c:$black5));
            img{
                @include box((w:0.64rem,h:0.64rem,m:0.3rem auto 0.2rem));
            }
        }
    }
    .project{
        @include box((bg:$white,ta:center,p:0.4rem 1.4rem,m:0.2rem 0));
        p:nth-child(1){
            position: relative;
            @include box((fs:0.32rem));
        }
        p:nth-child(2){
            @include box((m:0.3rem 0,fs:0.36rem));
            span:nth-child(1){
                @include box((m:0.3rem 0,fs:0.6rem));
            }
        }
        p:nth-child(3){
            margin-bottom: 0.4rem;
            span:nth-child(1){
                margin-right: 0.5rem;
            }
        }
        .icon{
            @include bg_img('index_icon.png');
            @include box((d:inline-block,w:0.6rem,h:0.28rem,fs:0.18rem,c:$white));
            @include position((p:absolute,b:0.2rem));
            margin-left: 0.1rem;
        }
        .icon_gray{
            @include bg_img('index_icon_gray.png');
            @include box((d:inline-block,w:0.6rem,h:0.28rem,fs:0.18rem,c:$white));
            @include position((p:absolute,b:0.2rem));
            margin-left: 0.1rem;
        }
    }
    .canBuy{
        p:nth-child(1){
            @include box((c:$black2));
        }
        p:nth-child(2){
            @include box((c:$red));
        }
        p:nth-child(3){
            @include box((c:$black5));
        }
    }
    .unBuy{
        p:nth-child(1){
            @include box((c:$black9));
        }
        p:nth-child(2){
            @include box((c:$black9));
        }
        p:nth-child(3){
            @include box((c:#ccc));
        }
    }

    @each $img in remind1,remind2,remind3,remind4,data,know {
        .index_#{$img}{
            @include bg_img('index_#{$img}.png');
        }
    }
    .StopService {
        @include box((ta:center,h:5.47rem));position: relative;
        .title{
            @include box((bdr:0.18rem 0.18rem 0 0,h:1.8rem,lh:1.8rem,fs:0.48rem,c:#fff,fw:normal));
        }
        .before{
            @extend .title;
            background: -webkit-gradient(linear, 0 0,100% 0, from(#FF328C), to(#FF886B));
            background: linear-gradient(to right,  #FF328C 0%,#FF886B 100%);
        }
        .now{
            @extend .title;
            background: -webkit-gradient(linear, 0 0,100% 0, from(#FF6058), to(#FFCD77));
            background: linear-gradient(to right,  #FF6058 0%,#FFCD77 100%);
        }
        p{
            @include box((fs:0.28rem,c:#555,w:4.8rem,m: 0.6rem auto 0.3rem));
        }
        .close{
            @include position((p:absolute,b:-1.26rem,l:50%));margin-left: -0.33rem;
            @include box((d:block,w:0.66rem,h:0.66rem));
            @include bg_img('close_dialog.png');
        }
    }
    .know{
        @include box((h:1.2rem,bg:$white,m:0.2rem 0,p:0.1rem 0.6rem));
        p:nth-child(2){
            @include box((fs:0.32rem,c:$black5));padding-top: 0.1rem;
        }
        p:nth-child(3){
            @include box((fs:0.2rem,c:$black9));
        }
        .index_know{
            @include box((d:block,w:1.1rem,h:1.1rem));float: right;
        }
    }
    .data{
        padding-top: 0.6rem;
        @include box((bg:$white));
        .index_data{
            @include box((h:2.35rem,ta:center,d:flex,p:0 1.2rem));flex-wrap: wrap;
            span{
                margin:0 0.5rem;
            }
            div{
                @include box((w:50%));
                p:nth-child(1){
                    @include box((c:$black5,fs:0.36rem));
                }
                p:nth-child(2){
                    @include box((c:$black9,fs:0.2rem));
                }
            }
            p:nth-child(3){
                margin-top: 0.5rem;
                @include box((w:100%,c:$black9,fs:0.24rem));
            }
        }
    }
</style>
