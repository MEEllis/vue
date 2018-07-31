import React, {Component} from 'react'
import IconComponent from '../../IconComponent/js/IconComponent'
import Icon from '../../Icon/js/Icon'
import * as icons from '../../Icon/js/Icon'
import {
    Tabs,
    Select,
    Col,
    Form,
    Row,
    Input,
    DatePicker,
    Table,
    Modal,
    Spin,
    message,
    Tooltip
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const {RangePicker} = DatePicker;
import FL from '../../../utils/FL'
import {Button,Link,A,Div} from '../../Auth/js/Auth'
class ApiRemittanceBank extends React.Component {
    constructor(props) {
        let nowTime = new Date();
        let startTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()-1) + ' ' + '00:00:00';
        let endTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()-1) + ' ' + '23:59:59';
        super(props);
        this.state = {
            visibility: false,
            modifyVisibility: false,
            id: '',
            condition: {
                beginTime: startTime,
                endTime: endTime,
                pageNumber: 1,
                pageSize: FL.PAGESIZE,
                sender: '222',
                serialNumber: '',
                tel: '',
                userName: ''
            },
            RELOAD: false,
            RELOAD2: false,
            RELOAD3: false,
            RELOAD4: false,
            RELOAD5: false,
            RELOAD6: false,
            account: '',
            accountName: '',
            bankName: '',
            name: '',
            bankId: ''
        }
    }
    addAccount = () => {
        this.props.form.setFieldsValue({account: '', accountName: '', bankName: '', name: ''})
        this.setState({visibility: true})
    }
    handleAddAccount = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return false
            } else if (values) {
                let postData = {
                    account: values.account || '',
                    accountName: values.accountName || '',
                    bankName: values.bankName || '',
                    name: values.name || '',
                    bankId: ''
                }
                this.props.addPaymentAccount(postData)
                this.setState({RELOAD: true, visibility: false, RELOAD6: true})
            }
        })
    }
    hideModal = () => {
        this.setState({visibility: false})
    }
    deleteCommodity = (text, type) => {
        const that = this
        Modal.confirm({
            title: '您是否确认删除这条内容',
            onOk: function() {
                that.props.delPaymentAccount(text.Options)
                that.setState({RELOAD2: true})
            },
            onCancel: function() {}
        });
    }
    modifyCommodity = (text) => {
        this.props.getRemittanceBankItem(text.Options)
        this.props.form.setFieldsValue({
            account: text.Account,
            accountName: text.AccountName,
            bankName: text.BankName,
            name: text.Name,
        })
        this.setState({modifyVisibility: true, RELOAD4: true})
    }
    hideModify = () => {
        this.props.form.setFieldsValue({_account: '', _accountName: '', _bankName: '', _name: ''})
        this.setState({modifyVisibility: false})
    }
    handleModify = () => {
        this.props.form.validateFields((err, values) => {
            let postData = {
                account: values._account,
                accountName: values._accountName,
                bankName: values._bankName,
                name: values._name,
                bankId: this.state.bankId
            }
            this.props.modifyPaymentAccount(postData)
            this.setState({RELOAD3: true, RELOAD5: true, modifyVisibility: false})
        })

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.message.Status === '200' && this.state.RELOAD4) {
            const {message} = nextProps
            if (message.Data) {
                this.props.form.setFieldsValue({_account: message.Data.Context.Account, _accountName: message.Data.Context.AccountName, _bankName: message.Data.Context.BankName, _name: message.Data.Context.Name})
                this.setState({RELOAD4: false, bankId: message.Data.Context.Id})
            }
        }
    }
    componentDidUpdate() {
        if (this.props.data.items && this.props.data.items.Status === '200' && this.state.RELOAD) {
            this.props.getApiRemittanceBank(this.state.condition)
            this.setState({RELOAD: false})
            message.success('新增账户成功');
        } else if (this.props.data.items && this.props.data.items.Status === '500' && this.state.RELOAD6) {
            this.setState({RELOAD6: false})
            //message.error(this.props.data.items.Message)

            // }
        }
        if (this.props.feedback.Status === '200' && this.state.RELOAD2) {
            this.props.getApiRemittanceBank(this.state.condition)
            this.setState({RELOAD2: false})
            message.success('删除账户成功');
        }
        if (this.props.modify.Status === '200' && this.state.RELOAD3) {

            this.props.getApiRemittanceBank(this.state.condition)
            this.setState({
                modifyVisibility: false,
                account: '',
                accountName: '',
                bankName: '',
                name: '',
                RELOAD3: false
            })
            message.success('修改账户成功');
        } else if (this.props.modify.Status === '500' && this.state.RELOAD5) {
            //message.error(this.props.modify.Message)
            this.setState({RELOAD5: false})
        }
    }
    componentWillMount() {
        const {props} = this;
        props.getApiRemittanceBank(this.state.condition)
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        let {dataSource} = this.props.items;
        const {isfetching} = this.props.isfetching;
        if (!dataSource)
            return false;
        const pagination = {
            total:dataSource.length,
            showSizeChanger: true,
            pageSize: this.state.condition.pageSize,
            onShowSizeChange: (current, pageSize) => {
                let postCondition = this.state.condition
                postCondition.pageNumber = current
                postCondition.pageSize = pageSize
                this.props.getApiRemittanceBank(postCondition)
            },
            onChange: (current, pageSize) => {
                let postCondition = this.state.condition
                postCondition.pageNumber = current
                this.props.getApiRemittanceBank(postCondition)
            }
        };
        const {permission} = this.props;

        let columns = [
            {
                title: '汇款类型',
                dataIndex: 'Name'
            }, {
                title: '账号',
                dataIndex: 'Account'
            }, {
                title: '账户名称',
                dataIndex: 'AccountName'
            }, {
                title: '开户行',
                dataIndex: 'BankName'
            }, {
                title: '操作',
                width: '80px',
                //dataIndex: 'Options',
                render: (text) => <div>
                        <div style={{
                            marginRight: 15
                        }} className='iconp'>
                          <A onClick={()=>{ this.modifyCommodity(text, 0)}} auth='apiRemittanceAccountAdd' authOpts={{hint:'修改'}}>
                            <span><Icon glyph={icons.iEdit}/></span>
                          </A>

                        </div>
                        <div className='iconp'>
                          <A onClick={()=>{ this.deleteCommodity(text, 0)}} auth='apiRemittanceAccountDel' authOpts={{hint:'删除'}}>
                            <span><Icon glyph={icons.iDelete}/></span>
                          </A>
                        </div>
                    </div>
            }
        ];
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        return (
            <div>
                <Spin spinning={isfetching == true?isfetching:false}>
                    <Row>
                        <Col span={24} style={{
                            textAlign: 'left',
                            marginBottom: '20px'
                        }}>
                          <Button auth='apiRemittanceAccountAdd' onClick={this.addAccount } style={{margin: '0 10px 10px 0'}} type='primary' authOpts={{noAuthType: 'disabled',noAuthHint: '尚未开通该权限，请联系管理员'}}>新增收款账户</Button>
                        </Col>
                    </Row>
                    <div>
                        <Table rowKey={'tablett'} columns={columns} dataSource={dataSource || []} pagination={pagination}/>
                        <Modal title='新增账户' visible={this.state.visibility} onOk={this.handleAddAccount} onCancel={this.hideModal}>
                            <Form horizontal onSubmit={this.handleAddAccount}>
                                <FormItem {...formItemLayout} label='汇款类型:'>
                                    {getFieldDecorator('name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '汇款类型不能为空!'
                                            }
                                        ]
                                    })(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label='账号:'>
                                    {getFieldDecorator('account', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '账号不能为空!'
                                            }
                                        ]
                                    })(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label='账户名称:'>
                                    {getFieldDecorator('accountName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '账户名称不能为空!'
                                            }
                                        ]
                                    })(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label='开户行:'>
                                    {getFieldDecorator('bankName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '开户行不能为空!'
                                            }
                                        ]
                                    })(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                            </Form>
                        </Modal>
                        {/* <Modald prop={this.props} state={this.state} handleModify={this.handleModify} hideModify={this.hideModify}/> */}
                        <Modal title='新增账户' visible={this.state.modifyVisibility} onOk={this.handleModify} onCancel={this.hideModify}>
                            <Form horizontal onSubmit={this.handleModify}>
                                <FormItem {...formItemLayout} label='汇款类型:'>
                                    {getFieldDecorator('_name', {
                                        //rules: [{ required: true, message: '汇款类型不能为空!' }]
                                    })(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label='账号:'>
                                    {getFieldDecorator('_account', {
                                        //rules: [{ required: true, message: '账号不能为空!' }]
                                    })(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label='账户名称:'>
                                    {getFieldDecorator('_accountName', {
                                        //rules: [{ required: true, message: '账户名称不能为空!' }]
                                    })(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                                <FormItem {...formItemLayout} label='开户行:'>
                                    {getFieldDecorator('_bankName', {
                                        //rules: [{ required: true, message: '开户行不能为空!' }]
                                    })(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </Spin>
            </div>
        );
    }
}
ApiRemittanceBank = Form.create()(ApiRemittanceBank);
export default ApiRemittanceBank
