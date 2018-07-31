import React from 'react'
import { Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, Table, Spin, message } from 'antd';
import { Link, browserHistory } from 'react-router';
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
const createForm = Form.create;
import FL from '../../../utils/FL'

import Icon, {
    iDelete,
    iEdit,
} from '../../Icon/js/Icon'
import '../../CardType/less/cardType.less'
import IconComponent from '../../IconComponent/js/IconComponent'

let StockListAdd = React.createClass({
    getInitialState(){
        return {
            stockType:['卡密', '在线'],
            stockTypeVal:'卡密',
            selectedRowKeys: '',
            selectedRows: [],
            PostData:{
                condition:{
                    PageIndex:1,
                    PageNumber:1,
                    PageSize:5,
                }
            },
            dataSource: [],
            enablesecret: false,
            reload: false,
        }
    },
    componentWillMount(){
        //
        var postdata = {
            ownerId: '34CF37F8-356D-4D45-84AE-243C02CF0F7E',
            cardId: this.props.location.query.id
        };
        //this.props.getPrepaidCardsById(postdata);
        // this.props.getStockList({
        //     ownerId: '34CF37F8-356D-4D45-84AE-243C02CF0F7E',
        //     condition: {
        //         type: 2
        //     }})
    },
    componentDidUpdate(){
        const {props} = this;
        const {reload} = this.state;
        let that = this;
        if( reload && !this.props.isfetching ){
            switch(props.data.source){
                case 'ModifyPrepaidAccount':
                case 'AddPrepaidAccount':
                    if(props.data.Status == 200){
                        if( props.data.source == 'AddPrepaidAccount'){
                            message.success('添加成功');
                        }else{
                            message.success('修改成功');
                        };
                        browserHistory.push({
                            pathname: '/operation/stock/list/card',
                            query: {
                                id: props.location.query.id,
                                name: props.location.query.name,
                                username: this.props.location.query.username
                            }
                        })
                    }else{
                        //message.error(props.data.Message);
                    }
                    this.setState({
                        reload: false,
                    });
                  break;
            }
        }
    },
    handleSelectChange(data){
        let itemStockType = [];
        switch(data){
            case '1':
                itemStockType = ['卡密', '在线'];
            break;
            case '2':
                this.props.getStockPackList( this.state.PostData );
                itemStockType = ['卡密'];
            break;
            case '3':
                itemStockType = ['在线'];
            break;
        };
        this.setState({
            stockType: itemStockType,
            stockTypeVal: itemStockType[0]
        })
    },
    removeSetClass( index, id ){
        let itemSelectedRows = this.state.selectedRows;
        let itemSelectedRowKeys = this.state.selectedRowKeys;
        itemSelectedRows.splice(index, 1);
        itemSelectedRowKeys.splice(index, 1);

        this.setState({
            selectedRows: itemSelectedRows,
            selectedRowKeys: itemSelectedRowKeys
        });

    },
    setClass(e, index){

        let itemSelectedRows = this.state.selectedRows;
        itemSelectedRows[index].a = e.target.value;
        this.setState({
            selectedRows: itemSelectedRows
        });
    },
    handleSelectStockTypeValChange( data ){
        this.setState({
            stockTypeVal: data,
        })
    },
    postData(){
        this.props.form.validateFields((err,value)=>{
            if(err){
                return false;
            };
            let postData = {
                url: FL.PATH.API.AddPrepaidAccount,
                source: 'AddPrepaidAccount',
                ownerId: '34CF37F8-356D-4D45-84AE-243C02CF0F7E',
                dto: value
            };
            let cardId = this.props.location.query.cardId;
            if(cardId){
                postData.url = FL.PATH.API.ModifyPrepaidAccount;
                postData.source = 'ModifyPrepaidAccount';
                postData.cardId = cardId;
            };
            this.props.getData(postData);
            this.setState({
                reload: true,
            })
            return false;
        });
    },
    selectStock(){
        this.props.form.validateFields((err,value)=>{
            let postData = this.state.PostData;
            postData.condition.name = value.selectStockName;
            this.props.getStockPackList( this.state.PostData );
            postData.condition.name = '';
        });
    },
    displayAllStock(){
        this.props.getStockPackList( this.state.PostData );
    },
    enablesecret(enablesecret){
        enablesecret = enablesecret && enablesecret != 'false' ? true : false;
        this.setState({enablesecret})
    },
    render () {
        const stockType = this.state.stockType;
        const { selectedRowKeys } = this.state;
        const { getFieldDecorator } = this.props.form;
        const stockList = this.props.stockListData.Data || [];
        //const StockIdSelect = stockList.length > 0 ? stockList[0].Id : '';
        // undefined
        let {isfetching} = this.props

        const rowSelection = {
             selectedRowKeys,
             onChange: (selectedRowKeys) => {
                 // onChange中原本有selectedRows，但是它和selectedRowKeys排列顺序不同？
                 let stockPackListData = this.props.stockPackListData.Data;
                 let selectedRows = []
                 for(let k in selectedRowKeys){
                     selectedRows.push(stockPackListData[selectedRowKeys[k]]);
                 }
                 this.setState({ selectedRowKeys, selectedRows });
             }
        };

        const formItemLayout = {
            labelCol:{span:4},
            wrapperCol:{span:12},
        };

        return (
            <div>
                <Spin spinning = { isfetching }>
                    <Form style={{marginBottom:10}}>
                        <FormItem
                            {...formItemLayout}
                            label='选择库存归属' >

                            {getFieldDecorator('StockId',{
                                initialValue: this.props.location.query.id,
                                disabled: true
                            })(
                                <Select id="select" size="large" disabled={true}>
                                    <Option value={this.props.location.query.id} >{this.props.location.query.name}</Option>
                                    {/* {
                                        stockList.map((list, index)=>{
                                            return <Option key={index} value={list.Id}>{list.Name}</Option>
                                        })
                                    } */}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='直储帐号用户名' >

                            {getFieldDecorator('Username',{
                                initialValue:''
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='直储帐号密码' >

                            {getFieldDecorator('Password',{
                                initialValue:''
                            })(
                                <Input type='PassWord' />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='所属区域' >

                            {getFieldDecorator('Region',{
                                initialValue: this.props.location.query.region || '全国'
                            })(
                                <Select id="select" size="large">
                                    {FL.REGION.map((list, index)=>{
                                        return <Option key={index} value={list.value}>{list.name}</Option>
                                    })}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='进货价格' >

                            {getFieldDecorator('Price',{
                                rules: [{
                                 required: true, message: '请输入价格',
                               }],
                                initialValue:''
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='调用顺序' >

                            {getFieldDecorator('Sequence',{
                                rules: [{
                                 required: true, message: '请输入调用顺序',
                               }],
                                initialValue:''
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='查询账号用户名' >

                            {getFieldDecorator('Guestname',{
                                initialValue:''
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='查询账号密码' >

                            {getFieldDecorator('Guestpwd',{
                                initialValue:''
                            })(
                                <Input type='PassWord' />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label='是否需要密保卡' >

                            {getFieldDecorator('Enablesecret',{
                                initialValue:'false'
                            })(
                                <Select id="select" size="large" onChange={this.enablesecret}>
                                    <Option value="false">不需要</Option>
                                    <Option value="true">需要</Option>
                                </Select>
                            )}
                        </FormItem>
                        {
                            this.state.enablesecret ?
                                    <FormItem
                                        {...formItemLayout}
                                        label='密保卡' >

                                        {getFieldDecorator('Secretcard',{
                                            initialValue:''
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                : ''
                        }

                        <FormItem
                            {...formItemLayout}
                            label='供应商名称' >

                            {getFieldDecorator('Supplier',{
                                initialValue:''
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem wrapperCol={{ span: 6, offset: 2 }}>
                            <Button className={'mr10'} type="primary" htmlType="button" size="large" onClick={this.postData}>提交</Button>
                            <Button type="primary" htmlType="button" size="large"><Link
                                to={ (this.props.location.query.source || '/operation/stock/list/card') +
                                    '?id='+this.props.location.query.id+
                                    '&name='+this.props.location.query.name+
                                    '&username='+this.props.location.query.username}>返回</Link>
                        </Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        )
    }
});

StockListAdd = createForm()(StockListAdd);
export default StockListAdd
