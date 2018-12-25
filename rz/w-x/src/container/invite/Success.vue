<template>
    <div class="wrap">
        <div class="card">
            <div class="apr">
                <div>
                    <p><span>15</span>%</p>
                    <p>新手专享标</p>
                </div>
                <div>
                    <p><span>1288</span>元</p>
                    <p>投资红包</p>
                </div>
            </div>
            <p class="tip">1288元红包已入账</p>
            <router-link to="/index" class="btn">立即投资</router-link>
        </div>
        <div class="rule">
            <p>-&nbsp;活动细则&nbsp;-</p>
            <p>1、1228元红包仅限第一次注册金服的新用户专享，
                愿祝您投资一臂之力；</p>
            <p>2、红包由60元注册红包以及1168元任务红包组成，任务红包在
                您投资过程中获得。</p>
        </div>
        <a class="down" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.rd.rozo360"></a>
    </div>
</template>
<script>
    export default {
        name: 'success',
        data() {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include box((bg:#396ea1,w:100%,h:100%,p:0.6rem 0.4rem));
        @include position((p:absolute,z:1));
    }
    .card{
        @include box((w:6.7rem,h:4.92rem,ta:center));
        @include bg_img('registerSuccess1.png');
        .apr{
            @include box((d:flex,p:0.6rem 0 0.78rem 0));
            div{
                @include box((fx:1,w:50%));
                p{
                    @include box((fs:0.3rem,c:#999));
                    &:first-child{
                        @include box((c:#f64e41));
                        span{
                            @include box((fs:0.72rem));
                        }
                    }
                }
            }
        }
    }
    .tip{
        @include box((c:#396ea1,fs:0.3rem));padding-left: 0.4rem;
    }
    .btn{
        @include box((d:block,w:5.9rem,bg:#fcd31f,m:0.3rem auto 0,c:#9e3f08,fs:0.36rem,lh:1.08rem,ta:center,bdr:0.08rem));
    }
    .rule{
        @include box((c:#fff,fs:0.24rem,lh:0.44rem));margin-top: 0.8rem;
        p:first-child{
            @include box((fs:0.3rem,ta:center));
        }
    }
    .down{
        @include box((w:100%,h:2rem));
        @include position((p:fixed,b:0,l:0,z:2));
        @include bg_img('registerSuccess2.png');
    }
</style>
