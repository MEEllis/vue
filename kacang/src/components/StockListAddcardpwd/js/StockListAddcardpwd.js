import React from 'react'
import { Form, Input, Tooltip, Cascader, Select, Switch, Row, Col, Checkbox, Button, Table, Spin, Modal, message, DatePicker } from 'antd';
import moment from 'moment';
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
            selectedRows: [],
            PostData:{
                condition:{
                    PageIndex:1,
                    PageNumber:1,
                    PageSize:5,
                }
            },
            dataSource: [],
            reload: false,
            batchCode:'',
            pwdLists: [],
            cardInfo: [],
            modalVisible: false,
        }
    },
    componentWillMount(){
    },
    componentDidUpdate(){
        const {props} = this;
        const {reload} = this.state;
        let that = this;
        if( reload && !this.props.isfetching ){
            switch(props.data.source){
                case 'PreviewPasswordCards':
                    if(props.data.Status == 200){
                        let postData = {
                            url: FL.PATH.API.GetPasswordCardInfo,
                            source: 'GetPasswordCardInfo',
                            stockId: this.props.location.query.id,
                            batchCode: props.data.Data
                        }
                        this.props.getData(postData);
                        this.setState({
                            batchCode: props.data.Data
                        })
                    }else{
                        message.error(props.data.Message);
                    }
                  break;
                case 'GetPasswordCardInfo':
                    this.setState({
                        cardInfo: props.data.Data,
                        modalVisible: true
                    });
                    let postData = {
                        url: FL.PATH.API.PreviewFixPasswordCards,
                        source: 'PreviewFixPasswordCards',
                        batchCode: this.state.batchCode,
                        pageNumber : '1',
                        pageSize : '100',
                    }
                    this.props.getData(postData);
                    break;
                case 'PreviewFixPasswordCards':
                    this.setState({
                        pwdLists: props.data.Data,
                        reload: false,
                    });
                    return false;
                  break;
            }
        }
    },
    postData(){
        this.props.form.validateFields((err,value)=>{
            if(err){
                return false;
            };
            let postData = {
                url: FL.PATH.API.PreviewPasswordCards,
                source: 'PreviewPasswordCards',
                //ownerId: '34CF37F8-356D-4D45-84AE-243C02CF0F7E',
                stockId: this.props.location.query.id,
                dto: value
            }
            this.props.getData(postData);
            this.setState({
                reload: true,
            })
            return false;
        });
    },
    onClose(){
        this.setState({
            modalVisible : false
        })
    },
    render () {
        const { selectedRowKeys } = this.state;
        const { getFieldDecorator } = this.props.form;
        let {isfetching} = this.props

        const formItemLayout = {
            labelCol:{span:4},
            wrapperCol:{span:12},
        };

        let columnsList = [{
            title: '编号',
            dataIndex: 'Sort'
        },{
            title: '卡号',
            dataIndex: 'CardNumber'
        },{
            title: '密码',
            dataIndex: 'PassWord'
        }];


        let today = new Date();
        today.setYear(today.getFullYear() + 1);

        return (
            <div>
                <Spin spinning = { isfetching }>
                    <Form style={{marginBottom:10}}>
                        <FormItem
                            {...formItemLayout}
                            label='库存归属' >

                            {getFieldDecorator('StockId',{
                                initialValue: this.props.location.query.id,
                                disabled: true
                            })(
                                <Select id="select" size="large">
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
                            label='有无卡号' >

                            {getFieldDecorator('Hasnumber',{
                                initialValue: 'true',
                            })(
                                <Select id="select" size="large">
                                    <Option value={'true'} >有卡号</Option>
                                    <Option value={'false'} >无卡号</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                                label="是否优先取卡">
                            {getFieldDecorator('Isprior', {
                                initialValue: false,
                                valuePropName: 'checked'
                            })(
                                <Switch />
                            )}
                        </FormItem>
                        <FormItem
                            // {...formItemLayout}
                            {...{
                                labelCol:{span:4},
                                wrapperCol:{span:18},
                            }}
                            label='卡密'
                            >

                            <Row gutter={12}>
                                <Col span={16}>
                                    {getFieldDecorator('Cardlist',{
                                        rules: [{
                                         required: true, message: '请输入卡密',
                                       }],
                                        initialValue:''
                                    })(
                                        <Input type="textarea" rows={8} />
                                    )}
                                </Col>
                                <Col span={8}>
                                    <div style={{lineHeight:'1.5em'}}>
                                        <h4>有卡号类型格式如下：</h4>
                                        <p>1.卡号 密码（卡号+空格+密码）</p>
                                        <p>2.卡号,密码（卡号+逗号+密码）</p>
                                        <p className='mb10'>以上2种格式均可，一行一张卡密。</p>
                                        <h4>无卡号类型格式如下：</h4>
                                        <p>卡密1</p>
                                        <p>卡密2</p>
                                        <p>一行一张卡密，开头不留空格。</p>
                                    </div>
                                </Col>
                            </Row>
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
                            label='面值' >

                            {getFieldDecorator('Facevalue',{
                                rules: [{
                                 required: true, message: '请输入面值',
                               }],
                                initialValue:''
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='有效期至' >

                            {getFieldDecorator('Expiredate',{
                                initialValue: moment( today, 'YYYY-MM-DD' )
                            })(
                                <DatePicker showTime format="YYYY-MM-DD" />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='进货价格' >

                            {getFieldDecorator('PurchaseValue',{
                                rules: [{
                                 required: true, message: '请输入进货价格',
                               }],
                                initialValue:''
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='供应商名称' >

                            {getFieldDecorator('Supplier',{
                                initialValue:''
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='备注' >

                            {getFieldDecorator('Remark',{
                                initialValue:''
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem wrapperCol={{ span: 6, offset: 4 }}>
                            <Button className={'mr10'} type="primary" htmlType="button" size="large" onClick={this.postData}>提交</Button>
                            <Button type="primary" htmlType="button" size="large"><Link to={ (this.props.location.query.source || '/operation/stock/list/user') + '?id='+this.props.location.query.id+'&name='+this.props.location.query.name}>返回</Link></Button>
                        </FormItem>
                    </Form>
                    <Modal
                        onClose={this.onClose}
                        title={'生成预览'}
                        visible={this.state.modalVisible}
                        width={'80%'}
                        footer={[
                            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.onClose}>
                             提交
                            </Button>,
                        ]}>
                            <Spin spinning = {this.props.isfetching}>
                                <div className="modal-demo-content">
                                    <Row gutter={12} className='mb20'>
                                        <Col span={6}>
                                            共导入卡密{this.state.cardInfo.Count}张
                                        </Col>
                                        <Col span={6}>
                                            导入库存{this.state.cardInfo.StockName}
                                        </Col>
                                        <Col span={6}>
                                            面值{this.state.cardInfo.FaceValue}元
                                        </Col>
                                        <Col span={6}>
                                            供应商{this.state.cardInfo.Supplier}
                                        </Col>
                                    </Row>
                                    <Table columns={columnsList} dataSource={this.state.pwdLists} />
                                </div>
                            </Spin>
                      </Modal>
                </Spin>
            </div>
        )
    }
});

StockListAdd = createForm()(StockListAdd);
export default StockListAdd
