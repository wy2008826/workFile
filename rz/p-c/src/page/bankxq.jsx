import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import infoCss from "@/assets/css/information.scss";

class Bank extends Component {
    render() {
        return (
            <div>
                <div className="cg_pic1 cg_pic1_bg"></div>
                <div className="cg_pic2 cg_pic2_bg"></div>
                <div className="cg_pic3 cg_pic3_bg"></div>
                <div className="cg_pic4 cg_pic4_bg"></div>
                <div className="cg_pic5 cg_pic5_bg"></div>
                <div className="cg_pic6 cg_pic6_bg"></div>
                <div className="cg_pic7 cg_pic7_bg"></div>
            </div>
        )
    }
}

render(<Bank/>, document.getElementById('app'));