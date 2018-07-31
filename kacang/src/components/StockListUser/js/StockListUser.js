import React from 'react'
import { Row, Col, Form, Input, Select, Button, Radio, DatePicker, Modal, Spin, message } from 'antd';
import { Link } from 'react-router';
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

let Ponents = React.createClass({
    getInitialState(){
        return {
            ALinkComponent1: '',
            // 头部的Alink数据放此listForm
            listForm:{
                ALinkComponent1:[{
                    title:'全部',
                    indexStatus:''
                },{
                    title:'未售',
                    indexStatus:'1'
                },{
                    title:'已售',
                    indexStatus:'2'
                }],
            },
            modalVisible: false,
            postData:{
                condition:{
                    PageIndex:1,
                    PageNumber:1,
                    PageSize:5,
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
        props.getPasswordCardList( postData );
    },

    componentDidUpdate(){
        const {props} = this;
        const {RELOAD} = this.state;
        const {RELOAD1} = this.state;
        let that = this;

        if(props.batchUpdatePrepaidCardIsUseData.Status == '200' && RELOAD){
            message.success('批量更新成功');
            props.getPasswordCardList( that.state.postData );
            this.setState({RELOAD: false,selectedRowKeys:[]})
        }

        if(props.batchRemovePrepaidAccountData.Status == '200' && RELOAD1){
            message.success('批量删除成功');
            props.getPasswordCardList( that.state.postData );
            this.setState({RELOAD1: false,selectedRowKeys:[]})
        }else if(props.batchRemovePrepaidAccountData.Status == '500' && RELOAD1){
            this.setState({RELOAD1: false})
            message.error('失败， 返回 : '+props.batchRemovePrepaidAccountData.Message || props.batchRemovePrepaidAccountData.Status );
        }

    },
    setALinkComponent1(newState){
        const { props } = this
        this.setState({
            ALinkComponent1:newState
        });
        let postData = this.state.postData;
        postData.condition.Status = newState;
        props.getPasswordCardList( postData );
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
                    let selectedRows = salf.state.selectedRows;
                    for(var k in selectedRows){
                        arry.push(selectedRows[k].Id);
                    };
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
    render () {
        let { props } = this;
        //return false;
        let listForm = this.state.listForm;
        let dataSource = props.pwdCardListData.Data || [];
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol:{span:4},
            wrapperCol:{span:20},
        };
        const TotalRecords = props.pwdCardListData.TotalRecords;
        const pagination = {
            total: TotalRecords,
            showSizeChanger: true,
            pageSize:this.state.postData.condition.PageSize,
            onShowSizeChange: (current, pageSize) => {
                let postData = this.state.postData;
                postData.condition.PageIndex = current;
                postData.condition.PageSize = pageSize;
                this.setState({postData:postData})
                props.getPasswordCardList(postData)
            },
            onChange: (current,pageSize) => {
                let postData = this.state.postData;
                postData.condition.PageIndex = current;
                this.setState({postData:postData})
                props.getPasswordCardList(postData)
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
            title: '卡号',
            dataIndex: 'CardNumber'
        },{
            title: '密码',
            dataIndex: 'Password'
        },{
            title: '状态',
            dataIndex: 'Isuse'
        },{
            title: '面值',
            dataIndex: 'FaceValue'
        },{
            title: '进价',
            dataIndex: 'PurchaseValue'
        },{
            title: '有效期',
            dataIndex: 'ExpireDate'
        },{
            title: '导卡时间',
            dataIndex: 'ImportTime'
        },{
            title: '导卡人',
            dataIndex: 'CreatorName'
        },{
            title: '供货商',
            dataIndex: 'Supplier'
        },{
            title: '批次号',
            dataIndex: 'BatchCode'
        },{
            title: '操作',
            width:50,
            fixed:'right',
            render:(data)=>
                <div>
                    <IconComponent title='删除' glyphIcon={iDelete} click={ ()=>{this.delectAll(data.Id)} }/>
                </div>
            }
        ];
        return (
            <div>
                <Spin spinning = {props.isfetching}>
                    <h3 className='mb10'>卡密列表</h3>
                    <Filter type="default">
                        <FilterItem label="库存类型">
                            <ul>
                                {
                                    listForm.ALinkComponent1.map((list,index)=>{
                                        return <li key={index}><AlinkComponent showClass={list.indexStatus} selectState={this.state.ALinkComponent1} callbackAlink={this.setALinkComponent1} text={list.title}/></li>
                                    })
                                }
                            </ul>
                        </FilterItem>
                    </Filter>
                      <div style={{ marginBottom: 16 }}>
                          <Button type="primary" onClick={()=>{this.delectAll('')}} style={{marginRight:8}}>批量删除</Button>
                          <Button type="primary"><Link to={'/operation/stock/list/addcardpwd?id='+this.props.location.query.id+'&name='+this.props.location.query.name}>添加新卡密</Link></Button>
                      </div>
                      <Table rowKey={dataSource.UserName} columns={columns} rowSelection={rowSelection} dataSource={dataSource||[]} pagination={pagination} />
                  </Spin>
            </div>
        );
    }
});
Ponents = createForm()(Ponents);
export default Ponents
