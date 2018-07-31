import React from 'react'
import {Form,Input,Modal,Table,DatePicker,Col,Row,Spin,Select,Button,Icon ,Tabs} from 'antd'
import Filter,{FilterItem} from '../../Filter/js/Filter'
import '../less/supTransaction'
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import ShowDetailComponent from '../../../containers/ShowDetailComponent'
import FL from '../../../utils/FL'
import { DateRange } from '../../../utils/component'
const createForm = Form.create;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;

let SupTransaction = React.createClass({
    getInitialState(){
        let nowTime = new Date();
        let startTime=nowTime.getFullYear()+'-'+(nowTime.getMonth()+1)+'-'+(nowTime.getDate())+' '+'00:00:00'
        let endTime=nowTime.getFullYear()+'-'+(nowTime.getMonth()+1)+'-'+(nowTime.getDate())+' '+'23:59:59'
        return {
            visible:false,
            expand:false,
            // orderState:'',
            commodityType:'',
            orderStatus:'',
            SuspiciousCount:this.props.items.SuspiciousCount,
            listForm:FL.LINK.SUPTRANSACTION,
            OrderCode:'',   // 传给后端---订单编号
            ProductFrom:'',//传给后端---进货商户
            OrderFrom:'',//传给后端---订单客户
            ProductCode:'',//传给后端---商品编号
            ProductName:'',//传给后端---商品名称
            RechargeTo:'',//传给后端---充值账号
            RechargeFrom:'',//传给后端---调用账号
            Status:'-1',
            PageIndex:'1',
            PageSize: FL.PAGESIZE,
            // Stock:'',
            Category:'0', //商品类型
            searchList:FL.LINK.Suptransactionterm,
            TradeTimeFrom:startTime,
            TradeTimeTo:endTime,
            activeKey:'1',
            reloagd:false,
            activeKey: '1',
            reload:false,
        }
    },
    componentWillMount(){
        const {props} = this;
        const {state} = this;
        props.supTransactionAction({
            OrderCode: state.OrderCode,
            ProductFrom: state.ProductFrom,
            OrderFrom: state.OrderFrom,
            ProductCode: state.ProductCode,
            ProductName: state.ProductName,
            Status: state.Status,//订单状态
            RechargeTo: state.RechargeTo,
            RechargeFrom: state.RechargeFrom,
            Category: state.Category,
            TradeTimeFrom: state.TradeTimeFrom,
            TradeTimeTo: state.TradeTimeTo,
            PageIndex: state.PageIndex,
            PageSize: state.PageSize,
        })
        this.setState({
            reload:true
        })
    },

    onOrderStateClick(newState){  //订单状态点击
        this.setState({
            orderStatus:newState,
            Status:newState
        });
        const {props} = this;
        const {state} = this;
        props.supTransactionAction({
            OrderCode: state.OrderCode,
            ProductFrom: state.ProductFrom,
            OrderFrom: state.OrderFrom,
            ProductCode: state.ProductCode,
            ProductName: state.ProductName,
            Status: newState,
            RechargeTo: state.RechargeTo,
            RechargeFrom: state.RechargeFrom,
            Category:state.Category,
            TradeTimeFrom: state.TradeTimeFrom,
            TradeTimeTo: state.TradeTimeTo,
            PageIndex: state.PageIndex,
            PageSize: state.PageSize,
        })
    },
    onCommodityTypeClick(newState){ //商品类型点击
        this.setState({
            Category:newState
        })
        const {props} = this;
        const {state} = this;
        props.supTransactionAction({
            OrderCode: state.OrderCode,
            ProductFrom: state.ProductFrom,
            OrderFrom: state.OrderFrom,
            ProductCode: state.ProductCode,
            ProductName: state.ProductName,
            Status: state.Status,
            RechargeTo: state.RechargeTo,
            RechargeFrom: state.RechargeFrom,
            Category:newState,
            TradeTimeFrom: state.TradeTimeFrom,
            TradeTimeTo: state.TradeTimeTo,
            PageIndex: state.PageIndex,
            PageSize: state.PageSize,
        })
    },
    getDate(dateTime){ //更改date的格式
        let datee = new Date(dateTime);
        let year = datee.getFullYear(),
         month = datee.getMonth() + 1,
         date = datee.getDate(),
         hours = datee.getHours(),
         minutes = datee.getMinutes(),
         seconds = datee.getSeconds();
         return (year + '-' + month + '-' + date + ' '+ hours + ':' + minutes + ':' + seconds)
    },
    componentDidUpdate(){
        if(!this.props.isfetching&&this.state.reload){
            const { orderStatusNum }=this.props.items
            for (var i = 0; i < orderStatusNum.length; i++) {
                if(orderStatusNum[i]!=0){
                    this.setState({
                        activeKey:i+1+'',
                        reload:false
                    })
                    console.log(i+1+'')
                    return false
                }
            }
            if(i==orderStatusNum.length){
                this.setState({
                    activeKey:'1',
                    reload:false
                })
            }
        }
    },
    componentWillReceiveProps(nextProps){
        // if(nextProps.dataSource){
        //     switch(nextProps.dataSource[0].Status[1]){
        //         case '可疑订单':
        //         this.setState({
        //          activeKey:1
        //         })
        //         break;
        //         case '未处理':
        //         this.setState({
        //          activeKey:2
        //         })
        //         break;
        //         case '处理中':
        //         this.setState({
        //          activeKey:3
        //         })
        //         break;
        //         case '交易成功':
        //         this.setState({
        //          activeKey:4
        //         })
        //         break;
        //         case '交易失败':
        //         this.setState({
        //          activeKey:5
        //         })
        //         break;
        //         default:
        //             break;
        //     }
        // }


            // const {orderStatusNum} = nextProps.items
            // if(!this.state.reload){
            //     for(var i=0;i<orderStatusNum.length;i++){
            //         if(orderStatusNum[i]!=0){
            //             this.setState({
            //                 activeKey:i+1+'',
            //             })
            //             return false
            //         }
            //
            //     }
            // }


    },
    changeTabs(num){
        const {state} = this
        this.props.supTransactionAction({
            OrderCode: state.OrderCode,
            ProductFrom: state.ProductFrom,
            OrderFrom: state.OrderFrom,
            ProductCode: state.ProductCode,
            ProductName: state.ProductName,
            Status: num==1?'6':num+'',
            RechargeTo: state.RechargeTo,
            RechargeFrom: state.RechargeFrom,
            Category:state.Category,
            TradeTimeFrom: state.TradeTimeFrom,
            TradeTimeTo: state.TradeTimeTo,
            PageIndex: state.PageIndex,
            PageSize: state.PageSize,
        })
        this.setState({
            Status:num==6?'1':num+'',
            activeKey:num==6?'1':num+''
        })
    },
    handleSubmits(){
        this.props.form.validateFields((err,value)=>{
            if(err){
                return;
            }
            const {props} = this;
            const {state} = this;
            let tradeTimeFrom = value.TradeTime[0]?this.getDate(value.TradeTime[0]._d):''
            let tradeTimeTo = value.TradeTime[1]?this.getDate(value.TradeTime[1]._d):''
            if (tradeTimeFrom=='') {
                tradeTimeFrom=this.state.TradeTimeFrom
            }
            if (tradeTimeTo=='') {
                 tradeTimeTo=this.state.TradeTimeTo
            }
            props.supTransactionAction({
                OrderCode: value.OrderCode,
                ProductFrom: value.ProductFrom,
                OrderFrom: value.OrderFrom,
                ProductCode: value.ProductCode,
                ProductName: value.ProductName,
                Status: '-1',
                RechargeTo: value.RechargeTo,
                RechargeFrom: value.RechargeFrom,
                Category:state.Category,
                TradeTimeFrom: tradeTimeFrom,
                TradeTimeTo: tradeTimeTo,
                PageIndex: state.PageIndex,
                PageSize: state.PageSize,
            })
            this.setState({
                OrderCode: value.OrderCode,
                ProductFrom: value.ProductFrom,
                OrderFrom: value.OrderFrom,
                ProductCode: value.ProductCode,
                ProductName: value.ProductName,
                Status: state.Status,
                RechargeTo: value.RechargeTo,
                RechargeFrom: value.RechargeFrom,
                TradeTimeFrom: tradeTimeFrom,
                TradeTimeTo: tradeTimeTo,
                reload:true
            })
            // this.props.form.resetFields();
            // this.setState({
            //     visible:false,
            //     OrderCode:value.OrderCode,
            //     ProductFrom:value.ProductFrom,
            //     OrderFrom:value.OrderFrom,
            //     ProductCode:value.ProductCode,
            //     ProductName:value.ProductName,
            //     RechargeTo:value.RechargeTo,
            //     RechargeFrom:value.RechargeFrom})
        })
    },
    showModal(){
        this.setState({visible:true})
    },
    hideModal(){
        this.setState({visible:false})
    },
    handleReset(){
       this.props.form.resetFields();
    //    this.setState({visible:false})
    },
    handleChangeType(value){
        this.state.Category= `${value}`;
    },
    toggle() {
      const { expand } = this.state;
       this.setState({ expand: !expand });
    },
    render(){
        const {props,state} = this;
        let {isfetching} = props;

        const {getFieldDecorator} = props.form;
        const listForm = this.state.listForm;

        const formItemLayout = FL.FORMLAYOUTMEDIUM;
        const {items} = props
        const {orderStatusNum} = props.items
        if(!orderStatusNum){
            return false;
        }
        const Suspicious=orderStatusNum[0]?'可疑订单('+orderStatusNum[0]+')':'可疑订单(0)'
        const Untreated=orderStatusNum[1]?'未处理('+orderStatusNum[1]+')':'未处理(0)'
        const Processing=orderStatusNum[2]?'处理中('+orderStatusNum[2]+')':'处理中(0)'
        const Success=orderStatusNum[3]?'交易成功('+orderStatusNum[3]+')':'交易成功(0)'
        const Failed=orderStatusNum[4]?'交易失败('+orderStatusNum[4]+')':'交易失败(0)'
        const columns =[{
                title:'订单编号',
                dataIndex:'Id',
                width:200,
                fixed:'left',
                render:text =><ShowDetailComponent  auth={{ orderDetailTitle: 'supTransactionDetail', orderDetailLook: 'supTransactionDetail', copyClipboard: 'copyClipboard', exportExcel: 'exportExcel' }} text={text} orderNum={text}/>
            },{
                title:'商品名称',
                dataIndex:'Name',
                width:100,
                fixed:'left'
            },{
                title:'商品编码',
                dataIndex:'NameCode'
            },{
                title:'供货商户',
                dataIndex:'ProductFrom'
            },{
                title:'供货编号',
                dataIndex:'ProductFromCode'
            },{
                title:'订单客户',
                dataIndex:'OrderFrom'
            },{
                title:'订单客户编号',
                dataIndex:'OrderFromCode'
            },{
                title:'充值账号',
                dataIndex:'RechargeTo'
            },{
                title:'下单时间',
                dataIndex:'OrderTime'
            },{
                title:'数量',
                dataIndex:'Amount'
            },{
                title:'单价',
                dataIndex:'Price'
            },{
                title:'金额',
                dataIndex:'OrderPrice'
            },{
                title:'成本',
                dataIndex:'TotalCost'
            },{
                title:'利润',
                dataIndex:'LocalProfit'
            },{
                title:'订单状态',
                dataIndex:'Status',
                width:130,
                fixed:'right',
                render:text =>
                <ul>
                    <li>{text[1]}</li>
                    <li>
                        <ShowDetailComponent auth={{ orderDetailTitle: 'supTransactionDetail', orderDetailLook: 'supTransactionDetail', copyClipboard: 'copyClipboard', exportExcel: 'exportExcel' }} text="查看详情"  orderNum={text[0]}/>
                    </li>
                </ul>
        }];
        let {dataSource,TotalAmount} = items;
        const pagination = {
            total: TotalAmount,
            showSizeChanger: true,
            pageSize:state.PageSize,
            pageSizeOptions:['10','15','20','30'],
            onShowSizeChange: (current, pageSize) => {
                // this.setState({PageIndex:current,PageSize:pageSize})
                this.setState({PageSize:pageSize})
                props.supTransactionAction({
                    OrderCode: state.OrderCode,
                    ProductFrom: state.ProductFrom,
                    OrderFrom: state.OrderFrom,
                    ProductCode: state.ProductCode,
                    ProductName: state.ProductName,
                    Status: state.Status,//订单状态
                    RechargeTo: state.RechargeTo,
                    RechargeFrom: state.RechargeFrom,
                    Category: state.Category,
                    TradeTimeFrom: state.TradeTimeFrom,
                    TradeTimeTo: state.TradeTimeTo,
                    PageIndex: current,
                    PageSize: pageSize,
                })
            },
            onChange: (current,pageSize) => {
                // this.setState({PageIndex:current})
                props.supTransactionAction({
                    OrderCode: state.OrderCode,
                    ProductFrom: state.ProductFrom,
                    OrderFrom: state.OrderFrom,
                    ProductCode: state.ProductCode,
                    ProductName: state.ProductName,
                    Status: state.Status,//订单状态
                    RechargeTo: state.RechargeTo,
                    RechargeFrom: state.RechargeFrom,
                    Category: state.Category,
                    TradeTimeFrom: state.TradeTimeFrom,
                    TradeTimeTo: state.TradeTimeTo,
                    PageIndex: current,
                    PageSize: state.PageSize,
                })
            },
        };


        //搜索begin
        const Searchlist=this.state.searchList;

         const children = [];
            for (let i = 0; i < Searchlist.SearchText.length; i++) {
                {
                    switch (Searchlist.SearchText[i].type) {
                       case '0':
                        children.push(
                          <Col span={8} key={i}>
                            <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                                {getFieldDecorator(Searchlist.SearchText[i].ID,{
                                                  initialValue:''
                                              })(
                                            <Input type='text' size='default' disabled={Searchlist.SearchText[i].disabled}/>
                                          )}
                            </FormItem>
                        </Col>  );
                      break;
                      case '1':
                      children.push(
                        <Col span={8} key={i}>
                          <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                          { getFieldDecorator(Searchlist.SearchText[i].ID,{
                                            initialValue:'0'
                                        })(
                              <Select  size='default' onChange={this.handleChangeType} allowClear>
                                      {listForm.commodityType.map((list,index)=>{
                                          return <Option value={list.indexStatus} key={index} >{list.title}</Option>
                                      })}
                              </Select>
                                    )
                           }
                         </FormItem>
                     </Col> );
                     break;
                      case '2':
                        children.push(
                        <Col span={8} key={i}>
                          <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                           {getFieldDecorator(Searchlist.SearchText[i].ID,{
                              initialValue:[]
                             })(
                                <DateRange  showTime format = "YYYY/MM/DD HH:mm:ss"  size='default'/>
                            )
                         }
                        </FormItem>
                      </Col> );
                      break;
                    }
                }
             }
          const expand = this.state.expand;
         const shownCount = expand ? children.length : 6;
       //搜索end


        return (
                <div key = "form" >
                    <Spin spinning = {isfetching == false ? false:true}>
                        <div  className='searchdiv'>
                          <Form
                              className="ant-advanced-search-form"
                              onSubmit={this.handleSearch}
                         >
                        <Row gutter={40}>
                             {children.slice(0, shownCount)}
                        </Row>
                        <Row>
                           <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" onClick={this.handleSubmits}>搜索</Button>
                             <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                              重置
                             </Button>
                             <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                {expand ?'收起':''}更多条件 <Icon type={expand ? 'up' : 'down'} />
                             </a>
                            </Col>
                         </Row>
                        </Form>
                    </div>

                        {/* <Filter
                            type="default">
                            <FilterItem label="订单状态">
                                <ul>
                                    {
                                        listForm.orderStatus.map((list,index)=>{

                                            return  <li key={index}>
                                                    <AlinkComponent showClass={list.indexStatus} selectState={this.state.orderStatus||props.items.activeLi} callbackAlink={this.onOrderStateClick} text={list.title+ '('+props.items.orderStatusNum[index]+')'}/>
                                                </li>
                                        })
                                    }
                                </ul>
                            </FilterItem>
                            <FilterItem label="商品类型">
                                <ul>
                                    {listForm.commodityType.map((list,index)=>{
                                        return <li key={index}>
                                            <AlinkComponent showClass={list.indexStatus} selectState={this.state.Category} callbackAlink={this.onCommodityTypeClick} text={list.title}/>
                                        </li>
                                    })}
                                </ul>
                            </FilterItem>
                            <FilterItem label="其它">
                                <a href="javascript:;" onClick={this.showModal}>更多筛选条件</a>
                                <Modal title="更多筛选条件" width={760} visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                                    <Form horizontal>
                                        <Row gutter={16}>
                                            <Col sm={12}>
                                                <FormItem  {...formItemLayout} label="订单编号">
                                                    {getFieldDecorator('OrderCode',{
                                                        initialValue:''
                                                    })(
                                                        <Input type="text" autoComplete="off" />
                                                    )}
                                                </FormItem>
                                                <FormItem label="进货商户" {...formItemLayout}>
                                                    {getFieldDecorator('ProductFrom',{
                                                        initialValue:''
                                                    })(
                                                        <Input type="text" autoComplete="off" />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col sm={12}>
                                                <FormItem label="订单客户" {...formItemLayout}>
                                                    {getFieldDecorator('OrderFrom',{
                                                        initialValue:''
                                                    })(
                                                        <Input type="text" autoComplete="off" />
                                                    )}
                                                </FormItem>
                                                <FormItem label="商品编号" {...formItemLayout}>
                                                    {getFieldDecorator('ProductCode',{
                                                        initialValue:''
                                                    })(
                                                        <Input type="text" autoComplete="off" />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col sm={12}>
                                                <FormItem label="商品名称" {...formItemLayout}>
                                                    {getFieldDecorator('ProductName',{
                                                        initialValue:''
                                                    })(
                                                        <Input type="text" autoComplete="off" />
                                                    )}
                                                </FormItem>
                                                <FormItem  {...formItemLayout} label="交易时间">
                                                    {getFieldDecorator('TradeTime',{
                                                        initialValue:''
                                                    })(
                                                        <RangePicker showTime format="YYYY/MM/DD HH:mm:ss"/>
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col sm={12}>
                                                <FormItem label="充值账号" {...formItemLayout}>
                                                    {getFieldDecorator('RechargeTo',{
                                                        initialValue:''
                                                    })(
                                                        <Input type="text" autoComplete="off" />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col sm={12}>
                                                <FormItem label="调用账号" {...formItemLayout}>
                                                    {getFieldDecorator('RechargeFrom',{
                                                        initialValue:''
                                                    })(
                                                        <Input type="text" autoComplete="off" />
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Modal>
                            </FilterItem>
                        </Filter> */}
                        <Tabs defaultActiveKey="1" onChange={this.changeTabs} activeKey={this.state.activeKey}>
                            <TabPane tab={Suspicious} key="1"></TabPane>
                            <TabPane tab={Untreated} key="2"></TabPane>
                            <TabPane tab={Processing} key="3"></TabPane>
                            <TabPane tab={Success} key="4"></TabPane>
                            <TabPane tab={Failed} key="5"></TabPane>
                        </Tabs>
                        <Table className="supTransactionBody" columns={columns} dataSource={dataSource||[]} scroll={{x:1300}} pagination={pagination}/>
                    </Spin>

                </div>

        )
    }
})
SupTransaction = createForm()(SupTransaction);
export default SupTransaction
