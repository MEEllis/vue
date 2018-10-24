import React,{Component} from 'react';
import {connect} from 'react-redux'
import  {getInputChange,getAddItem,getDelItem} from './store/actionCreator'
import TodolistUI from './TodolistUI'

class Todolist extends Component{
    render(){
        return (
           <TodolistUI
           inputValue={this.props.inputValue}
           list={this.props.list}
           handleInputChange={this.props.handleInputChange}
           handBtnSubmit={this.props.handBtnSubmit}
           handleDel={this.props.handleDel}
           />
        )
    }
}

// store 的数据 映射到  当前组件的哪一个props 属性上
const mapStateToProps=(state)=>{
    return {
        inputValue:state.inputValue,
        list:state.list
    }
}
// store 的action 映射到  当前组件的哪一个props 属性上
const mapDispatchToProps=(dispatch)=>{
    return {
        handleInputChange:(e)=>{
            dispatch(getInputChange(e.target.value))
        },
        handBtnSubmit(){
            dispatch(getAddItem())
        },
        handleDel(index){
            dispatch(getDelItem(index))
        }
    }
}

export default  connect (mapStateToProps,mapDispatchToProps)(Todolist);