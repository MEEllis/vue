import React from 'react'
import { Form, Input, Modal, Table, DatePicker, Col, Row, Spin, Tooltip, Button, Select, Steps, TreeSelect } from 'antd'
import Filter, { FilterItem } from '../../Filter/js/Filter'
import IconComponent from '../../IconComponent/js/IconComponent'
import Icon, * as icons from '../../Icon/js/Icon'
import '../less/purchaseInstance.less'
// import FinanceFund from '../../FinanceFund/js/FinanceFund'
import ProductTpl from '../../../containers/ProductTpl'
import FL from '../../../utils/FL'
import { A } from '../../Auth/js/Auth'

const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const createForm = Form.create;
const FormItem = Form.Item;
const Step = Steps.Step;
var dataSource = []
let Purchaseinstant = React.createClass({
    getInitialState() {
        const { props } = this
        return {
            modalVisible: false,
            current: 0,
            btntext: '请选择采购数量',
            topupCount: 0,
            errormsg: '',
            flagcount: 0,
            FaceValue: '',
            ProductPrice: '',
            DockType: '',
            DockAssociateCode: '',
            DockAssociateName: '',
            ProductCode: '',
            ProductId: '',
            visibility: false,
            reload: false,
            reloadGD: false,
            orderCode: '',
            dataSource: [],
            reload2: false,
            num: '',
            username: '',
            password: '',
            Rate: 1,
            FromCurrencyName: '',
            ToCurrencyName: '',
            select: '',
            m_Item2: {},
            tplId: '',
            postData: {

            },
            externalOrderNo: '',
            isFastPurchaseCardsOrder: false,
            locationOrderid: '',
            orderDetail: {},
            productInfo: {},
        }
    },
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        if (nextProps.getFastpurchaseitems != this.props.getFastpurchaseitems) {
            if (this.state.reload) {
                if (nextProps.getFastpurchaseitems.Status == '200') {
                    const { Context } = nextProps.getFastpurchaseitems.Data
                    const { CardsInfo } = Context
                    for (var i = 0; i < CardsInfo.length; i++) {
                        CardsInfo[i].OverdueTime = i + 1
                    }
                    this.setState({
                        reload: false,
                        current: 1,
                        orderCode: Context.SerialNumber,
                        dataSource: CardsInfo,
                    })
                    //dataSource = CardsInfo
                    // 查询订单
                    let { locationOrderid } = this.state;

                    locationOrderid = Context.SerialNumber;
                    props.getData({
                        SerialNumber: locationOrderid,
                        url: FL.PATH.API.show,
                        source: 'show',
                    });
                    this.setState({
                        locationOrderid,
                        reloadGD: true,
                    });
                } else {
                    this.setState({
                        reload: false,
                    });
                }

            }
        }

        if (nextProps.templateitems && nextProps.templateitems.m_Item1 && nextProps.templateitems.m_Item1.Items && this.state.reload2) {
            const { Items } = nextProps.templateitems.m_Item1
            const { Id } = nextProps.templateitems.m_Item1
            this.setState({
                tplId: Id
            })
            for (var key in Items) {
                switch (Items[key].LabelName) {
                    case '充值账号':
                        this.setState({
                            username: Items[key].LabelName
                        })
                        break;
                    case '数量':
                        this.setState({
                            num: Items[key].LabelName,
                            radio: Items[key].Rate ? Items[key].Rate.FromCurrencyName + '' + Items[key].Rate.Rate + '' + Items[key].Rate.ToCurrencyName : '',
                            Rate: Items[key].Rate ? Items[key].Rate.Rate : '',
                            FromCurrencyName: Items[key].Rate ? Items[key].Rate.FromCurrencyName : '',
                            ToCurrencyName: Items[key].Rate ? Items[key].Rate.ToCurrencyName : ''
                        });
                        break;
                    case '密码框':
                        this.setState({
                            password: Items[key].LabelName
                        })
                        break;
                        defalut:
                        return false
                }
                if (nextProps.templateitems.m_Item2[0]) {
                    const select = [];
                    let { m_Item2 } = nextProps.templateitems;
                    this.setState({ m_Item2, })
                    let selectOne = m_Item2[0].Items[0];
                    let selectTwo = m_Item2[0].Items[1];
                    let selectThree = m_Item2[0].Items[2];
                    let selectList = [];
                    const addSelect = (data, id) => {
                        let items = [], itemValues = data.ItemValues;
                        for (let k in itemValues) {
                            if (itemValues[k].ParentValueId == id) {
                                items.push(itemValues[k])
                            }
                        }
                        data.ItemValues1 = items;
                        return data;
                    };

                }
            }
        } else {
            this.setState({
                tplId: ''
            })
        }
    },
    componentDidUpdate() {
        const { props } = this;
        const { reloadGD } = this.state;
        if (reloadGD && !props.isfetching) {
            switch (props.data.source) {
                case 'GetProductInfo':
                    if (props.data.Status == 200) {
                        const { props } = this
                        let { isFastPurchaseCardsOrder } = this.state;
                        if (props.data.Data.ProductType == 1) {
                            isFastPurchaseCardsOrder = true;
                            this.setState({
                                reloadGD: false,
                                externalOrderNo: props.data.Data.OrderId,
                                ProductPrice: props.data.Data.ProductPrice,
                                orderDetail: {
                                    ...this.state.orderDetail,
                                    Price: props.data.Data.ProductPrice,
                                },
                                productInfo: props.data.Data,
                                isFastPurchaseCardsOrder
                            });
                        } else {
                            this.setState({
                                reloadGD: false,
                                externalOrderNo: props.data.Data.OrderId,
                                ProductPrice: props.data.Data.ProductPrice,
                                orderDetail: {
                                    ...this.state.orderDetail,
                                    Price: props.data.Data.ProductPrice,
                                },
                                reload2: true, // templateAction
                            });
                            props.templateAction({
                                tempID: props.TemplateId
                            });
                        }
                    } else {
                        this.hideDetailModal();
                        this.setState({
                            reloadGD: false,
                        });
                    };
                    props.data.source = '';
                    break;
                case 'FastPurchaseDirectOrder':
                    let { locationOrderid } = this.state;
                    if (props.data.Status == 200) {
                        locationOrderid = props.data.Data.Context;
                        props.getData({
                            SerialNumber: locationOrderid,
                            url: FL.PATH.API.show,
                            source: 'show',
                        });
                        this.setState({
                            locationOrderid,
                            current: 1,
                        });
                    } else {
                        this.setState({
                            reloadGD: false,
                        });
                        this.hideDetailModal();
                    }
                    props.data.source = '';
                    break;
                case 'show':
                    if (props.data.Status == 200) {
                        if (props.data.Data.Status != '已接单' && props.data.Data.Status != '准备中') {
                            const { isFastPurchaseCardsOrder } = this.state;
                            let orderDetail = {};
                            // if(isFastPurchaseCardsOrder){
                            //     orderDetail = props.data.Data;
                            // }else{
                            //     orderDetail = props.data.Data;
                            // }
                            orderDetail = props.data.Data;
                            this.setState({
                                orderDetail,
                                reloadGD: false,
                            });
                        } else {
                            let { locationOrderid } = this.state;
                            //setTimeout(function(){
                            props.getData({
                                SerialNumber: locationOrderid,
                                url: FL.PATH.API.show,
                                source: 'show',
                            });
                            //}, 3000);
                        }
                    } else {
                        this.setState({
                            reloadGD: false,
                        });
                    }
                    props.data.source = '';
                    break;
                default:
                    break;
            }
        }
    },
    getOptions(id, k) {
        let { m_Item2 } = this.state;
        k = parseInt(k) + 1;
        if (k > m_Item2[0].Items.length) return false;
        let selectTwo = m_Item2[0].Items[k].ItemValues;
        let selectOptions = [];
        for (let k in selectTwo) {
            if (selectTwo[k].ParentValueId == id) {
                selectOptions.push(selectTwo[k]);
            }
        }
    },
    purchaseinstant1() {
        const { props } = this;
        props.getData({
            string: props.text.ProductCode,
            url: FL.PATH.API.GetProductInfo,
            source: 'GetProductInfo',
        });

        this.setState({
            modalVisible: true,
            purchaseChecked: true,
            FaceValue: props.text.FaceValue,
            ProductPrice: props.text.ProductPrice,
            DockType: props.text.DockType,
            DockAssociateCode: props.text.DockAssociateCode,
            DockAssociateName: props.text.DockAssociateName,
            ProductCode: props.text.ProductCode,
            ProductId: props.text.ProductId,
            reloadGD: true,
        });
    },
    hideDetailModal() {
        this.setState({
            modalVisible: false,
            current: 0
        })
    },
    cancelClick() {
        this.setState({
            modalVisible: false,
            current: 0
        })
    },
    next() {
        const { props } = this;
        const { isFastPurchaseCardsOrder } = this.state;
        let postData = {
            //TopupCount:this.state.topupCount,
            TopupCount: this.state.postData.TopupCount || this.state.topupCount,
            TopupAccount: this.state.postData.TopupAccount,
            ExternalOrderNo: this.state.externalOrderNo,
            //this.props.purchaseitems ? this.props.purchaseitems.OrderId:'',
            ProductCode: this.state.ProductCode,
            // this.props.purchaseitems ? this.props.purchaseitems.ProductKamenCode:'',
            TopupContent: JSON.stringify(this.state.postData.TopupContent),
        };
        if (isFastPurchaseCardsOrder) {
            props.getFastpurchase(postData);
            this.setState({
                reload: true,
            })
        } else {
            this.setState({
                reloadGD: true,
            });
            props.getData(Object.assign({
                url: FL.PATH.API.FastPurchaseDirectOrder,
                source: 'FastPurchaseDirectOrder',
            }, postData));
        }
    },

    changevalue(e) {
        e = typeof e == 'object' ? e.target.value : e;
        //if (e.target.value>0) {
        if (e > 0) {
            let price = this.state.ProductPrice ? this.state.ProductPrice : 0
            //this.props.purchaseitems?this.props.purchaseitems.ProductPrice:'0'
            let money = this.state.ProductPrice ? e * this.state.ProductPrice : 0;
            money = money.toFixed(4);
            this.setState({
                btntext: e + '个*' + price + '=' + money + '  确定购买',
                topupCount: e,
                radio: this.state.Rate ? this.state.FromCurrencyName + '' + this.state.Rate * e + '' + this.state.ToCurrencyName : '',
            })
        }
    },
    handleChange(value) {
        this.setState({
            inputValue: value.label
        })
    },
    render() {
        const { current } = this.state;
        const { props } = this;
        const { purchaseitems } = props || [];
        let purchasedata = [];
        const { isFastPurchaseCardsOrder } = this.state;
        if (purchaseitems) {
            purchasedata = purchaseitems
        }
        const columns = [
            { title: '序号', dataIndex: 'OverdueTime' },
            { title: '卡号', dataIndex: 'CardNumber' },
            { title: '密码', dataIndex: 'CardPassword' }
        ]
        return (
            <div>
                <div>
                    {/* 陈清电脑没有数据，测试不了，这里还需检验 */}
                    <A auth='commodityFastPurchase' authOpts={{ hint: '快速采购' }} onClick={this.purchaseinstant1}>
                        <Icon glyph={icons.kuaisucaigou} />
                    </A>
                    {/* <IconComponent title='快速采购' glyphIcon={icons.kuaisucaigou} disabled={this.props.disabled} click={this.purchaseinstant1}/> */}

                    <Modal title="订单详情" className='purchasemodel' width={904} visible={this.state.modalVisible} onOk={this.hideDetailModal} onCancel={this.hideDetailModal}>
                        <Spin spinning={this.props.isfetching == undefined ? false : this.props.isfetching}>
                            <div className='purchasediv'>
                                <Steps current={current} size='default' className='steptab'>
                                    <Step key='one' title='1、填写采购单' />
                                    <Step key='two' title='2、查收采购单' />
                                </Steps>
                                <Spin spinning={this.props.isfetching2 == undefined ? false : this.props.isfetching2}>
                                    <div className="steps-content" style={{ display: this.state.current == 0 ? 'block' : 'none' }}>
                                        <div className='step1'>
                                            <Row><Col>{purchasedata != [] ? purchasedata.ProductName : ''} </Col></Row>
                                            <Row>
                                                <Col span={8}>
                                                    面值：
                                   {this.state.FaceValue}
                                                </Col>
                                                <Col span={8}>
                                                    商品售价：
                                   {this.state.ProductPrice}
                                                </Col>
                                                <Col span={8}>
                                                    商品类型：
                                   {this.state.DockType}
                                                </Col>
                                            </Row>
                                            <Row className='suprow'>
                                                <Col>
                                                    供货商名称/ID:
                                    {this.state.DockAssociateName}({this.state.DockAssociateCode})
                                </Col>
                                            </Row>

                                            {
                                                this.state.tplId != '' ?
                                                    <ProductTpl valueChange={(value) => {
                                                        this.changevalue(value.TopupCount);
                                                        this.setState({ postData: value })
                                                    }} tplId={this.state.tplId} />
                                                    :
                                                    <Row className='padding'>
                                                        <Col span={8} className='purchasenum'>请选择采购数量</Col>
                                                        <Col span={8}><Input type='number' onChange={this.changevalue} /><span className='msg_num'>{this.state.errormsg}</span></Col>
                                                    </Row>
                                            }
                                            <Row className='padding'>
                                                <Col span={12} className='purchasenum'>
                                                    {this.state.current == 0 && <Button type="primary" onClick={() => this.next()}>{this.state.btntext}</Button>
                                                    }
                                                </Col>
                                                <Col span={6}>
                                                    <Button type='primary' className='cancelBtn' onClick={this.cancelClick}>取消</Button>
                                                </Col>
                                            </Row>

                                        </div>
                                    </div>
                                </Spin>
                                <div className='' style={{ display: this.state.current == 1 ? 'block' : 'none' }}>
                                    {/* <Row style={{textAlign:'center'}}>采购完成</Row> */}
                                    <Row>
                                        <Col span={12}>订单号：{this.state.orderDetail.Code}</Col>
                                        <Col span={8}>订单状态：{this.state.orderDetail.Status}</Col>
                                    </Row>
                                    <Row>{(this.state.orderDetail.IsFromSup ? this.state.orderDetail.SupDealPrice : this.state.orderDetail.Price) * this.state.orderDetail.Amount}元 = {this.state.orderDetail.Amount}(个) * {(this.state.orderDetail.IsFromSup ? this.state.orderDetail.SupDealPrice : this.state.orderDetail.Price)}元</Row>
                                    <Row>充值描述：{this.state.orderDetail.Remark}</Row>
                                    <Row>购买数量：{this.state.orderDetail.Amount}</Row>
                                    {!isFastPurchaseCardsOrder ?
                                        <Row>
                                            <Col span={6}>账号：{this.state.orderDetail.TopupAccount}</Col>
                                            {!isFastPurchaseCardsOrder && this.state.orderDetail.TemplateInfo ?
                                                <Col span={6}>游戏名称：{this.state.orderDetail.TemplateInfo.ChargeGame}</Col>
                                                : ''}
                                            {!isFastPurchaseCardsOrder && this.state.orderDetail.TemplateInfo ?
                                                <Col span={6}>大区：{this.state.orderDetail.TemplateInfo.ChargeRegion}</Col>
                                                : ''}
                                            {!isFastPurchaseCardsOrder && this.state.orderDetail.TemplateInfo ?
                                                <Col span={6}>服务器：{this.state.orderDetail.TemplateInfo.ChargeServer}</Col>
                                                : ''}
                                        </Row>
                                        : ''}
                                    {isFastPurchaseCardsOrder ? <Table rowKey='Id' columns={columns} dataSource={this.state.dataSource} /> : ''}

                                </div>
                            </div>
                        </Spin>
                    </Modal>
                </div>
            </div>
        )
    }
})

export default Purchaseinstant
