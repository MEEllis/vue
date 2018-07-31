import React, { PropTypes } from 'react'
import { Link } from 'react-router'
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
        title: '卡门网商品编号',
        dataIndex: 'number',
        key: 'number'
    },
    {
        title: '兑换比率',
        dataIndex: 'rate',
        key: 'rate'
    },
    {
        title: '兑换价格',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: '归属类目',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: '操作',
        dataIndex: 'handle',
        render: (text, record) => (
            <ul>
                <li><a href="#">查看</a></li>
            </ul>
        ),
        width: '10%'
    },
];


const CardExchange = React.createClass({
    render () {
        const { props } = this;

        return (
            <div>
                <Filter type="default">
                    <FilterItem label="商品分类">
                        <ul>
                            <li><a href="#">全部</a></li>
                        </ul>
                    </FilterItem>
                    <FilterItem>
                        <ul>
                            <li><a href="#">全部</a></li>
                        </ul>
                    </FilterItem>
                    <FilterItem>
                        <ul>
                            <li><a href="#">全部</a></li>
                        </ul>
                    </FilterItem>
                    <FilterItem label="上下架状态">
                        <ul>
                            <li><a href="#">全部</a></li>
                            <li><a href="#">上架</a></li>
                            <li><a href="#">下架</a></li>
                        </ul>
                    </FilterItem>
                    <FilterItem label="其它">
                        <ul>
                            <li><a href="javascript:;" onClick={this.showModal}>更多筛选条件</a></li>
                        </ul>
                    </FilterItem>
                </Filter>
                <div className="filter filter-operation">
                    <Link className="ant-btn ant-btn-primary" to="/product/card/exchange/category">类目配置</Link>
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

export default CardExchange
