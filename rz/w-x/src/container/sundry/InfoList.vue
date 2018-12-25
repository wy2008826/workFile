<template>
    <div class="wrap">
        <div style="position: relative;height: 0.9rem;overflow: scroll">
            <div class="nav">
                <div v-for="(item,i) in nav"
                     :key="i"
                     :class="i === index ? 'checked':''"
                     @click="index = i"
                     v-text="item"></div>
            </div>
        </div>
        <!--组织信息-->
        <div v-show="index === 0">
            <ul class="new_zzry">
                <li style="width: 2.07rem;padding-top: 0.6rem">
                    <img src="https://images.51rz.com/images/pc/message/app/honor01.png" alt="">
                    <h3>公安部三级备案</h3>
                </li>
                <li>
                    <img src="https://images.51rz.com/images/pc/message/app/honor02.png" alt="">
                    <h3>营业执照</h3>
                </li>
                <li>
                    <img src="https://images.51rz.com/images/pc/message/app/honor03.png" alt="">
                    <h3>ICP许可证</h3>
                </li>
            </ul>
            <ul class="list">
                <li>
                    <span>全称及简称</span>
                    <span>浙江金融服务股份有限公司（简称：金服）</span>
                </li>
                <li>
                    <span>统一社会信用代码</span>
                    <span>91330000064189906G</span>
                </li>
                <li>
                    <span>公司注册资本</span>
                    <span>6945万元</span>
                </li>
                <li>
                    <span>实缴注册资本</span>
                    <span>6945万元</span>
                </li>
                <li>
                    <span>法定代表人</span>
                    <span>李敏</span>
                </li>
                <li>
                    <span>成立日期</span>
                    <span>2013年03月28日</span>
                </li>
                <li>
                    <span>公司经营期限</span>
                    <span>2013年03月28日至长期</span>
                </li>
                <li>
                    <span>公司经营状态</span>
                    <span>开业</span>
                </li>
                <li>
                    <span>注册地址</span>
                    <span>浙江省杭州市西湖区学院路28-38号1幢德力西大厦1号楼2501室</span>
                </li>
                <li>
                    <span>经营地址</span>
                    <span>浙江省杭州市西湖区学院路28-38号1幢德力西大厦1号楼2501室</span>
                </li>
                <li>
                    <span>经营范围</span>
                    <span>投融资信息咨询服务，科技项目中介服务，软件技术咨询，信息服务，以服务外包方式从事票据中介服务（不含承兑等银行核心业务），接受金融机构委托从事金融技术外包、业务流程外包，实业投资，资产管理，投资管理，财务咨询。</span>
                </li>
                <li>
                    <br/><span>股东信息</span>
                    <p style="text-align: center;margin: 0.3rem 0">股权结构</p>
                    <div class="bg_gq"></div>
                </li>
                <li>
                    <br/><span>组织架构</span><br/><br/>
                    <div class="bg_jg"></div>
                </li>
                <li style="padding: 0 0.24rem">
                    <p style="padding: 0.4rem 0">从业人员概况</p>
                    截止到2017年9月30日，信息如下：<br />
                    1. 正式人员：125人<br />
                    2.劳务派遣和临时聘用人员：0<br />
                    3.年龄分布：<br />
                    25岁以下　　　　　　30%<br />
                    25岁（含）到30岁　　45%<br />
                    30岁（含）到35岁　　17%<br />
                    35岁（含）及以上　　8%<br />
                    总计 100%<br />
                    4.学历分布：<br/><br/>
                    <div class="bg_xl"></div>
                </li>
                <li>分支机构所在地：无</li>
                <li>分支机构成立时间：无</li>
                <li>分支机构负责人：无</li>
                <li>分支机构联系电话：无</li>
                <li>分支机构投诉电话：无</li>
                <li>分支机构员工人数：无</li>
            </ul>
        </div>
        <!--财务信息-->
        <div v-show="index === 1">
            <ul class="list">
                <li>
                    <span>重要融资与负债信息:</span>
                    <span>杭州立元宸皓投资合伙企业（有限合伙）5000万  股份占比10.0072%</span>
                </li>
                <li>
                    <span>重点环节审计结果：</span>
                    <span>会计师事务所审计出具中</span>
                </li>
                <li>
                    <span>合规性审查报告：</span>
                    <span>律师事务所审查出具中</span>
                </li>
                <li>
                    <span>财务审计报告</span>
                    <span></span>
                </li>
                <li class="sj-pic-box">
                    <div class="sj-pic">
                        <a href="https://images.51rz.com/images/pc/message/app/001.jpg"><img src="https://images.51rz.com/images/pc/message/app/001.jpg" /></a>
                        <small>资产负债表</small>
                    </div>
                    <div class="sj-pic">
                        <a href="https://images.51rz.com/images/pc/message/app/002.jpg"><img src="https://images.51rz.com/images/pc/message/app/002.jpg" /></a>
                        <small>利润表</small>
                    </div>
                    <div class="sj-pic">
                        <a href="https://images.51rz.com/images/pc/message/app/003.jpg"><img src="https://images.51rz.com/images/pc/message/app/003.jpg" /></a>
                        <small>现金流量表</small>
                    </div>
                </li>
            </ul>
        </div>
        <!--平台信息-->
        <div v-show="index === 2">
            <ul class="list flex">
                <li>
                    <p>网站或平台地址</p>
                    <span>https://www.51rz.com</span>
                </li>
                <li>
                    <p>平台上线运营时间</p>
                    <span>2013年4月27日正式上线运营</span>
                </li>
                <li>
                    <p>咨询</p>
                    <span>客服电话：400-655-8858</span>
                </li>
                <li>
                    <p>投诉</p>
                    <span>联系电话：0571-56583188</span>
                </li>
                <li>
                    <p>举报联系电话</p>
                    <span>电子邮箱：server@51rz.com</span>
                </li>
                <li>
                    <p>电子邮箱</p>
                    <span>通讯地址：杭州市学院路28号德力</span>
                </li>
                <li>
                    <p>通讯地址</p>
                    <span>西大厦1号楼25层</span>
                </li>
                <li>
                    <br/><p>注册协议模板</p>
                    <a href="/registerAgreement" style="color: #fff">注册协议</a>
                    <br/><br/>
                </li>
                <li>
                    <p style="height:1.48rem;line-height:1.48rem;">平台APP应用</p>
                    <span><img src="https://images.51rz.com/images/pc/message/app/erm01.png" style="width:1.49rem" /></span>
                </li>
                <li>
                    <br/>
                    <p style="height:1.48rem;line-height:1.48rem;">公众号</p>
                    <span><img src="https://images.51rz.com/images/pc/message/app/erm02.png" style="width:1.49rem" /></span>
                    <br/><br/>
                </li>
                <li>
                    <p>微博</p>
                    <span>金服官微：http://weibo.com/51RZjf</span>
                </li>
            </ul>
        </div>
        <!--重大事项信息-->
        <div v-show="index === 3">
            <ul class="list">
                <li>减资、合并、分立、解散或者申请破产：无</li>
                <li>破产程序：无</li>
                <li>停业、整顿、关闭：无</li>
                <li>从业机构受到刑事处罚：无</li>
                <li>从业机构受到重大行政处罚的情况描述：无</li>
                <li>公司法定代表人、持股 5%以上的股东、实际控制人、
                    主要负责人、董事、监事、高级管理人员的变更信息：
                无变更（更新日期：<span v-text="updateDate"></span>）</li>
                <li>法定代表人、持股5%以上的股东、实际控制人、主要负责人、
                    董事、监事、高级管理人员涉及的重大诉讼、仲裁：
                无（更新日期：<span v-text="updateDate"></span>）</li>
                <li>主要或全部业务陷入停顿：无</li>
                <li>欺诈、损害出借人利益等其他重大事项：无</li>
            </ul>
        </div>
        <!--备案信息-->
        <div v-show="index === 4">
            <ul class="list">
                <li>
                    <span>备案登记地方金融监管部门：</span>
                    <span>登记备案进行中</span>
                </li>
                <li>
                    <span>备案登记时间：</span>
                    <span>登记备案进行中</span>
                </li>
                <li>
                    <span>备案登记编号：</span>
                    <span>登记备案进行中</span>
                </li>
                <li>
                    <span>电信业务经营许可信息：</span>
                    <span>浙ICP备13009823号-1</span>
                </li>
                <li>
                    <span style="display: inline-block">资金存管信息：<br/><br/><br/></span>
                    <span>名称：北京银行<br />签约时间：2017年3月<br />全量业务上线时间：2017年4月24号</span>
                </li>
                <li>
                    <span>网站备案图标及编号：</span>
                    <span>公安备案号：<a style="color: #fff" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602002203">33010602002203</a></span>
                </li>
                <li>
                    <span>信息安全测评认证信息：</span>
                    <span>认证机构：中华人民共和国公安部认证结果：信息系统安全等级保护备案证明（三级）<br /><a href="https://images.51rz.com/images/pc/message/app/police.png" target="_blank"><img src="https://images.51rz.com/images/pc/message/app/police.png" style="width:3.52rem;"/></a></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import API from '@/api'
    export default {
        name: 'infoList',
        data() {
            return {
                nav: ['组织信息','财务信息','平台信息','重大事项信息','备案信息'],
                index: 0,
                updateDate: ''
            }
        },
        methods: {
            getDate(time) {
                const date = new Date(time)
                if(date.getDate() >= 5){
                    return `${date.getFullYear()}.${date.getMonth()+1}.5`
                }else{
                    if(date.getMonth() === 0) {
                        return `${date.getFullYear()-1}.12.5`
                    }else{
                        return `${date.getFullYear()}.${date.getMonth()}.5`
                    }
                }
            }
        },
        async mounted() {
            const time = await API.get(API.nowDate)
            this.updateDate = this.getDate(time)
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        @include position((p:absolute));
        @include bg_img('infoPublicBg.png');
        @include box((w:100%,c:#fff,fs:0.24rem));
        min-height: 100%;overflow: scroll;
    }
    .nav{
        position: absolute;z-index: 10;
        @include box((w:10.4rem,lh:0.88rem,p:0 0.2rem,d:flex,bg:rgba(255,255,255,0.12),ta:center));
        div{
            @include box((fx:1,p:0 0.2rem));
        }
        .checked{
            border-bottom: 0.02rem solid #fff;
        }
    }
    .new_zzry{padding:0.3rem 0.2rem 0 0.2rem;}
    .new_zzry li{position: relative;display: inline-block;width: 1.41rem;text-align: center;margin: 0 0 0 0.3rem;}
    .new_zzry li img{width: 100%;}
    .new_zzry li h3{font-size: 0.24rem;line-height: 0.44rem;  }
    .list{margin-top: 0.4rem;padding:0.3rem;}
    .list li{line-height: 0.44rem;}
    .bg_jg{
        @include bg_img(('info_jg.png'));height: 3.2rem;
    }
    .bg_gq{
        @include bg_img(('info_gq.png'));
        width: 6.02rem;height: 5.08rem;margin: auto;
    }
    .bg_xl{
        @include bg_img(('info_xl.png'));height: 3.2rem;
    }

    .sj-pic-box{display:-webkit-flex;display:flex;flex:1;-webkit-flex:1;padding-top:0.3rem;}
    .sj-pic{width:33%;text-align:center;display:inline-block;}
    .sj-pic img{width:2.04rem;height:2.9rem;box-shadow:0 0 0.2rem #f1f1f1;}
    .sj-pic small{display:inline-block;margin: 0.3rem auto;}

    .flex{
        p{
            display: inline-block;width: 2.25rem;
        }
    }
</style>
