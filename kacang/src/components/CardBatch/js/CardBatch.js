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
                    <FormItem {...formItemLayout} label="面值">
                        {getFieldDecorator('faceValue')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="批次号">
                        {getFieldDecorator('batchNumber')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="生成时间">
                        {getFieldDecorator('generateTime')(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
        title: '一卡通类型',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: '卡号',
        dataIndex: 'cardNumber',
        key: 'cardNumber'
    },
    {
        title: '卡密',
        dataIndex: 'cardPassword',
        key: 'cardPassword'
    },
    {
        title: '归属客户',
        dataIndex: 'customer',
        key: 'customer'
    },
    {
        title: '面值',
        dataIndex: 'faceValue',
        key: 'faceValue'
    },
    {
        title: '余额',
        dataIndex: 'balance',
        key: 'balance'
    },
    {
        title: '有效状态',
        dataIndex: 'validState',
        key: 'validState'
    },
    {
        title: '使用状态',
        dataIndex: 'useState',
        key: 'useState'
    },
    {
        title: '有效期',
        dataIndex: 'validTime',
        key: 'validTime'
    },
    {
        title: '批次号',
        dataIndex: 'batchNumber',
        key: 'batchNumber'
    },
    {
        title: '导卡人',
        dataIndex: 'importer',
        key: 'importer'
    },
    {
        title: '生成时间',
        dataIndex: 'generateTime',
        key: 'generateTime'
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
    onSelect: (record, selected, selectedRows) => {
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
    }),
}

const CardBatch = React.createClass({
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
                    <FilterItem label="其它">
                        <ul>
                            <li><a href="javascript:;" onClick={this.showModal}>更多筛选条件</a></li>
                        </ul>
                    </FilterItem>
                </Filter>
                <div className="filter filter-operation">
                    <Button type="primary">立即失效</Button>
                    <Button type="default">立即生效</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    fixed={true}
                    rowSelection={rowSelection}
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

export default CardBatch
