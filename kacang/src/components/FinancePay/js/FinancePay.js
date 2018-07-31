import React from 'react'
import { browserHistory } from 'react-router'
import {
    Button,
    Form,
    Modal,
    Table,
    Col,
    Row,
    message,
    Radio,
    DatePicker,
    Input,
    InputNumber,
    Tooltip,
} from 'antd'
import Filter, { FilterItem } from '../../Filter/js/Filter'
import '../less/financePay.less'

const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;


let FinancePay = React.createClass({
    getInitialState() {
        return {
            radioSelect: false,
            radioValue: '',
            clickdown: false,
            reload: false,
        }
    },
    componentWillMount() {
        const { props } = this;
        props.financePayAction();
        // if (props.verfitionItems.Result) {
        //
        // }
    },
    componentDidUpdate() {
        const { props } = this;
        if (props.verfitionItems && props.verfitionItems.HttpCode == 200 && this.state.reload) {
            message.success(props.verfitionItems.Message)
            browserHistory.push('/finance/remittance')
        }
    },
    clickCancel() {
        this.setState({
            clickdown: !this.state.clickdown,
        });
    },
    clickBtnToCheckout() {
        if (!this.state.radioSelect) {
            message.warning('请选择开户行');
            return;
        }
        this.setState({
            clickdown: !this.state.clickdown,
        });
    },
    getDate(dateTime) { //更改date的格式
        let datee = new Date(dateTime);
        let year = datee.getFullYear(),
            month = datee.getMonth() + 1,
            date = datee.getDate(),
            hours = datee.getHours(),
            minutes = datee.getMinutes(),
            seconds = datee.getSeconds();
        return (year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds)
    },
    handleSubmit() {
        this.props.form.validateFields((err, value) => {
            if (err) {
                return;
            }
            const { props } = this
            props.financeVeriftionAction({
                sender: value.sender,
                bankWaterNumber: value.bankWaterNumber,
                amount: value.amount + '',
                remittanceTime: this.getDate(value.remittanceTime),
                senderComments: value.senderComments,
                bankId: this.state.radioValue,
            })
            this.setState({
                reload: true
            })
        })
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 }
        }
        const columns = [
            {
                title: '汇款类型',
                dataIndex: 'Name',
            }, {
                title: '账号',
                dataIndex: 'Account',
            }, {
                title: '账户名称',
                dataIndex: 'AccountName'
            }, {
                title: '开户行',
                dataIndex: 'BankName'
            }];

        const rowSelection = {
            type: 'radio',
            selectedFlag: false,
            onSelect: (record, selected, selectedRows) => {
                this.setState({
                    radioSelect: selected,
                    radioValue: record.Id
                })
                rowSelection.selectedFlag = selected
            },
            clickBtnToCheckout: this.clickBtnToCheckout,
        };
        const { props } = this;

        const items = props.items;
        const dataSource = items.dataSource;
        return (
            <div key="form" >
                <Table className="supTransactionBody" rowSelection={rowSelection} pagination={false} columns={columns} dataSource={dataSource} />
                <div className='btn_checkout'>
                    <Button type="primary" className='btn_click' onClick={rowSelection.clickBtnToCheckout} style={{ display: this.state.clickdown ? 'none' : 'block' }}>我已汇款，通知卡门核实</Button>
                </div>
                <div className='forminfo' style={{ display: this.state.clickdown ? 'block' : 'none' }}>
                    <Form >
                        <FormItem
                            {...formItemLayout}
                            label="汇款人"
                        >
                            {getFieldDecorator('sender', {
                                rules: [{
                                    required: true, message: '请输入汇款人',
                                }],
                                initialValue: ''
                            })(
                                <Input type='text' />
                                )}

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="流水单号（订单号）"
                        >
                            {getFieldDecorator('bankWaterNumber', {
                                rules: [{
                                    required: true, message: '流水单号（订单号）',
                                }],
                                initialValue: ''
                            })(
                                <Input type='text' />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="汇款金额"
                            hasFeedback

                        >
                            {getFieldDecorator('amount', {
                                rules: [{
                                    message: '请输入正确的金额', required: true,

                                }],
                            })(
                                <InputNumber min={0} />
                                )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="汇出时间"
                        >
                            {getFieldDecorator('remittanceTime', {
                                rules: [{
                                    required: true, message: '请选择汇出时间',
                                }],
                                initialValue: ''
                            })(
                                <DatePicker className='datapicker' format="YYYY-MM-DD HH:mm:ss" onChange={this.onChange} />
                                )}

                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="备注"
                        >
                            {getFieldDecorator('senderComments', {

                                initialValue: ''
                            })(
                                <Input type='textarea' rows={4} />
                                )}

                        </FormItem>
                        <FormItem
                            wrapperCol={{ span: 8, offset: 4 }}
                        >
                            <Button type="primary" htmlType='submit' onClick={this.handleSubmit}>
                                信息无误，通知卡门
                          </Button>
                            <Button onClick={this.clickCancel}>
                                取消
                          </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
})
FinancePay = createForm()(FinancePay);
export default FinancePay
