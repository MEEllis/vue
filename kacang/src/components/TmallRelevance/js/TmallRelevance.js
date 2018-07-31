import React from 'react'
import {
    Button,
    Form,
    Input,
    Modal,
    Table,
    Col,
    Row
} from 'antd'
import Filter, {FilterItem} from '../../Filter/js/Filter'
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import ShowDetailComponent from '../../showDetailComponent/js/ShowDetailComponent'
// import 'antd/dist/antd.css'
import '../less/tmallRelevance'
import FL from '../../../utils/FL'
import { v4 } from 'node-uuid'

const createForm = Form.create;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;



let TmallRelevanceForm = React.createClass({
    getInitialState() {
        return {visible: false, orderState: '',addTscModal:false,listForm:FL.LINK.TMALLRELEVANCE}
    },
    componentWillMount(){
        this.props.initialDispatch()
    },
    onOrderStateClick: function(newState) {
        this.setState({orderState: newState});
    },
    handleSubmitTscModal() {
        this.props.form.validateFields((err,values)=>{
            if(err){
                return;
            }
            this.props.form.resetFields();
            this.setState({addTscModal:false});
            this.setState({visible:false});
        })
    },
    showModal() {
        this.setState({visible: true})
    },
    showAddTscModal() {
        this.setState({addTscModal: true})
    },
    hideModal() {
        this.setState({visible: false})
    },
    hideAddTscModal() {
        this.setState({addTscModal: false})
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
        // const columns = [{
        //     key:'name',
        //     title: 'Name',
        //     dataIndex: 'name',
        //     render: text => <a href="#">{text}</a>,
        // }, {
        //     key:'age',
        //
        //   title: 'Age',
        //   dataIndex: 'age',
        // }, {
        //     key:'address',
        //
        //     title: 'Address',
        //     dataIndex: 'address',
        // }];
        // const data = [{
        //   key: '111111',
        //   name: 'John Brown',
        //   age: 32,
        //   address: 'New York No. 1 Lake Park',
        // }, {
        //   key: '222222',
        //   name: 'Jim Green',
        //   age: 42,
        //   address: 'London No. 1 Lake Park',
        // }, {
        //   key: '3',
        //   name: 'Joe Black',
        //   age: 32,
        //   address: 'Sidney No. 1 Lake Park',
        // }, {
        //   key: '4',
        //   name: 'Disabled User',
        //   age: 99,
        //   address: 'Sidney No. 1 Lake Park',
        // }];
        const rowSelection = {
            type : 'radio',
            onChange: (selectedRowKeys, selectedRows) => {

            },
            onSelect: (record, selected, selectedRows) => {
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
            },
            // getCheckboxProps: record => ({
            //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
            // })
        };
        const {items} = props;
        const listForm = this.state.listForm;

        const columns =[{

            title:'TSC',
            dataIndex:'Tsc',
            width:200
        },{
            title:'面值',
            dataIndex:'FaceValue',
        },{
            title:'商品名称',
            dataIndex:'CommodityName'
        },{
            title:'状态',
            dataIndex:'Status'
        },{
            title:'对接商品编号',
            dataIndex:'ConnectCommodityNumber'
        },{
            title:'对接商品名称',
            dataIndex:'ConnectCommodityName'
        },{
            title:'销售价',
            dataIndex:'SellPrice'
        },{
            title:'厂商',
            dataIndex:'Manufacturers'
        },{
            title:'操作',
            dataIndex:'option'
        }];
        let dataSource = items.dataSource;

        return (
                <div >
                    <div>
                        <Filter type="default">
                            <FilterItem label="对接状态">

                                <ul>
                                    {
                                        listForm.connectStatus.map((list,index)=>{
                                            return <li key={index}><AlinkComponent showClass={index+1} selectState={this.state.orderState}  callbackAlink={this.onOrderStateClick} text={list}/ >
                                                </li>
                                            })
                                    }
                                </ul>
                            </FilterItem>
                            <FilterItem label="其它">
                                <a href="javascript:;" onClick={this.showModal}>更多筛选条件</a>
                                <Modal title="更多筛选条件" visible={this.state.visible} onOk={this.handleSubmitTscModal} onCancel={this.hideModal}>
                                    <Form horizontal>
                                        <FormItem {...formItemLayout} label="天猫TSC">
                                            {getFieldDecorator('tmallTscSelect')(<Input type="text" autoComplete="off"/>)}
                                        </FormItem>
                                        <FormItem label="商品名称" {...formItemLayout}>
                                            {getFieldDecorator('merchant')(<Input type="text" autoComplete="off"/>)}
                                        </FormItem>
                                        <FormItem label="对接商品编号" {...formItemLayout}>
                                            {getFieldDecorator('orderNum')(<Input type="text" autoComplete="off"/>)}
                                        </FormItem>
                                    </Form>
                                </Modal>
                            </FilterItem>
                        </Filter>
                        <ButtonGroup style={{marginBottom:20}}>
                            <Button type="primary" onClick={this.showAddTscModal}>添加TSC</Button>
                                <Modal title="添加TSC" visible={this.state.addTscModal} onOk={this.handleSubmitTscModal} onCancel={this.hideAddTscModal}>
                                    <Form horizontal>
                                        <FormItem {...formItemLayout} label="天猫TSC">
                                            {getFieldDecorator('tmallTsc')(<Input type="text" autoComplete="off"/>)}
                                        </FormItem>
                                        <FormItem label="面值" {...formItemLayout}>
                                            {getFieldDecorator('faceValue')(<Input type="text" autoComplete="off"/>)}
                                        </FormItem>
                                        <FormItem label="商品名称" {...formItemLayout}>
                                            {getFieldDecorator('merchantName')(<Input type="text" autoComplete="off"/>)}
                                        </FormItem>
                                        <FormItem label="厂商" {...formItemLayout}>
                                            {getFieldDecorator('manufactures')(<Input type="text" autoComplete="off"/>)}
                                        </FormItem>
                                    </Form>
                                </Modal>
                            <Button type="ghost">批量对接商品</Button>
                            <Button type="ghost">断开链接</Button>
                            <Button type="ghost">恢复对接</Button>
                            <Button type="ghost">批量删除TSC</Button>
                        </ButtonGroup>
                    </div>

                    <Table className="supTransactionBody"  rowSelection={rowSelection} columns={columns}  dataSource={dataSource} />
                </div>


        )
    }
})
TmallRelevanceForm = createForm()(TmallRelevanceForm);

const TmallRelevance = ({items,initialDispatch}) =>{
    return (
        <TmallRelevanceForm items = {items} initialDispatch = {initialDispatch} />
    )
}

export default TmallRelevance
