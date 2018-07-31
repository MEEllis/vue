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
        title: '分类',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort'
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


const CardCategory = React.createClass({
    render () {
        const { props } = this;

        return (
            <div>
                <div className="filter filter-operation">
                    <Button type="primary">新增分类</Button>
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

                <MoreFilterModal />
            </div>
        )
    }
})

export default CardCategory
