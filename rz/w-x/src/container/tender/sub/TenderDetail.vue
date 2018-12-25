<template>
    <div class="wrap">
        <Detail :productType="productType" :category="category"/>
    </div>
</template>
<script>
    import Detail from '@/container/tender/sub/details/NewDetail'
    //如果是组件  productId从prop中获取；如果是被app调用url渲染 productId从router中获取

    //不管是微信还是app统一从router中取参数

    export default {
        name: 'TenderDetail',
        data(){
            return {
                bid: this.$route.params.bid,//tender id
                productId: this.$route.params.productId,//
                productType:this.$route.params.productType,//1：众供宝， 2:众消宝， 3：R计划
                category:this.$route.params.category,//0：新手标 1：普通标 2：体验标
            }
        },
        props: [],//组件调用 从props中获取
        created(){

        },
        methods: {},
        components: {
            Detail,
        }
    }
</script>
<style lang="scss" scoped>
    .wrap {
        @include box((p:0 0.2rem 2.2rem 0.2rem, bg:$white))
    }
</style>
