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

import Icon, {
    iAdd,
    iDelete,
    iEdit,
    iView,
    iImport,
    iExport,
    iEnabled,
    iDisabled,
    iShelve,
    iUnshelve,
    iConnect,
    iUnconnect,
    iConnectRecover,
    iSetting,
    iRelevance,
    iViewList,
    iComplain,
    iApply,
    iBatch,
    iPost,
    iPostTo,
} from '../../Icon/js/Icon'
import '../less/cardType.less'

const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;


let MoreFilterModal = React.createClass({
    getInitialState() {
        return {
            visible: false
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
                    <FormItem {...formItemLayout} label="发行时间">
                        {getFieldDecorator('time')(
                            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
})
MoreFilterModal = createForm()(MoreFilterModal);

// let AddFaceValue = React.createClass({
//
// })
// AddFaceValue = createForm()(AddFaceValue);


// 数据源
const dataSource = [{}];
// 表头
const columns = [
    {
        title: '一卡通编号',
        dataIndex: 'number',
        key: 'number'
    },
    {
        title: '一卡通类型',
        dataIndex: 'type',
        key: 'type'
    },
    {
        title: '面值',
        dataIndex: 'faceValue',
        key: 'faceValue'
    },
    {
        title: '有效数量',
        dataIndex: 'validNumber',
        key: 'validNumber'
    },
    {
        title: '总数量',
        dataIndex: 'totalNumber',
        key: 'totalNumber'
    },
    {
        title: '操作',
        dataIndex: 'handle',
        render: (text, record) => (
            <ul>
                <li><a href="#">查看</a></li>
                <li><a href="#">查看批次</a></li>
                <li><a href="#">发行一卡通</a></li>
                <li><a href="#">删除</a></li>
            </ul>
        ),
        width: '10%'
    },
];

const CardType = React.createClass({
    render () {
        const { props } = this;

        return (
            <div>
                <ul className="view-icon">
                    <li>
                        <Icon glyph={iAdd} />
                        <div>增加</div>
                    </li>
                    <li>
                        <Icon glyph={iDelete} />
                        <div>删除</div>
                    </li>
                    <li>
                        <Icon glyph={iEdit} />
                        <div>编辑</div>
                    </li>
                    <li>
                        <Icon glyph={iView} />
                        <div>查看</div>
                    </li>
                    <li>
                        <Icon glyph={iImport} />
                        <div>导入</div>
                    </li>
                    <li>
                        <Icon glyph={iExport} />
                        <div>导出</div>
                    </li>
                    <li>
                        <Icon glyph={iEnabled} />
                        <div>启用</div>
                    </li>
                    <li>
                        <Icon glyph={iDisabled} />
                        <div>禁用</div>
                    </li>
                    <li>
                        <Icon glyph={iShelve} />
                        <div>上架</div>
                    </li>
                    <li>
                        <Icon glyph={iUnshelve} />
                        <div>下架</div>
                    </li>
                    <li>
                        <Icon glyph={iConnect} />
                        <div>对接</div>
                    </li>
                    <li>
                        <Icon glyph={iUnconnect} />
                        <div>断开对接</div>
                    </li>
                    <li>
                        <Icon glyph={iConnectRecover} />
                        <div>恢复对接</div>
                    </li>
                    <li>
                        <Icon glyph={iSetting} />
                        <div>设置</div>
                    </li>
                    <li>
                        <Icon glyph={iRelevance} />
                        <div>关联</div>
                    </li>
                    <li>
                        <Icon glyph={iViewList} />
                        <div>列表视图</div>
                    </li>
                    <li>
                        <Icon glyph={iComplain} />
                        <div>投诉</div>
                    </li>
                    <li>
                        <Icon glyph={iApply} />
                        <div>申请</div>
                    </li>
                    <li>
                        <Icon glyph={iBatch} />
                        <div>批量处理</div>
                    </li>
                    <li>
                        <Icon glyph={iPost} />
                        <div>发布到新商品</div>
                    </li>
                    <li>
                        <Icon glyph={iPostTo} />
                        <div>发布到已有商品</div>
                    </li>
                </ul>

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
                    <Button type="primary">新增面值</Button>
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
                {/* <AddFaceValue /> */}
            </div>
        )
    }
})

export default CardType
