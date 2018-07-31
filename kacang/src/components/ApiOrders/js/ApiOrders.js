import React from 'react'
import { Table, Alert, Tabs, Icon, Row, Col, Form, Input, Select, Button, Radio, Modal, Spin, message, Popconfirm, Pagination } from 'antd';
import { Link } from 'react-router';
import moment from 'moment'
import 'moment/locale/zh-cn'
import QueueAnim from 'rc-queue-anim';
import { v4 } from 'node-uuid';
import '../less/apiOrders'
import Filter, { FilterItem } from '../../Filter/js/Filter';
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import { DateRange } from '../../../utils/component'
import FL from '../../../utils/FL'
import {
    iDelete,
    iEdit,
    iUnconnect
} from '../../Icon/js/Icon'
import '../../CardType/less/cardType.less'
import IconComponent from '../../IconComponent/js/IconComponent'
const createForm = Form.create;
const RangePicker = DateRange;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import ShowDetailComponent from '../../../containers/ShowDetailComponent'
import ShowComplaintComponent from '../../../containers/ShowComplaintComponent'
import IconComponentNotClick from '../../IconComponent/js/IconComponentNotClick'
import ServiceComplaint from '../../../containers/ServiceComplaint'

let Ponents = React.createClass({
    getInitialState() {
        let nowTime = new Date();
        let time=nowTime.getHours()+':'+nowTime.getMinutes()+':'+nowTime.getSeconds();
        let startTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()) + ' ' + '00:00:00'
        let endTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()) + ' ' + time
        return {
            expand: false,
            listForm: FL.LINK.ORDERSDETAIL, //展示顶部菜单
            searchList: FL.LINK.OrderSearchterm,
            page: 1,
            postData: {
                PageIndex: 1,
                PageSize: 2,
                url: FL.PATH.API.GetApiAccountList,
                source: 'GetApiAccountList',
            },
            startTime:startTime,
            endTime:endTime,
            postDataGetApilist: {
                Status: '-1',//订单状态--传给后端 0 / -1选哪个啊
                Stock: '0',
                Category: '0',
                OrderCode: '',//订单编号
                ProductFrom: '',//进货商户
                OrderFrom: '',//订单客户
                ProductCode: '',//商品编号
                ProductName: '',//商品名称
                RechargeFrom: '',//调用账号
                RechargeTo: '',//充值账号
                TradeTimeFrom: startTime,//交易时间起
                TradeTimeTo: endTime,//交易时间止
                ExternalOrderNumber: '',
                PageIndex: 1,
                PageSize: 10,
                //TotalRecords:0,
                url: FL.PATH.API.Apilist,
                source: 'apilist',
            },
            modalVisible: false,
            reload: true,
            dataSource: [],
            TotalAmount: 0,
            TotalProducts: 0,
            TotalSales: 0,
            activeKey: '1',
            idCode: '',
            show: false,
            flag: true,
            key: true,
            apilistData: {},
            isActiveKey: true,
        }
    },
    componentWillMount() {
        const { props } = this; // 找不到方法 暂时这样吧
        props.getData(this.state.postDataGetApilist);
    },
    componentDidUpdate() {
        const { props } = this;
        const { reload } = this.state;
        const { Data } = this.props.data
        if (reload && !this.props.isfetching) {
            switch (props.data.source) {
                case 'apilist':
                    this.setState({
                        dataSource: props.data.Data.Items,
                        apilistData: props.data.Data,
                        TotalAmount: props.data.Data.TotalAmount,
                        TotalProducts: props.data.Data.TotalProducts,
                        TotalSales: props.data.Data.TotalSales,
                        postDataGetApilist: {
                            ...this.state.postDataGetApilist,
                            TotalRecords: props.data.Data.TotalAmount,
                        },
                        reload: false,
                    });
                    let orderList = []
                    orderList.push(Data.SuspiciousCount, Data.UntreatedCount, Data.ProcessingCount, Data.SuccessCount, Data.FailedCount);
                    if (this.state.isActiveKey) {
                        for (var i = 0; i < orderList.length; i++) {
                            if (orderList[i] != 0) {
                                this.setState({
                                    activeKey: i + 1 + ''
                                })
                                return false
                            }
                        }
                        if (i == 5) {
                            this.setState({
                                activeKey: '1'
                            })
                        }
                    }
                    props.data.source = '';
                    break;
                default:
                    // this.setState({
                    //     reload: false,
                    // });
                    break;
            }

        }
    },
    showOrder(value) {
    },
    handlesubmits() {
        this.props.form.validateFields((err, value) => {
            let { postDataGetApilist } = this.state;
            postDataGetApilist.TradeTimeFrom = value.TradeTime? this.getDate(value.TradeTime[0]._d) : this.state.startTime;
            postDataGetApilist.TradeTimeTo = value.TradeTime? this.getDate(value.TradeTime[1]._d) : this.state.endTime;
            postDataGetApilist.Status = '-1'
            Object.assign(postDataGetApilist, value);
            this.props.getData(postDataGetApilist);
            this.setState({ postDataGetApilist, reload: true, page: 1, isActiveKey: true });
        })
    },
    changeOrderState(num) {
        let state = null;
        if (num == 1) {
            state = 6
        } else {
            state = num
        }
        const { props } = this;
        let { postDataGetApilist } = this.state;
        postDataGetApilist.Status = state;
        postDataGetApilist.PageIndex = 1
        this.props.getData(postDataGetApilist);
        this.setState({
            Status: state,
            page: 1,
            activeKey: num,
            key: false,
            reload: true,
            isActiveKey: false,
        })
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
    toggle() {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    },
    onPageChange(current) {
        let { postDataGetApilist } = this.state;
        postDataGetApilist.PageIndex = current;
        this.props.getData(postDataGetApilist);
        postDataGetApilist.PageIndex = 1
        this.setState({ postDataGetApilist, reload: true });
        this.setState({
            page: current
        })
    },
    onShowSizeChange(current, pageSize) {
        let { postDataGetApilist } = this.state;
        postDataGetApilist.PageIndex = current;
        postDataGetApilist.PageSize = pageSize;
        this.props.getData(postDataGetApilist);
    },
    setValue(value) {
        this.setState({ idCode: value, show: true, flag: !this.state.flag, key: true })
    },

    render() {
        const { props } = this;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        //搜索begin
        const Searchlist = this.state.searchList;
        const listForm = this.state.listForm;
        const children = [];
        const isfetching = this.props.isfetching
        // if(!props.data.Data){
        //     return false
        // }
        //let dataSource = props.data.Data.Items;
        let { dataSource } = this.state;
        if (!dataSource) {
            dataSource = []
        }
        let { FailedCount, ProcessingCount, SuccessCount, SuspiciousCount, UntreatedCount, TotalAmount, TotalProducts, TotalSales } = this.state.apilistData;
        const result = '订单数量' + TotalAmount + '个，销售商品总数量' + TotalProducts + '个，总销售额为' + TotalSales + '元';
        let Susp = '可疑订单(' + SuspiciousCount + ')'
        let Untr = '未处理(' + UntreatedCount + ')'
        let Proc = '处理中(' + ProcessingCount + ')'
        let Succ = '交易成功(' + SuccessCount + ')'
        let Fail = '交易失败(' + FailedCount + ')'

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
                                        <Input type='text' size='default' />
                                        )}
                                </FormItem>
                            </Col>);
                        break;
                    case '1':
                        let lists = ''
                        let onChange = ''
                        let init = '0'
                        if (Searchlist.SearchText[i].drpdowList == 'commodityType') {
                            lists = listForm.commodityType
                            onChange = this.handleChangeType
                        }
                        else if (Searchlist.SearchText[i].drpdowList == 'stockFrom') {
                            lists = listForm.stockFrom
                            onChange = this.handleChangeFrom
                        }
                        else {
                            lists = listForm.orderStatus
                            onChange = this.handleChangeStatus
                        }
                        children.push(
                            <Col span={8} key={i}>
                                <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                                    {getFieldDecorator(Searchlist.SearchText[i].ID, {
                                        initialValue: init
                                    })(
                                        <Select onChange={onChange} allowClear size='default'>
                                            {lists.map((list, index) => {
                                                return <Option key={index} value={list.indexStatus} >{list.title}</Option>
                                            })}
                                        </Select>
                                        )
                                    }
                                </FormItem>
                            </Col>);
                        break;
                    case '2':
                        children.push(
                            <Col span={8} key={i}>
                                <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                                    {getFieldDecorator(Searchlist.SearchText[i].ID)(
                                        <DateRange defaultValue={[moment(this.state.startTime), moment(this.state.endTime)]} showTime format="YYYY/MM/DD HH:mm:ss" size='default'/>
                                        )
                                    }
                                </FormItem>
                            </Col>);
                        break;
                    default: ;
                        break;
                }
            }
        }
        const expand = this.state.expand;
        const shownCount = expand ? children.length : 6;
        //判断是否有剪切板功能
        let flag = false;
        // if (permission.isAdmin) {
        //     flag = true;
        // }
        // else {
        //     //如果有子集
        //     if (permission.children[0]) {
        //         //最外层数据
        //         var arrTopInfo = permission.children;
        //         for (var i = 0, len = arrTopInfo.length; i < len; i++) {
        //             //如果是查看详情
        //             if (permission.children[i].title == '查看详情') {
        //                 //里层数据
        //                 var arrChidrenInfo = permission.children[i].children;
        //                 for (var j = 0, lenChild = arrChidrenInfo.length; j < lenChild; j++) {
        //                     //如果是复制到剪贴板
        //                     if (arrChidrenInfo[j].title == '复制到剪贴板') {
        //                         flag = arrChidrenInfo[j].IsAvailable;
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

        let tableList = []
        dataSource.map((item, i) => tableList.push(
            <div className='table' key={i}>
                <ul className="tabelHeader  clearfix">
                    <li className="tableh">
                        <ShowDetailComponent auth={{ orderDetailTitle: 'apiOrderDetail', orderDetailLook: 'apiOrderDetail', copyClipboard: 'copyClipboard', exportExcel: 'exportExcel' }} text={item.Code} orderNum={item.Code} />
                        <em>{item.OrderTime}</em>
                    </li>
                    <li>
                        外部订单编号：{item.ExternalOrderNumber}
                    </li>
                    <li className="top">供货商：{item.FromName}</li>
                    <li className="top">进货商：{item.OrderFrom}</li>
                    {
                        item.Status == '交易失败' || item.Status == '交易成功' ? <li className='no-margin'>完成时间：{item.OrderTime}</li> : ''
                    }
                </ul>
                <ul className="tableFooter">
                    <li className='first-li'>
                        <div>
                            <div>{item.Name}</div>
                            <div className="span">
                                <span>{item.NameCode}</span>
                                <em>{item.Category}</em>
                            </div>
                        </div>
                    </li>
                    <li>{item.Price}元</li>
                    <li>{item.Amount}个</li>
                    <li>{item.OrderPrice}元</li>
                    <li>{item.RechargeTo}</li>
                    <li>{item.Status}</li>
                    <li>{item.ChargeDescription}</li>
                    <li className="operator">

                        <ShowDetailComponent auth={{ orderDetailTitle: 'apiOrderDetail', orderDetailLook: 'apiOrderDetail',copyClipboard: 'copyClipboard', exportExcel: 'exportExcel' }} text="查看详情" orderNum={item.Code} />
                        {

                            item.Status == '交易失败' ?
                                <IconComponentNotClick title='投诉已完结' color='green' glyphIcon={item.iComplainComplete} /> :
                                // <ShowComplaintComponent text ="投诉" orderNum ={item.Code}
                                // disabled={permission.isAdmin?false:!permission.items['投诉&补充&再次投诉']} />
                                <ServiceComplaint locationData={{
                                    title: '投诉',
                                    auth: 'apiOrderComplain',
                                    orderNo: item.Code,
                                    sourceSys: 1,
                                }} change={() => { }}

                                />
                        }

                    </li>
                </ul>
            </div>
        )

        )

        return (
            <div>
                <Spin spinning={isfetching === false ? false : true}>
                    <div className='searchdiv'>
                        <Form className="ant-advanced-search-form" >

                            <Row gutter={40} className='detail'>
                                {children.slice(0, shownCount)}
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button type="primary" htmlType="submit" onClick={this.handlesubmits}>搜索</Button>
                                    <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                        {expand ? '收起' : ''}更多条件 <Icon type={expand ? 'up' : 'down'} />
                                    </a>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Tabs onChange={this.changeOrderState} activeKey={this.state.activeKey}>
                        <TabPane tab={Susp} key="1"></TabPane>
                        <TabPane tab={Untr} key="2"></TabPane>
                        <TabPane tab={Proc} key="3"></TabPane>
                        <TabPane tab={Succ} key="4"></TabPane>
                        <TabPane tab={Fail} key="5"></TabPane>
                    </Tabs>
                    <div className="title clearfix">
                        <ul>
                            <li className='first'>商品</li>
                            <li>单价</li>
                            <li>数量</li>
                            <li>金额</li>
                            <li>充值账号</li>
                            <li>交易状态</li>
                            <li>充值描述</li>
                            <li className='last-list'>操作</li>
                        </ul>
                    </div>
                    {tableList[0] ? tableList : <div className="singal">暂无数据</div>}
                    {
                        tableList[0] ? <Pagination onChange={this.onPageChange} total={TotalAmount} onShowSizeChange={this.onShowSizeChange} showSizeChanger={true} current={this.state.page} />
                            : ''
                    }
                    {/* <div className='orderDetail-bottom'>
                        <h3>查询结果：</h3>
                        <p>订单数量<span>{TotalAmount}</span>个，销售商品总数量<span>{TotalProducts}</span>个，总销售额为<span>{TotalSales}</span>元</p>
                    </div> */}
                    <Alert
                        message="查询结果:"
                        description={result}
                        type="info"
                        style={{ marginTop: '10px', clear: 'both', float: 'left', width: '100%' }}
                    />
                </Spin>
            </div>
        );
    }
});
Ponents = createForm()(Ponents);
export default Ponents
