import React, {Component} from 'react';
import {render} from 'react-dom';

class Risk extends Component {
    render() {
        return (
            <div style={{width:'80%',overflow:'hidden', margin:'20px auto', background:'#fff'}}>
                <div style={{border:'1px solid #ccc', padding:'10px', background:'#fff'}}>
                    <div className="xysTop">
                        <p style={{background:'#F00', fontSize:'18px', color:'#fff', height: '40px',lineHeight: '40px',margin: '0', textAlign:'center'}}>风险提示告知书</p>
                    </div>
                    <div style={{overflow:'hidden', marginBottom:'10px'}}>
                        <div style={{paddingLeft:'20px',marginTop: '30px'}} id="first">
                            <p style={{fontWeight:'bold'}}>一、政策风险</p>
                            <p>因国家宏观政策和相关法律法规发生变化，影响金服各类产品项目及服务计划的正常提供。</p>
                            <p style={{fontWeight:'bold'}}>二、信用风险</p>
                            <p>金服不对投资项目本金和收益提供任何保证或承诺。在发生最不利情况下（可能但并不一定发生），可能不利于用户实现项目的预期收益甚至本金遭受损失。</p>
                            <p  style={{fontWeight:'bold'}}>三、市场风险</p>
                            <p>由于市场供求关系、利率变动、资产价值波动等不确定的未来市场变化，在发生最不利情况下（可能但并不一定发生），可能不利于用户实现项目的预期收益甚至本金遭受损失。 </p>
                            <p  style={{fontWeight:'bold'}}>四、信息传递风险</p>
                            <p>金服将按协议约定进行信息披露，用户应充分关注并及时主动查询项目相关信息，如未及时查询，或由于通讯故障、系统故障以及其他不可抗力等因素的影响使得无法及时了解产品信息，由此产生责任和风险应由用户承担。</p>
                            <p style={{fontWeight:'bold'}}>五、促成失败风险</p>
                            <p>本次交易的促成需符合相关法律法规的规定和借款合同的约定，可能存在不能满足成立条件从而导致无法促成交易的风险。</p>
                            <p style={{fontWeight:'bold'}}>六、操作风险</p>
                            <p>1.不可预测或无法控制的系统故障、设备故障、通讯故障、停电等突发事故将有可能给出借人造成一定损失。因上述事故造成交易或交易数据中断，恢复交易时以事故发生前系统最终记录的交易数据为有效数据； </p>
                            <p>2.由于出借人密码失密、操作不当、决策失误、黑客攻击等原因可能会造成出借人损失；</p>
                            <p>3.网上交易热键操作完毕未及时退出，委托他人代理交易，或长期不关注账户变化等致使他人进行恶意操作均将可能造成出借人损失。</p>
                            <p style={{fontWeight:'bold'}}>七、经营风险</p>
                            <p>金服承诺将按照相关法律法规的规定进行运营及管理，但会存在因法律法规根据社会需求调整而无法保证符合相关法律和监管部门的要求的现象。如金服无法继续经营网络借贷信息中介业务或发生重大业务调整，或财产状况发生重大变化，则可能会对出借人产生不利影响。</p>
                            <p style={{fontWeight:'bold'}}>八、提前退出风险</p>
                            <p>在用户投资项目或服务计划存续期间，可能因无匹配的借款项目或金服为保护用户投资本金安全提前退出投资项目或服务计划。</p>
                            <p style={{fontWeight:'bold'}}>九、流动性风险</p>
                            <p>在用户投资后的项目或服务计划存续期内，用户可能不能提前转出资金（具体以服务协议或借款协议约定为准）。</p>
                            <p style={{fontWeight:'bold'}}>十、不可抗力及意外事件风险</p>
                            <p>包括但不限于自然灾害、金融市场危机、战争、黑客攻击、病毒感染等不能预见、不能避免、不能克服的不可抗力事件，对于由于不可抗力及意外事件风险导致的任何损失，用户须自行承担。</p>

                            <p style={{fontWeight:'bold'}}>特别提示：</p>
                            <p>前述风险提示不能穷尽全部风险及市场的全部情形。请用户仔细阅读本风险提示告知书，并独立作出是否接受服务和出借的决定。您已知悉并理解出借的全部风险，并自愿承担由此带来的一切后果。</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

render(<Risk/>,document.getElementById('app'));
