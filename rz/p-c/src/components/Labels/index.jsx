import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from 'react-router'
import Css from "./index.scss";

import store from "@/store/store.js";

class Labels extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillReceiveProps(props){
        // alert(props.activeIndex);
    }
    selectItem(e,i,label){
        const {onCurrentChange=()=>{}}=this.props;
        onCurrentChange(i,label,e);
    }
    render(){
        let {activeIndex=0,labels,style={}}=this.props;
        let self=this;
        const labelsLists=labels.map((label,index)=>{
            const {style={}}=label;
            return (
                <li onClick={(e,arg1,arg2)=>{self.selectItem(e,index,label)}}
                    key={index}
                    className={index==activeIndex?Css.active:''}
                    style={style}
                >
                    {label.text}
                </li>
            )
        })
        return (
            <ul style={style} className={Css.labels}>{labelsLists}</ul>
        );
    }
}
Labels = connect((store) => ({store}))(Labels);
export default withRouter(Labels);