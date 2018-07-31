import React from 'react'
import {
    Button,
    Form,
    Input,
    Modal,
    Table,
    DatePicker,
    Col,
    Row
} from 'antd'
import Filter, {FilterItem} from '../../Filter/js/Filter'
import '../less/tmallOrders'
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import ShowDetailComponent from '../../showDetailComponent/js/ShowDetailComponent'
import FL from '../../../utils/FL'

const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
let TmallOrdersForm = React.createClass({
    getInitialState() {
        return {visible: false, orderState: '',listForm:FL.LINK.TMALLORDERS}
    },
    componentWillMount(){
        this.props.initialDispatch()

    },
    onOrderStateClick: function(newState) {
        this.setState({orderState: newState});
    },
    handleSubmit() {
        this.props.form.validateFields((err,value)=>{
            if(err){
                return;
            }
            this.props.form.resetFields();
            this.setState({visible:false});
        })
    },
    showModal() {
        this.setState({visible: true})
    },
    hideModal() {
        this.setState({visible: false})
    },
    render() {
        const props = this.props;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const {items} = props
        const dataSource = items.dataSource;
        const listForm = this.state.listForm;

        const columns = [
            {
                title: '天猫订单号',
                dataIndex: 'TmallOrderNum',
                width:200
            }, {
                title: '交易时间',
                dataIndex: 'TradeTime',

            }, {
                title: 'TSC/商品名称',
                dataIndex: 'TscName'
            }, {
                title: '购买数量',
                dataIndex: 'Amount'
            }, {
                title: '总价',
                dataIndex: 'TotalCost'
            }, {
                title: '充值账号',
                dataIndex: 'ChargeAccount'
            }, {
                title: '卡门订单号',
                dataIndex: 'KmOrder'
            }, {
                title: '订单状态',
                dataIndex: 'OrderState'
            }, {
                title: '充值描述',
                dataIndex: 'ChargeDescribe'
            }, {
                title: '游戏/区/服',
                dataIndex: 'GameZone'
            }];

        // if(!items.Data){
        //     return false;
        // }
        // let dataSource = [];
        // items.Data.map(item =>{
        //     let term = {
        //         TmallOrderNum: item.TmallOrderNum,
        //         TradeTime: item.TradeTime,
        //         TscName: item.TscName,
        //         Amount: item.Amount,
        //         TotalCost: item.TotalCost,
        //         ChargeAccount: item.ChargeAccount,
        //         KmOrder: item.KmOrder,
        //         OrderState: item.OrderState,
        //         ChargeDescribe: item.ChargeDescribe,
        //         GameZone: item.GameZone,
        //     };
        //     dataSource.push(term);
        // })

        return (
                <div key="form">
                    <div>
                        <Filter type="default">
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
                                <Modal title="更多筛选条件" width={450} visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                                    <Form horizontal>
                                                <FormItem {...formItemLayout} label="天猫订单号：">

                                                    {getFieldDecorator('tmallOrders')(<Input type="text" autoComplete="off"/>)}
                                                </FormItem>
                                                <FormItem label="卡门订单号：" {...formItemLayout}>
                                                    {getFieldDecorator('kamenOrders')(<Input type="text" autoComplete="off"/>)}
                                                </FormItem>
                                                <FormItem label="天猫TSC：" {...formItemLayout}>
                                                    {getFieldDecorator('tmallTsc')(<Input type="text" autoComplete="off"/>)}
                                                </FormItem>
                                                <FormItem label="商品名称" {...formItemLayout}>
                                                    {getFieldDecorator('merchantName')(<Input type="text" autoComplete="off"/>)}
                                                </FormItem>
                                                <FormItem label="充值账号" {...formItemLayout}>
                                                    {getFieldDecorator('chargeAccount')(<Input type="text" autoComplete="off"/>)}
                                                </FormItem>
                                                <FormItem {...formItemLayout} label="交易时间：">
                                                    {getFieldDecorator('exchangeTime')(
                                                        <RangePicker showTime format="YYYY/MM/DD HH:mm:ss"/>
                                                    )}

                                                </FormItem>
                                    </Form>
                                </Modal>
                            </FilterItem>
                        </Filter>
                        <Button type="primary" style={{marginBottom:20}}>导出为Excel</Button>
                    </div>
                    <Table className="supTransactionBody" columns={columns} dataSource={dataSource||[]} />
                </div>
        )
    }
})
TmallOrdersForm = createForm()(TmallOrdersForm);
const TmallOrders = ({items,initialDispatch}) =>{
    return (
        <TmallOrdersForm items = {items} initialDispatch = {initialDispatch} />
    )
}

export default TmallOrders
