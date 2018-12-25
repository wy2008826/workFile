<template>
    <div>
        <div class="head">
            <div class="prev_gray" @click="prev_month"></div>
            <div class="month" v-html="`${this.now[0]}年<i class='red'>${this.now[1]}</i>月`"></div>
            <div class="next" @click="next_month"></div>
        </div>
        <div class="calendar">
            <div class="week">
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
            </div>
            <div class="day">
                <div v-for="(item,index) in days">
                    <p :tip="tip[index-first+1]?tip[index-first+1].length:''"
                       v-text="item.val"
                       :class="[check_day === index ? 'check_day': '',item.color,item.tip]"
                       @click="seeDetail(item.type,index)"></p>
                </div>
            </div>
        </div>
        <div class="list" v-if="list">
            <div class="title" v-text="`${now[0]}年${now[1]}月${check_day-first+1}日`"></div>
            <div class="detail"
                 v-for="(item,index) in list">
                <div class="name" v-text="item.borrowName">众金宝0245号</div>
                <div class="money">
                    <p>第<span v-text="item.period"></span>期回款金额(元)</p>
                    <p v-text="item.repaymentAmount.toLocaleString()"></p>
                </div>
            </div>
        </div>
        <div class="list" v-if="!list">
            <div class="unTitle">当日无回款</div>
            <div class="unCalendar"></div>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'calendar',
        data() {
            return {
                now: [new Date().getFullYear(), new Date().getMonth() + 1],
                today: [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()],
                check_day: '',
                tip: {},
                list: []
            }
        },
        methods: {
            prev_month() {
                let [year, month] = this.minus
                this.now = [year, month]
                this.getInitData(year, month)
            },
            next_month() {
                let [year, month] = this.add
                this.now = [year, month]
                this.getInitData(year, month)
            },
            seeDetail(val, index) {
                if (val === 'prev') {
                    this.prev_month()
                    this.getInitData(this.now[0], this.now[1])
                } else if (val === 'next') {
                    this.next_month()
                    this.getInitData(this.now[0], this.now[1])
                } else if (val === 'now') {
                    this.check_day = index
                    this.list = this.tip[index - this.first + 1]
                }
            },
            async getInitData(year, month) {
                const param = {year: year, month: month}
                const data = await API.get(API.borrowCalendar, param)
                const tip = {}
                for (let i = 0; i < data.length; i++) {
                    const json = data[i]
                    tip[json.day * 1] = json.list
                }
                this.tip = tip
                this.list = tip[(this.check_day - this.first + 1) || new Date().getDate()]
            }
        },
        computed: {
            total() {
                return (new Date(this.now[0], this.now[1], 0)).getDate()
            },
            prev() {
                let [year, month] = this.minus
                return (new Date(year, month, 0)).getDate()
            },
            next() {
                let [year, month] = this.add
                return (new Date(year, month, 0)).getDate()
            },
            minus() {
                let [year, month] = this.now
                if (month === 1) {
                    month = 12
                    year -= 1
                } else {
                    month -= 1
                }
                return [year, month]
            },
            add() {
                let [year, month] = this.now
                if (month === 12) {
                    month = 1
                    year += 1
                } else {
                    month += 1
                }
                return [year, month]
            },
            first() {
                let [year, month] = this.now
                return (new Date(year, month - 1, 1)).getDay()
            },
            days() {
                let [year, month] = this.now
                const first = this.first
                const total = this.total
                const today = this.today
                const days = []
                for (let i = 0; i < first; i++) {
                    days.push({
                        val: this.prev - first + i + 1,
                        color: 'black9',
                        type: 'prev'
                    })
                }
                for (let i = 0; i < total; i++) {
                    let json = {
                        val: i + 1,
                        type: 'now'
                    }
                    const diff = new Date(year, month - 1, i + 1).getTime() - new Date(today[0], today[1], today[2]).getTime()
                    if (diff < 0) {
                        json.color = 'black9'
                        json.type = ''
                    } else if (diff === 0) {
                        json.color = 'red'
                    }
                    if (diff >= 0) {
                        json.tip = this.tip[i + 1] ? 'tip' : ''
                    }
                    days.push(json)
                }
                for (let i = 0; i < 42 - total - first; i++) {
                    days.push({
                        val: i + 1,
                        color: 'black9',
                        type: 'next'
                    })
                }
                return days
            }
        },
        mounted() {
            this.getInitData(this.now[0], this.now[1])
        }
    }
</script>
<style lang="scss" scoped>
    .head {
        margin-top: 0.2rem;
        justify-content: center;
        @include box((bg:$white, h:1rem, ta:center, fs:0.3rem, d:flex, p:0.3rem 0));
        div:nth-child(odd) {
            margin: 0.06rem 0.3rem;
        }
    }

    @mixin arrow($dir) {
        @if ($dir == prev) {
            @include bg_img('arrow.png');
            transform: rotate(180deg);
        } @else if ($dir == next) {
            @include bg_img('arrow2.png');
        }
        @include box((w:0.3rem, h:0.3rem));
    }

    .prev {
        @include arrow(prev);
    }

    .prev_gray {
        @include arrow(prev);
    }

    .next {
        @include arrow(next);
    }

    .month {
        @include box((h:0.42rem, lh:0.42rem));
    }

    .calendar {
        @include box((p:0 0.3rem, bg:$white, ta:center));
        .week {
            @include box((d:flex, lh:1rem, fs:0.28rem, c:$black9));
            @include thin(top, #e5e5e5);
            div {
                @include box((fx:1));
            }
        }
        .day {
            @include box((d:flex, fs:0.32rem, c:$black2));
            flex-wrap: wrap;
            div {
                @include box((w:14.28%, h:0.8rem));
            }
            p {
                @include box((w:0.5rem, h:0.5rem, lh:0.51rem, m:0 auto, bdr:0.25rem));
            }
        }
    }

    .check_day {
        @include box((bg:$blue, c:#fff));
    }

    .tip {
        position: relative;
        &:before {
            content: attr(tip);
            @include position((p:absolute, r:-0.2rem, t:-0.1rem, z:1));
            @include box((w:0.24rem, h:0.24rem, lh:0.28rem, bg:$red, c:$white, fs:0.2rem, bdr:0.12rem));
        }
    }

    .list {
        @include box((m:0.2rem 0, bg:$white, ta:center));
        .title {
            @include box((fs:0.3rem, h:1rem, lh:1rem));
        }
        .detail {
            margin-left: 0.3rem;
            @include box((h:1.54rem, ta:left, fs:0.3rem));
            &:not(:last-child) {
                @include thin(bottom, #E5E5E5);
            }
            .name {
                @include box((lh:0.8rem, c:$black2));
            }
            .money {
                @include box((d:flex));
                p {
                    @include box((fx:1));
                }
                p:nth-child(1) {
                    @include box((fs:0.28rem, c:$black9));
                }
                p:nth-child(2) {
                    @include box((ta:right, c:$red, p:0 0.3rem));
                }
            }
        }
    }

    .unTitle {
        @include box((ta:center, fs:0.28rem, c:$black9));
        padding-top: 0.3rem;
    }

    .unCalendar {
        @include box((w:2.48rem, h:3.48rem, m:1rem auto 0));
        @include bg_img('/my/calendar.png');
    }
</style>