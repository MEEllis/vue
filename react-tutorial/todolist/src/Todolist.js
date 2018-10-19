import React,{Component,Fragment} from 'react';
import TodoItem from './TodoItem'
import './style.css'
class Todolist extends Component{
    constructor(props){
        super(props)
        this.state={
            inputValue:'hello!!!',
            list:[
                '学习英文',
                'Learn React'
            ]
        }
        this.handleInputChange=this.handleInputChange.bind(this)
        this.handBtnSubmit=this.handBtnSubmit.bind(this)
        this.handleDel=this.handleDel.bind(this)
    }

    render(){
        return (
            <Fragment>
             <div>
                 <label htmlFor='txtInput'>请输入：</label> 
                 <input 
                    id='txtInput'
                    className='input'
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                 />
                 <button onClick={this.handBtnSubmit}>提交</button>
             </div>
             <div>
                 {this.getTodoItem()}
             </div>
            </Fragment>
        )
    }

    getTodoItem(){
      return this.state.list.map((item,index)=>{
        return (
                <TodoItem 
                key={index}
                content={item} 
                index={index}
                handleDel={this.handleDel}
                />
           )
      })
    }

    handleInputChange(e){
      const inputValue=e.target.value
      this.setState(()=>({ inputValue }))
    }

    handBtnSubmit(){
        this.setState((prevState)=>({ list:[...prevState.list,prevState.inputValue] }))
    }

    handleDel(index){
        this.setState((prevState)=>{ 
           // immutable  state 不允许我们做任何的改变
          const list =[...prevState.list] //拷贝 
          list.splice(index,1)
          return {
            list
          }
        })
    }
}

export default  Todolist;