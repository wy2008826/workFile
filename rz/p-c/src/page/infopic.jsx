import React,{Component} from 'react';
import {render} from 'react-dom';

class Infopic extends Component{
    render(){
        return (
            <img src="/static/img/infopic1.jpg" alt="" style={{width:'1000px',height:'699px',margin:'0 auto',marginTop:'30px',display:'block'}}/>
        )
    }
}

render(<Infopic/>,document.getElementById('app'))