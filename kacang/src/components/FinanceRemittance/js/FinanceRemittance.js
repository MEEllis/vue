import React from 'react'
import { Form, Input, Modal, Table, Col, Row, Select, Spin, Tooltip } from 'antd'
import Filter, { FilterItem } from '../../Filter/js/Filter'
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import '../less/financeRemittance'
import FL from '../../../utils/FL'
import { browserHistory } from 'react-router';
import { Button } from '../../Auth/js/Auth'

const createForm = Form.create;
const FormItem = Form.Item;

let FinanceRemittance = React.createClass({
    getInitialState() {
        return {
            dealStatus: '',
            listForm: FL.LINK.FINANCEREMITTANCE,
            searchList: FL.LINK.Financeremittanceterm,
            pageIndex: 1,
            pageSize: 15,
        }
    },
    componentWillMount() {
        const { props } = this;
        props.financeRemittanceAction({
            bankSubName: '',
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
            remittanceStatus: '',
            sender: '',
        })
    },
    handleSubmit() {
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            const { props } = this;
            props.financeRemittanceAction({
                bankSubName: value.bank,
                pageIndex: this.state.pageIndex,
                pageSize: this.state.pageSize,
                remittanceStatus: value.dealStatus == '0' ? value.dealStatus = '' : value.dealStatus,
                sender: value.remitter,
            })
            //props.form.resetFields();
        })
    },
    handleReset() {
        this.props.form.resetFields();
    },
    goFinancePay() {
        browserHistory.push('/finance/pay')
    },
    // setDealStatus: function(newState) {
    //     this.setState({dealStatus: newState})
    // },

    render() {
        const { props } = this;
        const { getFieldDecorator } = props.form;

        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        }
        const { items } = props;
        const listForm = this.state.listForm;
        const columns = [
            {
                title: '汇款类型',
                dataIndex: 'BankName'
            }, {
                title: '账号',
                dataIndex: 'Account',
                width: 200
            }, {
                title: '账户名称',
                dataIndex: 'AccountName'
            }, {
                title: '开户行',
                dataIndex: 'BankSubName'
            }, {
                title: '汇款人',
                dataIndex: 'Sender'
            }, {
                title: '流水单号（订单号）',
                dataIndex: 'BankWaterNumber'
            }, {
                title: '汇款金额',
                dataIndex: 'Amount'
            }, {
                title: '汇出时间',
                dataIndex: 'RemittanceTime'
            }, {
                title: '处理状态',
                dataIndex: 'Status',
            }
        ];
        let dataSource = items.dataSource;
        const Searchlist = this.state.searchList;

        const children = [];
        for (let i = 0; i < Searchlist.SearchText.length; i++) {
            {
                switch (Searchlist.SearchText[i].type) {
                    case '0':
                        children.push(
                            <Col span={8} key={i}>
                                <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                                    {getFieldDecorator(Searchlist.SearchText[i].ID, {
                                        initialValue: ''
                                    })(
                                        <Input type='text' />
                                        )}
                                </FormItem>
                            </Col>);
                        break;
                    case '1':
                        children.push(
                            <Col span={8} key={i}>
                                <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                                    {getFieldDecorator(Searchlist.SearchText[i].ID, {
                                        initialValue: ''
                                    })(
                                        <Select onChange={this.handleChangeStatus} allowClear size='default'>
                                            {listForm.handleStatus.map((list, index) => {
                                                return <Option value={list.indexStatus}>{list.title}</Option>
                                            })}
                                        </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>);
                        break;
                }
            }
        }
        const shownCount = children.length;
        return (
            <div key="form">
                <Spin spinning={this.props.isfetching == undefined ? true : this.props.isfetching}>
                    <div className="text-right mb10">
                        <Button auth='financePayList' type="primary" authOpts={{hint: ''}}    onClick={this.goFinancePay} >我已汇款，通知公司</Button>
                        {/* <Button type='primary' onClick={this.goFinancePay}>我已汇款，通知公司</Button> */}
                    </div>

                    <div className='searchdiv'>
                        <Form
                            className="ant-advanced-search-form"
                            onSubmit={this.handleSearch}
                        >

                            <Row gutter={40} className='detail'>
                                {children.slice(0, shownCount)}
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>搜索</Button>
                                    <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                        重置
                             </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Table columns={columns} dataSource={dataSource || []} />
                </Spin>
            </div>
        )
    }
})


FinanceRemittance = createForm()(FinanceRemittance);

// const FinanceRemittance = ({items,initialDispatch}) =>{
//     return (
//             <FinanceRemittanceForm items={items} initialDispatch={initialDispatch} />
//     )
//
// }

export default FinanceRemittance
