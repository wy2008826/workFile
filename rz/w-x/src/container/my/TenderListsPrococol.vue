<template>
    <div>
        <div class="wraper" v-html="htmlContent"></div>
        <!--<p class="signWraper">-->
            <!--<span class="left type0_name">甲方：***</span> &nbsp;&nbsp; <span class="right type1_name">乙方：***</span><br/>-->
            <!--<span class="left">2017年12月21日</span> &nbsp;&nbsp; <span class="right">2017年12月21日</span><br/>-->
        <!--</p>-->
        <!--<p class="day">-->
            <!--&nbsp;&nbsp;&nbsp;2017年12月21日-->
        <!--</p>-->
    </div>

</template>
<script>
    import API from '@/api'
    import getParam from '@/lib/getParam'

    export default {
        name: 'TenderListsProtocol',
        data(){
            return {
                tenderId:getParam(window.location.href,'tenderId'),
                protocolId:getParam(window.location.href,'protocolId'),
                productType:getParam(window.location.href,'productType'),
                bondId: getParam(window.location.href,'bondId'),
                nid:getParam(window.location.href,'nid'),
                isBig:getParam(window.location.href,'isBig'),
                token:getParam(window.location.href,'token'),
                name:'',//协议名称
                htmlContent:'',//协议内容
                signPosList:[],
                //电子签章 signPosList.type 	签章类型 0 是平台 1借款人 2 出借人 3担保人 4 企业借款人
                // obj.signPosList.sealData 印章: base64的字节流, 可直接转换为图片
            }
        },
        async created(){
            const {setTitle} = this.$route.meta
            const {
                tenderId,
                protocolId,
                productType,
                nid='',
                isBig,
                token,
                bondId
            }=this.$data

            const param={
                tenderId:tenderId,//投资记录id 908435
                protocolId:protocolId,//协议模板ID 104
                productType,//productType 1
                isBig ,//	R计划必传字段 1
                nid,// nid, R计划必传字段 6
//              userId:1301405, //1301405
            }
            if(bondId && bondId !='undefined'){
                param.bondId = bondId
            }
            if(token){//app需要加token
                param.token=token
            }
            const obj=await API.get(API.myTenderProtocolDetail,param)
            this.$data.htmlContent=obj.htmlContent
            this.$data.signPosList=obj.signPosList
            this.$data.name=obj.name
            setTitle(obj.name)
            document.title=obj.name
            document.getElementsByTagName('title')[0].innerHTML=obj.name

            this.$nextTick(()=>{
                (this.$data.signPosList||[]).forEach((signImg,i)=>{
                    const {
                        type,
                        sealData
                    }=signImg
                    const singNameDom = window.document.getElementsByClassName('type'+type+'_name')[0]
                    if(singNameDom){
                        const oldStyle=singNameDom.getAttribute('style')||''
                        singNameDom.setAttribute('style',oldStyle+'position:relative;')
                        const img=document.createElement('img')
                        img.setAttribute('src','data:image/png;base64,'+signImg.sealData)
                        img.setAttribute('style','position:absolute;width:1.6rem;top:-0.5rem;left:0.5rem')
                        singNameDom.appendChild(img)
                    }
                })

                const signWraper=document.getElementsByClassName('signWraper')[0]//签名的最外层
                const day=document.getElementsByClassName('day')[0]//只有一个日期的外包层
                const day2=document.getElementsByClassName('day2')[0]

                if(signWraper){//清除多余的&nbsp 避免样式影响
                    const html=signWraper.innerHTML.replace(/\&nbsp;/g,'')
                    const oldStyle=signWraper.getAttribute('style')||''
                    signWraper.setAttribute('style',oldStyle+';display:table;width:100%;')
                    signWraper.innerHTML=html
                }


                const dayDom=document.getElementsByClassName('day')[0]//只有一个日期的外包层
                const lefts=document.getElementsByClassName('left')||[]//左边的签名
                const rights=document.getElementsByClassName('right')||[]//右边的签名

                for(let i=0;i<lefts.length;i++){
                    const dom=lefts[i]
                    const trimHtml=dom.innerHTML.replace(/\&nbsp;/g,'')
                    const oldStyle=dom.getAttribute('style')||''
                    dom.setAttribute('style',oldStyle+';display:block;width:47%;float:left')
                    dom.innerHTML=trimHtml
                }
                for(let i=0;i<rights.length;i++){
                    const dom=rights[i]
                    const trimHtml=dom.innerHTML.replace(/\&nbsp;/g,'')
                    const oldStyle=dom.getAttribute('style')||''
                    dom.setAttribute('style',oldStyle+';display:block;width:47%;float:right')
                    dom.innerHTML=trimHtml
                }
                if(dayDom){
                    dayDom.setAttribute('style','margin:0.45rem 0 0 2.5rem')
                }
            })
        },
        methods: {

        }
    };


</script>
<style lang="scss" scoped>
    .wraper{
        padding:0.15rem;
    }
    .type0_name,.type1_name,.type2_name,.type3_name{
        position:relative;
        width:2.6rem;
        img{
            position: absolute;
            width:2rem;
        }
    }

    .left,.right{
        @include box((d:inline-block,w:45%));
    }
</style>
