<template>
    <div class="wrap">
        <img class="banner" src="https://images.51rz.com/images/app/new_yqhy/eleven-banner.png">
        <div v-show="step === 1">
            <p class="friend">
                您的好友<span v-text="invitePhone"></span>
                送你<span class="money">1228元</span>大红包
            </p>
            <div class="box">
                <input v-model="phone" type="tel" class="phone" placeholder="请输入手机号接受邀请"/>
                <a class="btn" @click="next">领取大礼包</a>
                <a class="login" @login="login">我已领取，登录 ></a>
            </div>
        </div>
        <div class="box" v-show="step === 2">
            <p class="phoneShow">手机号:<span v-text="phone"></span></p>
            <div class="code">
                <input v-model="imgCode" type="tel" class="phone" placeholder="请输入右侧图形验证码"/>
                <img :src="img_url" @click="get_img" class="img_code"/>
            </div>
            <div class="code" style="margin-top: 0.3rem">
                <input v-model="phoneCode" type="tel" class="phone" placeholder="请输入验证码"/>
                <div class="send">
                    <SendCode :click="send_code" css="color:#fff;"></SendCode>
                </div>
            </div>
            <div style="position: relative">
                <input :type="pwd_type"
                       ref="pwd"
                       class="phone"
                       placeholder="请设置6~20位字符的登录密码"/>
                <a :class="eye_class" @click="change_eye"></a>
            </div>
            <p style="color:#fff;">
                <input @click="agree = !agree"
                       checked type="checkbox" style="margin-right: 0.2rem;"/>
                阅读并同意<router-link to="/registerAgreement" tag="span">《金服服务协议》</router-link>
            </p>
            <a class="btn" @click="register">领取大礼包</a>
        </div>
        <img class="list_title" src="https://images.51rz.com/images/app/new_yqhy/eleven-title4.png">
        <img class="list" src="https://images.51rz.com/images/app/new_yqhy/eleven-pic2.png">
        <div class="foot">
            <p class="tip">理财有风险 入市需谨慎</p>
            <p>浙江金融服务股份有限公司<br/>
                @金服 www.51rz.com 浙ICP备13009823号-1</p>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import SendCode from '@/component/SendCode'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'share',
        data() {
            return {
                step: 1,
                uid: this.getUrlParam('uid') || 0,
                invitePhone: '',
                phone:'',           //手机号
                imgCode: '',        //图片验证码
                phoneCode: '',          //手机短信验证码
                imgToken: '',
                img_url: '',
                eye_class: 'close_eye',
                pwd_type: 'password',
                agree: true,
                phoneReg: /^1(3|4|5|7|8)\d{9}$/,
            }
        },
        methods: {
            async getPhone() {
                this.invitePhone = await API.get(API.inviteGetMobile,{userId:this.uid})
            },
            getUrlParam(name) {
                const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg)  //匹配目标参数
                if (r!=null) return unescape(r[2]); return null //返回参数值
            },
            change_eye(){
                if (this.eye_class === 'close_eye') {
                    this.eye_class = 'open_eye'
                    this.pwd_type = 'text'
                } else {
                    this.eye_class = 'close_eye'
                    this.pwd_type = 'password'
                }
            },
            next() {
                if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))) {
                    this.showMsg('手机号格式不正确')
                    return
                }
                this.step = 2
            },
            async send_code(callback) {
                const {
                    phone,
                    imgCode,
                    imgToken,
                } = this.$data
                if (!imgCode) {
                    this.showMsg('请输入图形验证码')
                    return
                }
                const param = {
                    mobile: phone,
                    patchcaCode: imgCode,
                    imgToken: imgToken,
                }
                await API.get(API.rSendCode, param)
                callback()
            },
            async register() {
                const {
                    phone,
                    agree,
                    phoneCode,
                    phoneReg,
                } = this.$data
                const loginPwd = this.$refs.pwd.value
                const showMsg = this.showMsg
                if (!(phoneReg.test(phone))) {
                    showMsg('手机号格式不正确')
                    return
                }
                if (!phoneCode) {
                    showMsg('请输入短信验证码')
                    return
                }
                if (!loginPwd || loginPwd.length < 6) {
                    showMsg('请输入登录密码')
                    return
                }
                if (!agree) {
                    showMsg('请先勾选注册协议')
                    return
                }
                const saltObj = await API.saltPass(loginPwd)
                const {
                    pwd,
                    salt,
                } = saltObj
                const param = {
                    mobile: phone,
                    password: pwd,
                    repsssword: pwd,
                    mobileCode: phoneCode,
                    ref: this.uid,
                    salt: salt,
                }
                const obj = await API.get(API.register, param)
                showMsg('注册成功')
                setTimeout(() => {
                    this.setLoginTo('')     //清空loginTo
                    this.setInfo(obj)       //保存用户的基本信息
                    window._vds.push(['setCS1', 'user_id', obj.uid])    //添加统计
                    this.$router.push('/invite/success')
                }, 2000)
            },
            get_img() {
                this.imgToken = new Date().getTime() + '' + Math.floor(Math.random() * 10000)
                this.img_url = API.getImgCode + '?imgToken=' + this.imgToken
            },
            login() {
                this.setLoginTo('/my/index')
                this.$route.push('/login')
            },
            ...mapActions([
                'showMsg',
                'setLoginTo',
                'setInfo',
            ])
        },
        mounted() {
            if(this.uid > 0) {
                this.getPhone()
            }else {
                alert('链接遗失邀请人信息')
            }
            this.get_img()
        },
        components: {
            SendCode,
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include box((bg:#3c6fa0));
    }
    .banner{
        @include box((w:100%));
    }
    .friend{
        @include box((c:#fff,ta:center));margin-top: 0.5rem;
        .money{
            @include box((c:#fbd23a,fs:0.3rem));
        }
    }
    .box{
        @include box((d:block,w:6.5rem,m:auto));
    }
    .phone{
        @include box((d:block,w:100%,m:0.3rem auto,p:0 0.3rem,h:1rem,bdr:0.08rem));
    }
    .btn{
        @include box((d:block,bg:#fbd23a,m:0.6rem auto 0,c:#9c3f15,fs:0.36rem,lh:1.08rem,ta:center,bdr:0.08rem));
    }
    .phoneShow{
        @include box((c:#92bae2,fs:0.24rem,m:0.2rem 0));
    }
    .code{
        @include box((d:flex));
        .send{
            @include box((w:2.4rem,lh:1rem,bg:#92bae2,c:#fff ,fs:0.3rem,ta:center));margin-left: 0.1rem;
        }
        input{
            @include box((fx:1,m:0));
        }
    }
    .login{
        @include box((d:block,fs:0.3rem,c:#fff,ta:center,m:0.3rem 0));
    }
    .list_title{
        @include box((d:block,w: 3.73rem,h: 1.03rem,m:0.8rem auto 0.35rem));
    }
    .list{
        @include box((d:block,w: 6.48rem,h: 2.13rem,m:auto));
    }
    .foot{
        @include box((c:#a9bbd0,fs:0.24rem,fw:500,ta:center,p:0.6rem 0));
        .tip{
            @include box((w:2.6rem,lh:0.7rem));
            border-bottom: 1px dashed #a9bbd0;margin: 0.1rem auto;
        }
    }
    .img_code{
        @include box((w:2.4rem,h:1rem));margin-left: 0.1rem;
    }
    .icon {
        @include position((p:absolute,r:0.2rem,t:0));
        @include box((d:block, w:0.5rem, h:0.5rem, m:0.25rem 0));
    }

    .close_eye {
        @extend .icon;
        @include bg_img('close_eye.png');
    }

    .open_eye {
        @extend .icon;
        @include bg_img('open_eye.png');
    }
</style>
