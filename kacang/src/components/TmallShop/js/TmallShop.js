import React from 'react';
import {Button,Table,Modal,Input,Form,Row,Col} from 'antd';
import TmallShopChangeMessage from './TmallShopChangeMessage'

const createForm = Form.create;
const confirm = Modal.confirm;

const FormItem = Form.Item;
let TmallShopForm = React.createClass({
    getInitialState() {
        return {visible: false,filterDropdownVisible:false,searchText:''}
    },
    componentWillMount(){
        this.props.initialDispatch()
    },
    handleSubmit() {
        this.hideModal();
    },
    showModal() {
        this.setState({visible: true})
    },
    hideModal() {
        this.setState({visible: false})
    },
    handleSubmit(){
        this.props.form.validateFields((err,values)=>{
            if(!err){
            }
            this.props.form.resetFields();
            this.setState({visible:false});
        });
    },
    onInputChange(e){
        this.setState({ searchText: e.target.value });
    },
    onSearch() {
    const { searchText } = this.state;
    this.setState({
      filterDropdownVisible: false,
    })
  },
    render() {
        const {getFieldDecorator} = this.props.form;
        const TopAuthorization = ()=>{
            window.open('https://oauth.taobao.com/authorize?response_type=token&client_id=12285057')
        }
        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 16
            }
        }
        const props = this.props;
        const items = this.props.items;
        const dataSource = items.dataSource
        const confirmDelete = ()=>{
            confirm({
                title:'您是否确认要删除此项内容',
                content:'',
                onOk(){
                },
                onCancel(){
                }
            });
        }
        const columns =[{
                title:'店铺名称',
                dataIndex:'MerchantName',
                filterDropdown: (
               <div className="custom-filter-dropdown">
                 <Input
                   placeholder="Search name"
                   value={this.state.searchText}
                   onChange={this.onInputChange}
                   onPressEnter={this.onSearch}
                 />
                 <Button type="primary" onClick={this.onSearch}>Search</Button>
               </div>
                ),
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
            },{
                title:'App Key',
                dataIndex:'MerchantId',
            },{
                title:'App Secret',
                dataIndex:'MerchantKey'
            },{
                title:'AccessToken',
                dataIndex:'AccessToken'
            },{
                title:'操作',
                dataIndex:'option',
                render:(text)=><div>
                    <TmallShopChangeMessage propsValue={text}/>
                    <p>
                        <a href="javascript:;" onClick={confirmDelete}>删除</a>
                    </p>
                </div>
            }];
        return (
                <div key = "form" >
                    <div style={{marginBottom:20}}>
                        <Button type="primary" size="large" onClick={TopAuthorization} style={{marginRight:8}}>TOP授权</Button>
                        <Button type="ghost" size="large" onClick={this.showModal}>添加用户信息</Button>
                        <Modal title="添加用户信息"
                            visible={this.state.visible} onOk={this.handleSubmit}
                            onCancel={this.hideModal}>
                            <Form horizontal>
                                <FormItem {...formItemLayout} label="店铺名称：">
                                    {getFieldDecorator('shopName')(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                                <FormItem label="TOP分配给应用的AppKey：" {...formItemLayout}>
                                    {getFieldDecorator('merchant')(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                                <FormItem label="TOP分配给应用的AppSecret：" {...formItemLayout}>
                                    {getFieldDecorator('orderGuest')(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                                <FormItem label="授权码AccessToken" {...formItemLayout}>
                                    {getFieldDecorator('productNumber')(<Input type="text" autoComplete="off"/>)}
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                    <Table className="supTransactionBody" columns={columns} dataSource={dataSource||[]} />
                </div>
        )
    }
})
TmallShopForm = createForm()(TmallShopForm);
const TmallShop = ({items,initialDispatch}) =>{
    return (
        <TmallShopForm items = {items} initialDispatch = {initialDispatch} />
    )
}
export default TmallShop
