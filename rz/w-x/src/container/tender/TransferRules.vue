<template>
    <div class="yhxy-wrap">
        <h1>债权转让规则</h1>
        <p style="text-indent:0;">1、有效投资30天后方可进行债权转让。</p>
        <p style="text-indent:0;">2、承接标不能进行二次转让。</p>
        <p style="text-indent:0;">3、48小时后转让没成交则自动失效。</p>
        <p style="text-indent:0;">4、当前标转让期间回款，转让自动失效。 </p>
        <p style="text-indent:0;">5、转让密码是为了方便朋友之间进行债权转让而设置的，承接人如无转让密码就不能承接。</p>
        <p style="text-indent:0;">6、转让费用说明：平台不收取手续费，转让标会有相应的折价，折价比率是待收本金的0.5%～25%（具体折价率是转让人自行设定的），转让折价费用归承接人所有。 </p>
        <p style="text-indent:0;">7、债权转让规则最终解释权归金服所有。 </p>
    </div>
</template>
<script>
    export default {
        name: 'TransferRules',
        data(){
            return {}
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .yhxy-wrap{
        background: #fff;
        padding:0.3rem;
    }
    .yhxy-wrap div{
        padding: 0 0.3rem;
        margin: 0 auto;
    }
    .yhxy-wrap p{
        text-indent: 2em;
        margin-bottom: 0.2rem;
        word-wrap: break-word;
    }
    .yhxy-wrap h1{
        text-align: center;
        margin-bottom: 0.3rem;
        font-weight:800;
    }
    .yhxy-wrap h3{
        margin-bottom: 0.2rem;
        color: #ff8a3c;
    }
</style>
