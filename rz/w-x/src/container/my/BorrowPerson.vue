<template>
    <div class="wrap">
        <ul>
            <!--这里不做分页显示-->
            <BorrowPersonInfoCard class="borrowCard"
                                  v-for="(item ,i) in dataLists"
                                  :key="i"
                                  :cardData="item"
            />
        </ul>
    </div>
</template>
<script>
    import API from '@/api'
    import BorrowPersonInfoCard from '@/component/BorrowPersonInfoCard'
    import getParam from '@/lib/getParam'

    export default {
        name: 'BorrowPersonInfo',
        data(){
            return {
                bid:this.$route.params.tenderId,
                productType:getParam(window.location.href,'productType'),
                dataLists: [],
            }
        },
        created(){
            this.getInitData()
        },
        methods: {
            async getInitData(){
                const {
                    productType
                }=this.$data

                let param = {
                    bid:this.bid,
//                    tender:1,
                    productType,
                    pageNum:1,
                    numPerPage:50
                }
                const token=getParam(window.location.href,'token')
                if(getParam(window.location.href,'rPlan')==1){
                    param.rplan=1
                    param.trxId=getParam(window.location.href,'trxId')||''
                }
                if(productType==2 || productType==3 || productType==4){
                    param.trxId=getParam(window.location.href,'trxId')||''
                }

                if(token){
                    param.token=token
                }
                let obj = await API.get(API.borrowPersonInfo, param)
                this.dataLists = obj.recordList ||[]
            }
        },
        components:{
            BorrowPersonInfoCard
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include position((p:absolute, t:0, b:0,r:0,l:0));
        padding-top:0.3rem;
    }

</style>
