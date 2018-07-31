import React from 'react'
import {Form,Input,Modal,Table,DatePicker,Col,Row} from 'antd'
import Filter,{FilterItem} from '../../Filter/js/Filter'
import '../less/tmallSales'
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import ShowDetailComponent from '../../../containers/ShowDetailComponent'
import FL from '../../../utils/FL'


const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

let TmallSalesForm = React.createClass({
    getInitialState(){
        return {visible:false,orderState:'',listForm:FL.LINK.TMALLSALES}
    },
    componentWillMount(){
        this.props.initialDispatch()

    },
    onOrderStateClick:function(newState){
        this.setState({
            orderState:newState
        });
    },
    handleSubmit(){
        this.props.form.validateFields((err,value)=>{
            if(err){
                return;
            }
            this.props.form.resetFields();
            this.setState({visible:false});
        })
    },
    showModal(){
        this.setState({visible:true})
    },
    hideModal(){
        this.setState({visible:false})
    },
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{span:8},
            wrapperCol:{span:16}
        }
        const props = this.props;
        const {items} = props;
        const listForm = this.state.listForm;
        const dataSource = items.dataSource;
        const columns =[{
                title:'卡门网订单号',
                dataIndex:'Code',
                width:150,
                fixed:'left',
                render:text =><ShowDetailComponent text={text} orderNum = {text}/>
            },{
                title:'外部订单号',
                dataIndex:'ExternalOrderNumber',
                width:150,
                fixed:'left'
            },{
                title:'商品名称',
                dataIndex:'Name'
            },{
                title:'数量',
                dataIndex:'Amount'
            },{
                title:'单价',
                dataIndex:'Price'
            },{
                title:'金额',
                dataIndex:'OrderPrice'
            },{
                title:'云接口商户',
                dataIndex:'ConsumerCode'
            },{
                title:'云接口编号',
                dataIndex:'ConsumerName'
            },{
                title:'充值账号',
                dataIndex:'RechargeTo'
            },{
                title:'订单客户',
                dataIndex:'OrderFromCode'
            },{
                title:'下单时间',
                dataIndex:'OrderTime',
            },{
                title:'成本',
                dataIndex:'TotalCost'
            },{
                title:'利润',
                dataIndex:'Profit'
            },{
                title:'订单状态',
                dataIndex:'Status',
                width:80,
                fixed:'right'
            }];
        return (
                <div key = "form" >
                    <Filter
                        type="default">
                        <FilterItem label="订单状态">
                            <ul>
                                {
                                    listForm.orderStatus.map((list,index)=>{
                                        return <li key={index}><AlinkComponent showClass={index+1} selectState={this.state.orderState}  callbackAlink={this.onOrderStateClick} text={list}/ >
                                            </li>
                                        })
                                }
                            </ul>
                        </FilterItem>
                        <FilterItem label="其它">
                            <a href="javascript:;" onClick={this.showModal}>更多筛选条件</a>
                            <Modal title="更多筛选条件" width={830} visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                                <Form horizontal>
                                    <Row gutter={16}>
                                        <Col sm={12}>
                                            <FormItem  {...formItemLayout} label="卡门网订单编号">

                                                {getFieldDecorator('orderNumber')(
                                                    <Input type="text" autoComplete="off" />
                                                )}
                                            </FormItem>
                                            <FormItem label="客户编号" {...formItemLayout}>
                                                {getFieldDecorator('guestNum')(
                                                    <Input type="text" autoComplete="off" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col sm={12}>
                                            <FormItem label="充值账号" {...formItemLayout}>
                                                {getFieldDecorator('chargeAccount')(
                                                    <Input type="text" autoComplete="off" />
                                                )}
                                            </FormItem>
                                            <FormItem label="商品编号" {...formItemLayout}>
                                                {getFieldDecorator('productNumber')(
                                                    <Input type="text" autoComplete="off" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col sm={12}>
                                            <FormItem label="商品名称" {...formItemLayout}>
                                                {getFieldDecorator('productName')(
                                                    <Input type="text" autoComplete="off" />
                                                )}
                                            </FormItem>
                                            <FormItem  {...formItemLayout} label="交易时间：">
                                                {
                                                    getFieldDecorator('exchangeTime')(
                                                        <RangePicker showTime format="YYYY/MM/DD HH:mm:ss"/>

                                                    )
                                                }
                                            </FormItem>

                                        </Col>
                                        <Col sm={12}>
                                            <FormItem label="外部订单号：" {...formItemLayout}>
                                                {getFieldDecorator('outerOrder')(
                                                    <Input type="text" autoComplete="off" />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col sm={12}>
                                            <FormItem label="云接口客户/编号：" {...formItemLayout}>
                                                {getFieldDecorator('cloudGuestOrder')(
                                                    <Input type="text" autoComplete="off" />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Row>
                                </Form>
                            </Modal>
                        </FilterItem>
                    </Filter>
                    <Table className="supTransactionBody" columns={columns} dataSource={dataSource||[]} scroll={{x:1400}}/>
                </div>

        )
    }
})
TmallSalesForm = createForm()(TmallSalesForm);
const TmallSales = ({items,initialDispatch}) =>{
    return (
        <TmallSalesForm items = {items} initialDispatch = {initialDispatch} />
    )
}
export default TmallSales
