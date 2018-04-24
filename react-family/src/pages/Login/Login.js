import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postLogin} from "../../redux/actions/login";
import Login from "components/Login/index";


class LoginPage extends Component {


    handleSubmit  = (err, values) => {
        if(err){
            return;
        }
        const {props,state} = this;
        const {userName,password} = values;
        props.postLogin({userName,password},(dispatch,getState,response)=>{
            props.history.push('/page1')
        })

    }
   
    //在完成首次渲染之前调用，此时仍可以修改组件的state。
    componentWillMount(){
        console.log('-------------------------------------------------------------------->componentWillMount')
    }
    //必选的方法，创建虚拟DOM，该方法具有特殊的规则：
    render() {
        console.log('-------------------------------------------------------------------->render')
        return (
            <Login onSubmit={this.handleSubmit}></Login>
        )
    }
    //真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。
    componentDidMount(){
        console.log('-------------------------------------------------------------------->componentDidMount')
    }
    //组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state。
    componentWillReceiveProps(nextProps){
        console.log('-------------------------------------------------------------------->componentWillReceiveProps')
    }
    //组件是否应当渲染新的props或state，返回false表示跳过后续的生命周期方法，通常不需要使用以避免出现bug。
    //在出现应用的瓶颈时，可通过该方法进行适当的优化。在首次渲染期间或者调用了forceUpdate方法后，该方法不会被调用
    shouldComponentUpdate(){
        console.log('-------------------------------------------------------------------->shouldComponentUpdate')
    }
    //接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state。
    componentWillUpdate(){
        console.log('-------------------------------------------------------------------->componentWillUpdate')
    }

    //完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
    componentDidUpdate(){
        console.log('-------------------------------------------------------------------->componentDidUpdate')
    }

    //组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器
    componentWillUnmount(){
        console.log('-------------------------------------------------------------------->componentWillUnmount')
    }
}

export default connect((state) => ({login: state.login}), {postLogin})(LoginPage);