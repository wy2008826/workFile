<template>
    <div>
        <div v-show="step === 1">
            <div class="banner" v-text="banner.title"></div>
            <div class="content">
                <div class="text" v-text="banner.content"></div>
                <div class="result" v-show="historyResult&&!currentResult">
                    <p >上次测评结果</p>
                    <h4 v-text="historyResult"></h4>
                </div>
                <div class="result" v-show="currentResult">
                    <p >您当前的风险承受能力</p>
                    <h4 v-text="currentResult"></h4>
                </div>
            </div>
            <div class="btn">
                <a href="/tender" v-show="currentResult">去投资</a>
                <a v-show="!currentResult" @click="step = 2">开始测评</a>
            </div>
        </div>
        <div class="wrap" v-show="step === 2">
            <p class="progress">
                <span v-text="progress+1"></span>/10
            </p>
            <p class="question" v-text="checked.question"></p>
            <div v-for="(item,index) in checked.options"
                 v-text="getLV(index)+'：'+item"
                 class="option"
                 :class="score[progress] === index ? 'checked ': ''"
                 @click="check(index)"></div>
            <div class="up_down">
                <div style="margin-right: 1.2rem" @click="prev"
                     :class="progress === 0 ? 'gray' : ''">上一题</div>
                <div @click="next" :class="score[progress] != undefined?'':'gray'"
                     v-html="nextDesc"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    import {mapGetters, mapActions} from 'vuex'
    import getParam from '@/lib/getParam'

    export default {
        name: 'risk',
        data() {
            return {
                currentResult:'',
                historyResult:'',
                banner:{
                    title:'风险承受能力评估',
                    content:'本问卷旨在了解您对投资风险的承受意愿及能力。问卷结果可能不能完全呈现您面对投资风险的真正态度，您可与我们的客服进一步沟通。'
                },
                step: 1,
                progress: 0,
                score: [],
                question: [
                    '您目前所处的年龄阶段为：',
                    '您可以投资的资金量：',
                    '您的投资目的是什么：',
                    '您一般投资的期限为：',
                    '您投资时，能接受一年内的最大损失是多少：',
                    '某组合/基金未来3年里平均收益、最好和最坏的收益情况如下，您会选择哪种：',
                    '您家庭的年收入？',
                    '您预计家庭的年收入在未来5年中将：',
                    '您家庭的月生活消费支出约占月总收入的：',
                    '您曾投资过的风险最高的产品是：'
                ],
                options: [
                    ['55岁以上','40-55岁','30-40岁','30岁以下'],
                    ['10万元（含）以下','10万至100万（含）','100万至500万（含）','500万至2000万（含）','2000万以上'],
                    ['超过通货膨胀就好（每年5%左右）','获取较稳定收益（每年10%左右）','获取较高收益（每年20%左右）','博取高收益（每年30% 以上）'],
                    ['1年以内','1-3年（包括3年）','3-5年（包括5年）','5年以上'],
                    ['跌幅10%以内','跌幅10%~20%间','跌幅20%~30%间','跌幅30%以上'],
                    ['平均年收益率为2%，最好情况3%，最坏情况1%','平均年收益率为6%，最好情况13%，最坏情况-2%',
                        '平均年收益率为8%，最好情况53%，最坏情况-35%','平均年收益率为10%，最好情况65%，最坏情况-45%'],
                    ['10万元（含）以下','10万至20万（含）','20万至50万（含）','50万以上'],
                    ['有所下降','维持稳定','小幅成长，在10%左右','大幅成长，在20%以上'],
                    ['71%-100%以上','51%-70%','21%-50%','0-20%'],
                    ['储蓄、银行理财产品、货币基金等风险极小的现金管理工具','债券或债券类基金、固定收益信托等',
                        '股票或股票型基金','期货或期货类基金、PE、房地产基金、艺术品基金等类投资']
                ],
                result: [
                    {
                        title: '保守型',
                        content: '您的投资目标是追求资本的保值。可承受的风险较低。',
                    },
                    {
                        title: '稳健型',
                        content: '您的投资目标是追求资本缓和升值，其次为资本保值。可承担中等风险。',
                    },
                    {
                        title: '积极型',
                        content: '您的投资目标是增值财富，您可承受一定风险，了解高收益总是与高风险相伴随。',
                    },
                ],
            }
        },
        methods: {
            check(index) {
                this.score[this.progress] = index
                this.score.push()
            },
            prev() {
                if(this.progress === 0) return
                this.progress = this.progress - 1
            },
            async next() {
                if(this.score[this.progress] == undefined) return
                if(this.progress === 9) {
                    let all = this.score.reduce(function (a,b) {
                        return a+b
                    })
                    all += 10
                    const result = this.scoreCovert(all)
                    await API.post(API.riskTest,{score: all,token:getParam(window.location.href,'token')})
                    this.setInfo({riskScore: all})
                    this.banner = {
                        title: '测评结果',
                        content: result.content,
                    }
                    this.step = 1
                    this.currentResult = result.title
                }else{
                    this.progress = this.progress + 1
                }
            },
            getLV(index) {
                const text = ['A','B','C','D','E']
                return text[index]
            },
            scoreCovert(val) {
                let resultIndex = 4
                if(val >= 28) {
                    resultIndex = 2
                }else if(val >= 14) {
                    resultIndex = 1
                }else if(val >= 10) {
                    resultIndex = 0
                }
                return this.result[resultIndex]
            },
            ...mapActions([
                'setInfo',
            ])
        },
        computed: {
            checked() {
                return {
                    question: this.question[this.progress],
                    options: this.options[this.progress]
                }
            },
            nextDesc() {
                return this.progress === 9 ?
                    '<span style="color: #F64C3E;">提交问卷</span>' : '下一题'
            },
            ...mapGetters([
                'info'
            ])
        },
        mounted() {
            const score = getParam(window.location.href,'score') || this.info.riskScore
            this.historyResult = this.scoreCovert(score).title
        }
    }
</script>
<style lang="scss" scoped>
    .banner{
        width:7.5rem;
        height:2rem;
        font-size: 0.48rem;
        text-align: center;
        line-height:2rem;
        color:#fff;
        background:url(https://images.51rz.com/images/app/risk_asseessment/banner.png) center center no-repeat;
    }
    .text{
        min-height: 1.68rem;
        margin:0.6rem 0.7rem;
        color:#555;
        font-size:0.3rem;
    }
    .result{
        text-align: center;
    }
    .result p{
        margin-top:-0.48rem;
        font-size: 0.3rem;
        color:#999;
        line-height:42px;
    }
    .result h4{
        color:#F64C3E;
        font-size: 0.64rem;
        font-weight:500;
        margin-bottom:60px;
    }
    .btn{
        margin:0 1.25rem;
        width:5rem;
        height:0.88rem;
        line-height:0.88rem;
        background:#F64C3E;
        font-size: 0.36rem;
        color:#fff;
        text-align: center;
        border-radius:8px;
    }
    .btn a{
        display:block;
        width:100%;
        height:100%;
        color:#fff;
        text-decoration: none;
    }

    .wrap{padding: 0.6rem 0.7rem;}
    .progress{color: #3F3F3F;font-size: 0.28rem;}
    .progress span{color: #F64C3E;font-size: 0.64rem;}
    .question{color: #F64C3E;font-size: 0.36rem;margin: 0.2rem 0 0.6rem 0;}
    .option{
        width:6.1rem;line-height:0.4rem;border-radius: 0.4rem;font-size: 0.28rem;
        padding: 0.2rem 0.55rem;color: #555;border: 1px solid #E5E5E5;margin-top: 0.2rem;
    }
    .up_down{font-size: 0.3rem;color: #555;margin-top: 0.6rem;}
    .up_down div{display: inline-block;width: 2.4rem;height: 0.42rem;text-align: center;  }
    .checked{background: #F64C3E;color: #fff;border: none;}
    .gray{color:#999;}
</style>