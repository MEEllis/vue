import React from 'react'
import {Form,Input,Modal,Table,message,Tooltip,Button,Spin,Row,Col,Select} from 'antd'
import Icon, {
    iDelete,
    iPost,
    iPostTo,

} from '../../Icon/js/Icon'
// import '../less/cardType.less'
import '../../CardType/less/cardType.less'

import Filter,{FilterItem} from '../../Filter/js/Filter'
import '../less/supState'
import AlinkComponent from '../../AlinkComponent/js/AlinkComponent'
import  ReleaseNewCommodity from '../../../containers/ReleaseNewCommodity'
import ReleaseOldCommodity from '../../../containers/ReleaseOldCommodity'
import IconComponent from '../../IconComponent/js/IconComponent'

import {A} from '../../Auth/js/Auth'


import FL from '../../../utils/FL'

const createForm = Form.create;
const FormItem = Form.Item;
const confirm = Modal.confirm;

let SupState = React.createClass({
    getInitialState(){
        return {visible:false,
                filterDropdownVisible: false,
                searchText: '',
                ApplyStatus:'',//审核状态
                SalerName:'', //供货商名称
                SalerCode:'', //供货商ID
                ProductName:'',//商品名称
                ProductCode:'',//物品编码
                PageNumber:'1',//当前页
                PageSize:FL.PAGESIZE,//分页数
                SearchsList:FL.LINK.Supstateterm,
                listForm:FL.LINK.SUPSTATE,
                RELOAD:false,
            };
        },
    componentWillMount(){
        const {props} = this;
        props.supStateAction({
            // buyerId:'34CF37F8-356D-4D45-84AE-243C02CF0F7E',
            condition:{
                PageNumber:this.state.PageNumber,
                PageSize:this.state.PageSize,
            }
        })
    },
    componentDidUpdate(){
        const {props} = this;
        const {RELOAD,PageNumber,PageSize,ApplyStatus} = this.state;
        if(props.deleteAction.Status == '200' && RELOAD){
            message.info('删除成功')
            props.supStateAction({
                condition:{
                    PageNumber:PageNumber,
                    PageSize:PageSize,
                    ApplyStatus:ApplyStatus,
                }
            })
            this.setState({RELOAD:false})
        }
    },
    handleSubmits(){ //点击更多搜索条件 搜索按钮
        this.props.form.validateFields((err,value)=>{
            if(err){
                return;
            }
            const {props} = this;
            props.supStateAction({
                condition:{
                    SalerName:value.SalerName||'',
                    SalerId:value.SalerCode||'',
                    ProductName:value.ProductName||'',
                    ProductCode:value.ProductCode||'',
                    ApplyStatus:this.state.ApplyStatus||'',
                    PageNumber:'1',
                    PageSize:this.state.PageSize,
                }
            })
            //this.props.form.resetFields();
            // this.setState({visible:false,SalerName:value.SalerName,SalerCode:value.SalerCode,ProductName:value.ProductName,ProductCode:value.ProductCode})
            //this.setState({visible:false,SalerName:'',SalerCode:'',ProductName:'',ProductCode:''})
        })
    },
    showModal(){
        this.setState({visible:true});
    },
    hideModal(){
        this.setState({visible:false});
    },
    onCheckStatusClick(newState){
        this.setState({
            ApplyStatus:newState
        });
        const {props} = this;
        props.supStateAction({
            condition:{
                ApplyStatus:newState,
                SalerName:this.state.SalerName,
                SalerCode:this.state.SalerCode,
                ProductName:this.state.ProductName,
                ProductCode:this.state.ProductCode,
                PageNumber:'1',
                PageSize:this.state.PageSize,
            }
        })
        this.setState({ApplyStatus:newState,PageNumber:'1'})
    },
    onInputChange(e) {
        this.setState({ searchText: e.target.value });
    } ,
    onSearch() {
        const { searchText } = this.state;
        const {props} = this;
        props.supStateAction({
            condition:{
                ApplyStatus:this.state.ApplyStatus,
                SalerName:this.state.SalerName,
                SalerCode:this.state.SalerCode,
                ProductName:searchText,
                ProductCode:this.state.ProductCode,
                PageNumber:'1',
                PageSize:this.state.PageSize,
            }
        })
        this.setState({
            filterDropdownVisible: false,
            searchText:'',
            PageNumber:1,
        });

    },
    handleChangeType(value){
       this.state.ApplyStatus= `${value}`;
    },
    handleReset(){
       this.props.form.resetFields();
       this.setState({
            visible:false,
            ApplyStatus:'',//审核状态
            SalerName:'', //供货商名称
            SalerCode:'', //供货商ID
            ProductName:'',//商品名称
            ProductCode:'',//物品编码
        })
    },
    render(){
        const {props} = this;
        let {isfetching} = props;
        const that = this;
        const {listForm,PageNumber,PageSize,ApplyStatus} = this.state;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol:{span:8},
            wrapperCol:{span:16},
        };
        const showConfirm = function(id,idProduct){
            let sendId = id;
            let productId = idProduct;
            confirm({
                title:'您是否确认删除这项内容',
                onOk:function(){

                    props.supStateDeleteAction({
                        applyId:sendId,
                        productId:productId
                    });
                    // props.supStateAction({
                    //     condition:{
                    //         PageNumber:PageNumber,
                    //         PageSize:PageSize,
                    //         ApplyStatus:ApplyStatus,
                    //     }
                    // })
                    that.setState({RELOAD:true})

                },
                onCancel:function(){
                }
            })
        }
        let {deleteAction,items} = props;
        const columns=[{
                title:'申请商品名称/编码',
                dataIndex:'ProductName',
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                        <Input
                            placeholder="请输入商品名称"
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
                title:'面值',
                dataIndex:'FaceValue',
            },{
                title:'售价',
                dataIndex:'Price',
            },{
                title:'供货方式',
                dataIndex:'SendType',
            },{
                title:'供货商名称/ID',
                dataIndex:'SalerName',
            },{
                title:'审核结果',
                dataIndex:'Status',
            },{
                title:'申请时间',
                dataIndex:'ApplyTime'
            },{
                title:'操作',
                dataIndex:'Options',
                width:80,
                fixed:'right',
                render:text=>{
                    switch(text[0]){
                        case 1:return(
                                <div className='show-options'>
                                    <ReleaseNewCommodity  text={text}/>
                                    {/* <ReleaseOldCommodity text={text}/> */}
                                    {/* <IconComponent title='删除' glyphIcon={iDelete} click={()=>showConfirm(text[5],text[6])} /> */}
                                    <A onClick={()=>showConfirm(text[5],text[6])} auth='supStateDel'
                                        authOpts={{noAuthType: 'disabled',noAuthHint: '尚未开通该权限，请联系管理员',hint:'删除'}}>
                                        <Icon glyph={iDelete}/>
                                    </A>
                                    {/* <Tooltip title='删除' placement="topLeft" arrowPointAtCenter>
                                        <a onClick={()=>showConfirm(text[5],text[6])} className='iconA'>
                                            <Icon glyph={iDelete} />
                                        </a>
                                    </Tooltip> */}
                                </div>
                            )
                        default:
                            return (
                                <div className='show-options'>
                                    <IconComponent title='删除' glyphIcon={iDelete} click={()=>showConfirm(text[5],text[6])} />

                                    {/* <Tooltip title='删除' arrowPointAtCenter>
                                        <a className='iconA' onClick={()=>showConfirm(text[5],text[6])}>
                                            <Icon glyph={iDelete} />
                                        </a>
                                    </Tooltip> */}
                                </div>

                            )}
                }
        }];
        let {dataSource,TotalRecords} = items;
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
            },
            onSelect: (record, selected, selectedRows) => {
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',    // Column configuration not to be checked
            }),
        };

        //搜索begin
        const Searchlist=this.state.SearchsList;

        const children = [];
           for (let i = 0; i < Searchlist.SearchText.length; i++) {
                switch (Searchlist.SearchText[i].type) {
                    case '0':
                    children.push(
                      <Col span={8} key={i}>
                        <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                            {getFieldDecorator(Searchlist.SearchText[i].ID,{
                                              initialValue:''
                                          })(
                                        <Input type='text'  size='default'/>
                                      )}
                        </FormItem>
                    </Col>  );
                    break;
                    case '1':
                    children.push(
                      <Col span={8} key={i}>
                        <FormItem {...formItemLayout} label={Searchlist.SearchText[i].title}>
                        { getFieldDecorator(Searchlist.SearchText[i].ID,{
                                          initialValue:''
                                      })(
                            <Select onChange={this.handleChangeType} allowClear  size='default'>
                                    {listForm.checkStatus.map((list,index)=>{
                                        return <Option value={list.indexStatus} key={index} >{list.title}</Option>
                                    })}
                            </Select>
                                  )
                         }
                       </FormItem>
                    </Col> );
                        break;
                     }
                };
         const shownCount = children.length;
         //搜索end


        const pagination = {
            total: TotalRecords,
            showSizeChanger: true,
            pageSize:this.state.PageSize,
            pageSizeOptions:['10','15','20','30'],

            onShowSizeChange: (current, pageSize) => {
                // this.setState({PageSize:pageSize})
                this.setState({PageNumber:current,PageSize:pageSize})
                props.supStateAction({
                    condition:{
                        ApplyStatus:this.state.ApplyStatus,
                        SalerName:this.state.SalerName,
                        SalerCode:this.state.SalerCode,
                        ProductName:this.state.ProductName,
                        ProductCode:this.state.ProductCode,
                        PageNumber:current,
                        PageSize:pageSize,
                    }
                })
            },
            onChange: (current,pageSize) => {
                this.setState({PageNumber:current})
                props.supStateAction({
                    condition:{
                        ApplyStatus:this.state.ApplyStatus,
                        SalerName:this.state.SalerName,
                        SalerCode:this.state.SalerCode,
                        ProductName:this.state.ProductName,
                        ProductCode:this.state.ProductCode,
                        PageNumber:current,
                        PageSize:this.state.PageSize,
                    }
                })
            },
        };
        return (
                <div key="form" className='supState'>
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
                            </Col>
                         </Row>
                        </Form>
                    </div>
                        <Table rownSelection = {rowSelection} columns={columns} dataSource={dataSource||[]}  pagination = { pagination } />
                    </Spin>
                </div>

            )
    }
})
SupState = createForm()(SupState);
export default SupState
