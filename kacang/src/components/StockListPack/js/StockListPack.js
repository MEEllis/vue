import React from 'react'
import { Row, Col, Form, Input, Select, Button, Radio, DatePicker, Modal, Spin, message } from 'antd';
import { Link } from 'react-router';
import { Table, Tabs, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { v4 } from 'node-uuid';
import Filter, { FilterItem } from '../../Filter/js/Filter';
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import FL from '../../../utils/FL'
import {
    iDelete,
    iEdit,
    iUnconnect
} from '../../Icon/js/Icon'
import '../../CardType/less/cardType.less'
import IconComponent from '../../IconComponent/js/IconComponent'
const createForm = Form.create;
const RangePicker = DatePicker.RangePicker;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const FormItem = Form.Item;

let Ponents = React.createClass({
    getInitialState(){
        return {
            modalVisible: false,
            postData:{
                condition:{
                    PageIndex:1,
                    PageNumber:1,
                    PageSize:3,
                    stockid:'',
                    Region:''
                }
            },
            selectedRowKeys : [],
            selectedRows: [],
            selectedRowsAll: [],
            RELOAD: false,
            RELOAD1: false,
            reload: true,
            tableSource : [],
            tableSourceAddStock: [],
            addStockTotalRecords: 0,
            selectTableSourceAddStock: [],
            listTotalRecords: 0,
        }
    },

    // componentWillMount(){
    //     const { props } = this
    //     let postData = this.state.postData;
    //     postData.condition.stockid = props.location.query.id;
    //     postData.packageStockId = props.location.query.id;
    //     postData.url = FL.PATH.API.GetRelationStocks;
    //     postData.source = 'GetPrepaidCardList';
    //     props.getData( postData );
    // },

    componentDidUpdate(){
        const {props} = this;
        const {reload} = this.state;
        let that = this;
        if( reload && !this.props.isfetching ){
            switch(props.data.source){
                case 'UnLinkStock':
                    if(props.data.Status == 200){
                        message.success('解除关联成功');
                        props.getData(  this.state.postData );
                    }else{
                        //message.error(props.data.Message);
                        this.setState({reload: false});
                    }
                    return false;
                  break;
                case 'GetPrepaidCardList':
                    this.setState({
                        tableSource: props.data.Data,
                        listTotalRecords: props.data.TotalRecords,
                        reload: false
                    });
                    break;
                case 'GetAddRelationStockList':
                    this.reSetSableSourceAddStock( this.state.selectedRowKeys, props.data.Data )
                    this.setState({
                        //tableSourceAddStock: props.data.Data,
                        addStockTotalRecords: props.data.TotalRecords,
                        reload: false
                    });
                    break;
                // 设置出库优先级
                case 'SaveRelationStockList':
                    if(props.data.Status == 200){
                        message.success('设置成功');
                        this.setState({modalVisible:false});
                        props.getData(  this.state.postData );
                        this.setState({
                            selectedRowKeys: [],
                            selectTableSourceAddStock: []
                        });
                    }else{
                        //message.error(props.data.Message);
                        this.setState({
                            reload: false
                        });
                    };
                    break;//
            }
        }
    },
    unLinkStock( data ){
        let salf = this;
        confirm({
            title:'是否要解除 '+data.Name+'('+data.Code+') 关联',
            onOk:function(){
                var postdata = {
                    stockId: data.Id,
                    url: FL.PATH.API.UnLinkStock,
                    packageStockId: salf.props.location.query.id,
                    source: 'UnLinkStock'
                };

                salf.props.getData( postdata );
                salf.setState({reload:true});
            },
            onCancel:function(){
            }
        })
    },
    addStock(){
        this.setState({modalVisible:true});
        let postData = {};
        Object.assign(postData, this.state.postData);
        postData.url = FL.PATH.API.GetAddRelationStockList;
        postData.source = 'GetAddRelationStockList';
        this.props.getData(postData);
        this.setState({reload: true});
    },
    onClose(){
        this.setState({modalVisible:false});
    },
    setClass(e, data){
        let dataSource = this.state.selectTableSourceAddStock;
        if(dataSource.length){
            for(let k in dataSource){
                if( dataSource[k].RelationId == data.Id ){
                    dataSource[k].Priority = e.target.value;
                    break;
                }
            }
        }

        this.setState({selectTableSourceAddStock:dataSource});
    },
    handleOk(){
        let arr = this.state.selectTableSourceAddStock;
        let postData = {
            ownerId: '34CF37F8-356D-4D45-84AE-243C02CF0F7E',
            packageStockId: this.props.location.query.id,
            stockRelationDataObjects: arr,
        }
        for(let k in arr){
            if(!arr[k].Priority){
                message.error('选中库存商品没有设置优先级');
                return false;
            }
        }
        postData.url = FL.PATH.API.SaveRelationStockList;
        postData.source = 'SaveRelationStockList';
        this.props.getData( postData );
        this.setState({
            reload: true
        });
    },
    reSetSableSourceAddStock( rowKeys, data ){
        let dataSource = data || this.state.tableSourceAddStock;
        let selectTableSourceAddStock = this.state.selectTableSourceAddStock;
        for(let k in dataSource){
            for(let j in rowKeys){
                dataSource[k].select = false;
                if(dataSource[k].Id == rowKeys[j]){
                    dataSource[k].select = true;
                    break;
                }
            }
            for(let i in selectTableSourceAddStock){
                if(selectTableSourceAddStock[i].RelationId == dataSource[k].Id){
                    dataSource[k].class = selectTableSourceAddStock[i].Priority;
                }
            }
        }
        this.setState({ tableSourceAddStock: dataSource });
    },
    render () {
        let { props } = this;
        //return false;
        let listForm = this.state.listForm;
        let dataSource = [];
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol:{span:4},
            wrapperCol:{span:20},
        };
        const TotalRecords = this.state.addStockTotalRecords;
        const pagination = {
            total: TotalRecords,
            showSizeChanger: false,
            pageSize:this.state.postData.condition.PageSize,
            onShowSizeChange: (current, pageSize) => {
                let postData = {condition:{}};
                Object.assign(postData.condition, this.state.postData.condition)
                postData.url = FL.PATH.API.GetAddRelationStockList;
                postData.source = 'GetAddRelationStockList';
                postData.packageStockId = props.location.query.id;
                postData.condition.PageNumber = current;
                postData.condition.PageSize = pageSize;
                props.getData(postData);
                this.setState({reload: true});
            },
            onChange: (current,pageSize) => {
                let postData = {condition:{}};
                Object.assign(postData.condition, this.state.postData.condition)
                postData.url = FL.PATH.API.GetAddRelationStockList;
                postData.source = 'GetAddRelationStockList';
                postData.packageStockId = props.location.query.id;
                postData.condition.PageNumber = current;
                props.getData(postData);
                this.setState({reload: true});
            },
        };

        let columns = [{
            title: '关联库存编号',
            dataIndex: 'Code'
        },{
            title: '关联库存名称',
            dataIndex: 'Name'
        },{
            title: '库存面值',
            dataIndex: 'FaceValue'
        },{
            title: '库存状态',
            dataIndex: 'Status'
        },{
            title: '库存数量',
            dataIndex: 'StockCount'
        },{
            title: '出库优先级',
            dataIndex: 'Sort'
        },{
            title: '操作',
            width:50,
            fixed:'right',
            render:(data)=>
                <div>
                    <IconComponent title='解除关联' glyphIcon={iUnconnect} click={ ()=>{this.unLinkStock(data)} }/>
                </div>
            }
        ];
        let columnsAddStock = [{
            title: '库存编号',
            dataIndex: 'Code'
        },{
            title: '库存名称',
            dataIndex: 'Name'
        },{
            title: '库存面值',
            dataIndex: 'FaceValue'
        },{
            title: '出库优先级',
            //dataIndex: 'Status',
            render:(data) =>
                <div>
                    {
                        data.select ? <Input defaultValue={data.class} onChange = { (e) => {this.setClass(e, data)} } /> : ''
                    }
                    {/* <Icon
                      type="edit"
                      className="editable-cell-icon"
                      onClick={this.edit}
                    /> */}
                </div>
        }];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
             selectedRowKeys,
             onChange: (selectedRowKeys) => {
                 this.reSetSableSourceAddStock(selectedRowKeys);
                 let selectTableSourceAddStock = this.state.selectTableSourceAddStock, newSelectTableSourceAddStock = [];
                 for(let k in selectedRowKeys){
                     for(let i in selectTableSourceAddStock){
                         if(selectedRowKeys[k] == selectTableSourceAddStock[i].RelationId){
                             newSelectTableSourceAddStock.push(selectTableSourceAddStock[i]);
                             break;
                         }
                         if(i == selectTableSourceAddStock.length-1){
                             newSelectTableSourceAddStock.push({
                                 RelationId: selectedRowKeys[k],
                                 Priority: ''
                             })
                         }
                     };
                     if(!selectTableSourceAddStock.length){
                         newSelectTableSourceAddStock.push({
                             RelationId: selectedRowKeys[k],
                             Priority: ''
                         })
                     }
                 }
                 this.setState({ selectedRowKeys, selectTableSourceAddStock: newSelectTableSourceAddStock });
             },
        };

        return (
            <div>
                <Spin spinning = {props.isfetching}>
                    <h3 className='mb10'>库存包列表</h3>
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={this.addStock}>添加新库存</Button>
                    </div>
                    <Table columns={columns} dataSource={this.state.tableSource} />
                    <Modal
                        onClose={this.onClose}
                        title="添加新库存"
                        visible={this.state.modalVisible}
                        footer={[
                            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                              保存
                            </Button>,
                        ]}>
                            <Spin spinning = {props.isfetching}>
                                <div className="modal-demo-content">
                                    <Table rowKey={this.state.tableSourceAddStock.Id} rowSelection={rowSelection} columns={columnsAddStock} dataSource={this.state.tableSourceAddStock} pagination={pagination} />
                                </div>
                            </Spin>
                      </Modal>
                </Spin>
            </div>
        );
    }
});
Ponents = createForm()(Ponents);
export default Ponents
