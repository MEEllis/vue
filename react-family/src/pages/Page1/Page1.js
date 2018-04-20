import React, {Component} from 'react';
import './Page1.less';
import  abc from  '../../assets/images/abc.jpg';

export default class Page1 extends Component {
    render() {
        return (
            <div className="page-box">
                this is page1~
                <img src={abc}/>
            </div>
        )
    }
}