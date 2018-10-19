import React , {Component} from 'react'
import PropTypes from 'prop-types'

class TodoItem extends Component{
    constructor(props){
        super(props)
        this.handleDel=this.handleDel.bind(this)
    }
    render(){
        const {content}=this.props
        return (
            <div onClick={this.handleDel}>{content}</div>
        )
    }
    handleDel(){
        const {handleDel,index}=this.props
        handleDel(index)
    }
}

TodoItem.propTypes={
  content:PropTypes.string,
  index:PropTypes.number,
  handleDel:PropTypes.func,
}


export default TodoItem;