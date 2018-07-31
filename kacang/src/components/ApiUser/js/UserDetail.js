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
import '../less/apiUser.less'
import IconComponent from '../../IconComponent/js/IconComponent'
const createForm = Form.create;
const RangePicker = DatePicker.RangePicker;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const FormItem = Form.Item;

import { Button, Link, A, Div } from '../../Auth/js/Auth'
import { getData } from '../../../utils/helper/getData'


class Ponents extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                SecretKey: ''
            },
            userInfo: [],
            isfetching: true
        }
    }
    componentWillMount() {
        this.getSingleApiAccount();
    }
    getSingleApiAccount = () => {
        getData( FL.PATH.API.GetSingleApiAccount, {string: this.props.params.orderId})
        .then((data) => {
            let {Context} = data.Data;
            this.setState({
                data: Context,
                isfetching: false,
            });
        });
    }
    unLock = () => {

    }
    initSecretKey = () => {
        this.setState({
            isfetching: true,
        });
        getData( FL.PATH.API.InitSecretKey, {string: this.props.params.orderId} )
        .then((data) => {
            if (data.Status == 200){
                message.success('初始化密钥成功');
                this.getSingleApiAccount();
            } else {
                this.setState({
                    isfetching: false,
                });
            }
        });
        // this.props.getData({
        //     url: FL.PATH.API.InitSecretKey,
        //     source: 'InitSecretKey',
        //     string: data.OpenId
        // });
        // this.setState({ reload: true });
    }
    render() {
        const rGutter = 14;
        const spanL = 6;
        const spanR = 18;
        const { data } = this.state;
        const { isfetching } = this.state;
        return (
            <div className={'userdetail'}>
            <Spin spinning={isfetching}>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">云接口编号：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.ApiCustomId}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">操作对象编号：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.SiteId}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">操作对象昵称：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.SiteName}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">密钥：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.SecretKey}
                            <span className='mr15'>
                                <A onConfirm={ this.initSecretKey } auth='apiUserInitKey' authOpts={{
                                    hint: '初始化密钥',
                                    confirmTip: `密钥初始化后，可能导致该接口没有同步修改密钥，无法充值！您确定要初始化 ${data.SiteName} 的秘钥吗?`
                                }}>
                                    <Icon glyph={icons.chushihuamisi} />
                                </A>
                            </span>
                            <CopyToClipboard text={data.SecretKey}
                                onCopy={() => message.success('复制成功')}>
                                <Button size='small'>复制</Button>
                            </CopyToClipboard>
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">用户余额：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.UseableBalance}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">账号状态：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.Available ? '启用' : '禁用'}
                            {/* <span className='mr15'>
                                <A onConfirm={() => { this.unLock(data); }} auth='apiUserAcount' authOpts={{ hint: data.Available ? '禁用帐号' : '启用帐号', confirmTip: `您确定要${data.Available ? '禁用' : '启用'} ${data.SiteName} 吗?` }}>
                                    <Icon glyph={data.Available ? icons.iDisabled : icons.iEnabled} />
                                </A>
                            </span> */}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">注册时间：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.RegisterTime}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">公司名称：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.Company}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">真实姓名：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.RealName}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">身份证号码：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.Identity}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">QQ：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.QQ}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">电话：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.CellPhone}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">地址：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.Address}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">邮编：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.PostCode}
                        </div>
                    </Col>
                </Row>
                <Row gutter={rGutter} className={'mb5'}>
                    <Col className="gutter-row text-right" span={spanL}>
                        <div className="gutter-box">座机：</div>
                    </Col>
                    <Col className="gutter-row" span={spanR}>
                        <div className="gutter-box">
                            {data.LandLine}
                        </div>
                    </Col>
                </Row>
            </Spin>
            </div>
        );
    }
}
Ponents = createForm()(Ponents);
export default Ponents
