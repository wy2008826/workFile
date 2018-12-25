import React, {Component} from "react";
import {connect} from "react-redux";

import Css from "@/components/TopBanner/TopBanner.scss";

import {setMsg} from "@/store/store.js";


import swiper from "@/assets/js/idangerous.swiper.js"

import OpenCunGuanDialog from  "@/components/OpenCunGuanDialog/index.jsx"


class TopBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOpen: false
        }
    }

    componentDidUpdate() {
        if (this.props.bannerList.length && !this.banner) {
            this.banner = new swiper(".swiper-container", {
                pagination: '.pagination',
                loop: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
                paginationClickable: true
            });
        }
    }

    showOpen() {
        this.setState({
            showOpen: true
        })
    }

    render() {
        const banner = !!this.props.bannerList.length && this.props.bannerList.map((v, i) =>
                <div key={i} className="swiper-slide slide1">
                    <a href={`${v.linkurl}?uid=${this.props.store.userInfo.uid}`}>
                        <img src={v.imgUrl}/>
                    </a>
                </div>
            )
        const income=this.props.income.toFixed(2);
        const num=income.split('.')
        return (
            <div className="device">
                {this.props.store.userInfo.realNameStatus != 1 && <OpenCunGuanDialog show={this.state.showOpen}/>}
                <div className="incomebox">
                    {this.props.store.userInfo.token ? <div className={Css.income}>
                        <p className={Css.incomename}>尊敬的用户{this.props.store.userInfo.userName || ''}，您好！</p>
                        <p className={Css.incometoday}>个人收益（元）</p>
                        <p className={Css.incomenum}>{num[0]}<span>.{num[1]}</span></p>
                        <div className={Css.button}><a href="/projectList.html">立即投资</a></div>
                        {this.props.store.userInfo.realNameStatus == 1 ?
                            <a className={Css.chongzhi} href="/member/index.html#/recharge">充值</a> :
                            <a className={Css.chongzhi} href="javascript:void(0)" onClick={() => {
                                this.showOpen()
                            }}>充值</a>}
                    </div> : <div className={Css.income}>
                        <p className={Css.incometoday} style={{marginTop: 10}}>预期最高年化收益率</p>
                        <p className={Css.incomenum} style={{fontSize: '72px',margin: '50px 0px 60px 0px',lineHeight: '50px'}}>15<span>.0%</span></p>
                        {/*<div className={Css.button}><a target="_blank" href="/register.html">注册即送1228元+加息券</a></div>*/}
                        <div className={Css.button}><a target="_blank" href="https://www.51rz.com/ind/register.html">注册即送1228元+加息券</a></div>
                        <a href="/login.html" className={Css.chongzhi} style={{padding: '0 35px', textAlign: 'right',fontSize:'14px'}}>立即登录</a>
                    </div>}
                </div>
                <div className="swiper-container" style={{cursor:'pointer'}}
                     onMouseEnter={() => {
                         this.banner&&this.banner.stopAutoplay();
                     }}
                     onMouseLeave={()=>{
                         this.banner&&this.banner.startAutoplay();
                     }}
                >
                    <div className="swiper-wrapper">
                        {banner}
                    </div>
                    <div className="pagination"></div>
                </div>
            </div>
        );
    }
}

TopBanner = connect((store) => ({store: store}))(TopBanner);

export default TopBanner;