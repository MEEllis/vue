import React from 'react'
import { Row, Col, Form, Input, Select, Button, Radio, DatePicker, Modal, Spin, message } from 'antd';
import { Link, browserHistory } from 'react-router';
import { Table, Tabs } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { v4 } from 'node-uuid';
import Filter, { FilterItem } from '../../Filter/js/Filter';
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import FL from '../../../utils/FL'
import Icon, {
    iDelete,
    iEdit,
} from '../../Icon/js/Icon'
import '../../CardType/less/cardType.less'
import IconComponent from '../../IconComponent/js/IconComponent'
const createForm = Form.create;
const RangePicker = DatePicker.RangePicker;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const FormItem = Form.Item;

import StockListAdd from '../../../containers/StockListAdd'

let StockList = React.createClass({
    getInitialState(){
        return {
            commidityType:'',
            stockStatus:'',
            stockDock:'',
            modalVisible: false,
            postData:{
                condition:{
                    PageIndex:1,
                    PageNumber:1,
                    PageSize:2,
                    stockid:'',
                    Region:''
                }
            },
            selectedRowKeys : [],
            RELOAD: false,
            RELOAD1: false,
        }
    },

    componentWillMount(){
        const { props } = this
        let postData = this.state.postData;
        postData.condition.stockid = props.location.query.id;
        props.getPrepaidCardList( postData );
    },

    componentDidUpdate(){
        const {props} = this;
        const {RELOAD} = this.state;
        const {RELOAD1} = this.state;
        let that = this;

        if(props.batchUpdatePrepaidCardIsUseData.Status == '200' && RELOAD){
            message.success('批量更新成功');
            props.getPrepaidCardList( that.state.postData );
            this.setState({RELOAD: false,selectedRowKeys:[]})
        }

        if(props.batchRemovePrepaidAccountData.Status == '200' && RELOAD1){
            message.success('批量删除成功');
            props.getPrepaidCardList( that.state.postData );
            this.setState({RELOAD1: false,selectedRowKeys:[]})
        }else if(props.batchRemovePrepaidAccountData.Status == '500' && RELOAD1){
            this.setState({RELOAD1: false})
            message.error('失败， 返回 : '+props.batchRemovePrepaidAccountData.Message || props.batchRemovePrepaidAccountData.Status );
        }

    },
    // 点击删除按钮，弹出确认框
    deleteCommodity(id){
        confirm({
            title:'您是否确认删除这项内容',
            onOk:function(){
            },
            onCancel:function(){
            }
        })
    },
    delectAll( id ) {
        let salf = this;
        confirm({
            title:'您是否确认删除这项内容',
            onOk:function(){
                salf.setState({RELOAD1: true});
                let arry = [];
                if(id){
                    //删除单个
                    arry.push(id);
                }else{
                    //删除多个
                    arry = salf.state.selectedRowKeys;
                }
                var postdata = {
                    ownerId: '34CF37F8-356D-4D45-84AE-243C02CF0F7E',
                    cardIds: arry,
                    stockId: salf.props.location.query.id
                };
                salf.props.getBatchRemovePrepaidAccount( postdata );
            },
            onCancel:function(){
            }
        })
    },
    getBatchUpdatePrepaidCardIsUse(isuse){
        this.setState({RELOAD: true});
        let {selectedRowKeys} = this.state;
        var postdata = {
            ownerId: '34CF37F8-356D-4D45-84AE-243C02CF0F7E',
            cardIds: selectedRowKeys,
            isuse: isuse
        };
        this.props.getBatchUpdatePrepaidCardIsUse( postdata );
    },
    render () {
        let { props } = this;
        let dataSource = props.cardListData.Data || [];
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol:{span:4},
            wrapperCol:{span:20},
        };
        const TotalRecords = props.cardListData.TotalRecords;
        const pagination = {
            total: TotalRecords,
            showSizeChanger: true,
            pageSize:this.state.postData.condition.PageSize,
            onShowSizeChange: (current, pageSize) => {
                let {postData} = this.state;
                postData.condition.PageIndex = current;
                postData.condition.PageSize = pageSize;
                this.setState({postData:postData})
                props.getPrepaidCardList(postData)
            },
            onChange: (current,pageSize) => {
                let {postData} = this.state;
                postData.condition.PageIndex = current;
                this.setState({postData:postData})
                props.getPrepaidCardList(postData)
            },
        };
        const { selectedRowKeys } = this.state;
        const rowSelection = {
             selectedRowKeys,
             onChange: (selectedRowKeys, selectedRows) => {
                 this.setState({ selectedRowKeys, selectedRows });
             }
        };
        let columns = [{
            title: '账号',
            dataIndex: 'UserName'
        },{
            title: '密码',
            dataIndex: 'PassWord'
        },{
            title: '状态',
            dataIndex: 'Isuse'
        },{
            title: '价格',
            dataIndex: 'Price'
        },{
            title: '调用顺序',
            dataIndex: 'Sequence'
        },{
            title: '修改时间',
            dataIndex: 'UpdateTime'
        },{
            title: '修改人',
            dataIndex: 'UpdatorName'
        },{
            title: '矩阵',
            dataIndex: 'EnableSecret'
        },{
            title: '操作',
            width:70,
            fixed:'right',
            render:(data)=>
                <div>
                    <span style={{paddingRight:'15px'}} ><IconComponent title='修改' glyphIcon={iEdit} click={()=>{
                        browserHistory.push({
                            pathname: '/operation/stock/list/add',
                            query: {
                                cardId: data.Id,
                                id: this.props.location.query.id,
                                name: this.props.location.query.name,
                                username: this.props.location.query.username,
                                source: '/operation/stock/list/card'
                            }
                        })
                    }} /></span>
                    <IconComponent title='删除' glyphIcon={iDelete} click={ ()=>{this.delectAll(data.Id)} }/>
                </div>
            }
        ];
        return (
            <div>
                <Spin spinning = {props.isfetching}>
                      <div className={'mb10'}>{this.props.location.query.username}</div>
                      <div style={{ marginBottom: 16 }}>
                          <Button type="primary" onClick={()=>{this.delectAll('')}} style={{marginRight:8}}>批量删除</Button>
                          <Button type="primary" onClick={()=>{this.getBatchUpdatePrepaidCardIsUse(true)}} style={{marginRight:8}}>批量更新为已用完</Button>
                          <Button type="primary" onClick={()=>{this.getBatchUpdatePrepaidCardIsUse(false)}} style={{marginRight:8}}>批量更新为未用完</Button>
                          <Button type="primary"><Link to={'/operation/stock/list/add?id='+this.props.location.query.id+'&name='+this.props.location.query.name}>添加新账号</Link></Button>
                          <StockListAdd locationData={this.props.location.query} />
                  </div>
                      <Table columns={columns} rowSelection={rowSelection} dataSource={dataSource||[]} pagination={pagination} />
                  </Spin>
            </div>
        );
    }
});

StockList = createForm()(StockList);
export default StockList
