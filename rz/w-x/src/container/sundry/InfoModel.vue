<template>
    <div>
        <div class="wrap">
            <p>金服是基于互联网环境下，为有理财需求的大众提供真实交易的综合金融服务，平台不是借贷主体，只做居间撮合，为大众提供真实安全、可触及、可持续的投资渠道，既满足中小微企业及大众真实金融需求，同时帮助用户实现持久收益，财富增值，是基于双向的社会化普惠金融。</p>
            <p class="nav">—— 供应链金融模型图 ——</p>
            <div class="infoModel1"></div>
            <p class="nav">—— 消费金融模型图 ——</p>
            <div class="infoModel2"></div>
            <p class="nav">—— 收费标准 ——</p>
            <div class="Tab">
                <p>每个用户每月可享受3次免费提现机会，超出部分的提现统一按单笔将收取2~5元不等的提现服务费。</p>
                <table cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td>提现金额</td>
                        <td>服务费</td>
                    </tr>
                    <tr>
                        <td>0~5万元（含）</td>
                        <td>2元/笔</td>
                    </tr>
                    <tr>
                        <td>5~10万元（含）</td>
                        <td>3元/笔</td>
                    </tr>
                    <tr>
                        <td>10-50万元（含）</td>
                        <td>4元/笔</td>
                    </tr>
                    <tr>
                        <td>50-100万元（含）</td>
                        <td>5元/笔</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'infoModel',
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include position((p:absolute));
        @include bg_img('infoPublicBg.png');
        @include box((w:100%,c:#fff,fs:0.24rem,p: 0.6rem));
        min-height: 100%;overflow: scroll;
    }
    @each $url in 1,2 {
        .infoModel#{$url}{
            @include bg_img('infoModel#{$url}.png');
            @include box((w:100%,h:3.5rem));
        }
    }
    .nav{
        @include box((fs:0.3rem,lh:0.3rem,m:0.7rem auto 0.6rem,ta:center));
    }
    .Tab{width:100%;}
    .Tab table{width:100%;border-top:1px solid #fff;border-right:1px solid #fff;}
    .Tab table td{width:50%;text-align:center;height:0.35rem;border-left:1px solid #fff;border-bottom:1px solid #fff;}
</style>
