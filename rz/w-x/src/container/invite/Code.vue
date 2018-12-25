<template>
    <div class="bg">
        <div class="title">
            <p>——我的邀请码——</p>
            <span v-text="uid"></span>
            <div class="code">
                <img :src="`data:image/png;base64,${imgBase}`" />
            </div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'code',
        data() {
            return {
                uid: this.getUrlParam('uid') || 0,
                token: this.getUrlParam('token') || 0,
                imgBase: '',
            }
        },
        methods: {
            async getInitData() {
                const param = {
                    inviteUrl: `${location.protocol}//${document.domain}/invite/share?uid=${this.uid}`,
                    token: this.token,
                }
                const imgBase = await API.get(API.inviteQrCode,param)
                this.imgBase = imgBase.code
            },
            getUrlParam(name) {
                const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
                const r = window.location.search.substr(1).match(reg)  //匹配目标参数
                if (r!=null) return unescape(r[2]); return null //返回参数值
            }
        },
        mounted() {
            this.getInitData()
        }
    }
</script>
<style lang="scss" scoped>
    .bg{
        @include box((bg:url(https://images.51rz.com/images/app/new_yqhy/invite-gn05.png)));
    }
    .title{
        @include box((ta:center));padding-top: 1.5rem;
        p{
           @include box((c:#fd9a26,fs:0.24rem));
        }
        span{
            @include box((c:#ef5933,fs:0.48rem));
        }
    }
    .code{
        @include box((w:3.8rem,h:3.8rem,p:0.1rem,bs:0 0 0.2rem #c3c3c3,m:0.5rem auto));
        img{
            width: 100%;
        }
    }
</style>