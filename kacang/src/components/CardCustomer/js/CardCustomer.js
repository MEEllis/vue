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


let AddCustomer = React.createClass({
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
                title="新增客户"
                 visible={this.state.visible}
                 onOk={this.handleSubmit}
                 onCancel={this.hideModal}
                 okText='新增'
                >
                <Form horizontal>
                    <FormItem {...formItemLayout} label="客户名称">
                        {getFieldDecorator('name')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="客户邮箱">
                        {getFieldDecorator('email')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="客户手机号">
                        {getFieldDecorator('mobile')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="采购折扣">
                        {getFieldDecorator('discount')(
                            <Input type="text" autoComplete="off"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
})
AddCustomer = createForm()(AddCustomer);


// 数据源
const dataSource = [{}];
// 表头
const columns = [
    {
        title: '客户名称',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '收卡邮箱',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: '收卡手机',
        dataIndex: 'mobile',
        key: 'mobile'
    },
    {
        title: '采购折扣',
        dataIndex: 'discount',
        key: 'discount'
    },
    {
        title: '操作',
        dataIndex: 'handle',
        render: (text, record) => (
            <ul>
                <li><a href="#">修改</a></li>
            </ul>
        ),
        width: '10%'
    },
];

const CardCustomer = React.createClass({
    render () {
        const { props } = this;

        return (
            <div>
                <div className="filter filter-operation">
                    <Button type="primary">新增客户</Button>
                </div>
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

                <AddCustomer />
            </div>
        )
    }
})

export default CardCustomer
