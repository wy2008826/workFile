import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";

import indexCss from "@/assets/css/index.scss";
import TopBarCss from "@/components/TopBar/TopBar.scss";

import TopBar from "@/components/TopBar/TopBar.jsx";
import TopBanner from "@/components/TopBanner/TopBanner.jsx";
import Bottom from "@/components/Bottom/Bottom.jsx";

import store from "@/store/store.js";
import {setLoginStatus, setLoginFrom} from "@/store/action.js";
import API from "@/api/api.js";

import getParam from '@/util/getParam'
import dateFormat from '@/util/dateFormat';

//公告
class NoticeContent extends Component {
    constructor(props) {
        super(props);
    }

    formateData = (num) => {
        const wan = String(num / 10000).split('.')[0];
        const resultNum = String(wan / 10000).split('.');
        const result = resultNum[0] + '亿' + (!!resultNum[1] ? resultNum[1] : 0) + '万'
        return result
    }

    render() {
        const {totalTender,totalIncome,nowDate=''}=this.props;
        return (
            <div className={indexCss.NoticeContent}>
                <ul>
                    <li>
                        <a href="/bankxq.html" target="_blank">
                            <div className={indexCss.contentTop}>
                                <div className={indexCss.topLeft}>
                                    <div className={indexCss.notice}></div>
                                </div>
                                <div className={indexCss.topRight}>
                                    <h2>银行存管上线</h2>
                                    <p>北京银行资金存管</p>
                                </div>
                            </div>
                        </a>
                        <div className={indexCss.contentBot}>
                            <p>累计投资 <span>{this.formateData(totalTender)}</span></p>
                        </div>

                    </li>
                    <li>
                        <a href="/al_zj.html" target="_blank">
                            <div className={indexCss.contentTop}>
                                <div className={indexCss.topLeft}>
                                    <div className={indexCss.notice}></div>
                                </div>
                                <div className={indexCss.topRight}>
                                    <h2>获得A轮融资</h2>
                                    <p>立元创投注资5000w</p>
                                </div>
                            </div>
                        </a>
                        <div className={indexCss.contentBot}>
                            <p>累计收益 <span>{this.formateData(totalIncome)}</span></p>
                        </div>

                    </li>
                    <li>
                        <a href="/information.html#/news/detail/20000968/6" target="_blank">
                            <div className={indexCss.contentTop}>
                                <div className={indexCss.topLeft}>
                                    <div className={indexCss.notice}></div>
                                </div>
                                <div className={indexCss.topRight}>
                                    <h2>ICP许可证</h2>
                                    <p>安全合规 稳健规范</p>
                                </div>
                            </div>
                        </a>
                        <div className={indexCss.contentBot}>
                            <p>风险保证金 <span>1000万元</span></p>
                        </div>

                    </li>
                    <li>
                        <a href="/projectList.html" target="_blank">
                            <div className={indexCss.contentTop}>
                                <div className={indexCss.topLeft}>
                                    <div className={indexCss.notice}></div>
                                </div>
                                <div className={indexCss.topRight}>
                                    <h2>精选优质项目</h2>
                                    <p>4年运行0坏账</p>
                                </div>
                            </div>
                        </a>
                        <div className={indexCss.contentBot}>
                            <p><i></i>数据统计截止日：{nowDate.split(' ')[0]}</p>
                        </div>
                    </li>
                    <a href="/information.html#/data" target="_blank"><span className={indexCss.more}>+更多</span></a>
                </ul>
            </div>
        )
    }
}

class Notice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [1, 2, 3, 4],
            current: 0
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                current: this.state.current + 1
            })
            if (this.props.noticeList.length) {
                if (this.state.current >= this.props.noticeList.length) {
                    this.state.current = 0
                }
            }
            this.refs.notice.style.marginTop = -40 * this.state.current + 'px';
        }, 2000)
    }

    render() {
        let noticeList;
        if (this.props.noticeList.length) {
            noticeList = this.props.noticeList.map((v, i) => <a style={{color:'#555'}} key={i}
                                                                href={"/information.html#/news/detail/" + v.id + '/6'}>{v.title}</a>)
        } else {
            noticeList = ''
        }
        return (
            <div>
                <div style={{
                    width: '100%',
                    height: '41px',
                    background: '#fff',
                    margin: '0 auto',
                    borderBottom: '1px solid #e5e5e5',
                }}>
                    <div className={indexCss.NoticeTitle}>
                        <div className={indexCss.titleleft}>
                            <div className={indexCss.noticetip}>
                                <p ref="notice">
                                    {noticeList}
                                </p>
                            </div>
                        </div>
                        <div className={indexCss.titleright}>
                            <a href="/information.html#/news?siteId=6"><span>+更多</span></a>
                        </div>
                    </div>
                </div>
                <NoticeContent
                    totalIncome={this.props.totalIncome}
                    data={this.state.data}
                    totalTender={this.props.totalTender}
                    nowDate={this.props.nowDate}
                />
            </div>
        )
    }
}
//新人专享
class Novice extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {apr,
            baseApr,
            exApr,
            lastAccount,
            lowestAccount,
            mostAccount,
            alreadyInvestNewBorrow,
            id,
            productType,
            borrowTimeType,//0月标 1 天标
            timeLimit,
            status,
            scales,
            mostSingleLimit,//单笔最高可投
        } = this.props.novice;
        const isinBack = status == 6 || ((productType == 3||productType == 2||productType == 4) && status == 3);
        // const timeLimit=borrowTimeType==1?this.props.novice.timeLimit:this.props.novice.timeLimit*30;
        return (
            <div style={{marginTop: '50px', marginBottom: '20px', display: alreadyInvestNewBorrow && 'none'}}>
                <div className={indexCss.Novice}>
                    <div className={indexCss.Noviceleft}>
                        <a href="/welfare.html"><img src="/static/img/novice.gif" alt=""/></a>
                    </div>
                    <div className={indexCss.Noviceright}>
                        <div className={indexCss.NoviceTop}>
                            <h2>新手专享<span>  仅限未投资用户</span></h2>
                        </div>
                        <div className={indexCss.NoviceBot}>
                            <ul>
                                <li>
                                    <h3>{ ((apr - exApr) || 0).toLocaleString()}{exApr == 0 ?
                                        <span>%</span> :
                                        <span>%+{exApr || 0}%<i>奖励</i></span>}</h3>
                                    <p>预期年化收益率</p>
                                </li>
                                <li>
                                    <h3>{!!timeLimit?timeLimit:0}<span>{borrowTimeType==1?'天':'月'}</span></h3>
                                    <p>投资期限</p>
                                </li>
                                <li>
                                    <h3>{lastAccount && (lastAccount / 10000).toFixed(2)}<span>万</span></h3>
                                    <p>剩余可投</p>
                                </li>
                                <li>
                                    <p style={{marginBottom: '9px'}}>起投金额：{lowestAccount}元</p>
                                    <p className={indexCss.max}>最高可投：<span>{mostSingleLimit}元</span></p>
                                </li>
                            </ul>
                            <div className="btnbox">
                                <div className="btn">
                                    <a href={`/projectDetail.html?id=${id}&newBorrow=true&type=${productType}`}>立即投资</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//推荐
class Recommend extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const recommend = this.props.recommend.map((v, i) => {
            const isinBack = v.status == 6 || ((v.productType == 3||v.productType == 2||v.productType == 4) && status == 3);
            let iconUrl = `/static/img/borrowType${v.productType}.png`;
            if (v.productType == 4) {
                iconUrl = '/static/img/borrowType1.png';
            }
            return <li key={i}>
                <div className="contentTitle">
                    <img src={iconUrl} alt=""/>
                    <p>{v.name}</p>
                </div>
                <p className="percent">{v.baseApr}{v.exApr == 0 ? <span>%</span> :
                    <span>%+{v.exApr}%<i>奖励</i></span>}</p>
                <p className="detail">预期年化收益率</p>
                <div className="Recommendxq">
                    <div className="xqleft">
                        <h2>{v.timeLimit}{v.borrowTimeType == 0 ? '个月' : '天'}</h2>
                        <p>投资期限</p>
                    </div>
                    <div className="xqleft">
                        <span></span>
                        <h2>{(v.lastAccount / 10000).toFixed(2)}万</h2>
                        <p>剩余可投</p>
                    </div>
                </div>
                <div className="RecommendBtn">
                    <div className="progress">
                        <div className="progressTips">
                            <div className="now" style={{width: v.scales + '%'}}></div>
                        </div>
                        <div className="bili">{v.scales}%</div>
                    </div>
                    {v.scales >= 100&&v.status !=1 && <div className="btn" style={{background: '#999'}}><a
                        href={"/projectDetail.html?id=" + v.id + '&type=' + v.productType}>{isinBack ? '回款中' : '已回款'}</a>
                    </div>}
                    {v.status === 10&&<div className="btn"><a
                            href={"/projectDetail.html?id=" + v.id + '&type=' + v.productType}>立即投资</a></div>}
                    {
                        v.status ==1 && <div className="btn" style={{background: '#faa6a0'}}><a
                            href={"/projectDetail.html?id=" + v.id + '&type=' + v.productType}>即将发售</a>
                        </div>
                    }
                </div>
            </li>
        })
        return (
            <div style={{marginBottom: '20px'}}>
                <div className="Recommend">
                    <div className="RecommendTitle">
                        <h2>精选推荐<span>  银行存管 更安全 更透明 更放心</span></h2>
                        <span><a href="/projectList.html">+更多投资产品</a></span>
                    </div>
                    <div className="RecommendContent">
                        <ul>
                            {recommend}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
//最新活动
class Newactive extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let activeList;
        if (this.props.activeList.length) {
            activeList = this.props.activeList.map((v, i) => {
                return <li key={i} style={{backgroundImage: 'url(' + v.imgUrl + ')'}}>
                    <a target="_blank" href={v.linkurl} style={{width: '100%', height: '100%', display: 'block'}}>
                        {v.status ? <div className={indexCss.isin}><p>进行中</p></div> :
                            <div className={indexCss.notin}><p>已结束</p></div>}
                    </a>
                </li>
            })
        } else {
            activeList = ''
        }
        return (
            <div style={{marginBottom: '50px'}}>
                <div className={indexCss.Newactive}>
                    <div className={indexCss.activeTitle}>
                        <h2>最新活动<span>  最新最精彩 就在这里</span></h2>
                        <span><a href="/activecenter.html">+更多活动</a></span>
                    </div>
                    <ul className={indexCss.activeContent}>
                        {activeList}
                    </ul>
                </div>
            </div>
        )
    }
}

//媒体
class Media extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let articleList;
        if (this.props.articleList) {
            articleList = this.props.articleList.map((v, i) =>
                <li key={i}>
                    <a href={"/information.html#/news/detail/" + v.id + '/9'}>
                        <img src={v.picPath} alt="" style={{width: 265}}/>
                        <h4>{v.title}</h4>
                        <p>{v.subtitle}</p>
                    </a>
                </li>
            )
        } else {
            articleList = ''
        }
        return (
            <div>
                <div className={indexCss.Media}>
                    <div className={indexCss.mask}>
                        <div className={indexCss.container}>
                            <div className={indexCss.mediatitle}>
                                <h2>媒体报道</h2>
                                <span><a href="/information.html#/news?siteId=9">+更多</a></span>
                            </div>
                            <ul className={indexCss.mediaContent}>
                                {articleList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//资讯
class Info extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const articleList = !!this.props.articleList && this.props.articleList.map((v, i) => {
                let time = dateFormat(new Date(v.createTime));
                return <li key={i}>
                    <a href={"/information.html#/news/detail/" + v.id + '/8'}>
                        <p className={indexCss.con}>{v.title}</p>
                        <p className={indexCss.time}>{time}</p>
                    </a>
                </li>
            })
        return (
            <div style={{paddingTop: '20px', background: '#fff'}}>
                <div className={indexCss.Info}>
                    <div className={indexCss.Infotitle}>
                        <h2>公司资讯</h2>
                        <span><a href="/information.html#/news?siteId=8">+更多</a></span>
                    </div>
                    <div className={indexCss.infocontent}>
                        <ul className={indexCss.video}>
                            <li>
                                <div className={indexCss.img}>
                                    <div className={indexCss.mask}>
                                        <a target="_blank" className={indexCss.start}
                                           href="https://images.51rz.com/movie/Navicat.lnk.mp4">
                                            <img src="/static/img/start.png" alt=""/>
                                        </a>
                                    </div>
                                </div>
                                <p>一分钟了解</p>
                            </li>
                            <li>
                                <div className={indexCss.img}>
                                    <div className={indexCss.mask}>
                                    <a target="_blank" className={indexCss.start}
                                       href="https://images.51rz.com/movie/20170823%20%E4%BA%BA%E4%BC%97%E7%9A%84%E7%8B%AC%E7%89%B9%E4%BC%98%E5%8A%BF%20%E6%AD%A3%E5%BC%8F%E7%89%88_x264.mp4">
                                        <img src="/static/img/start.png" alt=""/>
                                    </a>
                                    </div>
                                </div>
                                <p>的独特优势</p>
                            </li>
                            <li>
                                <div className={indexCss.img}>
                                    <div className={indexCss.mask}>
                                    <a target="_blank" className={indexCss.start}
                                       href="https://images.51rz.com/movie/20170823%20%E4%BA%BA%E4%BC%97%E4%BC%97%E7%B3%BB%E5%88%97%E4%BA%A7%E5%93%81%20%E6%AD%A3%E5%BC%8F%E7%89%88_x264.mp4">
                                        <img src="/static/img/start.png" alt=""/>
                                    </a>
                                    </div>
                                </div>
                                <p>"众系列"产品</p>
                            </li>
                        </ul>
                        <ul className={indexCss.list}>
                            {articleList}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
//合作伙伴
class Partner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
        }
    }

    componentDidMount() {
        // this.t = setInterval(() => {
        //     this.left()
        // }, 5000)
    }

    left = async () => {
        let el = this.refs.ul;
        await this.setState({
            num: this.state.num + 1
        })
        if (this.state.num > 2) {
            await this.setState({
                num: 0
            })
        }
        el.style.left = (this.state.num ) * (-1200) + 'px';
    }

    right = async () => {
        let el = this.refs.ul;
        if (this.state.num <= 0) {
            return;
        }
        await this.setState({
            num: this.state.num - 1
        })
        el.style.left = (this.state.num) * (-1200) + 'px';
    }

    render() {
        const partnerArr = [
            {
                linkUrl: 'http://www.bankofbeijing.com.cn/'
            },
            {
                linkUrl: 'https://www.aliyun.com/'
            },
            {
                linkUrl: 'http://www.wdzj.com/'
            },
            {
                linkUrl: 'http://www.sunyard.com/'
            },
            {
                linkUrl: 'http://www.lianlianpay.com/'
            },
            {
                linkUrl: 'http://pulonglawyer.com/pls/plIndex'
            },
            {
                linkUrl: 'http://www.p2peye.com/'
            },
            {
                linkUrl: 'http://www.huimin.cn/'
            },
            {
                linkUrl: 'http://www.chjdt.com/'
            },
            {
                linkUrl: 'https://www.jimistore.com/'
            },
            {
                linkUrl: 'http://www.yeepay.com/'
            },
            {
                linkUrl: 'https://www.tsign.cn/'
            },
            {
                linkUrl: 'http://www.ccement.com/'
            },
            {
                linkUrl: 'https://www.reapal.com/'
            },
            {
                linkUrl:'http://www.z-aif.com/'
            }
        ]
        const partnerList = partnerArr.map((v, i) => {
            return (<li key={i}><a target="_blank" href={v.linkUrl}>
                <img src={'/static/img/partner' + i + '.png'} alt=""/>
            </a></li>)
        })
        return (
            <div>
                <div className={indexCss.Partner}>
                    <div className={indexCss.PartnerTitle}>
                        <h2>合作伙伴</h2>
                    </div>
                    <div className={indexCss.PartnerContent}>
                        <div className={indexCss.left} onClick={this.right}></div>
                        <div className={indexCss.content}>
                            <ul ref="ul" onMouseEnter={() => {
                                clearInterval(this.t)
                            }}
                                // onMouseLeave={() => {
                                //     this.t = setInterval(() => {
                                //         this.left()
                                //     }, 5000)
                                // }}
                            >
                                {partnerList}
                            </ul>
                        </div>
                        <div className={indexCss.right} onClick={this.left}></div>
                    </div>
                </div>
            </div>
        )
    }
}
//右侧固定栏
class Fixed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className={indexCss.fixed}>
                <li><p>在线客服</p></li>
                <li>
                    <p>关注微信</p>
                    <div className={indexCss.cardbox}>
                        <div className={indexCss.card}>
                            <img style={{width: '120px', height: '120px'}} src="/static/img/wxdyh.png" alt=""/>
                            <p>关注领红包</p>
                        </div>
                    </div>
                </li>
                <li>
                    <p>APP下载</p>
                    <div className={indexCss.cardbox}>
                        <div className={indexCss.card}>
                            <img src="/static/img/xzapp.png" alt=""/>
                            <p>扫码下载</p>
                        </div>
                    </div>
                </li>
                <li>
                    <p>QQ客服</p>
                    <div className={indexCss.cardbox}>
                        <div className={indexCss.card} style={{paddingTop:'12px'}}>
                            <a target="_blank"
                               href="//shang.qq.com/wpa/qunwpa?idkey=d45c2eccbcc303e8ba593a0050a195e64b929f9204f6251275242d158d501020">官方交流群1</a>
                            <a target="_blank"
                               href="//shang.qq.com/wpa/qunwpa?idkey=d4ba666465057f865f49f55af749a62048b6250c1f61b8feb8699526bb4eeb18">官方交流群2</a>
                            <a target="_blank"
                               href="//shang.qq.com/wpa/qunwpa?idkey=69ab64c5c31e4595670cdc65f0a61c54136aa6593206189f51182fe55aad21b6">官方交流群3</a>
                            <a target="_blank"
                               href="//shang.qq.com/wpa/qunwpa?idkey=9803b9cf47e40f53ed9b94ddfe40bba8464274d9192072011d3f2714f3cea6d1">官方交流群4</a>
                            <a target="_blank"
                               href="//shang.qq.com/wpa/qunwpa?idkey=a848414965e1b4a5cd27b011b9c186de7797e86f230bc39f39da176bf80b6b16">官方交流群5</a>
                        </div>
                    </div>
                </li>
                <li onClick={() => {
                    document.documentElement.scrollTop = 1;
                    window.pageYOffset = 1;
                    document.body.scrollTop = 1;
                }}><p>返回顶部</p></li>
            </ul>
        )
    }
}

//悬浮
class NavsArea extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    componentDidMount() {
        window.addEventListener('scroll', this.orderScroll.bind(this));
    }

    orderScroll() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop >= 530) {
            setTimeout(() => {
                this.refs.suspend.style.top = 0
            }, 200)
        } else {
            setTimeout(() => {
                this.refs.suspend.style.top = '-80px'
            }, 200)
        }
    }

    async checkLogin() {
        const hasLogin = this.props.store.userInfo.uid;

        if (hasLogin) {
            window.location.href = '/member/index.html';
        } else {
            this.props.dispatch(setLoginFrom('/member/index.html'));//登陆过后跳转到个人中心
            window.location.href = '/login.html';
        }
    }

    render() {
        const {
            tag,
            type,
        } = this.props;
        const navs = [
            {text: '首页', link: '/index.html', tag: 'index'},
            {text: '投资产品', link: '/projectList.html', tag: 'projectList'},
            {text: '邀请有礼', link: '/invite.html', tag: 'invite'},
            {text: '信息披露', link: '/information.html', tag: 'information'},
            // {text:'会员积分',link:'/index.html',tag:'score'},//第一版重构暂时不做
            {text: '我的账户', link: '/member/index.html', tag: 'memberIndex', auth: true},
        ];


        const lists = navs.map((item, index) => {
            const isActive = (tag == item.tag) && TopBarCss.active
            if (!item.auth) {
                return <li style={{lineHeight: '60px'}} key={index} className={isActive}><a style={{lineHeight: '60px'}}
                                                                                            href={item.link}>{item.text} </a>
                </li>
            } else {
                return <li style={{lineHeight: '60px'}} key={index} className={isActive} onClick={(e) => {
                    this.checkLogin(e)
                }}>{item.text}</li>
            }
        });

        const rightNavs = (
            <div className={TopBarCss.rightNav} style={{height: '60px', marginTop: '0px',}}>
                <ul>{lists}</ul>
            </div>
        )

        return (
            <div className={TopBarCss.wraper} ref="suspend" style={{
                position: 'fixed',
                top: '-70px',
                left: 0,
                zIndex: 10000,
                transition: 'all .5s',
                boxShadow: 'none'
            }}>
                <div className={TopBarCss.navsArea } style={{height: '70px', padding: '10px 0 0'}}>
                    <div className={TopBarCss.navs + ' clearfix'}>
                        <a href="/views/index.html" className={TopBarCss.leftLogo}>
                            <img src="/static/img/logo_text.gif" className={TopBarCss.logoText}/>
                        </a>
                        {type != 'login' && type != 'register' && type != 'loginPassForget' && rightNavs }
                    </div>
                </div>
            </div>
        )
    }

}
NavsArea = connect((store) => ({store}))(NavsArea);

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 100,
            pageSize: 10,
            indexBanner: [],//首页轮播
            indexArticle: [],//首页文章
            indexActivity: [],//首页活动
            income: 0,
            recommend: [],//精选标
            novice: {},//新手标
            totalTender: 0,
            totalIncome: 0,
            nowDate: new Date().toLocaleString()
        };
        this.changeVal = this.changeVal.bind(this);
        this.getIndex = this.getIndex.bind(this);
    }


    changeVal(e) {
        let val = e.target.value * 1;
        let name = e.target.name;

        if (!val) {
            val = 0;
        }
        this.setState({
            val
        });
    }

    async getIndex() {
        const Index = await API.get(API.getIndex, {}, true);
        const novice = await API.post(API.newBorrow, {newBorrow: 1}, true)
        await this.setState({
            indexBanner: Index.obj && Index.obj.indexBanner || [],//首页轮播
            indexArticle: Index.obj && Index.obj.indexArticle || [],//首页文章
            indexActivity: Index.obj && Index.obj.indexActivity || [],//首页活动
            income: Index.obj && Index.obj.income || 0,
            totalTender: Index.obj && Index.obj.totalTender || 0,
            totalIncome: Index.obj && Index.obj.totalIncome || 0,
            nowDate: Index.obj && Index.obj.nowDate || 0
        })
    }

    async getRecommend(){
        const recommend = await API.post(API.recommend, {}, true);
        await this.setState({
            recommend: recommend.obj && recommend.obj.recordList || [],
        })
    }
    async getNovice(){
        const novice = await API.post(API.newBorrow, {newBorrow: 1}, true)
        await this.setState({
            novice: novice.obj || {},
        })
    }

    componentWillMount() {
        this.getIndex();
        this.getRecommend();
        this.getNovice();
        //添加渠道标识
        sessionStorage.setItem('utm_source', getParam(window.location.href, 'utm_source'))
        sessionStorage.setItem('uid', getParam(window.location.href, 'uid'))
    }

    render() {
        const {
            indexBanner = [],//banner
            income = 0,//收益
            indexArticle = [],//文章 0.公告 1.媒体  2.公司资讯
            novice,//新手标{}
            recommend,//精选标列表
            indexActivity,//最新活动
        } = this.state;

        const isLoading = this.props.store.isLoading;
        let loading = !!isLoading && (<div className={indexCss.shade}></div>);

        return (
            <div className={indexCss.wraper}>
                <NavsArea tag="index"/>
                <TopBar  />
                <TopBanner bannerList={indexBanner.length ? indexBanner[0].bannerList : []}
                           income={income}/>
                <Notice noticeList={indexArticle.length ? indexArticle[0].articles : []}
                        totalTender={this.state.totalTender}
                        totalIncome={this.state.totalIncome}
                        nowDate={this.state.nowDate}
                />
                <Novice novice={novice}/>
                <Recommend recommend={recommend}/>
                <Newactive
                    activeList={indexActivity.length ? indexActivity[0].bannerList : []}/>
                <Media articleList={indexArticle.length ? indexArticle[1].articles : []}/>
                <Info articleList={indexArticle.length ? indexArticle[2].articles : []}/>
                <Partner/>
                <Fixed/>
                <Bottom/>
            </div>
        );
    }
}

Index = connect((store) => ({store}))(Index);


render(<Provider store={store}>
    <Index />
</Provider>, document.getElementById('app'));
