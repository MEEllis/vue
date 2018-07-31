import React, { PropTypes } from 'react'
import {
    Col,
    Row,
    Form,
    Input,
    DatePicker,
    Button,
    Modal,
    Table,
} from 'antd'
import Filter, { FilterItem } from '../../Filter/js/Filter'


const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;


let MoreFilterModal = React.createClass({
    getInitialState() {
        return {
            visible: true
        };
    },
    showModal() {
        this.setState({visible: true});
    },
    hideModal() {
        this.setState({visible: false});
    },
    handleSubmit() {
        this.hideModal();
    },
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 20
            }
        };

        return (
            <Modal
                title="更多筛选条件"
                 visible={this.state.visible}
                 onOk={this.handleSubmit}
                 onCancel={this.hideModal}
                 okText='筛选'
                >
                <Form horizontal>
                    <FormItem {...formItemLayout} label="订单编号">
                        {getFieldDecorator('orderNumber')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="一卡通卡号">
                        {getFieldDecorator('cardNumber')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="交易时间">
                        {getFieldDecorator('time')(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="商品名称">
                        {getFieldDecorator('commodityName')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="商品编号">
                        {getFieldDecorator('commodityNumber')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="一卡通客户">
                        {getFieldDecorator('customer')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
})
MoreFilterModal = createForm()(MoreFilterModal);


// 数据源
const dataSource = [{}];
// 表头
const columns = [
    {
        title: '卡门网订单号',
        dataIndex: 'orderNumber',
        key: 'orderNumber'
    },
    {
        title: '一卡通类型',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: '一卡通卡号',
        dataIndex: 'cardNumber',
        key: 'cardNumber'
    },
    {
        title: '商品名称',
        dataIndex: 'commodityName',
        key: 'commodityName'
    },
    {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount'
    },
    {
        title: '金额',
        dataIndex: 'sum',
        key: 'sum'
    },
    {
        title: '一卡通利润',
        dataIndex: 'profit',
        key: 'profit'
    },
    {
        title: '操作',
        dataIndex: 'handle',
        render: (text, record) => (
            <ul>
                <li><a href="#">修改</a></li>
                <li><a href="#">删除</a></li>
            </ul>
        ),
        width: '10%'
    },
];


const CardConsumption = React.createClass({
    render () {
        const { props } = this;

        return (
            <div>
                <Filter type="default">
                    <FilterItem label="一卡通类型">
                        <ul>
                            <li><a href="#">全部</a></li>
                            <li><a href="#">兑换卡</a></li>
                            <li><a href="#">礼品卡</a></li>
                        </ul>
                    </FilterItem>
                    <FilterItem label="商品类型">
                        <ul>
                            <li><a href="#">全部</a></li>
                            <li><a href="#">卡密</a></li>
                            <li><a href="#">卡密直储</a></li>
                            <li><a href="#">在线直储</a></li>
                            <li><a href="#">手工代充</a></li>
                        </ul>
                    </FilterItem>
                    <FilterItem label="订单状态">
                        <ul>
                            <li><a href="#">全部</a></li>
                            <li><a href="#">未处理</a></li>
                            <li><a href="#">处理中</a></li>
                            <li><a href="#">可疑订单</a></li>
                            <li><a href="#">交易成功</a></li>
                            <li><a href="#">交易失败</a></li>
                        </ul>
                    </FilterItem>
                    <FilterItem label="其它">
                        <ul>
                            <li><a href="javascript:;" onClick={this.showModal}>更多筛选条件</a></li>
                        </ul>
                    </FilterItem>
                </Filter>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    fixed={true}
                    pagination={{
                        defaultCurrent: 1,  // 默认的当前页数
                        defaultPageSize: 20,    // 默认的每页条数
                        current: 1,    // 当前页数
                        pageSize: 20,   // 每页条数
                        total: 500, // 数据总数
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30', '40', '50']
                    }}
                    />

                <MoreFilterModal />
            </div>
        )
    }
})

export default CardConsumption
