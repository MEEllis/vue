import React from 'react'
import {Button,Form,Input,Modal,Table,Tabs,DatePicker,Col,Row} from 'antd'

const createForm = Form.create;
const FormItem = Form.Item;

let TmallShopChangeMessageForm = Form.create()(
    (props)=>{
        const {visible,onCancel,onOk,form,propsValue} = props;
        const {getFieldDecorator} = form;
        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        }
        return(
                <Modal title="修改用户信息" visible={visible}  onCancel={onCancel} onOk={onOk} width={600}>
                    <Form horizontal>
                        <FormItem {...formItemLayout} label="店铺名称：">
                            {
                                getFieldDecorator('shopName',{
                                    initialValue:propsValue[0]
                                })(<Input type="text" autoComplete="off" />)
                            }
                        </FormItem>
                        <FormItem label="TOP分配给应用的AppKey：" {...formItemLayout}>
                            {
                                getFieldDecorator('appKey',{
                                    initialValue:propsValue[1]
                                })(<Input type="text" autoComplete="off" />)
                            }
                        </FormItem>
                        <FormItem label="TOP分配给应用的AppSecret：" {...formItemLayout}>
                            {
                                getFieldDecorator('appSecret',{
                                    initialValue:propsValue[2]
                                })(<Input type="text" autoComplete="off" />)
                            }
                        </FormItem>
                        <FormItem label="授权码AccessToken" {...formItemLayout}>
                            {
                                getFieldDecorator('accessToken',{
                                    initialValue:propsValue[3]
                                })(<Input type="text" autoComplete="off"/>)
                            }
                        </FormItem>

                    </Form>
                </Modal>
        )
    }
);
TmallShopChangeMessageForm = createForm()(TmallShopChangeMessageForm);

const TmallShopChangeMessage = React.createClass({
    getInitialState(){
        return {detailVisible:false}
    },
    showDetailVisible(){
        this.setState({detailVisible:true})
    },
    hideDetailVisible(){
        this.setState({detailVisible:false})
    },
    handleSubmit(){
        const form = this.form;
        form.validateFields((err,values)=>{
            if(!err){
            }
            form.resetFields();
            this.setState({detailVisible:false});
        });
    },
    saveFormRef(form) {
        this.form = form;
    },
    render(){

        return (
            <div>
                <p  style={{marginBottom:6}}>
                    <a href="javascript:;"  onClick={this.showDetailVisible}>修改</a>
                </p>
                <TmallShopChangeMessageForm
                    ref={this.saveFormRef}
                     visible={this.state.detailVisible} onCancel={this.hideDetailVisible}
                    onOk={this.handleSubmit}
                    propsValue={this.props.propsValue}
                />
            </div>
        )
    }

})
export default TmallShopChangeMessage
