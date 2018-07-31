import React from 'react'
import {
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Select,
    Table,
    Spin,
    Alert,
    Tooltip,
    Modal,
    DatePicker
} from 'antd';
import { DateRange} from '../../../utils/component'
import '../less/apiSales'
import ShowDetailComponent from '../../../containers/ShowDetailComponent'
import moment from 'moment'
import 'moment/locale/zh-cn'
const FormItem = Form.Item;
const Option = Select.Option;

class ApiSalesForm extends React.Component {
    constructor(props) {
        let nowTime = new Date();
        let startTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()) + ' ' + '00:00:00';
        let endTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()) + ' ' + '23:59:59';
        super(props);
        this.state = {
            dateStr:[startTime,endTime],
            startTime:startTime,
            endTime:endTime,
            postCondition: {
                condition: {
                    OrderCode: '',
                    ProductCode: '',
                    ProductName: '',
                    TradeTimeFrom: startTime,
                    TradeTimeTo: endTime,
                    Status: -1,
                    RechargeTo: '',
                    ExternalOrderNumber: '',
                    ConsumerCode: '',
                    PageIndex: 1,
                    PageSize: 10
                }
            },
        };
    }
    changeTime = (dates,dateString)=>{
        var dateStr = Array(2)
        for (var i = 0; i < dateString.length; i++) {
            if(i==0&&dateString[i]){
                dateStr[0] = dateString[i].split(' ')[0]+' 00:00:00';
            }else if(i==1&&dateString[i]){
                dateStr[1] = dateString[i].split(' ')[0]+' 23:59:59';
            }
        }
        this.setState({
            dateStr
        })
    }
    componentWillMount() {
        this.props.getApiSales(this.state.postCondition)
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
            let nowTime = new Date();
            let startTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()) + ' ' + '00:00:00';
            let endTime = nowTime.getFullYear() + '-' + (nowTime.getMonth() + 1) + '-' + (nowTime.getDate()) + ' ' + '23:59:59';
            let data = {
                'condition': {
                    OrderCode: values.OrderCode || '',
                    ProductCode: values.ProductCode || '',
                    ProductName: values.ProductName || '',
                    TradeTimeFrom: values.TradeTime && values.TradeTime[0]
                        ? this.getDate(values.TradeTime[0])
                        : startTime,
                    TradeTimeTo: values.TradeTime && values.TradeTime[0]
                        ? this.getDate(values.TradeTime[1])
                        : endTime,
                    Status: values.Type,
                    RechargeTo: values.RechargeTo || '',
                    ExternalOrderNumber: values.ExternalOrderNumber || '',
                    ConsumerCode: values.ConsumerCode || '',
                    PageIndex: 1,
                    PageSize: 10
                }
            }
            this.setState({
                postCondition: data
            })
            this.props.getApiSales(data)
        });

    }
    // changeTime(dates){
    //     const {moment} = this.state
    //     for (var i = 0; i < dates.length; i++) {
    //         this.setState({
    //             moment:moment.push(datas[i])
    //         })
    //     }
    //     console.log(moment)
    // }
    handleReset = () => {
        this.props.form.resetFields();
    }
    render() {
        const { props } = this
        const { getFieldDecorator } = this.props.form;
        const { Data } = this.props.apiSales.data
        // let dataSource = this.props.
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 18
            }
        };
        //判断是否有剪切板功能
        let flag = false;
        // if (props.permission.isAdmin) {
        //     flag = true;
        // }
        // else {
        //     //如果有子集
        //     if (props.permission.children[0]) {
        //         //最外层数据
        //         var arrTopInfo = props.permission.children;
        //         for (var i = 0, len = arrTopInfo.length; i < len; i++) {
        //             //如果是查看详情
        //             if (props.permission.children[i].title == '销售订单详情') {
        //                 //里层数据
        //                 var arrChidrenInfo = props.permission.children[i].children;
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
        let columns = [
            {
                title: '卡门网订单号',
                dataIndex: 'Code',
                render: (text) =>
                    <ShowDetailComponent auth={{ orderDetailTitle: 'apiSalesDetail', orderDetailLook: 'apiSalesDetail', copyClipboard: 'copyClipboard', exportExcel: 'exportExcel' }} isAuthority={flag} text={text} orderNum={text} />
            }, {
                title: '外部订单号',
                dataIndex: 'ExternalOrderNumber',
            }, {
                title: '商品名称',
                dataIndex: 'NameCode'
            }, {
                title: '数量金额',
                dataIndex: 'Amount'
            }, {
                title: '云接口商户/编号',
                dataIndex: 'MerchantCode'
            }, {
                title: '充值账号',
                dataIndex: 'RechargeTo'
            }, {
                title: '下单时间',
                dataIndex: 'OrderTime'
            }, {
                title: '成本',
                dataIndex: 'TotalCost'
            }, {
                title: '利润',
                dataIndex: 'LocalProfit'
            }, {
                title: '订单状态',
                dataIndex: 'State'
            }
        ];
        // if(this.props.permission.isAdmin||this.props.permission.items['销售订单详情']){
        //     columns[0].render=function(text){
        //         return <ShowDetailComponent isAuthority={flag}  text={text} orderNum ={text}/>
        //     }
        // }
        const isfetching = this.props.apiSales.isfetching
        let dataSource = []
        if (!Data)
            return false
        Data.Items.map((item, i) => dataSource.push({
            key: i,
            Code: item.Code,
            ExternalOrderNumber: item.ExternalOrderNumber,
            NameCode: item.NameCode,
            Amount: `${item.Price}元${item.Amount}个=${(item.Price * item.Amount).toFixed(4)}元`,
            MerchantCode: `[${item.ConsumerName}]${item.ConsumerCode}`,
            RechargeTo: item.RechargeTo,
            OrderTime: item.OrderTime,
            TotalCost: item.TotalCost,
            LocalProfit: item.LocalProfit,
            State: item.Status
        }))
        const pagination = {
            total: Data.TotalAmount,
            showSizeChanger: true,
            pageSize: this.state.postCondition.condition.PageSize,
            onShowSizeChange: (current, pageSize) => {
                let postCondition = this.state.postCondition
                postCondition.condition.PageIndex = current
                postCondition.condition.PageSize = pageSize
                props.getApiSales(postCondition)
            },
            onChange: (current, pageSize) => {
                let postCondition = this.state.postCondition
                postCondition.condition.PageIndex = current
                props.getApiSales(postCondition)
            }
        };
        const title = [
            {
                title: '卡门网订单编号:',
                label: 'OrderCode'
            }, {
                title: '客户编号:',
                label: 'ConsumerCode'
            }, {
                title: '商品编号:',
                label: 'ProductCode'
            }, {
                title: '充值账号:',
                label: 'RechargeTo'
            }, {
                title: '外部订单号:',
                label: 'ExternalOrderNumber'
            }, {
                title: '商品名称:',
                label: 'ProductName'
            }
        ]
        const result = '订单数量' + Data.TotalAmount + '个，销售商品总数量' + Data.TotalProducts + '个.总成本为' + Data.TotalCost + '元，总销售额为' + Data.TotalSales + '元，总利润为' + Data.ProfitTotal + '元'
        const children = [];
        for (let i = 0; i < 6; i++) {
            children.push(
                <Col span={8} key={i}>
                    <FormItem {...formItemLayout} label={title[i].title}>
                        {getFieldDecorator(title[i].label)(<Input />)}
                    </FormItem>
                </Col>
            );
        }
        const shownCount = 6;
        const { dateStr } = this.state;
        return (
            <div className="apiSales">
                <Spin spinning={isfetching === false ? false : true}>
                    <div className='searchdiv' style={{
                        marginBottom: '20px'
                    }}>
                        <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                            <Row gutter={40}>
                                {children.slice(0, shownCount)}
                            </Row>
                            <Row gutter={40}>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label='订单状态'>
                                        {getFieldDecorator('Type', { initialValue: '-1' })(
                                            <Select id="select">
                                                <Option value="-1">全部</Option>
                                                <Option value="4">交易成功</Option>
                                                <Option value="5">交易失败</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={8}>
                                    <FormItem {...formItemLayout} label={'交易时间'}>
                                        {getFieldDecorator('TradeTime')(<DateRange showTime format="YYYY-MM-DD HH:mm:ss" placeholder={['开始日期', '结束日期']} onChange={this.changeTime} value={[moment(dateStr[0]), moment(dateStr[1])]}/>)}
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
                    <Table rowKey='key' columns={columns} dataSource={dataSource || []} pagination={pagination} />
                    <Alert
                        message="查询结果:"
                        description={result}
                        type="info"
                        style={{ marginTop: '10px' }}
                    />
                    {/* <div style={{marginTop:'10px'}}>查询结果：订单数量{Data.TotalAmount}个，销售商品总数量{Data.TotalProducts}个.总成本为{Data.TotalCost}元，总销售额为{Data.TotalSales}元，总利润为{Data.ProfitTotal}元</div> */}
                </Spin>
            </div>

        );
    }
}

const ApiSales = Form.create()(ApiSalesForm);

export default ApiSales
