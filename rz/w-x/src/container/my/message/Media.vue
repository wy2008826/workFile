<template>
    <div class="wraper">
        <Scroll :getInitData="getInitData"
                :loadOver="loadOver">
            <MessageCard v-for="(item,i) in dataLists" :key="i"
                         :cardData="item"
                         :timeKey="'createTimes'"
                         :titleKey="'title'"
                         :contentKey="'subtitle'"
                         :imgKey="'picPath'"
            >
                <a class="footer" :href="'/my/message/detail/'+item.id" slot="footer">
                    查看详情
                </a>
            </MessageCard>
        </Scroll>
    </div>
</template>

<script>
    import MessageCard from '@/component/MessageCard'
    import Scroll from '@/component/Scroll'
    import API from '@/api'

    export default {
        name: 'Media',
        data(){
            return {
                numPerPage: 10,
                pageNum: 1,
                totalPage: 0,
                loadOver: false,
                dataLists: []
            }
        },
        methods: {
            async getInitData(flag){
                if (flag) {
                    this.pageNum = 1
                } else {
                    this.pageNum++
                }

                let param = {
                    siteId: this.getParam('siteId'),
                    numPerPage: this.numPerPage,
                    pageNum: this.pageNum
                }
                let obj = await API.get(API.getArticleList, param)

                if (obj.recordList && obj.recordList.length > 0) {
                    const curData=obj.recordList
                    if (flag) {
                        this.dataLists = curData
                    } else {
                        this.dataLists = this.dataLists.concat(curData)
                    }
                } else {
                    this.loadOver = true
                }
            },
            getParam(name) {
                const reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
                const r = window.location.search.substr(1).match(reg)
                if(r!=null)return unescape(r[2]); return null
            }
        },
        components: {
            MessageCard,
            Scroll
        }
    }
</script>
<style lang="scss" scoped>
    .wraper{
        overflow: hidden;width: 100%;
        @include position((p:absolute, t:0, b:0));
    }
</style>
