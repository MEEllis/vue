import React, {Component} from 'react'
import { DateRange } from '../../../utils/component'
import {
    Tabs,
    Select,
    Col,
    Form,
    Row,
    Input,
    Button,
    Table,
    Modal,
    Spin
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RangePicker = DateRange;

class ApiRemittanceList extends React.Component {
    constructor(props) {
        let nowTime = new Date();
        let time=nowTime.getHours()+':'+nowTime.getMinutes()+':'+nowTime.getSeconds()
        let startTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()) + ' ' + '00:00:00';
        let endTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()) + ' ' + time;
        super(props);
        this.state = {
            beginTime: startTime,
            endTime: endTime,
            condition: {
                beginTime: startTime,
                endTime: endTime,
                pageNumber: 1,
                pageSize: 10,
                sender: '',
                serialNumber: '',
                tel: '',
                userName: ''
            }
        }
    }

    getDate(dateTime) { //更改date的格式
        let datee = new Date(dateTime);
        let year = datee.getFullYear(),
            month = datee.getMonth() + 1,
            date = datee.getDate(),
            hours = datee.getHours(),
            minutes = datee.getMinutes(),
            seconds = datee.getSeconds();
        return (year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds)
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let data = {
                beginTime: values.TradeTime&&values.TradeTime[0]
                    ? this.getDate(values.TradeTime[0])
                    : this.state.beginTime,
                endTime: values.TradeTime&&values.TradeTime[0]
                    ? this.getDate(values.TradeTime[1])
                    : this.state.endTime,
                pageNumber: 1,
                pageSize: 10,
                sender: values.sender || '',
                serialNumber: values.serialNumber || '',
                tel: values.tel || '',
                userName: values.userName || ''
            }
            const {props} = this
            this.setState({condition: data})
            props.getApiRemittanceList(data)
        })
    }
    handleReset = () => {
        this.props.form.resetFields();
        this.props.form.validateFields((error,value) =>{
        })

    }
    componentWillMount() {
        const {props} = this
        props.getApiRemittanceList(this.state.condition)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        const {items} = this.props.items
        const {isfetching} = this.props.items
        if (!items)
            return false
        let dataSource = []

        items.Data.Context.Data.map((item, i) => dataSource.push({
            CustomerId: item.CustomerId,
            CustomerName: item.CustomerName,
            Sender: item.Sender,
            RemittanceTime: item.RemittanceTime,
            BankName: item.BankName,
            Account: item.Account,
            AccountName: item.AccountName,
            BankSubName: item.BankSubName,
            BankWaterNumber: item.BankWaterNumber,
            Amount: (item.Amount).toFixed(4)
        }))
        const pagination = {
            total:items.Data.Context.TotalRecords,
            showSizeChanger: true,
            pageSize: this.state.condition.pageSize,
            onShowSizeChange: (current, pageSize) => {
                let postCondition = this.state.condition
                postCondition.pageNumber = current
                postCondition.pageSize = pageSize
                this.props.getApiRemittanceList(postCondition)
            },
            onChange: (current, pageSize) => {
                let postCondition = this.state.condition
                postCondition.pageNumber = current
                this.props.getApiRemittanceList(postCondition)
            }
        };
        let columns = [
            {
                title: '用户编号',
                dataIndex: 'CustomerId'
            }, {
                title: '用户名称',
                dataIndex: 'CustomerName'
            }, {
                title: '汇款人',
                dataIndex: 'Sender'
            }, {
                title: '汇款时间',
                dataIndex: 'RemittanceTime'
            }, {
                title: '汇款类型',
                dataIndex: 'BankName'
            }, {
                title: '账号',
                dataIndex: 'Account'
            }, {
                title: '账户名称',
                dataIndex: 'AccountName'
            }, {
                title: '开户行',
                dataIndex: 'BankSubName'
            }, {
                title: '汇款流水号',
                dataIndex: 'BankWaterNumber'
            }, {
                title: '金额',
                dataIndex: 'Amount'
            }
        ];
        const title = [
            {
                title: '用户名:',
                label: 'userName'
            }, {
                title: '联系电话:',
                label: 'tel'
            }, {
                title: '汇款人:',
                label: 'sender'
            }, {
                title: '汇款流水号:',
                label: 'serialNumber'
            }
        ]
        const children = [];
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        for (var i = 0; i < 4; i++) {
            children.push(
                <Col span={8} key={i}>
                    <FormItem {...formItemLayout} label={title[i].title}>
                        {getFieldDecorator(title[i].label)(<Input/>)}
                    </FormItem>
                </Col>
            )
        }
        const shownCount = 4;
        return (
            <div>
                <Spin spinning={isfetching === false ? false:true}>
                    <div className="searchdiv">
                        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                            <Row gutter={40}>
                                {children.slice(0, shownCount)}
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label={'交易时间'}>
                                        {getFieldDecorator('TradeTime')(<DateRange showTime format="YYYY-MM-DD HH:mm:ss" placeholder={['开始日期', '结束日期']}/>)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{
                                    textAlign: 'right'
                                }}>
                                    <Button type="primary" htmlType="submit">搜索</Button>
                                    <Button style={{
                                        marginLeft: 8
                                    }} onClick={this.handleReset}>
                                        重置
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Table rowKey='Id' columns={columns} dataSource={dataSource} pagination={pagination}/>
                </Spin>
            </div>
        );
    }
}
ApiRemittanceList = Form.create()(ApiRemittanceList);
export default ApiRemittanceList
