import React,{Fragment} from 'react'
import { Input,List,Button } from 'antd';

const TodolistUI=(props)=> {
        return (
        <Fragment>
            <div>
                <Input value={props.inputValue}  onChange={props.handleInputChange} placeholder="请输入值" style={{width:'300px'}} />
                <Button type="primary"  onClick={props.handBtnSubmit}>提交</Button>
                <List
                size="small"
                style={{width:'300px',marginTop:'10px'}}
                bordered
                dataSource={props.list}
                renderItem={(item,index) => (<List.Item key={index} onClick={props.handleDel.bind(this,index)}>{item}</List.Item>)}
                />
            </div>
           </Fragment>
           )
   
}

export default TodolistUI