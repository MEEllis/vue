import React from 'react'
import { Row, Col, Form, Input, Select, Radio, DatePicker, Modal, Spin, message, Popconfirm } from 'antd';
// import { Link } from 'react-router';
import { Table, Tabs } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { v4 } from 'node-uuid';
import Filter, { FilterItem } from '../../Filter/js/Filter';
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import FL from '../../../utils/FL'
import CopyToClipboard from 'react-copy-to-clipboard';
import Icon from '../../Icon/js/Icon'
import * as icons from '../../Icon/js/Icon'
import '../../CardType/less/cardType.less'
import IconComponent from '../../IconComponent/js/IconComponent'
const createForm = Form.create;
const RangePicker = DatePicker.RangePicker;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const FormItem = Form.Item;

import { Button, Link, A, Div } from '../../Auth/js/Auth'
import { browserHistory } from 'react-router'

let Ponents = React.createClass({
    getInitialState() {
        return {
            modalVisible: false,
            modalVisibleFinance: false,
            postData: {
                PageIndex: 1,
                PageSize: 2,
            },
            postDataGetApiAccountList: {
                PageIndex: 1,
                PageSize: 10,
                url: FL.PATH.API.GetApiAccountList,
                source: 'GetApiAccountList',
            },
            reload: true,
            tableSource: [],
            expand: false,
            financeAction: {},
            userInfo: []
        }
    },
    componentWillMount() {
        const { props } = this
        props.getData(this.state.postDataGetApiAccountList);
    },
    componentDidUpdate() {
        const { props } = this;
        const { reload } = this.state;
        let that = this;
        if (reload && !this.props.isfetching) {
            switch (props.data.source) {
                case 'GetApiAccountList':
                    this.setState({
                        reload: false,
                        tableSource: props.data.Data,
                        postDataGetApiAccountList: {
                            ...this.state.postDataGetApiAccountList,
                            TotalRecords: props.data.TotalRecords
                        }
                    });
                    return false;
                    break;
                case 'Lock':
                    if (props.data.Status == 200) {
                        message.success('禁用成功');
                        props.getData(this.state.postDataGetApiAccountList);
                    } else {
                        //message.error(props.data.Message);
                        this.setState({
                            reload: false,
                        });
                    }
                    return false;
                    break;
                case 'UnLock':
                    if (props.data.Status == 200) {
                        message.success('启用成功');
                        props.getData(this.state.postDataGetApiAccountList);
                    } else {
                        //message.error(props.data.Message);
                        this.setState({
                            reload: false,
                        });
                    }
                    return false;
                    break;
                case 'CloseNotice':
                    if (props.data.Status == 200) {
                        message.success('关闭成功');
                        props.getData(this.state.postDataGetApiAccountList);
                    } else {
                        //message.error(props.data.Message);
                        this.setState({
                            reload: false,
                        });
                    }
                    return false;
                    break;
                case 'OpenNotice':
                    if (props.data.Status == 200) {
                        message.success('开启成功');
                        props.getData(this.state.postDataGetApiAccountList);
                    } else {
                        //message.error(props.data.Message);
                        this.setState({
                            reload: false,
                        });
                    }
                    return false;
                case 'HandBalance':
                    if (props.data.Status == 200) {
                        message.success('扣款成功');
                        props.getData(this.state.postDataGetApiAccountList);
                    }
                    this.setState({
                        modalVisibleFinance: false
                    });
                    return false;
                    break;
                case 'AddHandBalance':
                    if (props.data.Status == 200) {
                        message.success('加款成功');
                        props.getData(this.state.postDataGetApiAccountList);
                    }
                    this.setState({
                        modalVisibleFinance: false,
                    });
                    return false;
                    break;
                case 'InitSecretKey':
                    if (props.data.Status == 200) {
                        message.success('初始化密钥成功');
                    }
                    this.setState({
                        reload: false,
                    });
                    break;
                case 'GetSingleApiAccount':
                    let userInfo = [], itemInfo = props.data.Data;
                    for (let k in itemInfo) {
                        userInfo.push(
                            <Row gutter={10} key={k} className={'mb5'}>
                                <Col className="gutter-row text-right" span={6}>
                                    <div className="gutter-box">{k}:</div>
                                </Col>
                                <Col className="gutter-row" span={18}>
                                    <div className="gutter-box">{itemInfo[k]}
                                        {k === '密钥' &&
                                            <CopyToClipboard text={itemInfo[k]}
                                                onCopy={() => message.success('复制成功')}>
                                                <Button size='small'>复制</Button>
                                            </CopyToClipboard>

                                        }
                                    </div>
                                </Col>
                            </Row>)
                    };
                    this.setState({
                        reload: false,
                        userInfo,
                    });
                    break;
                default:
                    this.setState({
                        reload: false,
                    });
                    break;
            }
        }
    },
    onClose() {
        this.setState({ modalVisible: false });
    },
    //搜索
    handleSubmit() {
        let { postDataGetApiAccountList } = this.state;
        let params = {
            Code: this.props.form.getFieldValue('Code'),
            NickName: this.props.form.getFieldValue('NickName'),
            Available: this.props.form.getFieldValue('Available'),// === 'true' ? true : false,
            // PageIndex: postDataGetApiAccountList.PageIndex,
            // PageSize: postDataGetApiAccountList.PageSize,
        };
        postDataGetApiAccountList.PageIndex = 1;
        Object.assign(postDataGetApiAccountList, params);
        this.props.getData(postDataGetApiAccountList);
        this.setState({ postDataGetApiAccountList, reload: true });
        // this.props.form.validateFields((err, fieldsValue) => {
        //     if (err) {
        //         return;
        //     };
        //     let { postDataGetApiAccountList } = this.state;
        //     Object.assign(postDataGetApiAccountList, fieldsValue);
        //     postDataGetApiAccountList.PageIndex = 1;
        //     this.props.getData(postDataGetApiAccountList);
        //     this.setState({ postDataGetApiAccountList, reload: true });
        // })
    },
    onKeyDown(e) {
        if (e.keyCode === 13)
            this.handleSubmit();
    },
    submitUpdata() {
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            };
            // HandBalance
            let postData = {
                url: FL.PATH.API.HandBalance,
                source: 'HandBalance'
            };
            if (fieldsValue.mt == '1') {
                postData.source = 'AddHandBalance'
            }
            Object.assign(postData, fieldsValue);
            this.props.getData(postData);
            this.setState({ reload: true });
        })
    },
    unLock(data) {
        if (data.Available) {
            this.props.getData({
                url: FL.PATH.API.Lock,
                source: 'Lock',
                string: data.OpenId
            });
        } else {
            this.props.getData({
                url: FL.PATH.API.UnLock,
                source: 'UnLock',
                string: data.OpenId
            });
        }
        this.setState({ reload: true });
    },
    closeNotice(data) {
        if (data.Notice) {
            this.props.getData({
                url: FL.PATH.API.CloseNotice,
                source: 'CloseNotice',
                string: data.OpenId
            });
        } else {
            this.props.getData({
                url: FL.PATH.API.OpenNotice,
                source: 'OpenNotice',
                string: data.OpenId
            });
        }
        this.setState({ reload: true });
    },
    initSecretKey(data) {
        this.props.getData({
            url: FL.PATH.API.InitSecretKey,
            source: 'InitSecretKey',
            string: data.OpenId
        });
        this.setState({ reload: true });
    },
    handleReset() {
        this.props.form.resetFields();
    },
    render() {
        let { props } = this;
        if (props.permission == false) {
            return false;
        };
        const user = props.permission
        const { getFieldDecorator } = props.form;
        const pagination = {
            total: this.state.postDataGetApiAccountList.TotalRecords,
            pageSize: this.state.postDataGetApiAccountList.PageSize,
            current: this.state.postDataGetApiAccountList.PageIndex,
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                let { postDataGetApiAccountList } = this.state;
                postDataGetApiAccountList.PageIndex = current;
                postDataGetApiAccountList.PageSize = pageSize;
                this.props.getData(postDataGetApiAccountList);
                this.setState({ postDataGetApiAccountList, reload: true });
            },
            onChange: (current) => {
                let { postDataGetApiAccountList } = this.state;
                postDataGetApiAccountList.PageIndex = current;
                this.props.getData(postDataGetApiAccountList);
                this.setState({ postDataGetApiAccountList, reload: true });
            },
        };
        let columns = [{
            title: '编号',
            dataIndex: 'ApiCustomId'
        }, {
            title: '用户名',
            dataIndex: 'SiteName'
        }, {
            title: '帐号状态',
            dataIndex: 'AvailableD'
        }, {
            title: '云接口通知',
            dataIndex: 'NoticeD'
        }, {
            title: '用户备注',
            dataIndex: 'ReMarkD'
        }, {
            title: '用户余额',
            dataIndex: 'UseableBalance'
        }, {
            title: '操作',
            width: 140,
            fixed: 'right',
            render: (data) =>
                <div>
                    <span className='mr15'>
                        <A onConfirm={() => { this.unLock(data); }} auth='apiUserAcount' authOpts={{ hint: data.Available ? '禁用帐号' : '启用帐号', confirmTip: `您确定要${data.Available ? '禁用' : '启用'} ${data.SiteName} 吗?` }}>
                            <Icon glyph={data.Available ? icons.iDisabled : icons.iEnabled} />
                        </A>
                    </span>

                    <span className='mr15'>
                        <A onConfirm={() => { this.closeNotice(data); }} auth='apiUserCloud' authOpts={{ hint: data.Notice ? '关闭云接口通知' : '开通云接口通知', confirmTip: `您确定要${data.Notice ? '关闭' : '开启'} ${data.SiteName} 的云接口通知吗?` }}>
                            <Icon glyph={data.Notice ? icons.guanbi : icons.kaiqi} />
                        </A>
                    </span>
                    <span className='mr15'>

                        <A onClick={() => {
                            this.props.form.setFieldsValue({ tradeAmount: '' })
                            this.setState({
                                modalVisibleFinance: true,
                                financeAction: data,
                            })
                        }} auth='apiUserMoney' authOpts={{ hint: '款项' }}>
                            <Icon glyph={icons.kuanxiang} />
                        </A>
                    </span>
                    {/* <span className='mr15'>
                        <A onConfirm={() => {
                            this.initSecretKey(data)
                        }} auth='apiUserInitKey' authOpts={{
                            hint: '初始化密钥',
                            confirmTip: `密钥初始化后，可能导致该接口没有同步修改密钥，无法充值！您确定要初始化 ${data.SiteName} 的秘钥吗?`
                        }}>
                            <Icon glyph={icons.chushihuamisi} />
                        </A>
                    </span> */}
                    <span >
                        <A onClick={() => {
                            // this.props.getData({
                            //     url: FL.PATH.API.GetSingleApiAccount,
                            //     source: 'GetSingleApiAccount',
                            //     string: data.OpenId
                            // });
                            // this.setState({ modalVisible: true, reload: true });
                            browserHistory.push(`/product/api/user/detail/${data.OpenId}`)
                        }} auth='apiUserDetail' authOpts={{
                            hint: '用户详情',
                            confirmTip: ''
                        }}>
                            <Icon glyph={icons.yonghuxiangqing} />
                        </A>
                    </span>
                </div>
        }
        ];
        const children = [];
        const modalGutter = 10;
        const modalSpan = 5;
        return (
            <div>

                <Form className="ant-advanced-search-form mb20 searchdiv">
                    <Row gutter={40}>
                        <Col span={8}>
                            <FormItem
                                {...FL.FORMLAYOUT}
                                label={'编号'}>
                                {getFieldDecorator('Code', {
                                    initialValue: ''
                                })(
                                    <Input onKeyDown={this.onKeyDown} type='text' />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...FL.FORMLAYOUT}
                                label={'用户名'}>
                                {getFieldDecorator('NickName', {
                                    initialValue: ''
                                })(
                                    <Input onKeyDown={this.onKeyDown} type='text' />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem
                                {...FL.FORMLAYOUT}
                                label={'帐号状态'}>
                                {getFieldDecorator('Available', {
                                    initialValue: ''
                                })(
                                    <Select placeholder="请选择状态">
                                        <Option value=''>全部</Option>
                                        <Option value='true'>启用</Option>
                                        <Option value='false'>禁用</Option>
                                    </Select>
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" className={'mr10'} onClick={this.handleSubmit}>搜索</Button>
                            <Button onClick={this.handleReset}>重置</Button>
                        </Col>
                    </Row>
                </Form>
                <Spin spinning={props.isfetching}>
                    <Table columns={columns} dataSource={this.state.tableSource} pagination={pagination} />
                </Spin>
                <Modal
                    onClose={this.onClose}
                    title="用户详情"
                    visible={this.state.modalVisible}
                    footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.onClose}>
                            关闭
                        </Button>,
                    ]}>
                    <Spin spinning={props.isfetching}>
                        {
                            this.state.userInfo
                        }
                    </Spin>
                </Modal>
                <Modal
                    onClose={() => {
                        this.props.form.setFieldsValue({ tradeAmount: '' })
                        this.setState({
                            modalVisibleFinance: false
                        })
                    }}
                    title={'款项'}
                    visible={this.state.modalVisibleFinance}
                    footer={[
                        <Button key="back" type="default" size="large" loading={this.state.loading} onClick={() => {
                            this.setState({
                                modalVisibleFinance: false
                            })
                        }}>
                            关闭
                          </Button>,
                        <Button key="button" type="primary" size="large" loading={this.state.loading} onClick={this.submitUpdata}>
                            提交
                          </Button>,
                    ]}>
                    <Spin spinning={props.isfetching}>
                        <div className="modal-demo-content">
                            <Form style={{ marginBottom: 10 }}>
                                <FormItem
                                    label="操作类型"
                                    {...FL.FORMLAYOUTMIN}>
                                    {getFieldDecorator('mt', {
                                        initialValue: '1'
                                    })(
                                        <Select>
                                            <Option value='1'>加款</Option>
                                            <Option value='2'>扣款</Option>
                                        </Select>
                                        )}
                                </FormItem>
                                <FormItem
                                    label="操作对象编号"
                                    {...FL.FORMLAYOUTMIN}>
                                    {getFieldDecorator('apiId', {
                                        initialValue: this.state.financeAction.ApiCustomId
                                    })(
                                        <Input disabled={true} />
                                        )}
                                </FormItem>
                                <FormItem
                                    label="操作对象昵称"
                                    {...FL.FORMLAYOUTMIN}>
                                    {getFieldDecorator('apiName', {
                                        initialValue: this.state.financeAction.SiteName
                                    })(
                                        <Input disabled={true} />
                                        )}
                                </FormItem>
                                <FormItem
                                    label="款项金额"
                                    {...FL.FORMLAYOUTMIN}>
                                    {getFieldDecorator('tradeAmount', {
                                        rules: [{
                                            max: 14, message: '输入金额超出范围',
                                        }, { required: true, message: '款项金额必须填写' }]
                                    })(
                                        <Input />
                                        )}
                                </FormItem>
                                <FormItem
                                    label="内容"
                                    {...FL.FORMLAYOUTMIN}>
                                    {getFieldDecorator('remark', {
                                    })(
                                        <Input type='textarea' rows={4} />
                                        )}
                                </FormItem>
                            </Form>
                        </div>
                    </Spin>
                </Modal>
            </div>
        );
    }
});
Ponents = createForm()(Ponents);
export default Ponents
