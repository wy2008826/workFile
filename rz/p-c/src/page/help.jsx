import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import {
    HashRouter,
    NavLink,
    Route
} from 'react-router-dom';

import TopBar from "@/components/TopBar/TopBar.jsx";
import Bottom from "@/components/Bottom/Bottom.jsx";

import HelpCss from "@/assets/css/help.scss";

import store from "@/store/store.js";

//________________________

class Sider extends React.Component {
    render() {
        const {question, answer, table, tips} =this.props
        return (
            <li className="ant-menu-submenu" ref="li">
                <p className="ant-menu-submenu-title" onClick={()=>{
                    this.refs.li.classList.toggle('open');
                }}><span>Q . </span>{question}<i className='jiantou'></i></p>
                <div className="ant-menu-item" ref="item">
                    <pre>{answer}{!!table && table}</pre>
                    <span style={{color:'#f44a43'}}>{tips}</span>
                </div>
            </li>
        )
    }
}

//_______________________


//新手必读
class New extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const list = [
            {
                question: '是做什么的网站？',
                answer: '浙江金融服务股份有限公司（以下简称“金服”）成立于2013年4月，是浙江最早创立的互联网金融企业之一，2017年1月获立元创投5000万人民币A轮投资。平台已于2016年获批ICP许可证，同年12月，通过国家公安部监制信息安全等级保护三级安全备案；2017年4月完成与北京银行的资金存管对接，成为行业全面合规的网贷平台之一。\n金服精准定位产业互联网金融，深耕供应链金融及消费金融领域，不断扩大金融资本与实业经济融合的深度和广度，构筑互联网金融与企业、商品（服务）供应链、消费等互利共存、持续发展的良好产业生态。致力为用户创造持久、稳健、高收益的理财服务，打造服务真实金融需求的社会化普惠金融平台。 '
            },
            {
                question: '我在金服上投资安全吗？',
                answer: '金服由银行进行资金存管，投资人资金与平台有效隔离，保证安全；银行千万保证金兑付保证，历史兑付率100%；平台运营四年0逾期，同时平台严格甄选顶级合作企业，构筑八重安全保障，保障投资人资金安全。'
            },
            {
                question: '金服网站靠什么盈利？',
                answer: '我们的盈利模式是：如果借款企业在金服的平台上发布借款的信息，是需要向金服支付信息服务费的。每一笔企业借款，金服平台会向借款企业收取一定的信息服务费。此外，还有其他平台在金服进行商业合作和广告投放的服务费。'
            },
            {
                question: '用户在平台签订的电子合同受法律保护吗？',
                answer: '根据我国法律规定，用户签订的电子合同受到相关法律保护。'
            },
            {
                question: '金服自身的运营变动是否会影响用户的投资？',
                answer: '请用户放心，金服的任何变动都不会影响投资者与借款企业间的借贷关系及借款协议的执行。借款企业有义务继续按照借款协议的约定，按时偿还投资人的借款本金和利息。此外，借款协议中的承担实际担保义务的第三方机构，仍须按协议履行应尽的担保责任。否则投资人有权依据借款合同的约定采取必要的法律手段追究借款企业及相关机构的法律责任。'
            }
        ];
        const lis=list.map((v,i)=>{
            return (
                    <Sider key={i} question={v.question} answer={v.answer} table={v.table}/>
                )
        });
        let self = this;
        return (
            <div className="newcontent">
                <div className="title">
                    <p>新手必读问题</p>
                </div>
                <ul>
                    {lis}
                </ul>
                <div className="flow">
                    <div className="slide"></div>
                    <div className="title" style={{marginTop: '23px'}}>
                        <p style={{width: '93px'}}>投资流程</p>
                    </div>
                    <ul>
                        <li>
                            <NavLink exact to="/login">
                                <p>1. 注册</p>
                                <img src="/static/img/step1.png" alt=""/>
                            </NavLink>
                        </li>
                        <div className="step"></div>
                        <li>
                            <NavLink exact to="/binging">
                                <p>2. 安全认证</p>
                                <img src="/static/img/step2.png" alt=""/>
                            </NavLink>
                        </li>
                        <div className="step"></div>
                        <li>
                            <NavLink exact to="/recharge">
                                <p>3. 充值</p>
                                <img src="/static/img/step3.png" alt=""/>
                            </NavLink>
                        </li>
                        <div className="step"></div>
                        <li>
                            <NavLink exact to="invest">
                                <p>4. 投资</p>
                                <img src="/static/img/step4.png" alt=""/>
                            </NavLink>
                        </li>
                        <div className="step"></div>
                        <li>
                            <a href="javascript:void(0)">
                                <p>5. 坐收利息</p>
                                <img src="/static/img/step5.png" alt=""/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

// 注册与登录
class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const register = [
            {
                question: '如何成为金服的注册用户？',
                answer: '1、网页端：打开金服官网，点击网页右上角【注册】，填写相关信息，即可注册成功。\n2、APP端：打开金服账户，点击【我的】-【立即登录】-【免费注册】进入注册页面填写相关信息，即可注册成功。\n注：18周岁以下用户不能注册。 '
            },
            {
                question: '注册的时候收不到短信怎么办',
                answer: '1、请确认手机是否安装短信拦截或过滤软件；\n2、请确认手机是否能够正常接收短信（信号问题、欠费、停机等）；\n3、短信收发过程中可能会存在延迟，请耐心等待；\n4、联系客服，寻求帮助（服务热线：400-655-8858）。 '
            },
            {
                question: '设置登录密码有什么要求？',
                answer: `建议设置数字+字母组合的复杂密码：\n1. 6-20个字符；\n2. 只能包含字母、数字以及标点符号（除空格）；`
            },
            {
                question: '邀请码是什么？有什么用途？',
                answer: `邀请码为非必填项。金服注册成功的用户都拥有唯一性的邀请码。新用户接受邀请在注册时填写邀请码，可绑定与邀请人形成绑定关系，双方均可获得一定奖励，具体参照平台活动及公告。`
            },
            {
                question:'注册金服账户一定要用银行的预留手机号码吗？',
                answer:`注册时的手机号码可以不是银行预留手机号，但是在开通北京银行存管账户的时候，必须填写银行预留手机号。`
            }
        ];
        const login = [
            {
                question: '交易密码忘记了怎么办？如何设置和修改交易密码？',
                answer: '忘记密码时投资人需要修改或找回交易密码，您可以在登陆网页端或APP端后进入“我的账户-安全中心-修改/重置交易密码”页面进行设置/修改。'
            },
            {
                question: '为什么要设置交易密码?',
                answer: '在开通北京银行存管账户时，会要求投资人设置交易密码，此密码将做为投资人充值、投资、提现等操作时的交易密码。'
            },
            {
                question: '登录密码忘记了如何找回？',
                answer: '1、网页端：进入金服官网首页点击【登录】-【忘了密码】填写手机号码和验证码，点击获取验证码，然后填写新密码即可修改成功。\n2、APP端：进入金服APP点击【登录】-【忘记密码】获取验证码并设置新密码。'
            },
            {
                question: '注册手机号码可以更换吗？',
                answer: '可以更换，登录您的金服账户，点击【我的账户】-【安全中心】通过旧手机号码输入验证码进行修改；'
            },
        ];
        const lis1=register.map((v,i)=>{
            return (
                <Sider key={i} question={v.question} answer={v.answer} table={v.table}/>
            )
        });
        const lis2=login.map((v,i)=>{
            return (
                <Sider key={i} question={v.question} answer={v.answer} table={v.table}/>
            )
        });
        return (
            <div className="newcontent">
                <div className="title">
                    <p>注册</p>
                </div>
                <ul>
                    {lis1}
                </ul>
                <div className="slide" style={{marginTop: 30, marginBottom: 20}}></div>
                <div className="title">
                    <p>登录</p>
                </div>
                <ul>
                    {lis2}
                </ul>
            </div>
        )
    }
}

//绑卡与认证
class Binging extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const register = [
            {
                question: '注册完成后需要完成哪些认证？如何操作？',
                answer: '银行存管上线后，注册完成直接进行下一步开通银行存管填写四要素信息认证，根据提示填写姓名、银行卡、身份证、手机号，完成即可操作。'
            },
            {
                question: '实名认证不了怎么办？',
                answer: `金服的实名认证是与公安系统联网的，若您提供的信息不一致，就会导致无法通过。以下几种情况，将无法自行完成实名认证：\n1.名字中带有生僻字\n2.曾经改过名字\n3.军人转业、复员换的身份证\n4.户籍有办过迁移\n5.身份证号码中的字母没有大写`
            },
            {
                question: '手机、身份证认证之后是否可以再次认证一个账号？',
                answer: `金服的身份证认证系统是和公安机关联网的，系统会自动认证。身份证、手机号码、都只能认证一个金服账户，不能重复认证。身份证一旦认证成功不得修改。`
            },
            {
                question: '如何修改实名认证信息？',
                answer: '实名认证之后，您的身份信息不能自行修改。如需修改请联系客服，客服电话：400-655-8858。'
            },
        ];
        const login = [
            {
                question: '什么情况下需要绑定银行卡？',
                answer: '您在金服注册开通银行存管进行四要素认证、在平台进行提现或快捷充值操作，需绑定银行卡。'
            },
            {
                question: '开通存管账户时，是否需要办一张北京银行卡？',
                answer: '不需要。用户开通存管账户是指开通了一个北京银行的存管电子账户，没有实体的银行卡。用户登录金服个人账户，按照提示步骤进行操作，即可完成开通，不需要去线下网点进行开通。'
            },
            {
                question: '可以绑定哪些银行卡？',
                answer: '请参照充值页面。'
            },
            {
                question: '如何绑定银行卡，需注意什么？',
                answer: '金服已实现银行资金存管，注册完成后须开通银行存管进行四要素信息认证，其中就直接绑定了银行卡，需要注意的是银行卡的预留手机号必须与注册手机号一致。'
            },
            {
                question: '无法绑定银行卡怎么办？',
                answer: '请联系客服处理，客服电话400-655-8858。'
            },
            {
                question: '如何设置及更改绑定的银行卡？',
                answer: '用户在注册开通银行存管时已经绑定银行卡，为保障您的资金安全，平台实行同卡进出。如需更改请联系客服处理，客服电话400-655-8858。'
            },
            {
                question: '我可以绑定几张银行卡？',
                answer: '每个注册账户只能绑定一张储蓄卡。'
            }
        ];
        const lis1=register.map((v,i)=>{
            return (
                <Sider key={i} question={v.question} answer={v.answer} table={v.table}/>
            )
        });
        const lis2=login.map((v,i)=>{
            return (
                <Sider key={i} question={v.question} answer={v.answer} table={v.table}/>
            )
        });
        return (
            <div className="newcontent">
                <div className="title">
                    <p>认证</p>
                </div>
               <ul>
                   {lis1}
               </ul>
                <div className="slide" style={{marginTop: 30, marginBottom: 20}}></div>
                <div className="title">
                    <p>绑卡</p>
                </div>
                <ul>
                    {lis2}
                </ul>
            </div>
        )
    }
}

//充值与提现
class Recharge extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const register = [
            {
                question: '如何充值？',
                answer: '平台提供两种充值方式供用户选择：\n（1）网银充值：用户登录后进入【个人中心】->【充值】->【网银充值】页面，可使用平台指定的16家银行的网银进行充值，网银充值限额以各银行规定为准。\n（2）快捷充值：使用快捷充值需先绑定指定银行的借记卡为快捷银行卡，绑定成功后，用户登录后进入【个人中心】->【充值】->【快捷充值】页面，选择“快捷充值”，然后使用绑定银行卡为账户充值。'
            },
            {
                question: '快捷银行卡无法充值怎么办？',
                answer: '1、 登录电脑版官网(www.51rz.com)，使用“网银充值”方式进行充值，进入【个人中心】->【充值】->【网银充值】页面，可使用平台指定的16家银行的网银进行充值。\n2、 申请更换充值银行卡，请联系金服客服 400-655-8858，提供线下资料进行审核。'
            },
            {
                question: '充值有费用么？是否有充值上限？',
                answer: `充值不收取任何费用。金服平台并未设置充值上限，但是具体充值限额请参照充值页面说明。`
            },
            {
                question:'充值时为什么提示限额？',
                answer:'交易限额是由银行设定的，您可以联系银行更改限额。一般来说，使用有USB设备的专业版网银，限额比较高，应该能满足您的投资需求。如果只是账户密码的网银方式，限额较低，很难满足您的投资需求。'
            },
            {
                question: '网上银行该如何开通办理？',
                answer: `目前所有的商业银行都支持个人网银业务，您只需要携带有效身份证件，到当地您所持银行卡的发卡行任意营业网点，即可申请开通网上银行业务。`
            },
            {
                question: '可以用信用卡进行充值吗？',
                answer: `金服不支持信用卡充值，禁止信用卡套现、虚假交易等行为,一经发现将予以处罚,包括但不限于：限制收款、冻结账户、永久停止服务。请各位投资者选择自己的储蓄卡绑定。`
            },
            {
                question: '当日充值的资金是否可以提现？',
                answer: `不可以。当日充值金额下个工作日银行清算，未清算前，不可提现或承接债权转让，但可进行投资等其他操作。`
            },
            {
                question: '为什么会充值失败？ ',
                answer: `1、银行卡余额不足以支付充值金额;\n2、短信验证码输入有误;\n3、银行卡出现挂失、注销或信息变更等状况;\n4、联系客服，寻求帮助（服务热线：400-655-8858）。`
            }
        ];
        const login = [
            {
                question: '提现是否有限额？',
                answer: '申请的提现金额，单笔不低于100元，每日累计申请提现金额不能超过100万元。'
            },
            {
                question: '如何提现？',
                answer: '在金服【我的账户】中选择提现，按页面提示操作即可，每次提现金额不小于100元。'
            },
            {
                question:'为什么提现申请会失败？',
                answer:`造成您提现失败的原因可能有以下几种：\n1.金服账号未通过实名认证\n2.银行开户行信息错误\n3.银行账号/户名错误，或是账号和户名不符\n4.银行账户冻结或正在办理挂失\n如果遇到以上情况，我们会在收到银行转账失败的通知后解除您的提现资金冻结，并及时通知您相关信息，请您不必担心资金安全。`
            },
            {
                question:'回款什么时候回？',
                answer:'到期回款是按满标时间起算，到期当天24点前将回款到用户账户余额。'
            },
            {
                question: '提现什么时候可以到账？',
                answer: '确认提现后，将在1个工作日(国家节假日除外)之内将钱转入绑定的银行账户内。到账时间参考下表：（实际到账时间需根据提现银行的处理机制而定） ',
                table: <table cellSpacing="0" cellPadding="0" style={{marginTop: 20}}>
                    <tbody>
                    <tr>
                        <td style={{background: '#f3f3f3'}}>提现日</td>
                        <td style={{background: '#f3f3f3'}}>申请提现时间</td>
                        <td style={{background: '#f3f3f3'}}>提现到账时间</td>
                    </tr>
                    <tr>
                        <td rowSpan={2}>周一至周五</td>
                        <td>16:00之前</td>
                        <td>当日到账</td>
                    </tr>
                    <tr>
                        <td>16:00以后</td>
                        <td>下一个工作日到账</td>
                    </tr>
                    <tr>
                        <td>周六、周日</td>
                        <td>全天</td>
                        <td>下一个工作日到账</td>
                    </tr>
                    <tr>
                        <td>法定节假日</td>
                        <td>全天</td>
                        <td>下一个工作日到账</td>
                    </tr>
                    </tbody>
                </table>,
            },
            {
                question: '提现手续费怎么收取？',
                answer: `针对您的每笔提现，第三方支付平台连连支付将收取2~5元不等的提现服务费，详见下表：`,
                table: <table cellSpacing="0" cellPadding="0" style={{marginTop: 20}}>
                    <tbody>
                    <tr>
                        <td style={{background: '#f3f3f3'}}>提现金额</td>
                        <td style={{background: '#f3f3f3'}}>手续费</td>
                    </tr>
                    <tr>
                        <td>0~5万元（含）</td>
                        <td>2元/笔</td>
                    </tr>
                    <tr>
                        <td>5~10万元（含）</td>
                        <td>3元/笔</td>
                    </tr>
                    <tr>
                        <td>10~50万元（含）</td>
                        <td>4元/笔</td>
                    </tr>
                    <tr>
                        <td>50~100万元（含）</td>
                        <td>5元/笔</td>
                    </tr>
                    </tbody>
                </table>,
                tips:'为更大程度地维护您的收益，金服在PC端、app端和wap端各提供每月前3次免除提现手续费的福利。'
            },
            {
                question: '平台收取充值费用和利息管理费吗？',
                answer: '线上充值手续费全免、无利息管理费。'
            },
            {
                question: '余额里钱已经没了，银行还没到账？',
                answer: '您申请了提现后，申请提现的金额就冻结了，也就是说您余额里的钱被冻结了，需要经过财务审核，审核通过后会提交到北京银行受理。所以钱到您的银行卡是需要一段时间的，请您耐心等待。周一至周五当天16:00之前申请的提现一般当天到账，16:00以后申请的提现下个工作日到账，节假日申请的提现顺延至下个工作日处理。'
            },
            {
                question: '银行卡无法提现怎么办？',
                answer: '由于银行对互联网借贷业务的限制，仅支持使用普通借记卡进行交易。如果您已使用高端卡进行充值，遇到无法提现的问题，请联系金服客服 400-655-8858，提供线下资料进行审核，进行人工变更银行卡。目前市场上常见的高端卡种类有：财富卡、理财卡、医保卡、联名卡、金卡、银卡、钻石卡以及高端客户私人银行卡等。'
            },
            {
                question: '绑定银行卡（非快捷充值银行卡）可以修改么？',
                answer: '为保障账户资金安全，绑定银行卡都不能自行修改。如需修改，请联系金服客服 400-655-8858，我们将通过线上快速申请与线下人工审核相结合的方式为您更换绑定的银行卡。'
            },
            {
                question: '提现后能否取消？',
                answer: '提现一旦提交无法撤销。 您可以在【我的账户】-“资金明细”页面的“提现记录”中查看。金服提醒您根据自身需求安排好资金使用计划，您的提现需求我们会第一时间处理的。'
            }
        ];
        const lis1=register.map((v,i)=>{
            return (
                <Sider key={i} {...v}/>
            )
        });
        const lis2=login.map((v,i)=>{
            return (
                <Sider key={i} {...v}/>
            )
        });
        return (
            <div className="newcontent">
                <div className="title">
                    <p>充值</p>
                </div>
                <ul>
                    {lis1}
                </ul>
                <div className="slide" style={{marginTop: 30, marginBottom: 20}}></div>
                <div className="title">
                    <p>提现</p>
                </div>
                <ul>
                    {lis2}
                </ul>
            </div>
        )
    }
}

//投资与转让
class Invest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const register = [
            {
                question: '我可不可以投新手标？',
                answer: '新手标仅限金服新手用户“投资”1次。新手用户特指注册了金服账户，但没有进行过投资的用户。'
            },
            {
                question: '金服什么时候发标？如果没有标的了怎么办？',
                answer: `发标时间为9:00-22:00（节假日无休），如投资时没有标的，请联系客服热线 400-655-8858，将会有工作人员进行协调处理。`
            },
            {
                question: '投资成功后，合同哪里下载？',
                answer: `投资成功后，在【我的账户】-【我的投资】，找到对应投资标的，点击标的详情，选择合同“下载”。`
            },
            {
                question: '理财产品节假日是否产生收益？',
                answer: `确认成功购买的理财产品，在该产品到期日之前，所有节假日都将获得收益。`
            },
            {
                question: '什么时候开始计息？有哪些还本付息方式？',
                answer: `金服实行当天投资，满标当天生息的计息方法。\n还款方式根据项目种类不同，分为如下两种：\n1、按日计息，按月付息，到期还本：利息会在付息日当天到达您的金服账户，本金是在到期当天。\n2、按日计息，到期归还本息：到期一次性本息全部归还。`
            },
            {
                question: '利息是如何计算的？',
                answer: `天标利息=年化收益率*投资金额*投资期限天数/365\n月标利息=年化收益率*投资金额*投资期限月数/12`
            },
            {
                question: '为什么会投资失败？',
                answer: `投资失败可能源于以下几种原因：\n1、投资人账户内资金不够，需要充值；\n2、有别的投资人优先于您投资从而使此投资项目的进度达到了100%；\n3、投资的标的未募集到满标会导致投资失败，金额会退回到账户，重新选择标的投资即可；\n4、投资过程中网络中断导致投资失败。`
            },
            {
                question: '如何投资金服的理财产品？',
                answer: `登录金服平台后选择理财产品，输入投资金额，输入交易密码，点击“立即投资”，即可完成投资。如有红包及加息券，则在输入密码前选择优惠券即可。`
            },
            {
                question: 'R计划是什么产品？',
                answer: `R计划是平台推出的优先自动投标产品。经由出借人授权，并由系统为出借人实现分散投标，回款本息续投、提高投资效率的投标产品。`
            },
            {
                question: 'R计划与其他产品有什么区别？',
                answer: `R计划是自动投标产品，参与R计划，由系统自动分散投标，R计划锁定期内回款本息续投，享受复利；平台其他标的则是到期还款，不会享受复利。`
            },
            {
                question: 'R计划收益是如何计算的？',
                answer: `R计划是分散投资，每个标的期满后的回款方式与其他投资方式一致，R计划锁定期内回款后本金利息一起进行续投，享受复利。`
            },
            {
                question: '怎样邀请好友投资？',
                answer: `1、您先登陆金服账户，进入邀请有礼活动页；\n2、活动页面中三种邀请方式任选一种，再发送给您好友即可（在他注册投资成功后您还可以得到相应的红包奖励）。`
            },
            {
                question: '我是否可以取消某笔投资？',
                answer: `为了保证所有投资人和借款人的利益，在投资项目的招标期内，已投资的资金将会被冻结，无法取消。`
            },
            {
                question: '如果我投资的钱需要急用怎么办？',
                answer: `别急，您可以通过债券转让的形式，转让您投资的理财产品。进入“我的账户”点击“我的投资”，在回款列表中选择你想转让的标的点击“转让”即可进行操作。（需要注意的是债权转让只能转让持有满30天以上的标的。）`
            },
            {
                question: '到期后如何收回投资本金和利息？收到还款后能马上再投资吗？',
                answer: `投资项目的本息到期后，金服会直接将本息自动转入到账户余额，您可以选择提现或者再投资。我们建议投资人在收到还款后进行再次投资，确保您收益的最大化。`
            },
            {
                question: '资产总额如何计算？',
                answer: `资产总额=可用余额+冻结总额+待收总额`
            },
            {
                question: '累计利息如何计算？',
                answer: `累计利息=待收利息+已收利息`
            },
            {
                question: '资金冻结是什么情况导致的？',
                answer: `资金冻结是用户在申请提现后，提现金额未到账之前处于冻结状态，不能进行其他操作，金额到账后冻结会自动取消。`
            },
        ];
        const login = [
            {
                question: '债权转让的规则是怎么样的？',
                answer:`1、有效投资满30天（满标日起算含30天）后方可进行债权转让。当期未收到利息回款而发生的转让，当期应收利息归承接人所有。\n2、供应链金融产品（众供宝）支持债权转让，消费金融产品（众消宝）及R计划系列不支持债权转让\n3、承接标不能进行二次转让。\n4、48小时后转让没成交则自动失效，可重新发起转让。\n5、当前标转让期间回款，转让自动失效。可转让的资产到期日前1天及回款当天，不建议发起转让申请。`
            },
            {
                question: '我持有的单笔可转让资产，可以申请部分债权转让吗？',
                answer: '转让只能一次性的将您持有的单笔可转让资产进行全部转让变现，不支持部分转让。'
            },
            {
                question: '我申请了债权转让，什么时候能够收到资金？',
                answer: '如果该笔债权转让成功，则资金将在成功时转入您在金服平台账户中。'
            },
            {
                question: '债权转让需要手续费吗？',
                answer: `金服不收取任何费用，但转让价格只能设置为待收本金的75%~99.5%，折价部分金额归承接人所有。`,
            },
            {
                question: '为何转让债权可以自己定价？',
                answer: '已投资金服优质项目的投资人，在项目尚未到期并且急需资金时，可以通过将已有债权转让，来达到资金回笼的目的，转让方可根据需要定价处理。'
            },
            {
                question: '被转让的债权如何计息？',
                answer: '被转让的债权仍按照原有的计息方式、计息时间计息。'
            },
            {
                question: 'R计划可以进行债权转让吗？',
                answer: '不能，R计划开启后会进入投资锁定期，锁定期内不能进行转让。。'
            },
            {
                question: '什么是债权转让标的转让密码？',
                answer: '转让密码是为了方便朋友之间进行债权转让而特意设置的。当转让人进行债权转让时，如需要将标的转让给朋友，可以选择设置转让密码。承接人承接时，只需要输入正确的转让密码和自己的交易密码就可以承接了。承接人如无转让密码就不能承接。'
            },
            {
                question: '承接债权转让有何限制？',
                answer: '当日充值的未入账金额可以投资但不可以承接债权转让标。'
            },
        ];
        const lis1=register.map((v,i)=>{
            return (
                <Sider key={i} question={v.question} answer={v.answer} table={v.table}/>
            )
        });
        const lis2=login.map((v,i)=>{
            return (
                <Sider key={i} question={v.question} answer={v.answer} table={v.table}/>
            )
        });
        return (
            <div className="newcontent">
                <div className="title">
                    <p>投资</p>
                </div>
                <ul>
                    {lis1}
                </ul>
                <div className="slide" style={{marginTop: 30, marginBottom: 20}}></div>
                <div className="title">
                    <p>转让</p>
                </div>
                <ul>
                    {lis2}
                </ul>
            </div>
        )
    }
}

//红包与加息券
class Redpack extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const register = [
            {
                question: '什么是红包加息券？',
                answer: '红包加息券是指在您投资时，根据投资的金额可使用相对应的红包或加息券，使用红包或加息券可以提高您的投资收益。红包或加息券需按照规则使用，即：投资每满xxx元即可使用x元红包券。例如：您投资满1000元或多于1000元，可使用10元红包券，您投资的标的在满标开始计息时，这10元红包券将以返现的形式发放到您的帐户。您可以选择提现或追加投资。'
            },
            {
                question: '如何获得红包或加息券？',
                answer: '红包的获取方式有如下几种：\n1.成功注册：系统会自动给您的金服账户发送60元红包奖励；\n2.前四次投资中，每完成一次投资均可以获得一个红包或加息券；\n3.参加活动：积极参加金服的各类活动均有可能获得红包或加息券；\n4.为感谢投资人对金服信赖与支持，平台会在您生日当天（以身份证信息为准）赠送100元生日红包至您的账户。生日红包自发放之日起有效期30天，使用条件：①投资满15000元可使用；②限投3月以上标的；③新手标、债权转让标除外。'
            },
            {
                question: '红包或加息券使用规则',
                answer: <span><b>A、红包使用规则：</b><br/>1、每个红包都有不同的使用条件和使用期限，如在期限内未使用，过期则失效；<br/>2、红包不可用于投资抵扣，以返现的方式发放到帐户；
例：您在上午9点时投资标的（众供宝—2903）1000元，使用10元红包，投资成功后，10元红包以返现的形式发放到您的帐户中，您可以到我的账户进行查看。<br/>3、每次投资只能使用一张红包。如果您有多张红包，可以分多次投资使用；<br/>4、红包不能用于新手标和债权转让；<br/>5、红包使用规则最终解释权在法律范围内归金服所有。<br/><b>B、加息券使用规则： </b><br/>1、每个加息券都有不同的使用条件和使用有效期，在期限内未使用，则过期作废。<br/>2、加息券产生的利息，在投资项目到期后，自动返还到个人账户。<br/>3、一次投资只能使用一张加息券，且不可与其他加息券同时使用。<br/>4、加息券不能用于新手体验标和债权转让。<br/>5、加息券使用规则最终解释权在法律范围内归金服所有。</span>
            },
            {
                question: 'R计划是否可以使用红包或加息券？',
                answer: `R计划支持使用红包或者加息券，一个定期R计划可使用一张红包券或者加息券。注意：使用加息券所得利息不与本息同时到账，到账时间将会延迟1到2小时。`
            },
            {
                question: '红包或加息券是否能叠加使用？',
                answer: `不可以，每次投资只能使用一张红包或加息券。如果您有多张红包或加息券，可以分多次投资使用。`
            },
            {
                question: '当发生债权转让时，加息券能否一起转让？',
                answer: `不可以。当使用了加息券的投资发生债权转让，转出部分失去享受加息奖励。`
            },
            {
                question: '特别说明',
                answer: `以上规则自2015年12月1日起执行，所有最终解释权在法律范围内归金服所有。\n浙江金融服务股份有限公司`
            },
        ];
        const lis1=register.map((v,i)=>{
            return (
                <Sider key={i} question={v.question} answer={v.answer} table={v.table}/>
            )
        });
        return (
            <div className="newcontent">
                <div className="title">
                    <p>红包加息券</p>
                </div>
                <ul>
                    {lis1}
                </ul>
            </div>
        )
    }
}


class Helptab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <div className="img">帮助中心</div>
                    <div className="tab">
                        <ul>
                            <li>
                                <NavLink exact activeStyle={{color: '#d6a462'}}
                                         to="/">
                                    <div className="circle"></div>
                                    <p>新手必读</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact activeStyle={{color: '#d6a462'}}
                                         to="/login">
                                    <div className="circle"></div>
                                    <p>注册/登录</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact activeStyle={{color: '#d6a462'}}
                                         to="/binging">
                                    <div className="circle"></div>
                                    <p>认证/绑卡</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact activeStyle={{color: '#d6a462'}}
                                         to="/recharge">
                                    <div className="circle"></div>
                                    <p>充值/提现</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact activeStyle={{color: '#d6a462'}}
                                         to="/invest">
                                    <div className="circle"></div>
                                    <p>投资/转让</p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact activeStyle={{color: '#d6a462'}}
                                         to="/redpack">
                                    <div className="circle"></div>
                                    <p>红包/加息券</p>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="helpcontent">
                        <Route exact path="/" component={New}/>
                        <Route exact path="/login" component={Register}/>
                        <Route exact path="/binging" component={Binging}/>
                        <Route exact path="/recharge" component={Recharge}/>
                        <Route exact path="/invest" component={Invest}/>
                        <Route exact path="/redpack" component={Redpack}/>
                    </div>
                </div>
            </HashRouter>
        )
    }
}


class Help extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TopBar/>
                <Helptab/>
                <Bottom/>
            </div>
        )
    }
}

Help = connect((store) => ({store: store}))(Help);
render(<Provider store={store}>
    <Help/>
</Provider>, document.getElementById('app'));
