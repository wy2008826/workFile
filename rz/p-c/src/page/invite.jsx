import React, {Component} from "react";
import {render} from "react-dom";
import {Provider, connect} from "react-redux";
import {
    HashRouter,
    Route,
    NavLink,
    Switch,
    Redirect
} from 'react-router-dom';

import InviteCss from "@/assets/css/invite.scss";

import TopBar from "@/components/TopBar/TopBar.jsx";
import Bottom from "@/components/Bottom/Bottom.jsx";
import Pagination from '@/components/Pagination/Pagination.jsx'
import Login from '@/components/LoginPop/index.jsx'

import API from '@/api/api.js';
import store from "@/store/store.js";
import dateFormat from '@/util/dateFormat.js'


//邀请方式
class Method extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            inviteUrl: '',
            imgUrl: ''
        }
    }

    async componentWillMount() {
        const id = this.props.store.userInfo.uid;
        if(!!id){
            const url = location.href.split('://')[1].split('/')[0]
            let inviteUrl,wxUrl;
            if(url=='pc.51rz.com'){
                inviteUrl='http://pc.51rz.com/invitee.html?uid=' + id
                wxUrl='http://wx.51rz.com/invite/share?uid=' + id
            }else if(url=='wwww.51rz.com'){
                inviteUrl='http://wwww.51rz.com/invitee.html?uid=' + id
                wxUrl='http://mobile.51rz.com/invite/share?uid=' + id
            }else {
                inviteUrl='http://w.51rz.com/invitee.html?uid=' + id
                wxUrl='http://m.51rz.com/invite/share?uid=' + id
            }
            this.setState({
                inviteUrl: inviteUrl,
                userId: id
            })
            const obj = await API.get(API.getQrCode, {inviteUrl: wxUrl}, true);
            this.setState({
                imgUrl: obj.obj && obj.obj.code
            })
        }
    }

    copyUrl = () => {
        var contact = document.getElementById("url");
        if (contact) {
            contact.select();
            document.execCommand("Copy", false, null); // 执行浏览器复制命令
            contact.blur();
            this.refs.success.style.display = 'block';
            setTimeout(() => {
                this.refs.success.style.display = 'none';
            }, 2000)
        }
    }

    render() {
        let content, height;
        if (this.props.isLogined) {
            height = '520px';
            content = <div className={InviteCss.content}>
                <ul>
                    <li style={{height: '327px'}}>
                        <div className={InviteCss.step}>1</div>
                        <p>分享给好友</p>
                        <img src={"data:image/png;base64," + this.state.imgUrl}/>
                    </li>
                    <li style={{height: '327px'}}>
                        <div className={InviteCss.step}>2</div>
                        <p>好友注册时输入邀请码</p>
                        <p style={{color: '#fd9a26', marginTop: '10px'}}>——我的邀请码——</p>
                        <p style={{
                            fontSize: '48px',
                            color: '#ef5933',
                            height: '170px',
                            lineHeight: '170px'
                        }}>{this.state.userId}</p>
                    </li>
                    <li style={{height: '327px', position: 'relative'}}>
                        <div className="copy_success" ref="success">链接复制成功</div>
                        <div className={InviteCss.step}>3</div>
                        <p>把我的专属链接发给好友</p>
                        <p style={{color: '#fd9a26', marginTop: '10px'}}>——我的专属链接——</p>
                        <textarea className={InviteCss.mylink} name="" cols="30" rows="10" id="url"
                                  value={this.state.inviteUrl} readOnly></textarea>
                        <div className={InviteCss.loginbtn} style={{
                            width: '182px',
                            height: '41px',
                            marginTop: '17px',
                            fontSize: '18px',
                            lineHeight: '41px',
                            color: '#fff',
                            textAlign: 'center',
                            cursor: 'pointer'
                        }} onClick={() => {
                            this.copyUrl()
                        }}>复制此链接
                        </div>
                    </li>
                </ul>
            </div>
        } else {
            height = '428px';
            content = <div className={InviteCss.content}>
                <ul>
                    <li style={{height: '126px'}}>
                        <div className={InviteCss.step}>1</div>
                        <p>二维码分享给好友</p>
                    </li>
                    <li style={{height: '126px'}}>
                        <div className={InviteCss.step}>2</div>
                        <p>好友注册时输入邀请码</p>
                    </li>
                    <li style={{height: '126px'}}>
                        <div className={InviteCss.step}>3</div>
                        <p>把我的专属链接发给好友</p>
                    </li>
                </ul>
                <div className={InviteCss.loginbtn}><a href="javascript:void(0)" onClick={() => {
                    this.props.openLogin()
                }}>登录获得</a></div>
            </div>
        }
        return (
            <div className={InviteCss.invite}>

                <div className={InviteCss.invite}>
                    <div className={InviteCss.method} style={{height: height}}>
                        <div className={InviteCss.title}>
                            <img src="/static/img/yqlogin-title01.png" alt=""/>
                        </div>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}
Method = connect((store) => ({store: store}))(Method);


//邀请记录

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {mobile, userRegistTime,tender} = this.props;
        return (
            <div className={InviteCss.recorehead} style={{
                height: '44px',
                borderBottom: '1px dashed #e5e5e5',
                borderRadius: '0px',
                color: '#555',
            }}>
                <div style={{lineHeight: '44px', height: '44px'}}>{mobile}</div>
                <div style={{lineHeight: '44px', height: '44px'}}>{dateFormat(userRegistTime,'all')}</div>
                <div style={{lineHeight: '44px', height: '44px'}}>{tender?'已投资': '未投资'}</div>
            </div>
        )
    }
}

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {},
            currentPage: 1,
            currentList: [],
            pagePerNum: 5,
            displayReward:false,
            rewardObj:{}
        }
    }

    async componentWillMount() {
        if(!!this.props.store.userInfo.uid){
            const inviteObj = await API.get(API.inviteList, {}, true);//邀请人列表
            const rewardObj=await API.get(API.rewardList, {}, true);//奖励记录列表
            const obj = inviteObj.obj;
            const {currentPage, pagePerNum} = this.state;
            let currentList = [];
            if (obj) {
                if (obj.list.length < this.state.pagePerNum) {
                    currentList = obj.list
                }else{
                    for (let i = (currentPage - 1) * pagePerNum; i < currentPage * pagePerNum; i++) {
                        if (i < obj.list.length) {
                            currentList.push(obj.list[i])
                        }
                    }
                }
            }

            this.setState({
                obj: obj,
                currentList: currentList,
                rewardObj:rewardObj.obj
            })
        }
    }

    async onCurrentChange(i) {
        await this.setState({
            currentPage: i
        })
        const {currentPage, pagePerNum, obj} = this.state;
        let currentList = [];
        if (obj.list.length < this.state.pagePerNum) {
            currentList = obj.list
        }else{
            for (let i = (currentPage - 1) * pagePerNum; i < currentPage * pagePerNum; i++) {
                if (i < obj.list.length) {
                    currentList.push(obj.list[i])
                }
            }
        }
        this.setState({
            currentList: currentList
        })
    }

    render() {
        let content;
        const {
            obj, //邀请人列表
            currentList, //当前页码中的列表
            displayReward, //是否显示奖励列表
            currentPage, //当前页码
            pagePerNum, //一页几条数据
            rewardObj={}, //奖励对象
        } = this.state;
        const {isLogined} = this.props;
        if (isLogined) {
            if (currentList.length) {
                //有记录
                let lists = currentList.map((v, i) => {
                        return (
                            <List key={i} {...v}/>
                        )
                    }
                );
                content = <div className={InviteCss.lists} style={{paddingBottom: '30px'}}>
                    {lists}
                    <Pagination key="1" currentPage={currentPage} pages={Math.ceil(obj.list.length / pagePerNum)} onCurrentChange={(i) => {
                        this.onCurrentChange(i);
                    }
                    }/>
                </div>

            } else {
                //  无记录
                content = <div className={InviteCss.records}
                               style={{background: '#fff', marginLeft: '-29px', marginRight: '-29px'}}>
                    <img src="/static/img/notlogin.png" alt=""
                         style={{float: 'left', marginLeft: '360px', marginTop: '40px'}}/><p style={{float: 'left',}}>
                    呼朋唤友拿奖励，赶快行动吧！</p>
                </div>
            }
        } else {
            content = <div className={InviteCss.records} style={{
                background: '#fff',
                marginLeft: '-29px',
                marginRight: '-29px'
            }}>
                <div className={InviteCss.loginbtn} style={{marginTop: '44px', marginBottom: '44px'}}><a
                    href="javascript:void(0)" onClick={() => {
                    this.props.openLogin()
                }}>登录后查看</a></div>
            </div>
        }


        let rewardContent;//奖励
        const rewardType=['返佣现金','投资奖励现金红包','投资奖励虚拟红包','发放现金至余额']// 类型 1.返佣现金 2.投资奖励现金红包 3.投资奖励虚拟红包 4.发放现金至余额
        const sign=['','+','-']
        if(!!rewardObj.page&&rewardObj.page.recordList.length) {
            rewardContent = rewardObj.page.recordList.map((v, i) => {
                return <tr key={i}>
                    <td>{rewardType[v.type-1]}</td>
                    <td>{dateFormat(v.createTime)}</td>
                    <td>{sign[v.paymentsType]+v.money}元现金</td>
                </tr>
            })
        }
        const {
            rewardSum,//奖励总额
            redPacketSum,//红包总额
            inExamineSum,//审核
        }=rewardObj

        const inviteNum = isLogined ? obj && obj.inviteCount : '0';//邀请人总数
        const totalNum = isLogined ? obj && obj.firstUserCount : '0';//已投资好友
        const totalRedpack = isLogined ? obj && obj.redPacketSum : '0';//累计获得红包
        const cashSum = isLogined ? obj && obj.rewardSum : '0';//累计获得现金
        const exam = isLogined ? obj && obj.inExamineSum : '0';//待发现金
        return (
            <div className={InviteCss.invite}>
                <div className={InviteCss.bg1}></div>
                <div className={InviteCss.record}>
                    <div className={InviteCss.recordtitle}>
                        <img src="/static/img/yqlogin-title03.png" alt=""/>
                    </div>
                    <div className={InviteCss.recordetail}>
                        <div className={InviteCss.nums}>
                            <p>邀请好友：<span className={InviteCss.num}>{inviteNum}人</span></p>
                            <p>已投资好友：<span className={InviteCss.num}>{totalNum}人</span></p>
                            <p>累计获得红包：<span className={InviteCss.num}>{totalRedpack}元</span> </p>
                            <p>累计获得现金：<span className={InviteCss.num}>{cashSum}</span> <span>元</span></p>
                            <p>待发现金：<span className={InviteCss.num}>{exam}</span> <span>元</span></p>
                            <p><a onClick={()=>{
                                !!isLogined&&this.setState({
                                    displayReward:true
                                })
                            }} style={{marginTop: '0'}} className={InviteCss.loginbtn}>奖励记录</a></p>
                        </div>
                        <div className={InviteCss.recordcontent}>
                            <div className={InviteCss.recorehead}>
                                <div>被邀请人</div>
                                <div>注册时间</div>
                                <div>是否投资</div>
                            </div>
                            {content}
                        </div>
                    </div>
                    <p style={{fontSize: '14px', color: '#497eb0'}}>注：每月2日打款至账户余额</p>
                </div>
                <div className={InviteCss.reward_mask} style={{display:displayReward?'block':'none'}}>
                    <div className={InviteCss.reward}>
                        <div style={{cursor:'pointer'}} className={InviteCss.close} onClick={()=>{
                            this.setState({
                                displayReward:false
                            })
                        }}></div>
                        <h4>我的奖励记录</h4>
                        <div className={InviteCss.desc}>
                        <p>累计现金奖励：<span>{rewardSum}元</span></p>
                        <p>累计红包奖励：<span>{redPacketSum}元</span></p>
                        <p>待发现金：<span>{inExamineSum}元</span></p>
                        </div>
                        <div className="table" style={{overflowY:'scroll',width:'684px',height:'285px',overflowX:'hidden'}}>
                            <table style={{width:'684px'}}>
                                <thead>
                                <tr>
                                    <th>明细</th>
                                    <th>时间</th>
                                    <th>奖励</th>
                                </tr>
                                </thead>
                                <tbody>
                                {rewardContent}
                                </tbody>
                            </table>
                            <div className={InviteCss.records}
                                 style={{width:'100%',background: '#fff',display:!!rewardObj.page&&rewardObj.page.recordList.length?'none':'block'}}>

                                <p style={{textAlign:'center',verticalAlign:'center',marginTop:'98px'}}><img src="/static/img/notlogin.png" alt=""/>呼朋唤友拿奖励，赶快行动吧！</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Record = connect((store) => ({store: store}))(Record);

//Loginbox
class Loginbox extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="loginMask" style={{display: this.props.display ? 'block' : 'none'}}>
                <Login close={this.props.closelogin}/>
            </div>
        )
    }
}

class Rules extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={InviteCss.invite_gift}>
                <div className={InviteCss.rules}>
                    <div className={InviteCss.rulestitle}>
                        <img src="/static/img/invite-friends-tz-bg.png" alt=""/>
                    </div>
                    <div className={InviteCss.send}>
                        <p>好友注册起7天内投资满足如下条件，邀请人可获得相应的红包以及现金，奖励可叠加领取。</p>
                        <ul>
                            <li>
                                <img src="/static/img/redpack-small.png" alt=""/>
                            </li>
                            <li>
                                <img src="/static/img/redpack-middle.png" alt=""/>
                            </li>
                            <li>
                                <img src="/static/img/redpack-big.png" alt=""/>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className={InviteCss.rules}>
                    <div className={InviteCss.rulestitle}>
                        <img src="/static/img/tip-text-title.png" alt=""/>
                    </div>
                    <div className={InviteCss.back}>
                        <p className={InviteCss.tip_text}>被邀请人投资后，邀请人可获得每笔佣金分红；佣金比例为好友投资收益的百分比。<br/>案例说明：小张在12月1日邀请了小李，小李于当日注册，并且在12月15日投资了10万元收益为10%的90天标，且上个月即<br/>11月30日24点小张的被邀请人总待收≥20万元。则小张可获得收益：100000*10%/365*90*12%=295.89元。
                        </p>
                        <table>
                            <thead>
                            <tr>
                                <th>邀请人级别</th>
                                <th>高级合伙人</th>
                                <th>普通合伙人</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>被邀请人总待收</td>
                                <td>≥200000</td>
                                <td>&lt;200000</td>
                            </tr>
                            <tr>
                                <td>好友注册30天内总投资</td>
                                <td>12%</td>
                                <td>10%</td>
                            </tr>
                            <tr>
                                <td>好友注册第31-180天内投资</td>
                                <td>6%</td>
                                <td>5%</td>
                            </tr>
                            </tbody>
                        </table>
                        <p className={InviteCss.tips}>注：被邀请人总待收为上月最后一天24点所有被邀请人待收总和</p>
                    </div>

                </div>
                <div className={InviteCss.rules}>
                    <div className={InviteCss.rulestitle}>
                        <img src="/static/img/friends-fuli.png" alt=""/>
                    </div>
                    <img style={{margin:'10px auto 0',display:'block'}} src="/static/img/friend-bg.png" alt=""/>
                </div>
                <div className={InviteCss.rules} style={{paddingLeft: '188px'}}>
                    <div className={InviteCss.rulestitle}>
                        <img src="/static/img/rulestitle.png" alt=""/>
                    </div>
                    <div className={InviteCss.rule_detail}>
                        <div className={InviteCss.article}>
                            1、除债转标以外，好友所有投资项目都计算在活动范围之内；
                            <br/>
                            2、若好友投资满足活动要求，奖励将及时发送到您账户中心；
                            <br/>
                            3、被邀请人总待收为所有历史邀请好友的总待收，但佣金只计算11月XX日以后注册的好友的投资额；
                            <br/>
                            4、10元红包1000元起投，限35天以上项目可用，90元红包5000元起投，限90天以上项目可用；
                            <br/>
                            5、如有疑问请致电客服：400-655-8858。(咨询时间：9:00-21:00)。
                            <br/>
                            * 本活动最终解释权在法律范围内归金服所有
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: false
        }
    }

    closelogin = () => {
        this.setState({
            display: false
        })
    }
    openLogin = () => {
        this.setState({
                display: true
            }
        )
    }

    render() {
        let isLogined = this.props.store.userInfo.uid;
        return (
            <div>
                <TopBar isLogined={isLogined} tag={'invite'}></TopBar>
                <Record isLogined={isLogined} openLogin={this.openLogin}/>
                <Method isLogined={isLogined} openLogin={this.openLogin}/>
                <Loginbox display={this.state.display} closelogin={this.closelogin}/>
                <Rules/>
                <Bottom/>
            </div>
        )
    }
}

Invite = connect((store) => ({store: store}))(Invite);

render(<Provider store={store}>
    <Invite/>
</Provider>, document.getElementById('app'))
