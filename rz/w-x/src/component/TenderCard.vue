<template>
    <div class="card" :class="{disabled:disabled}">
        <p class="tender_title">
            <span v-text="name"></span>
            <label v-if="discount == 1 || discount == 3">红包</label>
            <label v-if="discount == 2 || discount == 3">加息券</label>
            <label v-if="category === 0">1000元起投</label>
            <i v-if="category===0" class="newTender">新手</i>
        </p>
        <div class="tender_cont">
            <div class="left">
                <p :style="status==1&&'color: rgba(246,76,62,0.50)'">
                    <span v-text="baseApr">11.5</span>%
                    <template v-if="exApr">
                        +<i v-text="exApr">1.5</i>%
                        <strong>奖励</strong>
                    </template>
                </p>
                <label class="desc" v-text="convertStyle(style)">预期年化</label>
            </div>
            <div class="right">
                <p><span v-text="timeLimit">30</span><i v-text="convertDay(borrowTimeType)"></i></p>
                <label class="desc">期限</label>
            </div>
        </div>
        <div class="tender_footer">
            <label>剩余金额 <span v-text="(lastAccount*1).toLocaleString()+'元'"></span></label>
            <label v-if="status!=1" class="progress_wraper">
                <span><i class="barTransition" :style="{width:(scales)+'%'}"></i></span>{{scales+'%'}}
            </label>
            <label v-if="status==1" class="progress_wraper" style="color:#F64C3E;opacity:0.5">
                <span><i class="barTransition" :style="{width:'100%',background:'#F64C3E'}"></i></span>待售
            </label>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TenderCard',
        data() {
            return {
                ...this.card,
                percent: 0
            }
        },
        props: ['card','disabled'],//disabled：已经售罄
        methods: {
            animatePercent(val) {//更新进度条状态
                const aimate = () => {
                    requestAnimationFrame(() => {
                        if(this._percent < val){
                            this._percent += 1
                            aimate()
                        }
                    })
                }
                aimate()
            },
            convertStyle(style) {
                const text = [
                    '等额本金',
                    '等额本息',
                    '一次性还本付息',
                    '按月付息，到期还本'
                ]
                return text[style]
            },
            convertDay(type) {
                const text = ['月','天']
                return text[type]
            }
        },
        mounted(){
            this.animatePercent(this.amountYes/this.amount)
        },
        watch:{
            cardData(n,o){
                this.card = n
                this.animatePercent(this.card)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .card {
        @include box((m:0 0 0.2rem, p:0.24rem 0 0 0, bg:$white));
        &:last-child {
            margin-bottom: 0.01rem;
        }
        .tender_title {
            @include box((lh:0.4rem, h:0.4rem, p:0 0 0 0.3rem, fs:0));
            span {
                @include box((c:$black5, m:0 0.16rem 0 0, fs:0.28rem, lh:0.4rem, d:inline-block));
                vertical-align: middle;
            }
            label {
                @include box((c:$blue, lh:0.32rem, p:0 0.14rem, fs:0.2rem, bdr:0.04rem, m:0 0.05rem));
                @include thin(all, $blue);
                vertical-align: middle;
            }
            .newTender{
                @include box((d:block,fl:right,bg:#8CBE37,fs:0.2rem,h:0.32rem,lh:0.32rem,c:$white,p:0 0.3rem));
                border-top-left-radius: 0.16rem;
                border-bottom-left-radius: 0.16rem;
            }
        }
        .tender_cont {
            @include box((d:flex, p:0.18rem 0.83rem 0.26rem));
            .desc {
                @include box((c:$black9));
            }
            .left {
                @include box((fx:1));
                p {
                    @include box((c:$red, lh:0.75rem));
                    span {
                        @include box((fs:0.54rem));
                    }
                    strong {
                        @include box((c:$gold, d:inline-block, fs:0.18rem, lh:0.24rem, w:0.52rem, h:0.24rem, ta:center));
                        @include bg_img('icon_tender_award.png');
                        font-weight: normal;
                    }
                }
            }
            .right {
                flex: 1;
                @include box((ta:right));
                p {
                    @include box((lh:0.75rem));
                    span {
                        @include box((fs:0.54rem, c:$black2));
                    }
                }

            }
        }
        .tender_footer {
            @include box((h:0.9rem, lh:0.9rem, p:0 0.83rem));
            @include thin(top, #e5e5e5);
            label:nth-child(1) {
                @include box((c:$black9, fs:0.26rem));
                span {
                    @include box((c:#101010, m:0 0 0 0.1rem));
                }
            }
            label:nth-child(2) {
                @include box((fl:right, fs:0.18rem));
                span {
                    @include box((w:1rem, h:0.04rem, bg:#e5e5e5, d:inline-block, m:0 0.2rem 0 0, c:$black2));
                    @include position((p:relative));
                    vertical-align: middle;
                    i {
                        @include box((d:block, h:100%, w:60%, bg:$red));
                        @include position((p:absolute, l:0, t:0));
                    }
                }
            }
        }
    }
    .card.disabled {
        $blackc: #ccc;
        .tender_title {
            span {
                @include box((c:$blackc));
            }
            label {
                @include box((c:$blackc));
                @include thin(all, $blackc);
            }
        }
        .tender_cont {
            .desc {
                @include box((c:$blackc));
            }
            .left {
                p {
                    @include box((c:$blackc));
                    strong {
                        @include box((c:$blackc));
                    }
                }
            }
            .right {
                p {
                    @include box((c:$blackc));
                    span {
                        @include box((c:$blackc));
                    }
                }

            }
        }
        .tender_footer {
            @include thin(top, #e5e5e5);
            label:nth-child(1) {
                @include box((c:$blackc));
                span {
                    @include box((c:$blackc));
                }
            }
            label:nth-child(2) {
                @include box((c:$blackc));
                span {
                    i {
                        @include box((bg:#e5e5e5, w:100%));
                    }
                }
            }
        }
    }
</style>
