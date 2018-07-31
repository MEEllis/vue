import React from 'react'
import {Button,Form,Input,Modal,Table,Tabs,DatePicker,Col,Row,Checkbox,Steps,message,InputNumber,Spin,Tooltip} from 'antd'
import '../less/releaseCommodity'
import Icon, {
    iDelete,
    iPost,
    iPostTo,
    iEdit,

} from '../../Icon/js/Icon'
import '../../CardType/less/cardType.less'
import IconComponent from '../../IconComponent/js/IconComponent'

const createForm = Form.create;
const FormItem = Form.Item;
const CheckboxGroup =  Checkbox.Group;
const Step = Steps.Step;


let ReleaseExistedProductComponent = React.createClass({
getInitialState(){
    return{modalReleaseNewCommodity:false,
        current:0, //步骤条的当前页
        selectedRowKeys: [],  //表格选择的单选框
        loading:false,
        productId:'',
        productName:'',  //步骤3中显示的库存名称
        RELOAD:false,
        }
},
setReReleaseNewCommodity(){
    this.setState({modalReleaseNewCommodity:true})
    const {props} = this;
    const {text} = props;
    props.releaseOldCommodityList_StepOne_Action({
        text:text[6]
    })
},
hideDetailModal(){
    this.setState({modalReleaseNewCommodity:false})
},
componentDidUpdate(){
    const {props} = this;
    const {RELOAD} = this.state;
    if(RELOAD && props.submitItem.Status == '200'  ){
        message.success('发布成功');
        this.setState({RELOAD:false})
    }else if(props.submitError.Result == false && !!RELOAD & props.submitError.Result){
        message.error(props.submitError.Message);
        this.setState({RELOAD:false})
    }
},
// 跳转到第二步
StepTwo(){
    const current = this.state.current + 1;
    this.setState({current:current})
    const {props} = this;
    const {text} = props;
    props.releaseOldCommodityListAction({
        condition:{
            PageNum:1,
            PageSize:15,
            ProductType:1,
        },
            // owerId:'34CF37F8-356D-4D45-84AE-243C02CF0F7E',
        supProductId:text[6]
    })
},
// 跳转到第三步
StepThree(){
    if(this.state.selectedRowKeys.length < 1){
        message.warning('请选择商品！');
        return ;
    }else{
        const current = this.state.current + 1;
        this.setState({current:current})
        const {props} = this;
        props.releaseOldCommodityList_StepThree_Action({
            text:this.state.productId
        })
    }
},
// 最后提交
StepHandle(){
    this.props.form.validateFields((err,value)=>{
        if(err){
            return;
        }
        const {props} = this;
        this.props.form.resetFields();
        if(!value.Priority){
            message.warning('请输入数值！')
            return ;
        }
        this.setState({modalReleaseNewCommodity:false,current:0,RELOAD:true})
        props.releaseOldCommodityList_Submit_Action({
            priority:value.Priority,
            dockProductId:props.stepOneItems.Id,
            productId:this.state.productId,
        })
    })
},
prev() {
        const current = this.state.current - 1;
        this.setState({ current:current });
    },
onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    },
start() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    },
render(){
const {props} = this;
let {isfetchingStepOne,isfetchingStepTwo,isfetchingStepThree} = props;

const {text} = props;
        // text:Status,ProductName,FaceValue,Price,ProductCode,Id,ProductId
const { items,stepOneItems,stepThreeItems } = props;
const {dataSource} = items || [];
const { current } = this.state;
const { getFieldDecorator } = props.form;
let ProductRelationsLength = '1'
if(stepThreeItems.ProductRelations){
    ProductRelationsLength= stepThreeItems.ProductRelations.length + 1;
}
const checkboxOptions=[{
        label:'一卡通',value:'0'
    },{
        label:'云接口',value:'1'
    }];
const formItemLayout = {
    labelCol:{span:6},
    wrapperCol:{span:16}
}
const columns=[{
                title:'商品',
                dataIndex:'ProductName'
            },{
                title:'商品类型',
                dataIndex:'Type'
            },{
                title:'商品ID',
                dataIndex:'ProductCode'
            },{
                title:'面值',
                dataIndex:'FaceValue'
            },{
                title:'售价',
                dataIndex:'ProductPrice'
            },{
                title:'商品编号',
                dataIndex:'DockAssociateCode'
            },{
                title:'库存状态',
                dataIndex:'ProductStockStatus'
            },{
                title:'销售状态',
                dataIndex:'SaleStatus',
                render:text =>
                <div>
                    <p>{text[0]}</p>
                    <p>{text[1]}</p>
                </div>
            },{
                title:'操作',
                dataIndex:'Options',
                render:text =>
                <div>
                    <Tooltip title='修改' arrowPointAtCenter>
                        <a href="javascript:;" style={{marginRight:10}} onClick={this.setReReleaseNewCommodity}>
                            <Icon glyph={iEdit} />
                        </a>
                    </Tooltip>
                    <Tooltip title='删除' arrowPointAtCenter>
                        <a href="javascript:;" onClick={this.setReReleaseNewCommodity}>
                            <Icon glyph={iDelete} />
                        </a>
                    </Tooltip>
                </div>
            }];
const steps = 3
// = [{
//                 title:'提示信息',
//                 content:'first-content',
//             },{
//                 title:'第二部',
//                 content:'second-content',
//             },{
//                 title:'第3部',
//                 content:'3cond-content',
//             }]
const rowSelection = {
    type : 'radio',
    onChange: (selectedRowKeys,selectedRows) => {
    let selectedRowKeysLength = selectedRowKeys.length;
    this.setState({selectedRowKeys,selectedRowKeys})

    },
    onSelect: (record, selected, selectedRows) => {
    this.setState({productId:record.ProductId,productName:record.ProductName})
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
        }),
};
return(
    <span className = 'release-existed'>
        <IconComponent title='发布到已有商品' glyphIcon={iPostTo} click={this.setReReleaseNewCommodity} />
        <Modal title="发布到已有商品" width={900} visible={this.state.modalReleaseNewCommodity}
        footer={
        <div className="steps-action">
            {this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} type="ghost" onClick={() => this.prev()}>
                上一步
            </Button>
            }
            {
                this.state.current < steps - 1
                        &&
                this.state.current == 0
                        &&
                 <Button type="primary" onClick={() => this.StepTwo()}>下一步</Button>
             }
            {
                this.state.current < steps - 1
                     &&
                this.state.current == 1
                    &&
                <Button type="primary" onClick={() => this.StepThree()}>下一步</Button>
             }
             {
                 this.state.current > 0
                      &&
                 this.state.current == 2
                     &&
                 <Button type="primary" onClick={() => this.StepHandle()}>提交</Button>
              }

        </div>
    }
    onCancel={this.hideDetailModal}
>
    <div className='release-existed-product'>
        <div className = 'release-steps-top'>
            <Steps current={current}>
                <Step title = "确认商品信息" />
                <Step title = "关联商品" />
                <Step title = "调整出货优先级" />
            </Steps>
        </div>

            <div className = 'step-one' style={{display:this.state.current == 0?'block':'none'}}>
                <Spin spinning = {isfetchingStepOne == false ? false:true}>
                <div className='show-prompt'><p><i></i><span>提示:</span></p>
                    <p>保留卡仓商品的基本属性（包括模板和API接口等内容），现在，您只需填写新的商品名称，售价即可发布为新的商品。</p></div>
                    <div className='show-detail'>
                        <p className='commodity-name'>商品名称：{stepOneItems.Name}</p>
                            <div>
                                <p>商品类型：{stepOneItems.ProductType}</p>
                                <p>商品ID：{stepOneItems.Code}</p>
                            </div>
                            <div>
                                <p>面值：{stepOneItems.FaceValue}</p>
                                <p>售价：{stepOneItems.Price}</p>
                            </div>
                    </div>
                    </Spin>
                </div>



            <div className='step-two' style={{display:this.state.current == 1 ? 'block':'none'}}>
                <Spin spinning = {isfetchingStepTwo == false ? false:true}>
                <div className='show-form'>
                    <p>已找到与您的匹配的商品</p>
                    <Table columns={columns} dataSource={dataSource} pagination = {false} rowSelection={rowSelection} scroll={{ y: 300,x:800 }} />
                </div>
                </Spin>
            </div>
            <div className='step-three' style={{display:this.state.current == 2 ? 'block':'none'}}>
                <Spin spinning = {isfetchingStepThree == false ? false:true}>
                <div className= 'ant-table-body ant-table ant-table-large ant-table-scroll-position-left ant-table-content'>
                    <table className='ant-table-fixed'>
                        <thead className='ant-table-thead'>
                            <tr>
                                <th>
                                    <span>商品名称</span>
                                </th>
                                <th>
                                    <span>库存名称</span>
                                </th>
                                <th>
                                    <span>出货优先级</span>
                                </th>
                            </tr>
                        </thead>
                            {
                                stepThreeItems.ProductRelations?
                                <tbody className='ant-table-tbody'>
                                    {
                                        stepThreeItems.ProductRelations.map((item,index)=>{
                                            return <tr className='overflowH' key={index}>
                                                <td>{item.DockProductName}</td>
                                                <td>{this.state.productName}</td>
                                                <td>{item.Priority}</td>
                                                </tr>
                                                })
                                        }
                                        {
                                            stepOneItems?
                                            <tr>
                                                <td>{stepOneItems.Name}</td>
                                                <td>{this.state.productName}</td>
                                                <td>{getFieldDecorator('Priority',{
                                                    initialValue:1
                                                })(
                                                <InputNumber min = {1}/>
                                                )}</td>
                                            </tr>
                                            :
                                            ''
                                        }
                                    </tbody>
                                :
                                <tbody></tbody>
                            }
                    </table>
                </div>
                </Spin>
            </div>
    </div>
    </Modal>
</span>
        )}
})
ReleaseExistedProductComponent = createForm()(ReleaseExistedProductComponent);

export default ReleaseExistedProductComponent
