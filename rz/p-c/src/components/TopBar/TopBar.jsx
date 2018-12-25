import React, {Component} from "react";
import {connect} from "react-redux";
import TopBarCss from "./TopBar.scss";

import  API from "@/api/api.js";
import  authLogin from "@/util/authLogin.js";
import store from "@/store/store.js";
import {setMsg, setLoginStatus, setUserInfo, setLoginFrom} from "@/store/action.js";

//右侧固定栏
class Fixed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className={TopBarCss.fixed}>
                <li><a target="_blank" href="http://51rz.udesk.cn/im_client/?web_plugin_id=22904"><p>在线客服</p></a></li>
                <li>
                    <p>关注微信</p>
                    <div className={TopBarCss.cardbox}>
                        <div className={TopBarCss.card}>
                            <img style={{width: '120px', height: '120px'}} src="/static/img/wxdyh.png" alt=""/>
                            <p>关注领红包</p>
                        </div>
                    </div>
                </li>
                <li>
                    <p>APP下载</p>
                    <div className={TopBarCss.cardbox}>
                        <div className={TopBarCss.card}>
                            <img src="/static/img/xzapp.png" alt=""/>
                            <p>扫码下载</p>
                        </div>
                    </div>
                </li>
                <li>
                    <p>QQ客服</p>
                    <div className={TopBarCss.cardbox}>
                        <div className={TopBarCss.card} style={{paddingTop: '12px'}}>
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

class BarArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasNotRead: false
        }
    }

    async componentWillMount() {
        if (!!this.props.store.userInfo.uid) {
            const obj = await API.get(API.isNewNotice, {}, true);
            if (obj.obj) {
                this.setState({
                    hasNotRead: true
                })
            } else {
                this.setState({
                    hasNotRead: false
                })
            }
        }
    }

    async loginOut() {//退出登录
        await API.get(API.loginOut);
        this.props.dispatch(setUserInfo({}));
        window.location.reload();
    }

    goToLogin() {//点击顶部的登录按钮  清除登录来源   让登陆成功后页面自然返回至上一页
        this.props.dispatch(setLoginFrom(''));
        window.location.href = '/login.html'
    }

    render() {
        const {
            hasLogin,
            user = ''
        } = this.props;

        let loginbox;

        if (hasLogin) {
            loginbox = (<div className={TopBarCss.islogin}><span>欢迎您，{user} <a onClick={(e) => {
                this.loginOut(e)
            }}>【 退出 】</a></span>
                <a href="/member/index.html#/message">
                    <div className={TopBarCss.message}>
                        <img src="/static/img/tip.png" alt=""
                             style={{display: this.state.hasNotRead ? 'block' : 'none'}}/></div>
                </a>
            </div>);
        } else {
            loginbox = (<div className={TopBarCss.notlogin}>
                {/*<div><a href="/register.html">注册</a></div>*/}
                <div><a href="https://www.51rz.com/ind/register.html">注册</a></div>
                <div><span></span><a style={{'cursor': 'pointer'}} onClick={(e) => {
                    this.goToLogin(e)
                }}>登录</a></div>
            </div>);
        }

        return (
            <div className={TopBarCss.barArea}>
                <div className={TopBarCss.container}>
                    <div className={TopBarCss.TopBarleft}>
                        <i className={TopBarCss.tel}></i>
                        <p>全国服务热线：<a>400-655-8858</a>（9:00~22:00）</p>
                        <span></span>
                        <div className={TopBarCss.download}>
                            <p>下载APP</p>
                            <i className={TopBarCss.phone}></i>
                            <div className={TopBarCss.img}>
                                <img src="/static/img/xzapp.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className={TopBarCss.TopBarRight}>
                        {loginbox}
                        <div><span></span><a href="/help.html">帮助中心</a></div>
                        <div><span></span><a href="/noviceGuide.html">新手指引</a></div>
                        <div><span></span><a href="/aboutus.html">关于我们</a></div>
                    </div>
                </div>
                <Fixed/>
            </div>
        )
    }
}
BarArea = connect((store) => ({store}))(BarArea);

const LoginContent = (props) => {
    const {
        text
    } = props;
    return (
        <div className={TopBarCss.loginCont}>
            {text}
        </div>
    )
}


const RegisterContent = (props) => {
    return (
        <div className={TopBarCss.registerCont}>
            欢迎注册
            <p className={TopBarCss.rightLogin}>
                已有账号？<a href="/login.html">立即登录</a>
            </p>
        </div>
    )
}

class NavsArea extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    async checkLogin() {
        const {
            hasLogin
        } = this.props;

        if (hasLogin) {
            window.location.href = '/member/index.html'
            // if (window.location.href.search('member/index.html') < 0) {//当前就在个人中心页面 不做跳转
            //     window.location.href = '/member/index.html';
            // }
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
                return <li key={index} className={isActive}><a href={item.link}>{item.text} </a></li>
            } else {
                return <li key={index} className={isActive} onClick={(e) => {
                    this.checkLogin(e)
                }}>{item.text}</li>
            }
        });

        const rightNavs = (
            <div className={TopBarCss.rightNav}>
                <ul>{lists}</ul>
            </div>
        )

        return (
            <div className={TopBarCss.navsArea }>
                <div className={TopBarCss.navs + ' clearfix'}>
                    <a href="/index.html" className={TopBarCss.leftLogo}>
                        <img src="/static/img/logo_text.gif" className={TopBarCss.logoText}/>
                    </a>
                    {type == 'login' && <LoginContent text={'欢迎登录'}/>}
                    {type == 'loginPassForget' && <LoginContent text={'找回密码'}/>}
                    {type == 'register' && <RegisterContent/>}

                    {type != 'login' && type != 'register' && type != 'loginPassForget' && rightNavs }
                </div>
            </div>
        )
    }

}
NavsArea = connect((store) => ({store}))(NavsArea);

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            hasLogined: false,//默认未登录
        }
    }

    async componentWillMount() {
        const {
            type
        } = this.props;
        if (type != 'login' && type != 'register') {
            let hasLogined = await authLogin();
            if (hasLogined) {
                this.setState({
                    hasLogined: true
                })
            } else {
                this.props.dispatch(setUserInfo({}))
            }
        }
    }

    async componentDidMount() {

    }

    render() {
        const {
            tag = 'index',
            store,
            type
        } = this.props;

        const hasLogined = this.state.hasLogined;
        const user = hasLogined && store.userInfo.userName;

        return (
            <div className={TopBarCss.wraper}>
                {type != 'login' && type != 'register' && type != 'loginPassForget' &&
                <BarArea hasLogin={hasLogined} user={user}/>}
                {<NavsArea type={type} tag={tag} hasLogin={hasLogined}/>}
            </div>
        );
    }
}

TopBar = connect((store) => ({store}))(TopBar);

export default TopBar;